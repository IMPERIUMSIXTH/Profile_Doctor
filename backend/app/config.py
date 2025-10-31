from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    PROJECT_NAME: str = "Profile Doctor"
    API_V1_STR: str = "/api/v1"
    DATABASE_URL: str

    model_config = SettingsConfigDict(case_sensitive=True, env_file=".env")


settings = Settings()
