-- SQL commands to manually set up the database

-- If you need to create the database first:
-- CREATE DATABASE bailbridge;

-- Connect to the database and run:

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id UUID PRIMARY KEY,
    username VARCHAR(255) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL DEFAULT 'user',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_users_username ON users(username);
CREATE INDEX IF NOT EXISTS idx_users_email ON users(email);

-- Grant permissions (if needed)
-- GRANT ALL PRIVILEGES ON TABLE users TO bailbridge_user;
-- GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO bailbridge_user;
