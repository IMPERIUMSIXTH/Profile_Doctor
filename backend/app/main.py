from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi_limiter import FastAPILimiter
import redis.asyncio as redis
from app.api.v1.routes import auth, users
from app.config import settings
from app.core.middleware import SecurityHeadersMiddleware

app = FastAPI(title=settings.PROJECT_NAME)

@app.on_event("startup")
async def startup():
    redis_connection = redis.from_url("redis://redis:6379/0", encoding="utf-8", decode_responses=True)
    await FastAPILimiter.init(redis_connection)

# Add security headers middleware
app.add_middleware(SecurityHeadersMiddleware)

# Set all CORS enabled origins
if settings.BACKEND_CORS_ORIGINS:
    app.add_middleware(
        CORSMiddleware,
        allow_origins=[str(origin) for origin in settings.BACKEND_CORS_ORIGINS],
        allow_credentials=True,
        allow_methods=["*"],
        allow_headers=["*"],
    )

app.include_router(auth.router, prefix=settings.API_V1_STR, tags=["auth"])
app.include_router(users.router, prefix=settings.API_V1_STR, tags=["users"])

@app.get("/")
def read_root():
    return {"Hello": "World"}
