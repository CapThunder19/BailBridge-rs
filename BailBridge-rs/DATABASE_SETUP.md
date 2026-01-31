# Database Setup Instructions

## Issue
The `bailbridge_user` doesn't have permissions to create tables in the `public` schema.

## Solutions

### Option 1: Connect as postgres superuser and create the table

```bash
# If you know the postgres password:
psql -U postgres -h localhost -d bailbridge -f setup_database.sql

# Or interactively:
sudo -u postgres psql bailbridge
```

Then in the psql prompt:
```sql
-- Create the users table
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

-- Grant permissions to bailbridge_user
GRANT ALL PRIVILEGES ON TABLE users TO bailbridge_user;
GRANT USAGE, SELECT ON ALL SEQUENCES IN SCHEMA public TO bailbridge_user;
ALTER DEFAULT PRIVILEGES IN SCHEMA public GRANT ALL ON TABLES TO bailbridge_user;

-- Exit
\q
```

### Option 2: Grant schema permissions first

As postgres superuser:
```bash
sudo -u postgres psql bailbridge
```

```sql
-- Grant schema ownership or full permissions
ALTER SCHEMA public OWNER TO bailbridge_user;
-- OR
GRANT ALL ON SCHEMA public TO bailbridge_user;
GRANT CREATE ON SCHEMA public TO bailbridge_user;

-- Exit
\q
```

Then run as bailbridge_user:
```bash
psql -U bailbridge_user -h localhost -d bailbridge -f setup_database.sql
```

### Option 3: Use the provided SQL file manually

1. Open pgAdmin or your PostgreSQL GUI tool
2. Connect to the `bailbridge` database
3. Run the contents of `setup_database.sql` or `migrations/001_create_users_table.sql`

## Verify the table was created

```bash
psql -U bailbridge_user -h localhost -d bailbridge -c "\dt users"
```

You should see the users table listed.

## After setup, run the application

```bash
cargo run
```

The server will start on `http://0.0.0.0:8080`

## Test the API

### Register a new user:
```bash
curl -X POST http://localhost:8080/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "securepassword123",
    "role": "user"
  }'
```

### Login:
```bash
curl -X POST http://localhost:8080/login \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "password": "securepassword123"
  }'
```

Both should return a JWT token:
```json
{"token":"eyJ0eXAiOiJKV1QiLCJhbGc..."}
```
