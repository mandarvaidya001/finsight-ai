from fastapi import APIRouter, UploadFile, File, HTTPException

from .models import (
    CategoriesResponse,
    HealthScoreResponse,
    InsightsResponse,
    MonthlyTrendResponse,
    SummaryResponse,
    UploadResponse,
)
from .services import (
    get_categories,
    get_health_score,
    get_insights,
    get_monthly_trend,
    get_summary,
    upload_transactions,
)

router = APIRouter(tags=["FinSight AI"])


@router.get("/summary", response_model=SummaryResponse, summary="Get a financial summary")
def read_summary():
    """Returns the financial summary for the current dataset."""
    return get_summary()


@router.get("/categories", response_model=CategoriesResponse, summary="Get top spending categories")
def read_categories():
    """Returns spending categories sorted by amount."""
    return get_categories()


@router.get("/monthly-trend", response_model=MonthlyTrendResponse, summary="Get monthly spending trend")
def read_monthly_trend():
    """Returns monthly spending totals."""
    return get_monthly_trend()


@router.get("/health-score", response_model=HealthScoreResponse, summary="Get financial health score")
def read_health_score():
    """Returns the financial health score."""
    return get_health_score()


@router.get("/insights", response_model=InsightsResponse, summary="Get generated financial insights")
def read_insights():
    """Returns generated financial insights."""
    return get_insights()


@router.post("/upload", response_model=UploadResponse, summary="Upload transactions CSV")
async def upload_transactions_file(file: UploadFile = File(...)):
    """Accepts a CSV file upload and updates the active dataset."""
    if file.content_type not in ["text/csv", "application/vnd.ms-excel"]:
        raise HTTPException(status_code=415, detail="CSV file required.")

    return upload_transactions(file)
