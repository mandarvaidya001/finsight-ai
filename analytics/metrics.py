from analytics.loader import get_data


def _transaction_type_mask(kind):
    df = get_data()
    return (
        df["Transaction Type"]
        .astype(str)
        .str.strip()
        .str.lower()
        == kind.lower()
    )


def total_spending():
    df = get_data()
    debit = df[_transaction_type_mask("debit")]

    return round(debit["Amount"].sum(), 2)


def total_income():
    df = get_data()
    credit = df[_transaction_type_mask("credit")]

    return round(credit["Amount"].sum(), 2)


def net_savings():

    return total_income() - total_spending()


def transaction_count():
    df = get_data()
    return len(df)

def top_categories():
    df = get_data()
    debit = df[_transaction_type_mask("debit")]

    return (
        debit.groupby("Category")["Amount"]
        .sum()
        .sort_values(ascending=False)
        .head(5)
    )

def monthly_spending():
    df = get_data()
    debit = df[_transaction_type_mask("debit")]
    if debit.empty:
        return debit

    if "Month" not in debit.columns:
        debit = debit.copy()
        debit["Month"] = debit["Date"].dt.to_period("M").astype(str)

    return (
        debit.groupby("Month")["Amount"]
        .sum()
        .reset_index()
    )
