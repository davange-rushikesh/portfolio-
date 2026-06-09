from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
from auth import get_current_admin
from typing import List, Dict

router = APIRouter(prefix="/api", tags=["Skills"])


@router.get("/skills", response_model=List[schemas.SkillOut])
def get_skills(db: Session = Depends(get_db)):
    return db.query(models.Skill).order_by(models.Skill.sort_order, models.Skill.category).all()


@router.get("/skills/grouped")
def get_skills_grouped(db: Session = Depends(get_db)):
    skills = db.query(models.Skill).order_by(models.Skill.sort_order).all()
    grouped: Dict[str, list] = {}
    for skill in skills:
        cat = skill.category or "Other"
        if cat not in grouped:
            grouped[cat] = []
        grouped[cat].append({
            "id": skill.id,
            "name": skill.name,
            "level": skill.level,
            "icon": skill.icon
        })
    return grouped


@router.post("/admin/skills", response_model=schemas.SkillOut)
def create_skill(
    data: schemas.SkillCreate,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    skill = models.Skill(**data.dict())
    db.add(skill)
    db.commit()
    db.refresh(skill)
    return skill


@router.put("/admin/skills/{skill_id}", response_model=schemas.SkillOut)
def update_skill(
    skill_id: int,
    data: schemas.SkillCreate,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    skill = db.query(models.Skill).filter(models.Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    for field, value in data.dict().items():
        setattr(skill, field, value)
    db.commit()
    db.refresh(skill)
    return skill


@router.delete("/admin/skills/{skill_id}")
def delete_skill(
    skill_id: int,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    skill = db.query(models.Skill).filter(models.Skill.id == skill_id).first()
    if not skill:
        raise HTTPException(status_code=404, detail="Skill not found")
    db.delete(skill)
    db.commit()
    return {"message": "Skill deleted"}
