from typing import List
from fastapi import HTTPException, status
from app.domains.outfits.repository import OutfitRepository
from app.domains.outfits.schemas import OutfitCreate
from app.domains.outfits.models import Outfit

class OutfitService:
    def __init__(self, repo: OutfitRepository):
        self.repo = repo

    def list_outfits(self, user_id: str) -> List[Outfit]:
        return self.repo.get_user_outfits(user_id)

    def create_outfit(self, user_id: str, outfit_in: OutfitCreate) -> Outfit:
        return self.repo.create(user_id, outfit_in)

    def delete_outfit(self, user_id: str, outfit_id: str) -> None:
        outfit = self.repo.get_by_id(outfit_id, user_id)
        if not outfit:
            raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Outfit not found")
        self.repo.delete(outfit)
