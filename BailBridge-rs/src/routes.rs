use axum::{Router, routing::post};
use crate::{
    auth::handlers::{register_user, login_user},
    db::DbPool,
    config::Config,
};


pub fn create_routes(db: DbPool, config: Config) -> Router {
    // Public routes (no auth required)
    let public_routes = Router::new()
        .route("/register", post(register_user))
        .route("/login", post(login_user))
        .with_state((db, config.clone()));

    // Protected routes (auth required) - add routes here in the future
    // Uncomment when needed:
    // use axum::middleware;
    // use crate::auth::middlewares::auth_middleware;
    // let protected_routes = Router::new()
    //     .route("/protected-endpoint", get(handler))
    //     .route_layer(middleware::from_fn_with_state(config.clone(), auth_middleware))
    //     .with_state(db.clone());

    Router::new()
        .merge(public_routes)
        // .merge(protected_routes)
}