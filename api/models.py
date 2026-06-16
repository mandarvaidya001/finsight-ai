from typing import List

from pydantic import BaseModel


class SummaryResponse(BaseModel):
    total_income: float
    total_spending: float
    net_savings: float
    transaction_count: int


class CategorySummary(BaseModel):
    category: str
    amount: float


class TransactionRecord(BaseModel):
    date: str
    description: str
    amount: float
    transaction_type: str
    category: str


class UploadResponse(BaseModel):
    message: str
    transactions: List[TransactionRecord]


class CategoriesResponse(BaseModel):
    categories: List[CategorySummary]


class MonthlyTrendPoint(BaseModel):
    month: str
    amount: float


class MonthlyTrendResponse(BaseModel):
    monthly_trend: List[MonthlyTrendPoint]


class HealthScoreResponse(BaseModel):
    health_score: float


class InsightsResponse(BaseModel):
    insights: List[str]
