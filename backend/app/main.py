from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from app.config import settings
from app.routers import analysis, contact, docs, features, health

app = FastAPI(
    title=settings.app_name,
    version=settings.app_version,
    description="REST API for the OpenOA public website — serving analysis methods, features, documentation, and contact endpoints.",
    docs_url="/docs",
    redoc_url="/redoc",
)

# CORS — allow frontend origins (local dev + Vercel production)
allowed_origins = [
    settings.frontend_url,
    "http://localhost:5173",
    "http://localhost:3000",
]
# Allow any Vercel preview/production URLs
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_origin_regex=r"https://.*\.vercel\.app",
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(health.router, prefix="/api", tags=["Health"])
app.include_router(analysis.router, prefix="/api", tags=["Analysis Methods"])
app.include_router(features.router, prefix="/api", tags=["Features"])
app.include_router(docs.router, prefix="/api", tags=["Documentation"])
app.include_router(contact.router, prefix="/api", tags=["Contact"])


@app.get("/", tags=["Root"])
async def root():
    return {
        "message": "Welcome to the OpenOA API",
        "version": settings.app_version,
        "docs": "/docs",
    }
