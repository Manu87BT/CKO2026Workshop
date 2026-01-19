"""
General application configuration
"""
import os
from enum import Enum
from typing import Optional


class LatencyMode(str, Enum):
    """
    Available latency modes
    """
    NO_LATENCY = "NO_LATENCY"
    LOW_LATENCY = "LOW_LATENCY"
    MEDIUM_LATENCY = "MEDIUM_LATENCY"
    HIGH_LATENCY = "HIGH_LATENCY"


class LatencyConfig:
    """
    Delay configuration per latency mode
    """
    LATENCY_MODES = {
        LatencyMode.NO_LATENCY: {
            "read":  0.0,      # No delay on reads
            "write": 0.0,      # No delay on writes
            "description": "No latency"
        },
        LatencyMode.LOW_LATENCY:  {
            "read": 0.1,       # 100ms on reads
            "write": 0.15,     # 150ms on writes
            "description": "Low latency (100ms read / 150ms write)"
        },
        LatencyMode.MEDIUM_LATENCY: {
            "read": 0.25,      # 250ms on reads
            "write": 0.4,      # 400ms on writes
            "description": "Medium latency (250ms read / 400ms write)"
        },
        LatencyMode.HIGH_LATENCY: {
            "read": 1.0,       # 1000ms on reads
            "write": 3.0,      # 3000ms on writes
            "description": "High latency (1s read / 3s write)"
        }
    }
    
    @classmethod
    def get_delays(cls, mode: LatencyMode) -> dict:
        """Get delay configuration for a mode"""
        return cls.LATENCY_MODES.get(mode, cls.LATENCY_MODES[LatencyMode.NO_LATENCY])


class Settings:
    """Application configuration"""
    
    # API
    APP_NAME:  str = "Workshop API"
    APP_VERSION: str = "1.0.0"
    APP_DESCRIPTION: str = "Simple API for TanStack Query workshop"
    
    # Server
    HOST: str = "0.0.0.0"
    PORT:  int = 8000
    
    # Database
    DATABASE_URL: str = "sqlite:///./users.db"
    
    # Latency (default mode)
    DEFAULT_LATENCY_MODE: LatencyMode = LatencyMode.NO_LATENCY
    
    # CORS
    CORS_ORIGINS: list[str] = ["*"]  # In production, specify origins
    
    # Logging
    LOG_LEVEL: str = "INFO"


# Global configuration instance
settings = Settings()