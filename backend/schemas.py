from pydantic import BaseModel, EmailStr
from typing import Optional, List
from datetime import datetime


# ─── Auth ────────────────────────────────────────────────────────────────────
class LoginRequest(BaseModel):
    username: str
    password: str

class Token(BaseModel):
    access_token: str
    token_type: str


# ─── Social Links ─────────────────────────────────────────────────────────────
class SocialLinkBase(BaseModel):
    platform: str
    url: str
    icon: Optional[str] = None

class SocialLinkOut(SocialLinkBase):
    id: int
    class Config:
        from_attributes = True


# ─── Profile ──────────────────────────────────────────────────────────────────
class ProfileBase(BaseModel):
    name: str
    headline: Optional[str] = None
    bio: Optional[str] = None
    short_bio: Optional[str] = None
    avatar_url: Optional[str] = None
    resume_url: Optional[str] = None
    email: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    years_experience: Optional[str] = None
    projects_count: Optional[int] = 0
    certifications_count: Optional[int] = 0
    open_to_work: Optional[bool] = True

class ProfileUpdate(ProfileBase):
    social_links: Optional[List[SocialLinkBase]] = None

class ProfileOut(ProfileBase):
    id: int
    social_links: List[SocialLinkOut] = []
    updated_at: Optional[datetime] = None
    class Config:
        from_attributes = True


# ─── Projects ─────────────────────────────────────────────────────────────────
class ProjectScreenshotOut(BaseModel):
    id: int
    image_url: str
    caption: Optional[str] = None
    class Config:
        from_attributes = True

class ProjectBase(BaseModel):
    title: str
    slug: str
    summary: Optional[str] = None
    description: Optional[str] = None
    problem_statement: Optional[str] = None
    approach: Optional[str] = None
    outcome: Optional[str] = None
    image_url: Optional[str] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    category: Optional[str] = None
    stack: Optional[str] = None
    is_featured: Optional[bool] = False
    sort_order: Optional[int] = 0

class ProjectCreate(ProjectBase):
    pass

class ProjectUpdate(ProjectBase):
    pass

class ProjectOut(ProjectBase):
    id: int
    screenshots: List[ProjectScreenshotOut] = []
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    class Config:
        from_attributes = True


# ─── Skills ───────────────────────────────────────────────────────────────────
class SkillBase(BaseModel):
    name: str
    category: Optional[str] = None
    level: Optional[int] = 80
    icon: Optional[str] = None
    sort_order: Optional[int] = 0

class SkillCreate(SkillBase):
    pass

class SkillOut(SkillBase):
    id: int
    class Config:
        from_attributes = True


# ─── Blog ─────────────────────────────────────────────────────────────────────
class BlogBase(BaseModel):
    title: str
    slug: str
    summary: Optional[str] = None
    content: Optional[str] = None
    cover_image: Optional[str] = None
    tags: Optional[str] = None
    is_published: Optional[bool] = True
    read_time: Optional[int] = 5

class BlogCreate(BlogBase):
    pass

class BlogOut(BlogBase):
    id: int
    published_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    class Config:
        from_attributes = True


# ─── Case Studies ─────────────────────────────────────────────────────────────
class CaseStudyBase(BaseModel):
    title: str
    slug: str
    client_industry: Optional[str] = None
    problem: Optional[str] = None
    approach: Optional[str] = None
    insights: Optional[str] = None
    impact: Optional[str] = None
    tools_used: Optional[str] = None
    image_url: Optional[str] = None
    is_featured: Optional[bool] = False

class CaseStudyCreate(CaseStudyBase):
    pass

class CaseStudyOut(CaseStudyBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True


# ─── AI Projects ──────────────────────────────────────────────────────────────
class AIProjectBase(BaseModel):
    title: str
    slug: str
    summary: Optional[str] = None
    description: Optional[str] = None
    tools: Optional[str] = None
    architecture: Optional[str] = None
    github_url: Optional[str] = None
    demo_url: Optional[str] = None
    image_url: Optional[str] = None
    category: Optional[str] = None

class AIProjectCreate(AIProjectBase):
    pass

class AIProjectOut(AIProjectBase):
    id: int
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True


# ─── Contact ──────────────────────────────────────────────────────────────────
class ContactMessageCreate(BaseModel):
    name: str
    email: str
    subject: Optional[str] = None
    message: str

class ContactMessageOut(ContactMessageCreate):
    id: int
    is_read: bool
    created_at: Optional[datetime] = None
    class Config:
        from_attributes = True


# ─── Site Settings ────────────────────────────────────────────────────────────
class SiteSettingOut(BaseModel):
    key: str
    value: Optional[str] = None
    class Config:
        from_attributes = True


# ─── Dashboard Stats ──────────────────────────────────────────────────────────
class DashboardStats(BaseModel):
    total_projects: int
    total_skills: int
    total_blogs: int
    total_case_studies: int
    total_messages: int
    unread_messages: int
    total_ai_projects: int
