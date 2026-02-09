use sqlx::{Pool, Postgres, postgres::PgPoolOptions};
use std::time::Duration;
use crate::config::Config;

pub type DbPool = Pool<Postgres>;

pub async fn create_db_pool(config: &Config) -> DbPool {
    println!("Attempting to connect to database: {}", 
        config.database_url.split('@').last().unwrap_or("hidden"));
    
    PgPoolOptions::new()
        .max_connections(5)
        .acquire_timeout(Duration::from_secs(10))
        .connect(&config.database_url)
        .await
        .expect("Failed to create database pool. Please ensure PostgreSQL is running and the database is set up. See DATABASE_SETUP.md for instructions.")
}