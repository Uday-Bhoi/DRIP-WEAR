from fastapi import APIRouter, Depends
from pydantic import BaseModel
from typing import Optional, List
from app.core.dependencies import get_current_user
from app.domains.auth.models import User

router = APIRouter(prefix="/ai", tags=["AI Vision Pipeline"])

class TagGarmentRequestDTO(BaseModel):
    image_url: str

class TagGarmentResponseDTO(BaseModel):
    category: str
    sub_category: str
    suggested_name: str
    detected_colors: List[str]
    fit: str
    season: str
    occasion: str

@router.post("/tag-garment", response_model=TagGarmentResponseDTO)
def tag_garment(
    req: TagGarmentRequestDTO,
    current_user: User = Depends(get_current_user)
):
    return TagGarmentResponseDTO(
        category="Tops",
        sub_category="Heavyweight Hoodie",
        suggested_name="Oversized Streetwear Hoodie",
        detected_colors=["#D92243", "#1E293B"],
        fit="Oversized",
        season="Winter/Fall",
        occasion="Casual"
    )
