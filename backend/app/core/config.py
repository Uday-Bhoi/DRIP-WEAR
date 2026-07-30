import os
from pydantic_settings import BaseSettings, SettingsConfigDict
from typing import Optional

# BASE_DIR is the root of backend folder (d:\Antigravity Vibe Code\dripwear\backend)
BASE_DIR = os.path.dirname(os.path.dirname(os.path.dirname(os.path.abspath(__file__))))
UPLOAD_DIR = os.path.join(BASE_DIR, "uploads")

class Settings(BaseSettings):
    PROJECT_NAME: str = "DripWear API"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"

    # Database: PostgreSQL by default
    DATABASE_URL: str = "postgresql://postgres:password@localhost:5432/dripwear"

    # JWT
    JWT_SECRET_KEY: str = "super_secret_dripwear_jwt_key_change_in_production_2026"
    JWT_REFRESH_SECRET_KEY: str = "super_secret_dripwear_refresh_key_change_in_production_2026"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 60 * 24 * 30  # 30 Days persistent session
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30

    # Cloudinary
    CLOUDINARY_CLOUD_NAME: Optional[str] = None
    CLOUDINARY_API_KEY: Optional[str] = None
    CLOUDINARY_API_SECRET: Optional[str] = None

    # Redis & Celery
    REDIS_URL: str = "redis://localhost:6379/0"

    # AI Keys
    GEMINI_API_KEY: Optional[str] = None

    model_config = SettingsConfigDict(env_file=".env", env_file_encoding="utf-8", extra="ignore")

settings = Settings()
