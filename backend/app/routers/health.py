from fastapi import APIRouter

from app.config import settings
from app.models.schemas import HealthResponse

router = APIRouter()


@router.get("/health", response_model=HealthResponse)
async def health_check():
    """Check if the API is running."""
    return HealthResponse(status="healthy", version=settings.app_version)
