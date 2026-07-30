import uuid
from sqlalchemy import Column, String, DateTime, Boolean, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.db import Base

class User(Base):
    __tablename__ = "users"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    email = Column(String, unique=True, index=True, nullable=False)
    hashed_password = Column(String, nullable=False)
    full_name = Column(String, nullable=True)
    is_active = Column(Boolean, default=True)
    is_superuser = Column(Boolean, default=False)
    
    # User Preferences & Style DNA
    style_dna = Column(JSON, default=dict)
    body_measurements = Column(JSON, default=dict)
    
    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    wardrobe_items = relationship("WardrobeItem", back_populates="owner", cascade="all, delete-orphan")
