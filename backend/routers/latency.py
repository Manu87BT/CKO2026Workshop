"""
Router to manage latency configuration
"""
from fastapi import APIRouter
from config import LatencyMode
from schemas import LatencyModeRequest, LatencyStatus, LatencyModesInfo
from services.latency_service import LatencyService

# Create router
router = APIRouter(
    prefix="/latency",
    tags=["latency"],
    responses={404: {"description": "Not found"}},
)


@router.get(
    "",
    response_model=LatencyStatus,
    summary="Get current latency status"
)
async def get_latency_status():
    """
    Get the current latency mode and its configuration
    
    - **current_mode**: Currently active mode
    - **read_delay**: Delay in seconds for GET operations
    - **write_delay**: Delay in seconds for POST/PATCH/DELETE operations
    - **description**: Description of the current mode
    """
    status = LatencyService.get_current_status()
    return status


@router.get(
    "/modes",
    response_model=LatencyModesInfo,
    summary="List all available latency modes"
)
async def get_latency_modes():
    """
    Get information about all available latency modes
    
    Returns:
    - **current_mode**: Currently active mode
    - **available_modes**: Dictionary with all modes and their configurations
    
    Available modes:
    - **NO_LATENCY**: No delay (0ms read / 0ms write)
    - **LOW_LATENCY**: Low delay (100ms read / 150ms write)
    - **MEDIUM_LATENCY**: Medium delay (250ms read / 400ms write)
    - **HIGH_LATENCY**: High delay (1000ms read / 3000ms write)
    """
    modes_info = LatencyService.get_all_modes()
    return modes_info


@router.post(
    "",
    response_model=LatencyStatus,
    summary="Change latency mode"
)
async def set_latency_mode(request: LatencyModeRequest):
    """
    Change the API's latency mode
    
    **Body:**
    ```json
    {
      "mode": "MEDIUM_LATENCY"
    }
    ```
    
    **Available modes:**
    - `NO_LATENCY`: No latency (0ms)
    - `LOW_LATENCY`: Low latency (100ms read / 150ms write)
    - `MEDIUM_LATENCY`: Medium latency (250ms read / 400ms write)
    - `HIGH_LATENCY`: High latency (1000ms read / 3000ms write)
    
    **Returns:**
    Updated status with the new mode and its delays
    
    **Effect:**
    All user endpoints will apply the new delays immediately
    """
    status = LatencyService.set_latency_mode(request.mode)
    return status


@router.post(
    "/reset",
    response_model=LatencyStatus,
    summary="Reset latency to default mode"
)
async def reset_latency():
    """
    Reset latency to the default mode (NO_LATENCY)
    
    **Returns:**
    Updated status with the default mode
    """
    status = LatencyService.reset_to_default()
    return status