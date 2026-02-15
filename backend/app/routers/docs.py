from fastapi import APIRouter

from app.data.content import (
    CITATIONS,
    INSTALLATION,
    OVERVIEW,
    SCHEMA_INFO,
    TEAM_MEMBERS,
)
from app.models.schemas import DocSection, TeamMember, TeamResponse

router = APIRouter()


@router.get("/docs/overview", response_model=DocSection)
async def get_overview():
    """Get the project overview and description."""
    return DocSection(**OVERVIEW)


@router.get("/docs/installation", response_model=DocSection)
async def get_installation():
    """Get installation instructions."""
    return DocSection(**INSTALLATION)


@router.get("/docs/schema", response_model=DocSection)
async def get_schema_info():
    """Get PlantData schema documentation."""
    return DocSection(**SCHEMA_INFO)


@router.get("/docs/citations", response_model=DocSection)
async def get_citations():
    """Get citation information."""
    return DocSection(**CITATIONS)


@router.get("/team", response_model=TeamResponse)
async def get_team():
    """Get the list of team members and contributors."""
    members = [TeamMember(**m) for m in TEAM_MEMBERS]
    return TeamResponse(count=len(members), members=members)
