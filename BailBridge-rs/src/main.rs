mod config;
mod db;
mod models;
mod routes;
mod auth;

use axum::{Router, routing::get};
use dotenvy::dotenv;
use tower_http::cors::{CorsLayer, Any};
use tracing_subscriber;

#[tokio::main]
async fn main() {
    dotenv().ok();
    tracing_subscriber::fmt::init();

    let config = config::Config::from_env();
    let db_pool = db::create_db_pool(&config).await;

    let app = Router::new()
    .route("/check", get(|| async { "BailBridge is running!" }))
    .merge(routes::create_routes(db_pool, config))
    .layer(
        CorsLayer::new()
            .allow_origin(["http://localhost:3000".parse().unwrap()])
            .allow_methods(Any)
            .allow_headers(Any)
    );

    let listener = tokio::net::TcpListener::bind("0.0.0.0:8080").await.unwrap();
    println!("Server running on http://0.0.0.0:8080");
    axum::serve(listener, app).await.unwrap();


}