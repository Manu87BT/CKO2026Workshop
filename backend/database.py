from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
from config import settings

# SQLAlchemy engine creation
engine = create_engine(
    settings.DATABASE_URL,
    connect_args={"check_same_thread": False} 
)

# Close sesión
SessionLocal = sessionmaker(
    autocommit=False,
    autoflush=False,
    bind=engine
)

# Models database
Base = declarative_base()


def init_db():
    """
    Initialize the database
    Creates tables if they do not exist
    """
    from models import UserDB  # Import here to avoid circular imports
    Base.metadata.create_all(bind=engine)
    print("✅ Database initialized")

def get_db():
    """
    Dependency to get database session
    Used with FastAPI Depends()
    """
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()