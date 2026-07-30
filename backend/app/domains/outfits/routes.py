from fastapi import APIRouter, Depends, Response, status
from typing import List
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.core.dependencies import get_current_user
from app.domains.auth.models import User
from app.domains.outfits.schemas import OutfitCreate, OutfitResponse
from app.domains.outfits.repository import OutfitRepository
from app.domains.outfits.services import OutfitService

router = APIRouter(prefix="/outfits", tags=["Outfit Builder"])

def get_outfit_service(db: Session = Depends(get_db)) -> OutfitService:
    repo = OutfitRepository(db)
    return OutfitService(repo)

@router.get("", response_model=List[OutfitResponse])
def get_outfits(
    current_user: User = Depends(get_current_user),
    outfit_service: OutfitService = Depends(get_outfit_service)
):
    return outfit_service.list_outfits(current_user.id)

@router.post("", response_model=OutfitResponse)
def create_outfit(
    outfit_in: OutfitCreate,
    current_user: User = Depends(get_current_user),
    outfit_service: OutfitService = Depends(get_outfit_service)
):
    return outfit_service.create_outfit(current_user.id, outfit_in)

@router.delete("/{outfit_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_outfit(
    outfit_id: str,
    current_user: User = Depends(get_current_user),
    outfit_service: OutfitService = Depends(get_outfit_service)
):
    outfit_service.delete_outfit(current_user.id, outfit_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
