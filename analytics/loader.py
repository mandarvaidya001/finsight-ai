import io
from pathlib import Path

import pandas as pd

DATA_PATH_XLSX = Path(__file__).resolve().parents[1] / "data" / "transactions.xlsx"

_demo_df: pd.DataFrame | None = None
_session_df: pd.DataFrame | None = None


def _load_demo_from_disk() -> pd.DataFrame:
    if not DATA_PATH_XLSX.exists():
        raise FileNotFoundError(f"Transaction file not found: {DATA_PATH_XLSX}")
    return pd.read_excel(DATA_PATH_XLSX)


def load_demo_data() -> pd.DataFrame:
    global _demo_df
    if _demo_df is not None:
        return _demo_df

    df = _load_demo_from_disk()
    if "Date" in df.columns:
        df["Date"] = pd.to_datetime(df["Date"], errors="coerce")

    _demo_df = df
    return _demo_df


def get_data() -> pd.DataFrame:
    global _session_df
    if _session_df is not None:
        return _session_df
    return load_demo_data()


def set_session_data(df: pd.DataFrame) -> pd.DataFrame:
    global _session_df
    data_copy = df.copy()
    if "Date" in data_copy.columns:
        data_copy["Date"] = pd.to_datetime(data_copy["Date"], errors="coerce")
    _session_df = data_copy
    return _session_df


def reset_session() -> None:
    global _session_df
    _session_df = None
