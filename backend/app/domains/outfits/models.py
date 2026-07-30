import uuid
from sqlalchemy import Column, String, DateTime, ForeignKey, Float, Table, JSON
from sqlalchemy.orm import relationship
from datetime import datetime, timezone
from app.core.db import Base

outfit_items_table = Table(
    "outfit_items",
    Base.metadata,
    Column("outfit_id", String, ForeignKey("outfits.id", ondelete="CASCADE"), primary_key=True),
    Column("item_id", String, ForeignKey("wardrobe_items.id", ondelete="CASCADE"), primary_key=True)
)

class Outfit(Base):
    __tablename__ = "outfits"

    id = Column(String, primary_key=True, default=lambda: str(uuid.uuid4()))
    user_id = Column(String, ForeignKey("users.id"), nullable=False, index=True)
    name = Column(String, nullable=False)
    description = Column(String, nullable=True)
    occasion = Column(String, nullable=True, default="Casual")
    season = Column(String, nullable=True, default="All-Season")
    vibe_score = Column(Float, default=95.0)
    canvas_layout = Column(JSON, default=dict) # Stores x, y, scale positions of items on canvas

    created_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc))
    updated_at = Column(DateTime(timezone=True), default=lambda: datetime.now(timezone.utc), onupdate=lambda: datetime.now(timezone.utc))

    owner = relationship("User")
    items = relationship("WardrobeItem", secondary=outfit_items_table)
