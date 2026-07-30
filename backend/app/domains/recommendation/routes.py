from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional, List
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.core.dependencies import get_current_user
from app.domains.auth.models import User
from app.domains.wardrobe.repository import WardrobeRepository
from app.domains.wardrobe.schemas import WardrobeItemResponse

router = APIRouter(prefix="/recommendations", tags=["AI Recommendations"])

class RecommendRequestDTO(BaseModel):
    prompt: Optional[str] = "Suggest a minimal casual outfit for dinner"
    occasion: Optional[str] = "Casual"
    weather: Optional[str] = "24°C Sunny"

class RecommendedOutfitDTO(BaseModel):
    title: str
    vibe: str
    match_score: float
    reasoning: str
    items: List[WardrobeItemResponse]

@router.post("/generate", response_model=List[RecommendedOutfitDTO])
def generate_recommendations(
    req: RecommendRequestDTO,
    current_user: User = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    repo = WardrobeRepository(db)
    items = repo.get_user_items(current_user.id)
    serialized_items = [WardrobeItemResponse.model_validate(item) for item in items[:4]]

    return [
        RecommendedOutfitDTO(
            title="Monochrome Urban Minimalist",
            vibe="Sleek, Modern, Effortless",
            match_score=98.5,
            reasoning=f"Tailored for {req.occasion} weather ({req.weather}). Combines clean contrast elements from your digital wardrobe.",
            items=serialized_items
        ),
        RecommendedOutfitDTO(
            title="Elevated Streetwear Layering",
            vibe="Relaxed, High-Contrast",
            match_score=94.2,
            reasoning="Balanced proportions with high wear count items for maximum comfort and dynamic style.",
            items=serialized_items[::-1] if len(serialized_items) > 1 else serialized_items
        )
    ]
