use axum::{Json, extract::{State, Path}, http::StatusCode};
use uuid::Uuid;
use chrono::Utc;

use crate::{
    db::DbPool,
    bail::models::{
        BailApplication, CreateBailApplication, 
        BailApplicationResponse, BailApplicationSummary
    },
    auth::jwt::Claims,
};

fn generate_application_number() -> String {
    let timestamp = Utc::now().format("%Y%m%d%H%M%S");
    let random_suffix: String = (0..4)
        .map(|_| rand::random::<u8>() % 10)
        .map(|n| char::from_digit(n as u32, 10).unwrap())
        .collect();
    format!("BAIL-{}-{}", timestamp, random_suffix)
}



pub async fn create_bail_application( State(db): State<DbPool>, claims: Claims, Json(payload): Json<CreateBailApplication>, ) -> Result<Json<BailApplicationResponse>, (StatusCode, String)> {
    
    let application_id = Uuid::new_v4();
    let application_number = generate_application_number();
    let user_id = Uuid::parse_str(&claims.sub)
        .map_err(|_| (StatusCode::UNAUTHORIZED, "Invalid user ID".to_string()))?;

    let result = sqlx::query_as::<_, BailApplication>(
        r#"
        INSERT INTO bail_applications (
            id, user_id, application_number,
            applicant_name, father_husband_name, age, gender, address, phone_number, email,
            fir_number, police_station, district, state, date_of_arrest, sections_applied, case_description,
            bail_type, previous_bail_applications, previous_bail_details,
            surety_details, medical_condition, family_dependents, employment_details,
            status, submitted_at
        ) VALUES (
            $1, $2, $3, $4, $5, $6, $7, $8, $9, $10,
            $11, $12, $13, $14, $15, $16, $17,
            $18, $19, $20, $21, $22, $23, $24, $25, $26
        )
        RETURNING *
        "#
    )
    .bind(application_id)
    .bind(user_id)
    .bind(&application_number)
    .bind(&payload.applicant_name)
    .bind(&payload.father_husband_name)
    .bind(payload.age)
    .bind(&payload.gender)
    .bind(&payload.address)
    .bind(&payload.phone_number)
    .bind(&payload.email)
    .bind(&payload.fir_number)
    .bind(&payload.police_station)
    .bind(&payload.district)
    .bind(&payload.state)
    .bind(payload.date_of_arrest)
    .bind(&payload.sections_applied)
    .bind(&payload.case_description)
    .bind(&payload.bail_type)
    .bind(payload.previous_bail_applications)
    .bind(&payload.previous_bail_details)
    .bind(&payload.surety_details)
    .bind(&payload.medical_condition)
    .bind(&payload.family_dependents)
    .bind(&payload.employment_details)
    .bind("pending")
    .bind(Utc::now())
    .fetch_one(&db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to create bail application: {}", e)))?;

    Ok(Json(BailApplicationResponse {
        id: result.id,
        application_number: result.application_number,
        status: result.status,
        created_at: result.created_at,
    }))
}



pub async fn get_bail_application( State(db): State<DbPool>, Path(application_number): Path<String>,  claims: Claims, ) -> Result<Json<BailApplication>, (StatusCode, String)> {
    
    let application = sqlx::query_as::<_, BailApplication>(
        "SELECT * FROM bail_applications WHERE application_number = $1"
    )
    .bind(&application_number)
    .fetch_one(&db)
    .await
    .map_err(|_| (StatusCode::NOT_FOUND, "Bail application not found".to_string()))?;

    // Authorization check: user can only view their own, lawyers and judges can view all
    let user_id = Uuid::parse_str(&claims.sub)
        .map_err(|_| (StatusCode::UNAUTHORIZED, "Invalid user ID".to_string()))?;
    
    if claims.role == "user" && application.user_id != user_id {
        return Err((StatusCode::FORBIDDEN, "Access denied".to_string()));
    }

    Ok(Json(application))
}



pub async fn get_my_bail_applications( State(db): State<DbPool>, claims: Claims, ) -> Result<Json<Vec<BailApplicationSummary>>, (StatusCode, String)> {
    
    let user_id = Uuid::parse_str(&claims.sub)
        .map_err(|_| (StatusCode::UNAUTHORIZED, "Invalid user ID".to_string()))?;

    let applications = sqlx::query_as::<_, BailApplicationSummary>(
        r#"
        SELECT id, application_number, applicant_name, fir_number, status, bail_type, created_at
        FROM bail_applications
        WHERE user_id = $1
        ORDER BY created_at DESC
        "#
    )
    .bind(user_id)
    .fetch_all(&db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to fetch applications: {}", e)))?;

    Ok(Json(applications))
}



pub async fn get_all_bail_applications_for_lawyer( State(db): State<DbPool>, claims: Claims, ) -> Result<Json<Vec<BailApplicationSummary>>, (StatusCode, String)> {
    
   if claims.role != "lawyer" && claims.role != "judge" {
        return Err((StatusCode::FORBIDDEN, "Access denied".to_string()));
    }

    let applications = sqlx::query_as::<_, BailApplicationSummary>(
        r#"
        SELECT id, application_number, applicant_name, fir_number, status, bail_type, created_at
        FROM bail_applications
        ORDER BY created_at DESC
        "#
    )
    .fetch_all(&db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to fetch applications: {}", e)))?;

    Ok(Json(applications))
}



pub async fn assign_lawyer_to_case( State(db): State<DbPool>, Path(application_number): Path<String>, claims: Claims, ) -> Result<Json<BailApplicationResponse>, (StatusCode, String)> {
    
    if claims.role != "lawyer" {
        return Err((StatusCode::FORBIDDEN, "Only lawyers can assign cases".to_string()));
    }

    let lawyer_id = Uuid::parse_str(&claims.sub)
        .map_err(|_| (StatusCode::UNAUTHORIZED, "Invalid user ID".to_string()))?;

    let result = sqlx::query_as::<_, BailApplication>(
        r#"
        UPDATE bail_applications
        SET assigned_lawyer_id = $1, status = 'under_review'
        WHERE application_number = $2
        RETURNING *
        "#
    )
    .bind(lawyer_id)
    .bind(&application_number)
    .fetch_one(&db)
    .await
    .map_err(|e| (StatusCode::INTERNAL_SERVER_ERROR, format!("Failed to assign lawyer: {}", e)))?;

    Ok(Json(BailApplicationResponse {
        id: result.id,
        application_number: result.application_number,
        status: result.status,
        created_at: result.created_at,
    }))
}
