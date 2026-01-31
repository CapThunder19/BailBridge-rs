# BailBridge-rs

A Rust-based backend service for the BailBridge application using Axum, SQLx, and PostgreSQL.

## Prerequisites

- Rust (latest stable version)
- PostgreSQL database
- Environment variables configured in `.env` file

## Setup

### 1. Environment Configuration

Create a `.env` file in the project root with the following variables:

```env
DATABASE_URL=postgresql://username:password@localhost:5432/bailbridge
JWT_SECRET=your-secure-jwt-secret-key-here
```

### 2. Database Setup

**Option 1: Using the setup script (Linux/macOS/WSL)**
```bash
chmod +x setup_db.sh
./setup_db.sh
```

**Option 2: Manual setup**
```bash
# Connect to your PostgreSQL database
psql $DATABASE_URL -f migrations/001_create_users_table.sql
```

**Option 3: Using SQLx CLI**
```bash
# Install sqlx-cli if you haven't
cargo install sqlx-cli --no-default-features --features postgres

# Run migrations
sqlx migrate run
```

### 3. Build and Run

```bash
# Clean build
cargo clean

# Run the application
cargo run
```

The server will start on `http://0.0.0.0:8080`

## API Endpoints

### Public Endpoints
- `GET /check` - Health check endpoint
- `POST /register` - User registration
- `POST /login` - User authentication

### Authentication
Protected endpoints require a JWT token in the Authorization header:
```
Authorization: Bearer <your-token>
```

## Project Structure

```
BailBridge-rs/
├── src/
│   ├── auth/          # Authentication module
│   │   ├── handlers.rs    # Auth route handlers
│   │   ├── jwt.rs         # JWT utilities
│   │   ├── middlewares.rs # Auth middleware
│   │   └── mod.rs
│   ├── config.rs      # Configuration management
│   ├── db.rs          # Database connection pool
│   ├── models.rs      # Data models
│   ├── routes.rs      # Route definitions
│   └── main.rs        # Application entry point
├── migrations/        # Database migrations
└── Cargo.toml        # Dependencies
```

## Development

### Running Tests
```bash
cargo test
```

### Code Formatting
```bash
cargo fmt
```

### Linting
```bash
cargo clippy
```

## Troubleshooting

### Database Connection Issues
- Ensure PostgreSQL is running
- Verify DATABASE_URL in `.env` is correct
- Check that the `users` table exists in your database

### Compilation Errors
If you encounter SQLx compile-time errors about missing tables:
1. Make sure you've run the database migrations
2. Set `SQLX_OFFLINE=true` environment variable to use offline mode
3. Or run `cargo sqlx prepare` to generate offline query data

## Dependencies

Key dependencies include:
- `axum` - Web framework
- `sqlx` - Async SQL toolkit
- `tokio` - Async runtime
- `serde` - Serialization/deserialization
- `jsonwebtoken` - JWT handling
- `argon2` - Password hashing
- `uuid` - UUID generation

See [Cargo.toml](Cargo.toml) for the complete list.
