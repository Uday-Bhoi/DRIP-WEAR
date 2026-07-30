from fastapi import APIRouter, Depends
from fastapi.security import OAuth2PasswordRequestForm
from app.domains.auth.schemas import UserCreate, UserResponse, Token, AuthSyncRequest, AuthSyncResponse
from app.domains.auth.services import AuthService
from app.domains.auth.models import User
from app.core.dependencies import get_auth_service, get_current_user

router = APIRouter(prefix="/auth", tags=["Authentication"])

@router.post("/register", response_model=UserResponse)
def register(user_in: UserCreate, auth_service: AuthService = Depends(get_auth_service)):
    return auth_service.register_user(user_in)

@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    auth_service: AuthService = Depends(get_auth_service)
):
    return auth_service.authenticate_user(form_data.username, form_data.password)

@router.post("/sync", response_model=AuthSyncResponse)
def sync_user(
    sync_req: AuthSyncRequest,
    auth_service: AuthService = Depends(get_auth_service)
):
    return auth_service.sync_firebase_user(sync_req)

@router.get("/me", response_model=UserResponse)
def get_me(current_user: User = Depends(get_current_user)):
    return current_user
