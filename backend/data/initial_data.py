"""
Initial data to populate the database
"""
from models import UserDB


def get_initial_users() -> list[UserDB]:
    """
    Get initial list of users
    
    Returns:
        List of UserDB objects
    """
    return [
        UserDB(
            name="Stan Schneider",
            email="stan_da_boss@rti.com",
            role="Da Boss"
        ),
    ]