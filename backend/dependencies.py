"""
Shared dependencies for FastAPI
"""
from fastapi import Depends
from sqlalchemy.orm import Session
from database import get_db


def get_database_session() -> Session:
    """
    Dependency to get database session
    Wrapper over database.get_db() for clarity
    """
    return Depends(get_db)