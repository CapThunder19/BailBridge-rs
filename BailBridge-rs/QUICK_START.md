# BailBridge - Quick Start Guide

## Prerequisites

1. **PostgreSQL** must be installed and running
2. **Rust** toolchain installed
3. **Node.js** for the frontend

## Database Setup (First Time Only)

### Step 1: Start PostgreSQL

**Windows (PowerShell):**
```powershell
# Start PostgreSQL service
Start-Service postgresql-x64-14  # Adjust version number as needed

# Or if using WSL:
wsl sudo service postgresql start
```

**Linux/WSL:**
```bash
sudo service postgresql start
# or
sudo systemctl start postgresql
```

### Step 2: Create Database and User

**Option A: Using the setup script (Linux/WSL):**
```bash
cd BailBridge-rs
chmod +x setup_db.sh
./setup_db.sh
```

**Option B: Manual setup:**
```bash
# Connect as postgres superuser
sudo -u postgres psql

# In the PostgreSQL prompt, run:
CREATE DATABASE bailbridge;
CREATE USER bailbridge_user WITH PASSWORD 'strong';
GRANT ALL PRIVILEGES ON DATABASE bailbridge TO bailbridge_user;
\c bailbridge
ALTER SCHEMA public OWNER TO bailbridge_user;
\q
```

### Step 3: Run Migrations

```bash
cd BailBridge-rs
psql -U bailbridge_user -h localhost -d bailbridge -f setup_database.sql
```

## Running the Application

### Backend (Rust API)
```bash
cd BailBridge-rs
cargo run
```

The API will start on `http://localhost:8080`

### Frontend (Next.js)
```bash
cd bailbridge-frontend
npm install  # First time only
npm run dev
```

The UI will start on `http://localhost:3000`

## Troubleshooting

### Error: "Failed to create database pool: PoolTimedOut"

**Solution:** PostgreSQL is not running. Start it:
- Windows: `Start-Service postgresql-x64-14`
- Linux/WSL: `sudo service postgresql start`

### Error: "database "bailbridge" does not exist"

**Solution:** Run the database setup steps above.

### Error: "permission denied for schema public"

**Solution:** Grant proper permissions:
```bash
sudo -u postgres psql bailbridge
ALTER SCHEMA public OWNER TO bailbridge_user;
GRANT ALL ON SCHEMA public TO bailbridge_user;
\q
```

## Environment Variables

Make sure `BailBridge-rs/.env` exists with:
```
DATABASE_URL=postgres://bailbridge_user:strong@localhost:5432/bailbridge
JWT_SECRET=your_secret_key_here
```

## Verify Everything Works

1. Backend: `curl http://localhost:8080/health` (should return OK)
2. Frontend: Open `http://localhost:3000` in browser
3. Test registration:
```bash
curl -X POST http://localhost:8080/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "password123",
    "role": "user"
  }'
```

## Quick Commands Reference

```bash
# Start database
wsl sudo service postgresql start

# Start backend
cd BailBridge-rs && cargo run

# Start frontend (new terminal)
cd bailbridge-frontend && npm run dev
```
