from fastapi import APIRouter, HTTPException

from app.data.content import ANALYSIS_METHODS
from app.models.schemas import AnalysisListResponse, AnalysisMethod

router = APIRouter()


@router.get("/analysis", response_model=AnalysisListResponse)
async def list_analysis_methods():
    """List all available analysis methods in OpenOA."""
    methods = [AnalysisMethod(**m) for m in ANALYSIS_METHODS]
    return AnalysisListResponse(count=len(methods), methods=methods)


@router.get("/analysis/{method_id}", response_model=AnalysisMethod)
async def get_analysis_method(method_id: str):
    """Get details of a specific analysis method."""
    for method in ANALYSIS_METHODS:
        if method["id"] == method_id:
            return AnalysisMethod(**method)
    raise HTTPException(status_code=404, detail=f"Analysis method '{method_id}' not found")
