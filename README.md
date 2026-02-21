🚛 FleetFlow

FleetFlow is a fleet management web application built to manage vehicles, drivers, trips, and maintenance operations efficiently.

✨ Features

Add and manage vehicles

Add and track drivers

Create and monitor trips

Log maintenance records

Supabase database integration

Clean and responsive UI

🛠 Tech Stack

Frontend: (Your framework — e.g., Next.js / React)

Backend: Supabase

Database: PostgreSQL (via Supabase)

Deployment: (Vercel / etc. if used)

⚙️ Environment Variables

Create a .env.local file:

NEXT_PUBLIC_SUPABASE_URL=your_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_anon_key

Restart the development server after adding these.

🚀 Getting Started
npm install
npm run dev



📦 Database

All tables are created in Supabase under the public schema:

users

vehicles

drivers

trips

maintenance_logs

📌 Status

Core functionality implemented.

Supabase integration working.
