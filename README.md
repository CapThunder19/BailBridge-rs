# BailBridge

A comprehensive bail management system with role-based authentication and modern UI, designed to streamline the bail application process for users, lawyers, and judges.

## 🚀 Overview

BailBridge is a full-stack application that facilitates the bail application process by providing dedicated interfaces for three user roles:
- **Users/Prisoners**: Submit bail applications and track status
- **Lawyers**: Manage clients and file bail applications
- **Judges**: Review applications and manage hearings

## 🛠️ Tech Stack

### Backend
- **Rust** - High-performance backend
- **Axum 0.8.8** - Web framework
- **PostgreSQL** - Database
- **SQLx 0.8.6** - Async SQL toolkit
- **Argon2 0.5.3** - Password hashing
- **JWT 10.3.0** - Token-based authentication

### Frontend
- **Next.js 16.1.6** - React framework with Turbopack
- **React 19.2.3** - UI library
- **TypeScript 5** - Type safety
- **Tailwind CSS 4** - Styling
- **Framer Motion 12.29.2** - Animations
- **Radix UI** - Accessible components

## 📁 Project Structure

```
BailBridge-rs/
├── src/                          # Rust backend source
│   ├── main.rs                   # Application entry point
│   ├── config.rs                 # Configuration management
│   ├── db.rs                     # Database connection
│   ├── models.rs                 # Data models and UserRole enum
│   ├── routes.rs                 # API routes
│   └── auth/
│       ├── handlers.rs           # Auth endpoints (login/register)
│       ├── jwt.rs                # JWT token generation
│       ├── middlewares.rs        # Auth middleware
│       └── mod.rs
├── migrations/                   # Database migrations
│   └── 001_create_users_table.sql
├── Cargo.toml                    # Rust dependencies
└── bailbridge-frontend/          # Next.js frontend
    ├── app/
    │   ├── page.tsx              # Landing page
    │   ├── login/page.tsx        # Login with role-based redirect
    │   ├── signup/page.tsx       # Registration with role selector
    │   └── dashboard/
    │       ├── user/page.tsx     # User dashboard
    │       ├── lawyer/page.tsx   # Lawyer dashboard
    │       └── judge/page.tsx    # Judge dashboard
    ├── components/
    │   ├── ThemeToggle.tsx       # Light/Dark mode toggle
    │   └── ui/                   # Reusable UI components
    ├── context/
    │   └── ThemeContext.tsx      # Theme management
    └── lib/
        ├── api.ts                # API client
        └── utils.ts              # Utility functions
```

## ✨ Features Implemented

### Authentication System
- ✅ User registration with role selection (User/Lawyer/Judge)
- ✅ Secure login with JWT token generation
- ✅ Password hashing using Argon2
- ✅ Role-based routing and access control
- ✅ Profile dropdown with user details and logout

### Role-Based Dashboards

#### User Dashboard
- AI-powered bail suggestion system
- Bail form submission
- Application status tracking
- Document management
- Contact support

#### Lawyer Dashboard
- Client management
- Bail application filing
- Case calendar view

#### Judge Dashboard
- Pending application review
- Hearing schedule management
- Case history access

### UI/UX Features
- ✅ Modern, responsive design
- ✅ Light/Dark theme support with seamless transitions
- ✅ Call-to-action cards with gradient icons
- ✅ Animated hover effects using Framer Motion
- ✅ Theme-aware color scheme:
  - Light mode: White cards, black text
  - Dark mode: Dark cards (#2A3F52), light text
- ✅ Rounded-full buttons with transparent borders
- ✅ Circular profile button in navbar
- ✅ Consistent UI patterns across all dashboards

## 🗄️ Database Schema

### Users Table
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    username VARCHAR(100) UNIQUE NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash TEXT NOT NULL,
    role VARCHAR(50) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```

### User Roles
- `user` - Regular users/prisoners
- `lawyer` - Legal professionals
- `judge` - Judicial officers

## 🚦 Getting Started

### Prerequisites
- Rust 1.70+ and Cargo
- PostgreSQL 14+
- Node.js 18+ and npm
- Git

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd BailBridge-rs
   ```

2. **Setup PostgreSQL database**
   ```bash
   # Run the setup script
   bash setup_db.sh
   # Or manually execute
   psql -U postgres -f setup_database.sql
   ```

3. **Configure environment variables**
   ```bash
   # Create .env file in root directory
   DATABASE_URL=postgresql://bailbridge_user:your_password@localhost/bailbridge_db
   JWT_SECRET=your-secret-key-here
   ```

4. **Run migrations**
   ```bash
   sqlx migrate run
   ```

5. **Start the backend server**
   ```bash
   cargo run
   ```
   Server runs on `http://localhost:8080`

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd bailbridge-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```
   Frontend runs on `http://localhost:3000`

## 🔑 API Endpoints

### Authentication
- `POST /auth/register` - User registration
  ```json
  {
    "username": "string",
    "email": "string",
    "password": "string",
    "role": "user|lawyer|judge"
  }
  ```

- `POST /auth/login` - User login
  ```json
  {
    "username": "string",
    "password": "string"
  }
  ```

Response includes JWT token and user role:
```json
{
  "token": "eyJ...",
  "role": "user"
}
```

## 🎨 Design System

### Color Palette
- **Dark Mode**
  - Background: `#2A3F52`
  - Cards: `#3A4B59`
  - Borders: `#4A5F7F`
  - Text: `#B8C4D9`

- **Light Mode**
  - Background: `#FFFFFF`
  - Cards: `#FFFFFF`
  - Text: `#000000` / `#1F2937`

### Gradients
- Purple: `from-[#4F46E5] to-[#7C3AED]`
- Orange: `from-[#F59E0B] to-[#FF9B51]`
- Blue: `from-[#3B82F6] to-[#2563EB]`
- Green: `from-[#10B981] to-[#059669]`
- Red: `from-[#EF4444] to-[#DC2626]`

## 📝 Current Status

### Completed ✅
- Backend authentication system with role support
- Frontend role-based dashboards
- Theme system with light/dark modes
- Responsive UI with modern design patterns
- JWT-based authentication flow
- Database schema and migrations

### In Progress 🚧
- Implement actual functionality for action buttons
- API integration for user data fetching
- Protected route middleware with JWT verification
- Real-time status updates

### Planned 📋
- File upload for documents
- AI-powered bail suggestion algorithm
- Notification system
- Email verification
- Case management system
- Hearing scheduling
- Analytics dashboard

## 🤝 Contributing

This project is currently in active development. Please follow the existing code structure and styling patterns when contributing.

## 📄 License

This project is proprietary software. All rights reserved.

## 👥 Team

Built for efficient bail management and judicial processes.

---

**Last Updated**: February 4, 2026
**Version**: 0.1.0 (Alpha)
