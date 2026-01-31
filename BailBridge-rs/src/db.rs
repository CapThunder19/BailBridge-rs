use sqlx::{Pool, Postgres};
use crate::config::Config;

pub type DbPool = Pool<Postgres>;

pub async fn create_db_pool(config: &Config) -> DbPool {
    Pool::<Postgres>::connect(&config.database_url)
        .await
        .expect("Failed to create database pool")
}