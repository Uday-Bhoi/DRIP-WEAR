from pydantic import BaseModel
from typing import Optional, List, Dict, Any
from datetime import datetime
from app.domains.wardrobe.schemas import WardrobeItemResponse

class OutfitCreate(BaseModel):
    name: str
    description: Optional[str] = None
    occasion: Optional[str] = "Casual"
    season: Optional[str] = "All-Season"
    vibe_score: Optional[float] = 95.0
    item_ids: List[str]
    canvas_layout: Optional[Dict[str, Any]] = {}

class OutfitResponse(BaseModel):
    id: str
    user_id: str
    name: str
    description: Optional[str] = None
    occasion: Optional[str] = None
    season: Optional[str] = None
    vibe_score: float
    items: List[WardrobeItemResponse] = []
    canvas_layout: Optional[Dict[str, Any]] = {}
    created_at: datetime

    class Config:
        from_attributes = True
