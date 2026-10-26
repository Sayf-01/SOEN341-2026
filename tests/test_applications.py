from App.database.connection import get_db
from App.main import app
from App.models.job import Job
from tests.conftest import API
from tests.test_profile import login_as
from tests.test_resumes import upload

# Each test logs in, uploads a resume, then tries to apply to a job.


def make_job(status="open"):
    # Adds a job straight into the test database and returns its id.
    # (It borrows the same temporary database the test client uses.)
    db = next(app.dependency_overrides[get_db]())
    job = Job(title="Backend Intern", company="CareerNet", location="Montreal",
              category="Software", description="Build APIs.", status=status)
    db.add(job)
    db.commit()
    job_id = job.id
    db.close()
    return job_id


def apply(client, headers, job_id, resume_id):
    # Sends an application the way the frontend's Apply button will.
    return client.post(f"{API}/applications", json={"job_id": job_id, "resume_id": resume_id}, headers=headers)


def test_apply_success(client, auth_headers):
    # A job seeker applies with their own resume -> 201, status "Applied" and a confirmation message.
    resume_id = upload(client, auth_headers).json()["id"]
    response = apply(client, auth_headers, make_job(), resume_id)
    assert response.status_code == 201
    body = response.json()
    assert body["status"] == "Applied"
    assert body["message"] == "Application submitted"
    assert set(body) == {"id", "status", "applied_at", "message"}


def test_apply_twice_is_409(client, auth_headers):
    # Applying to the same job a second time -> 409.
    resume_id = upload(client, auth_headers).json()["id"]
    job_id = make_job()
    apply(client, auth_headers, job_id, resume_id)
    response = apply(client, auth_headers, job_id, resume_id)
    assert response.status_code == 409
    assert response.json() == {"detail": "You have already applied to this job."}


def test_apply_to_missing_job_is_404(client, auth_headers):
    # A job id that doesn't exist -> 404.
    resume_id = upload(client, auth_headers).json()["id"]
    response = apply(client, auth_headers, 9999, resume_id)
    assert response.status_code == 404
    assert response.json() == {"detail": "Job not found."}


def test_apply_to_closed_job_is_422(client, auth_headers):
    # A closed job -> 422.
    resume_id = upload(client, auth_headers).json()["id"]
    response = apply(client, auth_headers, make_job(status="closed"), resume_id)
    assert response.status_code == 422
    assert response.json() == {"detail": "This job is closed."}


def test_apply_with_someone_elses_resume_is_404(client, auth_headers):
    # User B tries to apply using user A's resume -> 404 "Resume not found."
    resume_of_a = upload(client, auth_headers).json()["id"]
    user_b = login_as(client, "other@example.com")
    response = apply(client, user_b, make_job(), resume_of_a)
    assert response.status_code == 404
    assert response.json() == {"detail": "Resume not found."}


def test_recruiter_cannot_apply_403(client):
    # Recruiters are not allowed to apply -> 403.
    client.post(f"{API}/auth/register",
                json={"full_name": "Rec", "email": "rec@example.com", "password": "Password123!", "role": "RECRUITER"})
    token = client.post(f"{API}/auth/login",
                        json={"email": "rec@example.com", "password": "Password123!"}).json()["access_token"]
    recruiter = {"Authorization": f"Bearer {token}"}
    resume_id = upload(client, recruiter).json()["id"]
    response = apply(client, recruiter, make_job(), resume_id)
    assert response.status_code == 403


def test_apply_needs_login(client):
    # No token -> 401.
    assert client.post(f"{API}/applications", json={"job_id": 1, "resume_id": 1}).status_code == 401