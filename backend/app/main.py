import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.core.config import settings, UPLOAD_DIR
from app.core.db import engine, Base

# Import all SQLAlchemy models to register them in Mapper Registry before create_all
from app.domains.auth.models import User
from app.domains.wardrobe.models import WardrobeItem
from app.domains.outfits.models import Outfit, outfit_items_table

from app.domains.auth.routes import router as auth_router
from app.domains.wardrobe.routes import router as wardrobe_router
from app.domains.outfits.routes import router as outfits_router
from app.domains.users.routes import router as users_router
from app.domains.media.routes import router as media_router
from app.domains.weather.routes import router as weather_router
from app.domains.recommendation.routes import router as recommendation_router
from app.domains.ai_pipeline.routes import router as ai_router

# Create PostgreSQL DB tables automatically on startup
Base.metadata.create_all(bind=engine)

app = FastAPI(
    title=settings.PROJECT_NAME,
    version=settings.VERSION,
    openapi_url=f"{settings.API_V1_STR}/openapi.json"
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Ensure absolute upload directory exists and mount static files
os.makedirs(UPLOAD_DIR, exist_ok=True)
app.mount("/static/uploads", StaticFiles(directory=UPLOAD_DIR), name="uploads")

# Register Modular Domain Routers under /api/v1
app.include_router(auth_router, prefix=settings.API_V1_STR)
app.include_router(wardrobe_router, prefix=settings.API_V1_STR)
app.include_router(outfits_router, prefix=settings.API_V1_STR)
app.include_router(users_router, prefix=settings.API_V1_STR)
app.include_router(media_router, prefix=settings.API_V1_STR)
app.include_router(weather_router, prefix=settings.API_V1_STR)
app.include_router(recommendation_router, prefix=settings.API_V1_STR)
app.include_router(ai_router, prefix=settings.API_V1_STR)

@app.get("/")
def root():
    return {
        "status": "online",
        "app": "DripWear - AI Fashion Operating System",
        "database": "PostgreSQL",
        "tagline": "Form is Temporary. Drip is Permanent."
    }

@app.get("/health")
def health_check():
    return {"status": "healthy", "database": "PostgreSQL"}
