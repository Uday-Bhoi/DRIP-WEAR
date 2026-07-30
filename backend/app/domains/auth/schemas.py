from pydantic import BaseModel, EmailStr
from typing import Optional, Dict, Any

class UserCreate(BaseModel):
    email: EmailStr
    password: str
    full_name: Optional[str] = None

class AuthSyncRequest(BaseModel):
    firebase_uid: str
    email: EmailStr
    full_name: Optional[str] = None

class UserResponse(BaseModel):
    id: str
    email: EmailStr
    full_name: Optional[str] = None
    style_dna: Optional[Dict[str, Any]] = {}
    
    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    refresh_token: str
    token_type: str = "bearer"

class AuthSyncResponse(BaseModel):
    user: UserResponse
    token: Token

class TokenPayload(BaseModel):
    sub: Optional[str] = None
    type: Optional[str] = None
