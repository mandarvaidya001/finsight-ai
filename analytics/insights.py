from analytics.metrics import total_income, total_spending, top_categories

def financial_health_score():

    income = total_income()
    spending = total_spending()

    if income == 0:
        return 0

    savings_rate = (
        (income - spending)
        / income
    ) * 100

    return round(
        min(max(savings_rate, 0), 100),
        2
    )


def generate_insights():

    categories = top_categories()

    if categories.empty:
        return [
            "No spending categories are available to generate insights."
        ]

    highest = categories.index[0]
    amount = categories.iloc[0]
    amount_text = f"{amount:,.2f} INR"

    return [
        f"Highest spending category is {highest} ({amount_text})",
        "Review recurring subscriptions.",
        "Track dining expenses closely."
    ]
