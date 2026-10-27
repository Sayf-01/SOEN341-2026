from fastapi import APIRouter, Depends, HTTPException, Query
from sqlalchemy.orm import Session

from App.core.dependencies import get_current_user
from App.crud.jobs import search_jobs, get_job
from App.database.connection import get_db
from App.models.user import User
from App.schemas.job import JobListResponse, JobDetail


router = APIRouter(prefix="/jobs", tags=["jobs"])


@router.get("", response_model=JobListResponse)
def list_jobs(
    keyword: str | None = None,
    location: str | None = None,
    category: str | None = None,
    page: int = Query(default=1, ge=1),
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """List open jobs with optional search filters."""

    result = search_jobs(
        db=db,
        keyword=keyword,
        location=location,
        category=category,
        page=page,
        include_closed=False,
    )

    return result


@router.get("/{id}", response_model=JobDetail)
def job_detail(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user),
):
    """Retrieve the full details of a job."""

    job = get_job(db=db, job_id=id)

    if job is None:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )

    return job