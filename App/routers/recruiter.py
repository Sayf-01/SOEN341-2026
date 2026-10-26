from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from App.core.dependencies import require_recruiter
from App.database.connection import get_db
from App.models.user import User
from App.models.job import Job
from App.models.application import Application
from App.models.profile import Profile
from App.schemas.job import JobDetail
from App.schemas.recruiter import CreateJobRequest, ReceivedApplication


router = APIRouter(prefix="/recruiter", tags=["recruiter"])


@router.post("/jobs", response_model=JobDetail, status_code=status.HTTP_201_CREATED)
def create_job(
    data: CreateJobRequest,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_recruiter),
):
    """Allow a recruiter to create a job posting."""

    new_job = Job(
        recruiter_id=current_user.id,
        title=data.title,
        company=data.company,
        location=data.location,
        category=data.category,
        description=data.description,
        status="open",
    )

    db.add(new_job)
    db.commit()
    db.refresh(new_job)

    return new_job


@router.get(
    "/jobs/{id}/applications",
    response_model=list[ReceivedApplication],
)
def get_job_applications(
    id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(require_recruiter),
):
    """View applications received for a recruiter's own job."""

    job = (
        db.query(Job)
        .filter(
            Job.id == id,
            Job.recruiter_id == current_user.id,
        )
        .first()
    )

    if job is None:
        raise HTTPException(
            status_code=404,
            detail="Job not found",
        )

    results = (
        db.query(Application, User, Profile)
        .join(User, Application.user_id == User.id)
        .outerjoin(Profile, Profile.user_id == User.id)
        .filter(Application.job_id == id)
        .order_by(Application.applied_at.desc())
        .all()
    )

    return [
        ReceivedApplication(
            application_id=application.id,
            applicant_name=(
                profile.full_name
                if profile and profile.full_name
                else user.email
            ),
            resume_id=application.resume_id,
            status=application.status,
            applied_at=application.applied_at,
        )
        for application, user, profile in results
    ]