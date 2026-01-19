"""
Utilities to simulate network/server latency
Dynamic latency system configurable at runtime
"""
import asyncio
from config import LatencyMode, LatencyConfig, settings


class LatencyManager:
    """
    Global latency manager
    Allows changing latency mode at runtime
    """
    _instance = None
    _current_mode:  LatencyMode = settings.DEFAULT_LATENCY_MODE
    
    def __new__(cls):
        """Singleton pattern - only one instance"""
        if cls._instance is None:
            cls._instance = super().__new__(cls)
        return cls._instance
    
    @property
    def current_mode(self) -> LatencyMode:
        """Get current latency mode"""
        return self._current_mode
    
    @current_mode.setter
    def current_mode(self, mode: LatencyMode):
        """Change latency mode"""
        if mode not in LatencyMode: 
            raise ValueError(f"Invalid mode: {mode}")
        
        old_mode = self._current_mode
        self._current_mode = mode
        
        config = LatencyConfig.get_delays(mode)
        print(f"\n{'='*60}")
        print(f"🎛️  Latency changed:  {old_mode.value} → {mode.value}")
        print(f"   📖 Read (GET):     {config['read']*1000:.0f}ms")
        print(f"   ✏️  Write (POST/PATCH/DELETE): {config['write']*1000:.0f}ms")
        print(f"{'='*60}\n")
    
    def get_read_delay(self) -> float:
        """Get current delay for read operations (GET)"""
        config = LatencyConfig.get_delays(self._current_mode)
        return config['read']
    
    def get_write_delay(self) -> float:
        """Get current delay for write operations (POST/PATCH/DELETE)"""
        config = LatencyConfig.get_delays(self._current_mode)
        return config['write']
    
    def get_config(self) -> dict:
        """Get complete configuration of current mode"""
        return LatencyConfig.get_delays(self._current_mode)
    
    def get_all_modes(self) -> dict:
        """Get information about all available modes"""
        return LatencyConfig.LATENCY_MODES


# Global instance of the manager
latency_manager = LatencyManager()


async def simulate_delay(seconds: float):
    """
    Simulate latency
    
    Args:
        seconds: Seconds to wait
    """
    if seconds > 0:
        await asyncio.sleep(seconds)


async def delay_read():
    """
    Delay for READ operations (GET)
    Uses current latency mode
    """
    delay = latency_manager.get_read_delay()
    if delay > 0:
        print(f"⏳ [READ] Simulating latency:  {delay*1000:.0f}ms")
        await simulate_delay(delay)


async def delay_write():
    """
    Delay for WRITE operations (POST/PATCH/DELETE)
    Uses current latency mode
    """
    delay = latency_manager.get_write_delay()
    if delay > 0:
        print(f"⏳ [WRITE] Simulating latency: {delay*1000:.0f}ms")
        await simulate_delay(delay)


# Aliases for compatibility/clarity
async def delay_get():
    """Delay for GET (read)"""
    await delay_read()


async def delay_post():
    """Delay for POST (write)"""
    await delay_write()


async def delay_patch():
    """Delay for PATCH (write)"""
    await delay_write()


async def delay_delete():
    """Delay for DELETE (write)"""
    await delay_write()