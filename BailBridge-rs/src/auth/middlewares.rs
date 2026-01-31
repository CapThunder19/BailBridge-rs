use axum::{
    extract::State,
    http::{Request, StatusCode},
    middleware::Next,
    response::Response,
    body::Body,
};

use crate::{auth::jwt::verify_jwt, config::Config};

pub async fn auth_middleware( State(config): State<Config>, req: Request<Body>,  next: Next, ) -> Result<Response, StatusCode> {
    let auth_header = req
        .headers()
        .get("Authorization")
        .and_then(|h| h.to_str().ok())
        .unwrap_or("");

    let token = auth_header.strip_prefix("Bearer ").unwrap_or("");

    if token.is_empty() {
        return Err(StatusCode::UNAUTHORIZED);
    }

    verify_jwt(token, &config.jwt_secret).map_err(|_| StatusCode::UNAUTHORIZED)?;

    Ok(next.run(req).await)
}
