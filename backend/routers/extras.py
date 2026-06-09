from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
from auth import get_current_admin
from typing import List

router = APIRouter(prefix="/api", tags=["Contact"])


@router.post("/contact", response_model=schemas.ContactMessageOut)
def submit_contact(data: schemas.ContactMessageCreate, db: Session = Depends(get_db)):
    message = models.ContactMessage(**data.dict())
    db.add(message)
    db.commit()
    db.refresh(message)
    return message


@router.get("/admin/messages", response_model=List[schemas.ContactMessageOut])
def get_messages(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    return db.query(models.ContactMessage)\
        .order_by(models.ContactMessage.created_at.desc()).all()


@router.put("/admin/messages/{msg_id}/read")
def mark_read(
    msg_id: int,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    msg = db.query(models.ContactMessage).filter(models.ContactMessage.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    msg.is_read = True
    db.commit()
    return {"message": "Marked as read"}


@router.delete("/admin/messages/{msg_id}")
def delete_message(
    msg_id: int,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    msg = db.query(models.ContactMessage).filter(models.ContactMessage.id == msg_id).first()
    if not msg:
        raise HTTPException(status_code=404, detail="Message not found")
    db.delete(msg)
    db.commit()
    return {"message": "Deleted"}


# ─── Case Studies ─────────────────────────────────────────────────────────────
from fastapi import APIRouter as _R
case_router = APIRouter(prefix="/api", tags=["Case Studies"])


@case_router.get("/case-studies", response_model=List[schemas.CaseStudyOut])
def get_case_studies(db: Session = Depends(get_db)):
    return db.query(models.CaseStudy).order_by(models.CaseStudy.created_at.desc()).all()


@case_router.get("/case-studies/{slug}", response_model=schemas.CaseStudyOut)
def get_case_study(slug: str, db: Session = Depends(get_db)):
    cs = db.query(models.CaseStudy).filter(models.CaseStudy.slug == slug).first()
    if not cs:
        raise HTTPException(status_code=404, detail="Case study not found")
    return cs


@case_router.post("/admin/case-studies", response_model=schemas.CaseStudyOut)
def create_case_study(
    data: schemas.CaseStudyCreate,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    cs = models.CaseStudy(**data.dict())
    db.add(cs)
    db.commit()
    db.refresh(cs)
    return cs


@case_router.put("/admin/case-studies/{cs_id}", response_model=schemas.CaseStudyOut)
def update_case_study(
    cs_id: int,
    data: schemas.CaseStudyCreate,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    cs = db.query(models.CaseStudy).filter(models.CaseStudy.id == cs_id).first()
    if not cs:
        raise HTTPException(status_code=404, detail="Not found")
    for field, value in data.dict().items():
        setattr(cs, field, value)
    db.commit()
    db.refresh(cs)
    return cs


@case_router.delete("/admin/case-studies/{cs_id}")
def delete_case_study(
    cs_id: int,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    cs = db.query(models.CaseStudy).filter(models.CaseStudy.id == cs_id).first()
    if not cs:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(cs)
    db.commit()
    return {"message": "Deleted"}


# ─── AI Projects ───────────────────────────────────────────────────────────────
ai_router = APIRouter(prefix="/api", tags=["AI Projects"])


@ai_router.get("/ai-projects", response_model=List[schemas.AIProjectOut])
def get_ai_projects(db: Session = Depends(get_db)):
    return db.query(models.AIProject).order_by(models.AIProject.created_at.desc()).all()


@ai_router.post("/admin/ai-projects", response_model=schemas.AIProjectOut)
def create_ai_project(
    data: schemas.AIProjectCreate,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    proj = models.AIProject(**data.dict())
    db.add(proj)
    db.commit()
    db.refresh(proj)
    return proj


@ai_router.put("/admin/ai-projects/{proj_id}", response_model=schemas.AIProjectOut)
def update_ai_project(
    proj_id: int,
    data: schemas.AIProjectCreate,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    proj = db.query(models.AIProject).filter(models.AIProject.id == proj_id).first()
    if not proj:
        raise HTTPException(status_code=404, detail="Not found")
    for field, value in data.dict().items():
        setattr(proj, field, value)
    db.commit()
    db.refresh(proj)
    return proj


@ai_router.delete("/admin/ai-projects/{proj_id}")
def delete_ai_project(
    proj_id: int,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    proj = db.query(models.AIProject).filter(models.AIProject.id == proj_id).first()
    if not proj:
        raise HTTPException(status_code=404, detail="Not found")
    db.delete(proj)
    db.commit()
    return {"message": "Deleted"}


# ─── Dashboard Stats ──────────────────────────────────────────────────────────
stats_router = APIRouter(prefix="/api", tags=["Dashboard"])


@stats_router.get("/admin/stats", response_model=schemas.DashboardStats)
def get_stats(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    return schemas.DashboardStats(
        total_projects=db.query(models.Project).count(),
        total_skills=db.query(models.Skill).count(),
        total_blogs=db.query(models.Blog).count(),
        total_case_studies=db.query(models.CaseStudy).count(),
        total_messages=db.query(models.ContactMessage).count(),
        unread_messages=db.query(models.ContactMessage).filter(
            models.ContactMessage.is_read == False
        ).count(),
        total_ai_projects=db.query(models.AIProject).count(),
    )
