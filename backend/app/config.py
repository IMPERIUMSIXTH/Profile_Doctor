from pydantic_settings import BaseSettings
from typing import List

class Settings(BaseSettings):
    PROJECT_NAME: str = "Profile Doctor"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str

    # JWT settings
    SECRET_KEY: str
    ALGORITHM: str
    ACCESS_TOKEN_EXPIRE_MINUTES: int

    # CORS settings
    BACKEND_CORS_ORIGINS: List[str] = ["http://localhost:5173", "http://localhost:5175"]

    class Config:
        env_file = ".env"
        case_sensitive = True

settings = Settings()
