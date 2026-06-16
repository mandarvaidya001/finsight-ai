import io
from typing import List

import pandas as pd

from .exceptions import AnalyticsError
from .models import (
    CategorySummary,
    CategoriesResponse,
    HealthScoreResponse,
    InsightsResponse,
    MonthlyTrendPoint,
    MonthlyTrendResponse,
    SummaryResponse,
    UploadResponse,
)
from analytics.insights import financial_health_score, generate_insights
from analytics.metrics import (
    monthly_spending,
    net_savings,
    total_income,
    total_spending,
    top_categories,
    transaction_count,
)


def _call_analytics(func, error_message: str):
    try:
        return func()
    except Exception as exc:
        raise AnalyticsError(f"{error_message}: {exc}") from exc


def get_summary() -> SummaryResponse:
    total_income_value = _call_analytics(total_income, "Unable to calculate total income")
    total_spending_value = _call_analytics(total_spending, "Unable to calculate total spending")
    net_savings_value = _call_analytics(net_savings, "Unable to calculate net savings")
    transaction_count_value = _call_analytics(transaction_count, "Unable to calculate transaction count")

    return SummaryResponse(
        total_income=round(float(total_income_value), 2),
        total_spending=round(float(total_spending_value), 2),
        net_savings=round(float(net_savings_value), 2),
        transaction_count=int(transaction_count_value),
    )


def get_categories() -> CategoriesResponse:
    categories = _call_analytics(top_categories, "Unable to fetch category totals")
    if categories is None or categories.empty:
        return CategoriesResponse(categories=[])

    result: List[CategorySummary] = []
    for category, amount in categories.items():
        result.append(
            CategorySummary(
                category=str(category) if pd.notna(category) else "Unknown",
                amount=round(float(amount), 2),
            )
        )

    return CategoriesResponse(categories=result)


def get_monthly_trend() -> MonthlyTrendResponse:
    monthly_df = _call_analytics(monthly_spending, "Unable to fetch monthly spending trend")
    if monthly_df is None or monthly_df.empty:
        return MonthlyTrendResponse(monthly_trend=[])

    trend: List[MonthlyTrendPoint] = []
    for _, row in monthly_df.iterrows():
        trend.append(
            MonthlyTrendPoint(
                month=str(row["Month"]),
                amount=round(float(row["Amount"]), 2),
            )
        )

    return MonthlyTrendResponse(monthly_trend=trend)


def get_health_score() -> HealthScoreResponse:
    score_value = _call_analytics(financial_health_score, "Unable to calculate financial health score")
    return HealthScoreResponse(health_score=round(float(score_value), 2))


def get_insights() -> InsightsResponse:
    insights_list = _call_analytics(generate_insights, "Unable to generate insights")
    return InsightsResponse(insights=[str(insight) for insight in insights_list])


def upload_transactions(file) -> UploadResponse:
    try:
        file.file.seek(0)
        content = file.file.read()
        df = pd.read_csv(io.BytesIO(content))
    except Exception as exc:
        raise AnalyticsError(f"Unable to read CSV file: {exc}") from exc

    required_columns = {"Date", "Description", "Amount", "Transaction Type", "Category"}
    missing_columns = required_columns - set(df.columns)
    if missing_columns:
        raise AnalyticsError(
            f"CSV file is missing required columns: {', '.join(sorted(missing_columns))}"
        )

    df["Date"] = pd.to_datetime(df["Date"], errors="coerce")
    if df["Date"].isna().any():
        raise AnalyticsError("One or more Date values are invalid.")

    df["Amount"] = pd.to_numeric(df["Amount"], errors="coerce")
    if df["Amount"].isna().any():
        raise AnalyticsError("One or more Amount values are invalid.")

    df["Description"] = df["Description"].astype(str)
    df["Transaction Type"] = df["Transaction Type"].astype(str)
    df["Category"] = df["Category"].astype(str)

    from analytics.loader import set_session_data

    set_session_data(df)

    transaction_rows = []
    for _, row in df.iterrows():
        transaction_rows.append(
            {
                "date": row["Date"].isoformat(),
                "description": str(row["Description"]),
                "amount": float(row["Amount"]),
                "transaction_type": str(row["Transaction Type"]),
                "category": str(row["Category"]),
            }
        )

    return UploadResponse(message="CSV uploaded successfully.", transactions=transaction_rows)
