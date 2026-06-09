from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
import models, schemas
from auth import verify_password, create_access_token, get_password_hash, get_current_admin
from datetime import timedelta
import os

router = APIRouter(prefix="/api/auth", tags=["Auth"])


@router.post("/login", response_model=schemas.Token)
def login(credentials: schemas.LoginRequest, db: Session = Depends(get_db)):
    admin = db.query(models.AdminUser).filter(
        models.AdminUser.username == credentials.username
    ).first()

    if not admin or not verify_password(credentials.password, admin.hashed_password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Incorrect username or password"
        )

    token = create_access_token(
        data={"sub": admin.username},
        expires_delta=timedelta(minutes=60)
    )
    return {"access_token": token, "token_type": "bearer"}


@router.get("/me")
def get_me(current_admin=Depends(get_current_admin)):
    return {"username": current_admin.username, "email": current_admin.email}


@router.put("/change-password")
def change_password(
    old_password: str,
    new_password: str,
    current_admin=Depends(get_current_admin),
    db: Session = Depends(get_db)
):
    if not verify_password(old_password, current_admin.hashed_password):
        raise HTTPException(status_code=400, detail="Old password is incorrect")
    current_admin.hashed_password = get_password_hash(new_password)
    db.commit()
    return {"message": "Password updated successfully"}
