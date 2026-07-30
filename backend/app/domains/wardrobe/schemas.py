from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime

class WardrobeItemCreate(BaseModel):
    name: str
    category: str
    sub_category: Optional[str] = None
    brand: Optional[str] = None
    original_image_url: str
    colors: Optional[List[str]] = []
    season: Optional[str] = "All-Season"
    occasion: Optional[str] = "Casual"
    fit: Optional[str] = "Regular"
    purchase_price: Optional[float] = 0.0

class WardrobeItemUpdate(BaseModel):
    name: Optional[str] = None
    category: Optional[str] = None
    sub_category: Optional[str] = None
    brand: Optional[str] = None
    original_image_url: Optional[str] = None
    laundry_status: Optional[str] = None
    purchase_price: Optional[float] = None
    wear_count: Optional[int] = None
    colors: Optional[List[str]] = None
    season: Optional[str] = None
    occasion: Optional[str] = None
    fit: Optional[str] = None

class WardrobeItemResponse(BaseModel):
    id: str
    user_id: str
    name: str
    category: str
    sub_category: Optional[str] = None
    brand: Optional[str] = None
    original_image_url: str
    processed_image_url: Optional[str] = None
    colors: List[str] = []
    season: Optional[str] = None
    occasion: Optional[str] = None
    fit: Optional[str] = None
    laundry_status: str
    purchase_price: float
    wear_count: int
    last_worn_at: Optional[datetime] = None
    created_at: datetime

    class Config:
        from_attributes = True
