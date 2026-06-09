from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles
import os

from database import engine, Base
import models

# Create tables
Base.metadata.create_all(bind=engine)

from routers import auth, profile, projects, skills, blogs
from routers.extras import router as contact_router, case_router, ai_router, stats_router

app = FastAPI(
    title="Rushikesh Davange — Portfolio API",
    description="Backend API for the professional Data Science portfolio of Rushikesh Davange",
    version="1.0.0",
    docs_url="/api/docs",
    redoc_url="/api/redoc"
)

# CORS — allow frontend
origins = [
    "http://localhost:3000",
    "http://localhost:3001",
    os.getenv("FRONTEND_URL", "http://localhost:3000"),
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Static files (uploaded images)
os.makedirs("static/uploads", exist_ok=True)
app.mount("/static", StaticFiles(directory="static"), name="static")

# Register routers
app.include_router(auth.router)
app.include_router(profile.router)
app.include_router(projects.router)
app.include_router(skills.router)
app.include_router(blogs.router)
app.include_router(contact_router)
app.include_router(case_router)
app.include_router(ai_router)
app.include_router(stats_router)


@app.get("/")
def root():
    return {
        "message": "Rushikesh Davange Portfolio API",
        "docs": "/api/docs",
        "status": "running"
    }


@app.get("/api/health")
def health():
    return {"status": "ok"}
