from datetime import datetime

from pydantic import BaseModel


class ApplicationCreate(BaseModel):
    """What the frontend sends to POST /applications."""

    job_id: int
    resume_id: int


class ApplicationCreated(BaseModel):
    """What the backend sends back after a successful application."""

    id: int
    status: str
    applied_at: datetime
    message: str = "Application submitted"