from sqlalchemy.orm import Session
from typing import List, Optional
from app.domains.wardrobe.models import WardrobeItem
from app.domains.wardrobe.schemas import WardrobeItemCreate, WardrobeItemUpdate

class WardrobeRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, item_id: str, user_id: str) -> Optional[WardrobeItem]:
        return self.db.query(WardrobeItem).filter(
            WardrobeItem.id == item_id,
            WardrobeItem.user_id == user_id
        ).first()

    def get_user_items(
        self,
        user_id: str,
        category: Optional[str] = None,
        laundry_status: Optional[str] = None
    ) -> List[WardrobeItem]:
        query = self.db.query(WardrobeItem).filter(WardrobeItem.user_id == user_id)
        if category:
            query = query.filter(WardrobeItem.category == category)
        if laundry_status:
            query = query.filter(WardrobeItem.laundry_status == laundry_status)
        return query.order_by(WardrobeItem.created_at.desc()).all()

    def create(self, user_id: str, item_in: WardrobeItemCreate) -> WardrobeItem:
        db_item = WardrobeItem(
            user_id=user_id,
            name=item_in.name,
            category=item_in.category,
            sub_category=item_in.sub_category,
            brand=item_in.brand,
            original_image_url=item_in.original_image_url,
            colors=item_in.colors or [],
            season=item_in.season,
            occasion=item_in.occasion,
            fit=item_in.fit,
            purchase_price=item_in.purchase_price or 0.0
        )
        self.db.add(db_item)
        self.db.commit()
        self.db.refresh(db_item)
        return db_item

    def update(self, item: WardrobeItem, item_update: WardrobeItemUpdate) -> WardrobeItem:
        update_data = item_update.model_dump(exclude_unset=True)
        for key, value in update_data.items():
            setattr(item, key, value)
        self.db.commit()
        self.db.refresh(item)
        return item

    def delete(self, item: WardrobeItem) -> None:
        self.db.delete(item)
        self.db.commit()
