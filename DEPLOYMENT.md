# Deployment Guide for BailBridge

## ✅ Your Code is Production-Ready!

The database connection is already properly configured to work in both:
- **Local development**: Uses `.env` file
- **Production (Render)**: Uses environment variables automatically

## Environment Variables Setup

### Local Development (.env file)

Your `.env` file should contain:
```env
DATABASE_URL=postgres://bailbridge_user:strong@localhost:5432/bailbridge
JWT_SECRET=your_super_secure_jwt_secret_key_change_this_in_production
```

✅ The code uses `dotenvy::dotenv().ok()` to load these automatically.

### Production (Render)

Render will **override** the `.env` file with their environment variables.

## Quick Deploy to Render

### Step 1: Create PostgreSQL Database

1. In Render Dashboard: **New → PostgreSQL**
2. Name: `bailbridge-db`
3. Region: Choose closest to you
4. Plan: **Free** (or paid for production)
5. Click **Create Database**

Render will provide a `DATABASE_URL` like:
```
postgres://user:password@host.region.render.com:5432/dbname
```

### Step 2: Create Web Service

1. **New → Web Service**
2. Connect your GitHub repository
3. Configure:

   **Runtime:** Rust
   
   **Root Directory:** `BailBridge-rs`
   
   **Build Command:**
   ```bash
   cargo build --release
   ```
   
   **Start Command:**
   ```bash
   ./target/release/BailBridge-rs
   ```

4. **Environment Variables** (very important!):

   | Key | Value |
   |-----|-------|
   | `DATABASE_URL` | Click "Add from Database" → Select `bailbridge-db` |
   | `JWT_SECRET` | Generate a secure random string (see below) |
   | `RUST_LOG` | `info` (optional, for logging) |

5. Click **Create Web Service**

### Step 3: Generate Secure JWT_SECRET

**Option A - Using OpenSSL:**
```bash
openssl rand -base64 32
```

**Option B - Using Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('base64'))"
```

**Option C - Online:** Use https://generate-secret.vercel.app/32

Copy the generated string and paste it as the `JWT_SECRET` value in Render.

### Step 4: Deploy!

Click **Manual Deploy** or push to your connected branch. Render will:
1. Build your Rust binary
2. Connect to the PostgreSQL database
3. Start the server on port 8080

## 🎯 How It Works

### Database Connection Logic

```rust
// In config.rs
pub fn from_env() -> Self {
    let database_url = env::var("DATABASE_URL")
        .expect("DATABASE_URL must be set");
    // ...
}
```

✅ **Local:** Reads from `.env` file (via `dotenvy::dotenv().ok()`)

✅ **Render:** Reads from Render's environment variables (automatically overrides)

## Alternative: Deploy with Docker

### Build and run locally:
```bash
docker build -t bailbridge .
docker run -p 8080:8080 --env-file BailBridge-rs/.env bailbridge
```

### Deploy to Render with Docker:
1. In Render Dashboard, create new Web Service
2. Choose "Docker" as runtime
3. Set Root Directory: `/`
4. Docker Build Context: `/`
5. Dockerfile Path: `Dockerfile`

## Verify Deployment

Once deployed, test your API:

```bash
# Health check
curl https://your-app.onrender.com/

# Register endpoint
curl -X POST https://your-app.onrender.com/register \
  -H "Content-Type: application/json" \
  -d '{
    "username": "testuser",
    "email": "test@example.com",
    "password": "securepass123",
    "role": "user"
  }'
```

## Common Issues & Solutions

### Issue: Port binding error
**Solution:** Render provides the PORT environment variable. The app should bind to `0.0.0.0:$PORT` or `0.0.0.0:8080`.

### Issue: Database connection timeout
**Solution:** 
- Ensure DATABASE_URL is correctly set
- Check that the database is in the same region as the web service
- Verify the database is running and accessible

### Issue: Build takes too long / times out
**Solution:**
- Use a paid plan for more build time
- Or optimize build by caching dependencies

### Issue: Binary not found
**Solution:** Ensure the binary name matches the package name in Cargo.toml. Current name is `BailBridge-rs`.

## Frontend Deployment (Next.js)

For the frontend (`bailbridge-frontend`):

1. Create a new Static Site on Render
2. Build Command: `cd bailbridge-frontend && npm install && npm run build`
3. Publish Directory: `bailbridge-frontend/.next`
4. Add environment variable:
   - `NEXT_PUBLIC_API_URL`: Your backend API URL

## Support

If issues persist:
1. Check Render logs: Dashboard → Logs
2. Check build logs for compilation errors
3. Verify all environment variables are set correctly
