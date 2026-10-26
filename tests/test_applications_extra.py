from App.database.connection import get_db
from App.main import app
from App.models.job import Job
from tests.conftest import API


def register_user(client, email="apply-user@example.com"):
    client.post(
        f"{API}/auth/register",
        json={
            "full_name": "Apply User",
            "email": email,
            "password": "Password123!",
            "role": "JOB_SEEKER",
        },
    )


def login_headers(client, email="apply-user@example.com"):
    register_user(client, email=email)
    token = client.post(
        f"{API}/auth/login",
        json={"email": email, "password": "Password123!"},
    ).json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def upload_resume(client, headers):
    return client.post(
        f"{API}/resumes",
        files={"file": ("resume.pdf", b"%PDF-1.4 test", "application/pdf")},
        headers=headers,
    )


def make_job(status="open"):
    db = next(app.dependency_overrides[get_db]())
    job = Job(
        title="Backend Developer",
        company="CareerNet",
        location="Montreal",
        category="Software",
        description="Build APIs.",
        status=status,
    )
    db.add(job)
    db.commit()
    db.refresh(job)
    job_id = job.id
    db.close()
    return job_id


def apply(client, headers, job_id, resume_id):
    return client.post(
        f"{API}/applications",
        json={"job_id": job_id, "resume_id": resume_id},
        headers=headers,
    )


def test_apply_without_cover_note_succeeds(client):
    # Checks the application payload can omit the cover note and still be accepted.
    headers = login_headers(client)
    resume_id = upload_resume(client, headers).json()["id"]
    job_id = make_job()

    response = apply(client, headers, job_id, resume_id)

    assert response.status_code == 201
    assert response.json()["status"] == "Applied"


def test_missing_job_id_or_resume_id_is_400(client):
    # Checks validation errors from missing required fields return 400 in this project.
    headers = login_headers(client)
    upload_resume(client, headers)

    missing_job = client.post(
        f"{API}/applications",
        json={"resume_id": 1},
        headers=headers,
    )
    assert missing_job.status_code == 400

    missing_resume = client.post(
        f"{API}/applications",
        json={"job_id": 1},
        headers=headers,
    )
    assert missing_resume.status_code == 400


def test_two_job_seekers_can_apply_to_same_job(client):
    # Checks two different users can both apply to the same open job.
    user_a = login_headers(client, "user-a@example.com")
    user_b = login_headers(client, "user-b@example.com")

    resume_a = upload_resume(client, user_a).json()["id"]
    resume_b = upload_resume(client, user_b).json()["id"]
    job_id = make_job()

    first = apply(client, user_a, job_id, resume_a)
    second = apply(client, user_b, job_id, resume_b)

    assert first.status_code == 201
    assert second.status_code == 201
    assert second.json()["status"] == "Applied"


def test_nonexistent_resume_id_is_404(client):
    # Checks applying with a resume id that does not exist returns 404.
    headers = login_headers(client)
    job_id = make_job()

    response = apply(client, headers, job_id, 999999)

    assert response.status_code == 404
    assert response.json()["detail"] == "Resume not found."
