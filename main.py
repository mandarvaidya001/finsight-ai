from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse

from api.routes import router as api_router
from api.exceptions import AnalyticsError

app = FastAPI(
    title="FinSight AI",
    description="Backend API for financial analytics and insights.",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "http://localhost:3001",
        "http://127.0.0.1:3001",
    ],
    allow_credentials=True,
    allow_methods=["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allow_headers=["*"],
)

app.include_router(api_router, prefix="/api")


@app.exception_handler(AnalyticsError)
def analytics_exception_handler(request: Request, exc: AnalyticsError):
    return JSONResponse(status_code=502, content={"detail": exc.detail})


@app.get("/health", summary="Health check endpoint")
def health_check():
    return {"status": "ok"}
