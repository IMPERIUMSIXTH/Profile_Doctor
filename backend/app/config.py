from pydantic import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "Profile Doctor"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str = "postgresql+asyncpg://user:password@db/profile_doctor"

    class Config:
        case_sensitive = True

settings = Settings()
