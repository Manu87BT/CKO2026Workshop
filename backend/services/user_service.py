"""
Business Logic for User Management
Separates logic from endpoints
"""
from sqlalchemy.orm import Session
from sqlalchemy.exc import IntegrityError
from fastapi import HTTPException
from models import UserDB
from schemas import UserCreate, UserUpdate
from data.initial_data import get_initial_users


class UserService: 
    """Service to manage user operations"""
    
    @staticmethod
    def get_all_users(db: Session) -> list[UserDB]:
        """
        Get all users
        
        Args:
            db: Database session
            
        Returns:
            List of users
        """
        users = db.query(UserDB).all()
        print(f"📋 Retrieved {len(users)} users from database")
        return users
    
    @staticmethod
    def get_user_by_id(db: Session, user_id: int) -> UserDB:
        """
        Get a user by ID
        
        Args:
            db: Database session
            user_id: User ID
            
        Returns:
            Found user
            
        Raises:
            HTTPException: If user does not exist
        """
        user = db.query(UserDB).filter(UserDB.id == user_id).first()
        
        if not user:
            raise HTTPException(
                status_code=404,
                detail=f"User with ID {user_id} not found"
            )
        
        print(f"👤 User found: {user.name} (ID: {user.id})")
        return user
    
    @staticmethod
    def create_user(db: Session, user_data: UserCreate) -> UserDB:
        """
        Create a new user
        
        Args: 
            db: Database session
            user_data: User data to create
            
        Returns:
            Created user
            
        Raises:
            HTTPException: If email already exists
        """
        # Check if email already exists
        existing = db.query(UserDB).filter(UserDB.email == user_data.email).first()
        if existing:
            raise HTTPException(
                status_code=400,
                detail=f"Email {user_data.email} is already registered"
            )
        
        # Create new user
        new_user = UserDB(**user_data.model_dump())
        
        try:
            db.add(new_user)
            db.commit()
            db.refresh(new_user)
            print(f"✨ User created: {new_user.name} (ID: {new_user.id})")
            return new_user
        except IntegrityError: 
            db.rollback()
            raise HTTPException(
                status_code=400,
                detail="Error creating user (possible duplicate)"
            )
    
    @staticmethod
    def update_user(db: Session, user_id: int, user_data: UserUpdate) -> UserDB:
        """
        Update an existing user
        
        Args:
            db: Database session
            user_id: ID of user to update
            user_data: Data to update
            
        Returns: 
            Updated user
            
        Raises:
            HTTPException: If user does not exist
        """
        # Find user
        user = UserService.get_user_by_id(db, user_id)
        
        # Update only fields that were sent
        update_data = user_data.model_dump(exclude_unset=True)
        
        if not update_data:
            raise HTTPException(
                status_code=400,
                detail="No fields provided to update"
            )
        
        for key, value in update_data.items():
            setattr(user, key, value)
        
        try:
            db.commit()
            db.refresh(user)
            print(f"🔄 User updated: {user.name} (ID: {user.id})")
            return user
        except IntegrityError:
            db.rollback()
            raise HTTPException(
                status_code=400,
                detail="Error updating user (possible duplicate email)"
            )
    
    @staticmethod
    def delete_user(db: Session, user_id: int) -> dict:
        """
        Delete a user
        
        Args:
            db: Database session
            user_id: ID of user to delete
            
        Returns:
            Confirmation message
            
        Raises:
            HTTPException: If user does not exist
        """
        user = UserService.get_user_by_id(db, user_id)
        
        user_name = user.name
        db.delete(user)
        db.commit()
        
        print(f"🗑️ User deleted: {user_name} (ID: {user_id})")
        return {"message": f"User {user_name} deleted successfully"}
    
    @staticmethod
    def reset_database(db: Session) -> dict:
        """
        Reset database to initial data
        
        Args:
            db: Database session
            
        Returns:
            Confirmation message with number of users created
        """
        # Delete all users
        db.query(UserDB).delete()
        db.commit()
        
        # Create initial users
        initial_users = get_initial_users()
        
        for user in initial_users:
            db.add(user)
        
        db.commit()
        
        print(f"🔄 Database reset with {len(initial_users)} users")
        return {
            "message": "Database reset successfully",
            "users_created": len(initial_users)
        }
    
    @staticmethod
    def seed_database_if_empty(db: Session):
        """
        Populate database with initial data if empty
        
        Args:
            db: Database session
        """
        count = db.query(UserDB).count()
        
        if count == 0:
            print("🌱 Empty database. Creating initial users...")
            initial_users = get_initial_users()
            
            for user in initial_users:
                db.add(user)
            
            db.commit()
            print(f"✅ {len(initial_users)} initial users created")
        else:
            print(f"ℹ️ Database already has {count} users")