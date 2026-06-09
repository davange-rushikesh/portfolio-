from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, Float, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from database import Base


class AdminUser(Base):
    __tablename__ = "admin_users"
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String(50), unique=True, nullable=False)
    email = Column(String(100), unique=True, nullable=False)
    hashed_password = Column(String(200), nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class Profile(Base):
    __tablename__ = "profile"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    headline = Column(String(200))
    bio = Column(Text)
    short_bio = Column(String(300))
    avatar_url = Column(String(500))
    resume_url = Column(String(500))
    email = Column(String(100))
    phone = Column(String(20))
    location = Column(String(100))
    years_experience = Column(String(20))
    projects_count = Column(Integer, default=0)
    certifications_count = Column(Integer, default=0)
    open_to_work = Column(Boolean, default=True)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    social_links = relationship("SocialLink", back_populates="profile", cascade="all, delete")


class SocialLink(Base):
    __tablename__ = "social_links"
    id = Column(Integer, primary_key=True, index=True)
    profile_id = Column(Integer, ForeignKey("profile.id"))
    platform = Column(String(50))   # github, linkedin, kaggle, twitter
    url = Column(String(500))
    icon = Column(String(100))
    profile = relationship("Profile", back_populates="social_links")


class Project(Base):
    __tablename__ = "projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False)
    summary = Column(String(500))
    description = Column(Text)
    problem_statement = Column(Text)
    approach = Column(Text)
    outcome = Column(Text)
    image_url = Column(String(500))
    github_url = Column(String(500))
    demo_url = Column(String(500))
    category = Column(String(100))   # ML, Data Analysis, AI, Full Stack
    stack = Column(String(500))      # comma-separated
    is_featured = Column(Boolean, default=False)
    sort_order = Column(Integer, default=0)
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
    screenshots = relationship("ProjectScreenshot", back_populates="project", cascade="all, delete")


class ProjectScreenshot(Base):
    __tablename__ = "project_screenshots"
    id = Column(Integer, primary_key=True, index=True)
    project_id = Column(Integer, ForeignKey("projects.id"))
    image_url = Column(String(500))
    caption = Column(String(200))
    project = relationship("Project", back_populates="screenshots")


class Skill(Base):
    __tablename__ = "skills"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    category = Column(String(100))   # Programming, ML/AI, Data, Tools, Cloud
    level = Column(Integer, default=80)   # 0-100
    icon = Column(String(200))
    sort_order = Column(Integer, default=0)


class Blog(Base):
    __tablename__ = "blogs"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(300), nullable=False)
    slug = Column(String(300), unique=True, nullable=False)
    summary = Column(String(500))
    content = Column(Text)
    cover_image = Column(String(500))
    tags = Column(String(300))    # comma-separated
    is_published = Column(Boolean, default=True)
    read_time = Column(Integer, default=5)
    published_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)


class CaseStudy(Base):
    __tablename__ = "case_studies"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(300), nullable=False)
    slug = Column(String(300), unique=True, nullable=False)
    client_industry = Column(String(100))
    problem = Column(Text)
    approach = Column(Text)
    insights = Column(Text)
    impact = Column(Text)
    tools_used = Column(String(500))
    image_url = Column(String(500))
    is_featured = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class AIProject(Base):
    __tablename__ = "ai_projects"
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String(200), nullable=False)
    slug = Column(String(200), unique=True, nullable=False)
    summary = Column(String(500))
    description = Column(Text)
    tools = Column(String(500))         # comma-separated
    architecture = Column(Text)
    github_url = Column(String(500))
    demo_url = Column(String(500))
    image_url = Column(String(500))
    category = Column(String(100))      # NLP, CV, LLM, Recommendation
    created_at = Column(DateTime, default=datetime.utcnow)


class ContactMessage(Base):
    __tablename__ = "contact_messages"
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    subject = Column(String(200))
    message = Column(Text, nullable=False)
    is_read = Column(Boolean, default=False)
    created_at = Column(DateTime, default=datetime.utcnow)


class SiteSetting(Base):
    __tablename__ = "site_settings"
    id = Column(Integer, primary_key=True, index=True)
    key = Column(String(100), unique=True, nullable=False)
    value = Column(Text)
    updated_at = Column(DateTime, default=datetime.utcnow, onupdate=datetime.utcnow)
