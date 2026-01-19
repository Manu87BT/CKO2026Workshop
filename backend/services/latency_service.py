"""
Service to manage latency configuration
"""
from config import LatencyMode, LatencyConfig
from utils.delay import latency_manager


class LatencyService:
    """Service to manage latency modes"""
    
    @staticmethod
    def get_current_status() -> dict:
        """
        Get current latency status
        
        Returns: 
            Dictionary with current mode and configuration
        """
        current_mode = latency_manager. current_mode
        config = latency_manager.get_config()
        
        return {
            "current_mode": current_mode,
            "read_delay": config['read'],
            "write_delay": config['write'],
            "description": config['description']
        }
    
    @staticmethod
    def set_latency_mode(mode: LatencyMode) -> dict:
        """
        Change the latency mode
        
        Args:
            mode: New latency mode
            
        Returns:
            Updated status
        """
        latency_manager.current_mode = mode
        return LatencyService.get_current_status()
    
    @staticmethod
    def get_all_modes() -> dict:
        """
        Get information about all available modes
        
        Returns:
            Dictionary with current mode and all available modes
        """
        return {
            "current_mode": latency_manager.current_mode,
            "available_modes": latency_manager.get_all_modes()
        }
    
    @staticmethod
    def reset_to_default() -> dict:
        """
        Reset latency to default mode
        
        Returns:
            Updated status
        """
        from config import settings
        latency_manager.current_mode = settings.DEFAULT_LATENCY_MODE
        return LatencyService.get_current_status()