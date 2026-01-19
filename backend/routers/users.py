"""
Router with all endpoints related to users
"""
from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session
from database import get_db
from schemas import User, UserCreate, UserUpdate
from services.user_service import UserService
from utils.delay import delay_get, delay_post, delay_patch, delay_delete

# Create router
router = APIRouter(
    prefix="/users",
    tags=["users"],
    responses={404: {"description": "User not found"}},
)


@router.get("", response_model=list[User], summary="List all users")
async def get_users(db: Session = Depends(get_db)):
    """
    Get list of all users
    
    - **Simulates latency** according to configuration
    - **Returns** list of users with all their data
    """
    await delay_get()
    users = UserService.get_all_users(db)
    return users


@router.get("/{user_id}", response_model=User, summary="Get a user by ID")
async def get_user(user_id: int, db: Session = Depends(get_db)):
    """
    Get a specific user by their ID
    
    - **user_id**: ID of the user to search for
    - **Returns** complete user data
    - **Error 404** if the user does not exist
    """
    await delay_get()
    user = UserService.get_user_by_id(db, user_id)
    return user


@router.post(
    "",
    response_model=User,
    status_code=status.HTTP_201_CREATED,
    summary="Create a new user"
)
async def create_user(user: UserCreate, db: Session = Depends(get_db)):
    """
    Create a new user
    
    - **name**: Full name of the user
    - **email**: Unique email of the user
    - **role**: User role
    - **Returns** the created user with their ID
    - **Error 400** if the email already exists
    """
    await delay_post()
    new_user = UserService.create_user(db, user)
    return new_user


@router.patch("/{user_id}", response_model=User, summary="Update a user (partial)")
@router.put("/{user_id}", response_model=User, summary="Update a user (full or partial)")
async def update_user(
    user_id: int,
    user_update: UserUpdate,
    db: Session = Depends(get_db)
):
    """
    Update an existing user (full or partial update)
    
    - **user_id**: ID of the user to update
    - **Send the fields** you want to change
    - **Returns** the updated user
    - **Error 404** if the user does not exist
    """
    await delay_patch()
    updated_user = UserService.update_user(db, user_id, user_update)
    return updated_user


@router.delete("/{user_id}", summary="Delete a user")
async def delete_user(user_id: int, db: Session = Depends(get_db)):
    """
    Delete a user
    
    - **user_id**: ID of the user to delete
    - **Returns** confirmation message
    - **Error 404** if the user does not exist
    """

    # TESTING CODE: Trigger a 404 error
    """
    raise HTTPException(status_code=404, detail="Trigger 404 error for testing")
    """


    await delay_delete()
    user = UserService.get_user_by_id(db, user_id)
    if not user:
        raise HTTPException(status_code=404, detail="User not found")
    result = UserService.delete_user(db, user_id)
    return result


@router.post("/reset", summary="Reset database", tags=["admin"])
async def reset_database(db: Session = Depends(get_db)):
    """
    Reset the database to initial data
    
    - **Deletes** all current users
    - **Creates** predefined initial users
    - **Returns** number of users created
    
    ⚠️ **Warning**: This operation is irreversible
    """
    result = UserService.reset_database(db)
    return result