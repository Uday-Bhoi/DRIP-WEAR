from sqlalchemy.orm import Session
from typing import List, Optional
from app.domains.outfits.models import Outfit
from app.domains.outfits.schemas import OutfitCreate
from app.domains.wardrobe.models import WardrobeItem

class OutfitRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, outfit_id: str, user_id: str) -> Optional[Outfit]:
        return self.db.query(Outfit).filter(
            Outfit.id == outfit_id,
            Outfit.user_id == user_id
        ).first()

    def get_user_outfits(self, user_id: str) -> List[Outfit]:
        return self.db.query(Outfit).filter(Outfit.user_id == user_id).order_by(Outfit.created_at.desc()).all()

    def create(self, user_id: str, outfit_in: OutfitCreate) -> Outfit:
        items = self.db.query(WardrobeItem).filter(
            WardrobeItem.id.in_(outfit_in.item_ids),
            WardrobeItem.user_id == user_id
        ).all()

        db_outfit = Outfit(
            user_id=user_id,
            name=outfit_in.name,
            description=outfit_in.description,
            occasion=outfit_in.occasion,
            season=outfit_in.season,
            vibe_score=outfit_in.vibe_score or 95.0,
            canvas_layout=outfit_in.canvas_layout or {},
            items=items
        )
        self.db.add(db_outfit)
        self.db.commit()
        self.db.refresh(db_outfit)
        return db_outfit

    def delete(self, outfit: Outfit) -> None:
        self.db.delete(outfit)
        self.db.commit()
