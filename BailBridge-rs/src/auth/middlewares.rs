use axum::{
    extract::{State, FromRequestParts},
    http::{Request, StatusCode, request::Parts},
    middleware::Next,
    response::Response,
    body::Body,
    async_trait,
};

use crate::{auth::jwt::{verify_jwt, Claims}, config::Config};

#[async_trait]
impl<S> FromRequestParts<S> for Claims
where
    S: Send + Sync,
{
    type Rejection = (StatusCode, String);

    async fn from_request_parts(parts: &mut Parts, _state: &S) -> Result<Self, Self::Rejection> {
        let auth_header = parts
            .headers
            .get("Authorization")
            .and_then(|h| h.to_str().ok())
            .ok_or((StatusCode::UNAUTHORIZED, "Missing authorization header".to_string()))?;

        let token = auth_header
            .strip_prefix("Bearer ")
            .ok_or((StatusCode::UNAUTHORIZED, "Invalid authorization format".to_string()))?;

        let config = parts
            .extensions
            .get::<Config>()
            .ok_or((StatusCode::INTERNAL_SERVER_ERROR, "Config not found".to_string()))?;

        verify_jwt(token, &config.jwt_secret)
            .map_err(|_| (StatusCode::UNAUTHORIZED, "Invalid token".to_string()))
    }
}


#[allow(dead_code)]
pub async fn auth_middleware( State(config): State<Config>, mut req: Request<Body>,  next: Next, ) -> Result<Response, StatusCode> {
    
    req.extensions_mut().insert(config.clone());
    
    let auth_header = req
        .headers()
        .get("Authorization")
        .and_then(|h| h.to_str().ok())
        .unwrap_or("");

    let token = auth_header.strip_prefix("Bearer ").unwrap_or("");

    if token.is_empty() {
        return Err(StatusCode::UNAUTHORIZED);
    }

    verify_jwt(token, &req.extensions().get::<Config>().unwrap().jwt_secret)
        .map_err(|_| StatusCode::UNAUTHORIZED)?;

    Ok(next.run(req).await)
}
