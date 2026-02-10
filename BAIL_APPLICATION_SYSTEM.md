# Bail Application System

## Overview

The BailBridge platform now includes a complete bail application system that allows:
- **Users**: Submit detailed bail applications and receive a unique application number
- **Lawyers**: Search for applications by ID and assign cases to themselves
- **Judges**: Review all submitted applications

## Features

### For Users
1. **Submit Bail Application**: Fill out a comprehensive form with:
   - Personal information
   - Case details (FIR number, sections, arrest date)
   - Bail type (regular, anticipatory, interim)
   - Supporting information (surety, medical conditions, dependents)

2. **Unique Application Number**: Upon submission, receive a unique ID like `BAIL-20260210123456-1234`

3. **Track Applications**: View all your submitted applications and their status

### For Lawyers
1. **Search by Application Number**: Enter the unique ID provided by users
2. **View All Applications**: Browse all pending bail applications
3. **Assign Cases**: Assign yourself to cases for representation
4. **Full Case Details**: Access complete information about each application

## Database Schema

The `bail_applications` table includes:
- Personal information (name, age, address, contact)
- Case details (FIR, police station, sections, description)
- Bail details (type, previous applications)
- Supporting information (surety, medical, family, employment)
- Status tracking (pending, under_review, approved, rejected)
- Lawyer and judge assignments

## API Endpoints

### Protected Routes (Require Authentication)

#### POST `/bail-applications`
Submit a new bail application
- **Auth**: User role
- **Returns**: Application ID and number

#### GET `/bail-applications/my`
Get all applications submitted by the authenticated user
- **Auth**: User role
- **Returns**: Array of application summaries

#### GET `/bail-applications/all`
Get all bail applications (for lawyers and judges)
- **Auth**: Lawyer or Judge role
- **Returns**: Array of all application summaries

#### GET `/bail-applications/:application_number`
Get full details of a specific application
- **Auth**: Any role (users can only view their own)
- **Returns**: Complete application details

#### POST `/bail-applications/:application_number/assign`
Assign a lawyer to a case
- **Auth**: Lawyer role
- **Returns**: Updated application status

## User Flow

### 1. User Submits Application
```
User Dashboard → New Application → Fill Form → Submit
   ↓
Receives: BAIL-20260210123456-1234
```

### 2. User Shares ID with Lawyer
```
User provides application number to lawyer
   ↓
Lawyer searches: BAIL-20260210123456-1234
   ↓
Lawyer views full case details
   ↓
Lawyer assigns case to themselves
```

### 3. Status Updates
```
pending → under_review → approved/rejected
```

## Setup

### 1. Run Database Migration
```bash
# Linux/Mac
./run_bail_migration.sh

# Windows PowerShell
.\run_bail_migration.ps1

# Or manually
psql $DATABASE_URL -f migrations/002_create_bail_applications_table.sql
```

### 2. Build Backend
```bash
cd BailBridge-rs
cargo build --release
```

### 3. Run Backend
```bash
./target/release/BailBridge-rs
# Server runs on http://localhost:8080
```

### 4. Run Frontend
```bash
cd bailbridge-frontend
npm install
npm run dev
# Frontend runs on http://localhost:3000
```

## Testing the Flow

### 1. Create User Account
```bash
POST http://localhost:8080/register
{
  "username": "john_doe",
  "email": "john@example.com",
  "password": "password123",
  "role": "user"
}
```

### 2. Login as User
```bash
POST http://localhost:8080/login
{
  "email": "john@example.com",
  "password": "password123"
}
# Save the returned token
```

### 3. Submit Bail Application
- Go to User Dashboard: `http://localhost:3000/dashboard/user`
- Click "New Bail Application"
- Fill the form and submit
- Note the application number (e.g., `BAIL-20260210123456-1234`)

### 4. Create Lawyer Account
```bash
POST http://localhost:8080/register
{
  "username": "lawyer_smith",
  "email": "lawyer@example.com",
  "password": "password123",
  "role": "lawyer"
}
```

### 5. Search for Case as Lawyer
- Login as lawyer
- Go to `http://localhost:3000/dashboard/lawyer/cases`
- Enter the application number from step 3
- View full case details
- Click "Assign to Me" to take the case

## Frontend Routes

### User Routes
- `/dashboard/user` - View all your applications
- `/dashboard/user/new-application` - Submit new bail application

### Lawyer Routes
- `/dashboard/lawyer/cases` - Search and view all bail applications

## Status Flow

1. **pending** - Initial status when application is submitted
2. **under_review** - Status changes when a lawyer assigns the case
3. **approved** - Judge approves the bail
4. **rejected** - Bail application is denied

## Security Features

- JWT authentication required for all bail endpoints
- Role-based access control:
  - Users can only view their own applications
  - Lawyers can view all applications
  - Judges can view all applications
- Application numbers are unique and time-stamped
- All sensitive data is protected behind authentication

## Performance Optimizations

- Indexed database queries on:
  - Application number (for quick lookups)
  - User ID (for user's applications)
  - Status (for filtering)
  - Lawyer/Judge assignments
  - Created date (for sorting)
- Connection pooling (20 max connections)
- Optimized Argon2 parameters for fast authentication

## Next Steps

Consider adding:
- Document upload functionality
- Real-time notifications for status changes
- Email notifications
- Court hearing scheduling
- Judge dashboard for case review
- Comments/notes system for lawyers and judges
- Application history tracking
- PDF generation for applications
