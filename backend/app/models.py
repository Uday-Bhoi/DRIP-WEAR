from sqlalchemy import Column, Integer, String, Float, DateTime, ForeignKey, Enum as SQLEnum
from sqlalchemy.orm import relationship
from datetime import datetime
import enum
from app.core.db import Base

class GarmentCategory(str, enum.Enum):
    TOPS = "Tops"
    BOTTOMS = "Bottoms"
    FOOTWEAR = "Footwear"
    OUTERWEAR = "Outerwear"

class GarmentStatus(str, enum.Enum):
    CLEAN = "clean"
    LAUNDRY = "laundry"

class User(Base):
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    firebase_uid = Column(String, unique=True, index=True, nullable=False)
    name = Column(String, nullable=False)
    email = Column(String, unique=True, index=True, nullable=False)
    avatar_url = Column(String, nullable=True)
    style_dna = Column(String, default="Streetwear Minimal")
    created_at = Column(DateTime, default=datetime.utcnow)

    items = relationship("WardrobeItem", back_populates="owner", cascade="all, delete-orphan")
    outfits = relationship("SavedOutfit", back_populates="owner", cascade="all, delete-orphan")

class WardrobeItem(Base):
    __tablename__ = "wardrobe_items"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    category = Column(SQLEnum(GarmentCategory), nullable=False)
    image_url = Column(String, nullable=False)
    price = Column(Float, default=0.0)
    wear_count = Column(Integer, default=0)
    color = Column(String, default="Black")
    status = Column(SQLEnum(GarmentStatus), default=GarmentStatus.CLEAN)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="items")

class SavedOutfit(Base):
    __tablename__ = "saved_outfits"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    name = Column(String, nullable=False)
    top_id = Column(Integer, ForeignKey("wardrobe_items.id"), nullable=True)
    bottom_id = Column(Integer, ForeignKey("wardrobe_items.id"), nullable=True)
    footwear_id = Column(Integer, ForeignKey("wardrobe_items.id"), nullable=True)
    ai_match_score = Column(Integer, default=95)
    created_at = Column(DateTime, default=datetime.utcnow)

    owner = relationship("User", back_populates="outfits")
