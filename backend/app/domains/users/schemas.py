from pydantic import BaseModel
from typing import Optional, Dict, Any

class UserUpdateDTO(BaseModel):
    full_name: Optional[str] = None
    style_dna: Optional[Dict[str, Any]] = None
    body_measurements: Optional[Dict[str, Any]] = None

class UserProfileResponse(BaseModel):
    id: str
    email: str
    full_name: Optional[str] = None
    style_dna: Optional[Dict[str, Any]] = {}
    body_measurements: Optional[Dict[str, Any]] = {}

    class Config:
        from_attributes = True
