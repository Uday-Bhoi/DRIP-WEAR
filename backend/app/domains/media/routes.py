import os
import uuid
from fastapi import APIRouter, UploadFile, File, HTTPException, status, Depends
from app.core.config import UPLOAD_DIR
from app.core.dependencies import get_current_user
from app.domains.auth.models import User

router = APIRouter(prefix="/media", tags=["Media Uploads"])

os.makedirs(UPLOAD_DIR, exist_ok=True)

@router.post("/upload")
async def upload_media(
    file: UploadFile = File(...),
    current_user: User = Depends(get_current_user)
):
    if not file.content_type or not file.content_type.startswith("image/"):
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Only image files are allowed.")
    
    file_extension = os.path.splitext(file.filename)[1] or ".jpg"
    unique_filename = f"{uuid.uuid4()}{file_extension}"
    file_path = os.path.join(UPLOAD_DIR, unique_filename)

    with open(file_path, "wb") as buffer:
        content = await file.read()
        buffer.write(content)

    public_url = f"/static/uploads/{unique_filename}"
    return {
        "filename": unique_filename,
        "url": public_url,
        "content_type": file.content_type
    }
