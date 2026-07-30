from fastapi import APIRouter, Depends, Query, Response, status
from typing import List, Optional
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.core.dependencies import get_current_user
from app.domains.auth.models import User
from app.domains.wardrobe.schemas import WardrobeItemCreate, WardrobeItemResponse, WardrobeItemUpdate
from app.domains.wardrobe.repository import WardrobeRepository
from app.domains.wardrobe.services import WardrobeService

router = APIRouter(prefix="/wardrobe", tags=["Wardrobe Management"])

def get_wardrobe_service(db: Session = Depends(get_db)) -> WardrobeService:
    repo = WardrobeRepository(db)
    return WardrobeService(repo)

@router.get("/items", response_model=List[WardrobeItemResponse])
def get_wardrobe_items(
    category: Optional[str] = Query(None),
    laundry_status: Optional[str] = Query(None),
    current_user: User = Depends(get_current_user),
    wardrobe_service: WardrobeService = Depends(get_wardrobe_service)
):
    return wardrobe_service.list_items(current_user.id, category, laundry_status)

@router.post("/items", response_model=WardrobeItemResponse)
def create_wardrobe_item(
    item_in: WardrobeItemCreate,
    current_user: User = Depends(get_current_user),
    wardrobe_service: WardrobeService = Depends(get_wardrobe_service)
):
    return wardrobe_service.add_item(current_user.id, item_in)

@router.patch("/items/{item_id}", response_model=WardrobeItemResponse)
def update_wardrobe_item(
    item_id: str,
    item_update: WardrobeItemUpdate,
    current_user: User = Depends(get_current_user),
    wardrobe_service: WardrobeService = Depends(get_wardrobe_service)
):
    return wardrobe_service.update_item(current_user.id, item_id, item_update)

@router.delete("/items/{item_id}", status_code=status.HTTP_204_NO_CONTENT)
def delete_wardrobe_item(
    item_id: str,
    current_user: User = Depends(get_current_user),
    wardrobe_service: WardrobeService = Depends(get_wardrobe_service)
):
    wardrobe_service.delete_item(current_user.id, item_id)
    return Response(status_code=status.HTTP_204_NO_CONTENT)
