🚛 FleetFlow – Fleet & Logistics Management System

FleetFlow is a modern fleet management web application built to digitize and streamline vehicle operations, driver coordination, trip management, and maintenance tracking. The system replaces manual logbooks with a centralized, data-driven platform designed for operational efficiency and visibility.

✨ Key Features

• Comprehensive vehicle management
• Driver registration and tracking
• Trip creation, assignment, and monitoring
• Maintenance and service logging
• Supabase-powered backend
• Clean, responsive user interface

🛠 Technology Stack

Frontend: React / Next.js
Backend & API: Supabase
Database: PostgreSQL


⚙️ Environment Configuration

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

Restart the development server after updating environment variables.

🚀 Local Development

npm install
npm run dev

📦 Database Schema

FleetFlow uses a structured Supabase PostgreSQL database with the following core tables:

• users
• vehicles
• drivers
• trips
• maintenance_logs
