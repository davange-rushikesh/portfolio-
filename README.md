# Rushikesh Davange — Full Stack Data Science Portfolio

A professional, recruiter-focused portfolio platform built with Next.js 14 and FastAPI.

## Features

- **Frontend**: Next.js 14 (App Router), Tailwind CSS, Framer Motion, fully responsive.
- **Backend**: FastAPI, SQLite (SQLAlchemy), JWT Authentication.
- **Admin Panel**: Secure dashboard to manage projects, skills, blogs, contact messages, etc.
- **Data Science Focused**: Includes pipeline views, case studies, and code/tech stack highlights.
- **Optimized for Recruiters**: Quick summary, sticky resume download, clean metrics.

---

## 🛠️ Local Development Setup

### 1. Backend (FastAPI)

Requires Python 3.10+

```bash
cd backend
python -m venv venv
# Activate venv:
# Windows: .\venv\Scripts\activate
# Mac/Linux: source venv/bin/activate

pip install -r requirements.txt

# Create initial database and seed data
python seed.py

# Run the backend server
uvicorn main:app --reload
# Server will run at http://localhost:8000
```

*Admin Login*: `admin` / `admin123`

### 2. Frontend (Next.js)

Requires Node.js 18+

```bash
cd frontend

# Install dependencies
npm install

# Run development server
npm run dev
# App will run at http://localhost:3000
```

---

## 🚀 Deployment Guide

### Backend (Render / Railway)

1. Connect your GitHub repository to Render/Railway.
2. Select the `backend` folder as the root directory.
3. Build Command: `pip install -r requirements.txt`
4. Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Environment Variables:
   - `SECRET_KEY`: Generate a secure random string
   - `FRONTEND_URL`: Your Vercel frontend URL (e.g., `https://my-portfolio.vercel.app`)
   - `DATABASE_URL`: Add your PostgreSQL connection string for production.

### Frontend (Vercel)

1. Connect your GitHub repository to Vercel.
2. Framework Preset: Next.js
3. Root Directory: `frontend`
4. Environment Variables:
   - `NEXT_PUBLIC_API_URL`: Your deployed backend URL (e.g., `https://my-backend.onrender.com`)
5. Click **Deploy**.

---

## 🏗️ Folder Structure

```
prtfortfolio/
├── backend/          # FastAPI
│   ├── main.py       # App entrypoint
│   ├── database.py   # SQLAlchemy config
│   ├── models.py     # DB tables
│   ├── schemas.py    # Pydantic validation
│   ├── auth.py       # JWT logic
│   ├── seed.py       # Initial data seeder
│   └── routers/      # API endpoints
└── frontend/         # Next.js
    ├── app/          # Pages & Routes
    ├── components/   # Reusable UI parts
    ├── lib/          # API client
    └── tailwind.config.js
```

---

## 🌟 Future Improvements
- [ ] Add PostgreSQL integration for production backend.
- [ ] Implement image uploads to AWS S3 / Cloudinary (currently uses URLs).
- [ ] Add Markdown editor for the blog in the admin panel.
- [ ] Add real-time website analytics.
