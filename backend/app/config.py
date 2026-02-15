from pydantic_settings import BaseSettings


class Settings(BaseSettings):
    app_name: str = "OpenOA API"
    app_version: str = "1.0.0"
    app_env: str = "development"
    app_port: int = 8000
    frontend_url: str = "http://localhost:5173"

    class Config:
        env_file = ".env"


settings = Settings()
