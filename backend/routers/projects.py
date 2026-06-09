from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
from auth import get_current_admin
from typing import List

router = APIRouter(prefix="/api", tags=["Projects"])


@router.get("/projects", response_model=List[schemas.ProjectOut])
def get_projects(featured: bool = None, category: str = None, db: Session = Depends(get_db)):
    query = db.query(models.Project)
    if featured is not None:
        query = query.filter(models.Project.is_featured == featured)
    if category:
        query = query.filter(models.Project.category == category)
    return query.order_by(models.Project.sort_order, models.Project.created_at.desc()).all()


@router.get("/projects/{slug}", response_model=schemas.ProjectOut)
def get_project(slug: str, db: Session = Depends(get_db)):
    project = db.query(models.Project).filter(models.Project.slug == slug).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    return project


@router.post("/admin/projects", response_model=schemas.ProjectOut)
def create_project(
    data: schemas.ProjectCreate,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    existing = db.query(models.Project).filter(models.Project.slug == data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    project = models.Project(**data.dict())
    db.add(project)
    db.commit()
    db.refresh(project)
    return project


@router.put("/admin/projects/{project_id}", response_model=schemas.ProjectOut)
def update_project(
    project_id: int,
    data: schemas.ProjectUpdate,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    for field, value in data.dict().items():
        setattr(project, field, value)
    db.commit()
    db.refresh(project)
    return project


@router.delete("/admin/projects/{project_id}")
def delete_project(
    project_id: int,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    project = db.query(models.Project).filter(models.Project.id == project_id).first()
    if not project:
        raise HTTPException(status_code=404, detail="Project not found")
    db.delete(project)
    db.commit()
    return {"message": "Project deleted successfully"}
