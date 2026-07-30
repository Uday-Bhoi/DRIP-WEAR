import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey, Integer, Float, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.db import Base

class WardrobeItem(Base):
    __tablename__ = "wardrobe_items"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    
    name = Column(String, nullable=False)
    category = Column(String, nullable=False, index=True) # e.g. Shirts, T-Shirts, Jeans, Shoes
    sub_category = Column(String, nullable=True)
    brand = Column(String, nullable=True)
    
    # Image Storage URLs
    original_image_url = Column(String, nullable=False)
    processed_image_url = Column(String, nullable=True) # Background removed / cropped
    
    # Attributes & Palette
    colors = Column(JSON, default=list) # List of dominant hex/color names
    season = Column(String, nullable=True) # Summer, Winter, All-Season
    occasion = Column(String, nullable=True) # Formal, Casual, Party, Gym
    fit = Column(String, nullable=True) # Oversized, Slim, Regular
    
    # Tracking & Metrics
    laundry_status = Column(String, default="clean") # clean, dirty, laundry
    purchase_price = Column(Float, default=0.0)
    wear_count = Column(Integer, default=0)
    last_worn_at = Column(DateTime(timezone=True), nullable=True)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    owner = relationship("User", back_populates="wardrobe_items")
