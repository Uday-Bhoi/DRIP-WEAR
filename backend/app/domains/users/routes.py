from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.core.dependencies import get_current_user
from app.domains.auth.models import User
from app.domains.users.schemas import UserUpdateDTO, UserProfileResponse

router = APIRouter(prefix="/users", tags=["User Profile"])

@router.get("/me", response_model=UserProfileResponse)
def get_user_profile(current_user: User = Depends(get_current_user)):
    return current_user

@router.patch("/me", response_model=UserProfileResponse)
def update_user_profile(
    user_update: UserUpdateDTO,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    if user_update.full_name is not None:
        current_user.full_name = user_update.full_name
    if user_update.style_dna is not None:
        current_user.style_dna = user_update.style_dna
    if user_update.body_measurements is not None:
        current_user.body_measurements = user_update.body_measurements

    db.commit()
    db.refresh(current_user)
    return current_user
