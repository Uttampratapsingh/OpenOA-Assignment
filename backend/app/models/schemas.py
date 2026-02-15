from pydantic import BaseModel, EmailStr


# ── Analysis ──────────────────────────────────────────────────────────────────

class AnalysisMethod(BaseModel):
    id: str
    name: str
    short_description: str
    long_description: str
    citations: list[str]
    parameters: list[str] | None = None
    icon: str = "⚡"


class AnalysisListResponse(BaseModel):
    count: int
    methods: list[AnalysisMethod]


# ── Features ──────────────────────────────────────────────────────────────────

class Feature(BaseModel):
    id: str
    name: str
    description: str
    icon: str = "🔧"
    category: str = "utility"


class FeaturesListResponse(BaseModel):
    count: int
    features: list[Feature]


# ── Documentation ─────────────────────────────────────────────────────────────

class DocSection(BaseModel):
    title: str
    content: str
    subsections: list[dict] | None = None


# ── Contact ───────────────────────────────────────────────────────────────────

class ContactMessage(BaseModel):
    name: str
    email: str
    subject: str
    message: str


class ContactResponse(BaseModel):
    success: bool
    message: str


# ── Team ──────────────────────────────────────────────────────────────────────

class TeamMember(BaseModel):
    name: str
    role: str
    orcid: str | None = None


class TeamResponse(BaseModel):
    count: int
    members: list[TeamMember]


# ── Health ────────────────────────────────────────────────────────────────────

class HealthResponse(BaseModel):
    status: str
    version: str
