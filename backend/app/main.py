from fastapi import FastAPI
from app.routes.health import router as health_router

app = FastAPI(
    title="LS-Monitor API",
    description="Backend API for LS-Monitor",
    version="1.0.0"
)

app.include_router(health_router, prefix="/api")


@app.get("/")
def root():
    return {
        "message": "LS-Monitor API is running"
    }