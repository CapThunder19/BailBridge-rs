use axum::{Json, extract::State, http::StatusCode};
use serde::Serialize;
use uuid::Uuid;
use sqlx::Row;

use argon2::{Argon2, PasswordHasher, PasswordVerifier, Algorithm, Version, Params};
use password_hash::{SaltString, PasswordHash, rand_core::OsRng};

use crate::{
    db::DbPool,
    models::{RegisterUser, LoginUser},
    auth::jwt::create_jwt,
    config::Config,
};


#[derive(Serialize)]
pub struct AuthResponse {
    pub token: String,
    pub role: String,
}


pub async fn register_user( State((db, config)): State<(DbPool, Config)>, Json(payload): Json<RegisterUser>) -> Result<Json<AuthResponse>, (StatusCode, String)> {
   
    let salt = SaltString::generate(&mut OsRng);
    
   
    // m_cost: 19456 KiB, t_cost: 2, p_cost: 1
    let params = Params::new(19456, 2, 1, None)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to create Argon2 params: {}", e)))?;
    
    let argon2 = Argon2::new(Algorithm::Argon2id, Version::V0x13, params);
    
    let hash_password = argon2
        .hash_password(payload.password.as_bytes(), &salt)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to hash password: {}", e)))?
        .to_string();

    let user_id = Uuid::new_v4();
    let role_str = format!("{:?}", payload.role).to_lowercase();

    sqlx::query("INSERT INTO users (id, username, email, password_hash, role) VALUES ($1, $2, $3, $4, $5)")
        .bind(user_id)
        .bind(&payload.username)
        .bind(&payload.email)
        .bind(&hash_password)
        .bind(&role_str)
        .execute(&db)
        .await
        .map_err(|e| (StatusCode::BAD_REQUEST, format!("Failed to create user: {}", e)))?;

    let token = create_jwt(&user_id.to_string(), &role_str, &config.jwt_secret)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to create JWT: {}", e)))?;
    Ok(Json(AuthResponse { token, role: role_str }))
}



pub async fn login_user( State((db, config)): State<(DbPool, Config)>, Json(payload): Json<LoginUser>) -> Result<Json<AuthResponse>, (StatusCode, String)> {

    let row = sqlx::query("SELECT id, password_hash, role FROM users WHERE email = $1")
        .bind(&payload.email)
        .fetch_one(&db)
        .await
        .map_err(|_| (StatusCode::UNAUTHORIZED, "User not found".to_string()))?;

    let password_hash: String = row.try_get("password_hash")
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to get password_hash: {}", e)))?;

    let role: String = row.try_get("role")
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to get role: {}", e)))?;

    let id: Uuid = row.try_get("id")
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to get id: {}", e)))?;

    let parsed_hash = PasswordHash::new(&password_hash)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to parse password hash: {}", e)))?;


    
    Argon2::default()
        .verify_password(payload.password.as_bytes(), &parsed_hash)
        .map_err(|_| (StatusCode::UNAUTHORIZED, "Invalid password".to_string()))?;


    let token = create_jwt(&id.to_string(), &role, &config.jwt_secret)
        .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to create JWT: {}", e)))?;
    Ok(Json(AuthResponse { token, role }))
}
