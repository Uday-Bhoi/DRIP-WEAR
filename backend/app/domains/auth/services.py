from fastapi import HTTPException, status
from app.domains.auth.repository import UserRepository
from app.domains.auth.schemas import UserCreate, Token, AuthSyncRequest, AuthSyncResponse, UserResponse
from app.core.security import verify_password, create_access_token, create_refresh_token

class AuthService:
    def __init__(self, user_repo: UserRepository):
        self.user_repo = user_repo

    def register_user(self, user_in: UserCreate):
        existing_user = self.user_repo.get_by_email(user_in.email)
        if existing_user:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="User with this email already exists."
            )
        return self.user_repo.create(user_in)

    def authenticate_user(self, email: str, password: str) -> Token:
        user = self.user_repo.get_by_email(email)
        if not user or not verify_password(password, user.hashed_password):
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Incorrect email or password."
            )
        
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)
        return Token(access_token=access_token, refresh_token=refresh_token)

    def sync_firebase_user(self, sync_req: AuthSyncRequest) -> AuthSyncResponse:
        user = self.user_repo.get_or_create_firebase_user(sync_req)
        access_token = create_access_token(user.id)
        refresh_token = create_refresh_token(user.id)

        return AuthSyncResponse(
            user=UserResponse.model_validate(user),
            token=Token(access_token=access_token, refresh_token=refresh_token)
        )
