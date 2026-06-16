class AnalyticsError(Exception):
    def __init__(self, detail: str = "Analytics service failed"):
        self.detail = detail
        super().__init__(detail)
