"""
SQLAlchemy models (represent database tables)
"""
from sqlalchemy import Column, Integer, String
from database import Base


class UserDB(Base):
    """
    Model of the 'users' table in the database
    
    Attributes:
        id:  Unique identifier of the user
        name: Full name of the user
        email: Unique email of the user
        role: Role of the user
    """
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True, autoincrement=True)
    name = Column(String, nullable=False)
    email = Column(String, nullable=False, unique=True, index=True)
    role = Column(String, nullable=False)
    
    def __repr__(self):
        return f"<User(id={self.id}, name='{self.name}', email='{self.email}')>"