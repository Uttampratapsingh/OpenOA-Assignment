from fastapi import APIRouter

from app.data.content import FEATURES
from app.models.schemas import Feature, FeaturesListResponse

router = APIRouter()


@router.get("/features", response_model=FeaturesListResponse)
async def list_features():
    """List all OpenOA features and utilities."""
    features = [Feature(**f) for f in FEATURES]
    return FeaturesListResponse(count=len(features), features=features)
