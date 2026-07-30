from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from jose import jwt, JWTError
from sqlalchemy.orm import Session
from app.core.db import get_db
from app.core.config import settings
from app.domains.auth.repository import UserRepository
from app.domains.auth.services import AuthService
from app.domains.auth.models import User

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/auth/login")

def get_user_repository(db: Session = Depends(get_db)) -> UserRepository:
    return UserRepository(db)

def get_auth_service(user_repo: UserRepository = Depends(get_user_repository)) -> AuthService:
    return AuthService(user_repo)

def get_current_user(
    token: str = Depends(oauth2_scheme),
    user_repo: UserRepository = Depends(get_user_repository)
) -> User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        payload = jwt.decode(token, settings.JWT_SECRET_KEY, algorithms=[settings.ALGORITHM])
        user_id: str = payload.get("sub")
        if user_id is None:
            raise credentials_exception
    except JWTError:
        raise credentials_exception

    user = user_repo.get_by_id(user_id)
    if user is None:
        raise credentials_exception
    return user
