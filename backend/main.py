"""
Application entry point
Configures FastAPI and registers routers
"""
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from contextlib import asynccontextmanager

from config import settings
from database import init_db, get_db
from routers import users, latency  # ← IMPORT latency router
from services.user_service import UserService
from utils.delay import latency_manager  # ← IMPORT latency manager


@asynccontextmanager
async def lifespan(app: FastAPI):
    """
    Application lifecycle event
    Runs on startup and shutdown
    """
    # Startup
    print(f"\n{'='*60}")
    print(f"🚀 Starting {settings.APP_NAME} v{settings.APP_VERSION}")
    print(f"{'='*60}\n")
    
    # Initialize database
    init_db()
    
    # Populate with initial data if empty
    db = next(get_db())
    UserService.seed_database_if_empty(db)
    db.close()
    
    # Show latency configuration
    config = latency_manager.get_config()
    print(f"🎛️  Latency mode: {latency_manager.current_mode.value}")
    print(f"   📖 Read:    {config['read']*1000:.0f}ms")
    print(f"   ✏️  Write: {config['write']*1000:.0f}ms")
    
    print(f"\n✅ Server ready at http://{settings.HOST}:{settings.PORT}")
    print(f"📚 Documentation: http://{settings.HOST}:{settings.PORT}/docs")
    print(f"🎛️  Latency: http://{settings.HOST}:{settings.PORT}/latency\n")
    
    yield  # App is running here
    
    # Shutdown
    print("\n👋 Closing application...")


# Create FastAPI instance
app = FastAPI(
    title=settings.APP_NAME,
    description=settings.APP_DESCRIPTION,
    version=settings.APP_VERSION,
    lifespan=lifespan
)

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=settings.CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Register routers
app.include_router(users.router)
app.include_router(latency.router)  # ← REGISTER latency router


@app.get("/", tags=["info"])
async def root():
    """
    Root endpoint - API information
    """
    current_latency = latency_manager.get_config()
    
    return {
        "message": f"Welcome to {settings.APP_NAME}!",
        "version": settings.APP_VERSION,
        "docs": "/docs",
        "endpoints": {
            "users": {
                "GET /users": "List all users",
                "GET /users/{id}": "Get a user",
                "POST /users": "Create a user",
                "PATCH /users/{id}": "Update a user",
                "DELETE /users/{id}": "Delete a user",
                "POST /users/reset": "Reset database"
            },
            "latency": {
                "GET /latency": "View current latency status",
                "GET /latency/modes": "View all available modes",
                "POST /latency": "Change latency mode",
                "POST /latency/reset": "Reset to default mode"
            }
        },
        "current_latency": {
            "mode": latency_manager.current_mode.value,
            "read_delay_ms": current_latency['read'] * 1000,
            "write_delay_ms": current_latency['write'] * 1000,
            "description": current_latency['description']
        }
    }


@app.get("/health", tags=["info"])
async def health_check():
    """
    Health check endpoint
    """
    return {
        "status": "healthy",
        "version": settings.APP_VERSION,
        "latency_mode": latency_manager.current_mode.value
    }


# Run server (only if executed directly)
if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "main:app",
        host=settings.HOST,
        port=settings.PORT,
        reload=True  # Auto-reload in development
    )