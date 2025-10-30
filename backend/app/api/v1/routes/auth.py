from datetime import timedelta
from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordBearer, OAuth2PasswordRequestForm
from fastapi_limiter.depends import RateLimiter
from app.core.security import create_access_token, verify_password, get_password_hash, decode_access_token
from app.config import settings
from app.models.user import User

router = APIRouter()

oauth2_scheme = OAuth2PasswordBearer(tokenUrl=f"{settings.API_V1_STR}/token")

# Dummy user for demonstration
dummy_users_db = {
    "test@example.com": {
        "email": "test@example.com",
        "password_hash": get_password_hash("testpassword"),
        "role": "user",
    }
}

def get_user(db, email: str):
    if email in db:
        user_dict = db[email]
        return User(**user_dict)

async def get_current_user(token: str = Depends(oauth2_scheme)):
    payload = decode_access_token(token)
    if payload is None:
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    user = get_user(dummy_users_db, payload.get("sub"))
    if user is None:
        raise HTTPException(
            status_code=401,
            detail="Could not validate credentials",
            headers={"WWW-Authenticate": "Bearer"},
        )
    return user

@router.post("/token", dependencies=[Depends(RateLimiter(times=10, minutes=1))])
async def login_for_access_token(form_data: OAuth2PasswordRequestForm = Depends()):
    user = get_user(dummy_users_db, form_data.username)
    if not user or not verify_password(form_data.password, user.password_hash):
        raise HTTPException(
            status_code=401,
            detail="Incorrect username or password",
            headers={"WWW-Authenticate": "Bearer"},
        )
    access_token_expires = timedelta(minutes=settings.ACCESS_TOKEN_EXPIRE_MINUTES)
    access_token = create_access_token(
        data={"sub": user.email, "role": user.role}, expires_delta=access_token_expires
    )
    return {"access_token": access_token, "token_type": "bearer"}
