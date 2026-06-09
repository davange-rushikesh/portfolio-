from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
from auth import get_current_admin
from typing import List

router = APIRouter(prefix="/api", tags=["Profile"])


@router.get("/profile", response_model=schemas.ProfileOut)
def get_profile(db: Session = Depends(get_db)):
    profile = db.query(models.Profile).first()
    if not profile:
        raise HTTPException(status_code=404, detail="Profile not found")
    return profile


@router.put("/admin/profile", response_model=schemas.ProfileOut)
def update_profile(
    data: schemas.ProfileUpdate,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    profile = db.query(models.Profile).first()
    if not profile:
        profile = models.Profile()
        db.add(profile)

    for field, value in data.dict(exclude={"social_links"}).items():
        if value is not None:
            setattr(profile, field, value)

    if data.social_links is not None:
        db.query(models.SocialLink).filter(
            models.SocialLink.profile_id == profile.id
        ).delete()
        for link in data.social_links:
            db.add(models.SocialLink(
                profile_id=profile.id,
                platform=link.platform,
                url=link.url,
                icon=link.icon
            ))

    db.commit()
    db.refresh(profile)
    return profile
