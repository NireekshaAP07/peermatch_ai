import os
from datetime import datetime, timedelta
from typing import Optional
from jose import JWTError, jwt
import bcrypt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from sqlalchemy.orm import Session
from database import get_db
import models

DEBUG_FILE = "/home/nireeksha-a-p/peer_ai/backend/auth_debug.log"

def debug_log(msg: str):
    with open(DEBUG_FILE, "a") as f:
        f.write(f"{datetime.utcnow()} - {msg}\n")

SECRET_KEY = os.getenv("SECRET_KEY", "peermatch-ai-secret-key-2024-supersecure")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24  # 24 hours

security = HTTPBearer()

def verify_password(plain_password: str, hashed_password: str) -> bool:
    try:
        return bcrypt.checkpw(
            plain_password.encode('utf-8'), 
            hashed_password.encode('utf-8')
        )
    except Exception:
        return False

def get_password_hash(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode('utf-8'), salt)
    return hashed.decode('utf-8')

def create_access_token(data: dict, expires_delta: Optional[timedelta] = None):
    to_encode = data.copy()
    expire = datetime.utcnow() + (expires_delta or timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES))
    to_encode.update({"exp": expire})
    if "sub" in to_encode:
        to_encode["sub"] = str(to_encode["sub"])
    token = jwt.encode(to_encode, SECRET_KEY, algorithm=ALGORITHM)
    debug_log(f"Created token for {to_encode.get('sub')}: {token[:20]}...")
    return token

def get_current_user(
    credentials: HTTPAuthorizationCredentials = Depends(security),
    db: Session = Depends(get_db)
) -> models.User:
    credentials_exception = HTTPException(
        status_code=status.HTTP_401_UNAUTHORIZED,
        detail="Could not validate credentials",
        headers={"WWW-Authenticate": "Bearer"},
    )
    try:
        token = credentials.credentials
        debug_log(f"Decoding token: {token[:20]}...")
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id_str: str = payload.get("sub")
        if user_id_str is None:
            debug_log("sub missing in payload")
            raise credentials_exception
        user_id = int(user_id_str)
        debug_log(f"Found user_id: {user_id}")
    except Exception as e:
        debug_log(f"JWT Decode Error: {e}")
        raise credentials_exception

    user = db.query(models.User).filter(models.User.id == user_id).first()
    if user is None:
        debug_log(f"User not found for id {user_id}")
        raise credentials_exception
    debug_log(f"User {user.email} authenticated successfully")
    return user

def require_teacher(current_user: models.User = Depends(get_current_user)):
    if current_user.role != "teacher":
        raise HTTPException(status_code=403, detail="Teacher role required")
    return current_user
