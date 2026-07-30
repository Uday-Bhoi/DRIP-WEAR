from typing import List, Optional
from fastapi import HTTPException, status
from app.domains.wardrobe.repository import WardrobeRepository
from app.domains.wardrobe.schemas import WardrobeItemCreate, WardrobeItemUpdate
from app.domains.wardrobe.models import WardrobeItem

class WardrobeService:
    def __init__(self, wardrobe_repo: WardrobeRepository):
        self.wardrobe_repo = wardrobe_repo

    def list_items(
        self,
        user_id: str,
        category: Optional[str] = None,
        laundry_status: Optional[str] = None
    ) -> List[WardrobeItem]:
        return self.wardrobe_repo.get_user_items(user_id, category, laundry_status)

    def add_item(self, user_id: str, item_in: WardrobeItemCreate) -> WardrobeItem:
        return self.wardrobe_repo.create(user_id, item_in)

    def update_item(self, user_id: str, item_id: str, item_update: WardrobeItemUpdate) -> WardrobeItem:
        item = self.wardrobe_repo.get_by_id(item_id, user_id)
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Wardrobe item not found")
        return self.wardrobe_repo.update(item, item_update)

    def delete_item(self, user_id: str, item_id: str) -> None:
        item = self.wardrobe_repo.get_by_id(item_id, user_id)
        if not item:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Wardrobe item not found")
        self.wardrobe_repo.delete(item)
