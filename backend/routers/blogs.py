from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
from auth import get_current_admin
from typing import List

router = APIRouter(prefix="/api", tags=["Blog"])


@router.get("/blogs", response_model=List[schemas.BlogOut])
def get_blogs(db: Session = Depends(get_db)):
    return db.query(models.Blog).filter(models.Blog.is_published == True)\
        .order_by(models.Blog.published_at.desc()).all()


@router.get("/blogs/{slug}", response_model=schemas.BlogOut)
def get_blog(slug: str, db: Session = Depends(get_db)):
    blog = db.query(models.Blog).filter(models.Blog.slug == slug).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    return blog


@router.get("/admin/blogs", response_model=List[schemas.BlogOut])
def get_all_blogs_admin(
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    return db.query(models.Blog).order_by(models.Blog.published_at.desc()).all()


@router.post("/admin/blogs", response_model=schemas.BlogOut)
def create_blog(
    data: schemas.BlogCreate,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    existing = db.query(models.Blog).filter(models.Blog.slug == data.slug).first()
    if existing:
        raise HTTPException(status_code=400, detail="Slug already exists")
    blog = models.Blog(**data.dict())
    db.add(blog)
    db.commit()
    db.refresh(blog)
    return blog


@router.put("/admin/blogs/{blog_id}", response_model=schemas.BlogOut)
def update_blog(
    blog_id: int,
    data: schemas.BlogCreate,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    blog = db.query(models.Blog).filter(models.Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    for field, value in data.dict().items():
        setattr(blog, field, value)
    db.commit()
    db.refresh(blog)
    return blog


@router.delete("/admin/blogs/{blog_id}")
def delete_blog(
    blog_id: int,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    blog = db.query(models.Blog).filter(models.Blog.id == blog_id).first()
    if not blog:
        raise HTTPException(status_code=404, detail="Blog not found")
    db.delete(blog)
    db.commit()
    return {"message": "Blog deleted"}
