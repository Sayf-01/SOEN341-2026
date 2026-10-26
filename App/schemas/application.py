from datetime import datetime

from pydantic import BaseModel, Field


class ApplicationCreate(BaseModel):
    """What the frontend sends to POST /applications."""

    job_id: int
    resume_id: int
    cover_note: str | None = Field(default=None, max_length=1000)  # optional message to the recruiter


class ApplicationCreated(BaseModel):
    """What the backend sends back after a successful application."""

    id: int
    status: str
    applied_at: datetime
    message: str = "Application submitted"