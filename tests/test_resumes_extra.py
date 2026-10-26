from tests.conftest import API

PDF = "application/pdf"
DOCX = "application/vnd.openxmlformats-officedocument.wordprocessingml.document"


def register_user(client, email="resume-user@example.com"):
    client.post(
        f"{API}/auth/register",
        json={
            "full_name": "Resume User",
            "email": email,
            "password": "Password123!",
            "role": "JOB_SEEKER",
        },
    )


def login_headers(client, email="resume-user@example.com"):
    register_user(client, email=email)
    token = client.post(
        f"{API}/auth/login",
        json={"email": email, "password": "Password123!"},
    ).json()["access_token"]
    return {"Authorization": f"Bearer {token}"}


def upload_pdf(client, headers, *, name="resume.pdf", data=b"%PDF-1.4 test", content_type=PDF):
    return client.post(
        f"{API}/resumes",
        files={"file": (name, data, content_type)},
        headers=headers,
    )


def test_list_empty_returns_empty_list(client):
    # Checks listing resumes returns an empty list for a brand-new user.
    headers = login_headers(client)
    response = client.get(f"{API}/resumes", headers=headers)
    assert response.status_code == 200
    assert response.json() == []


def test_upload_exactly_5mb_is_accepted(client):
    # Checks the 5 MB boundary is accepted without rejecting a valid PDF.
    headers = login_headers(client)
    payload = b"A" * (5 * 1024 * 1024)
    response = upload_pdf(client, headers, data=payload)
    assert response.status_code == 201
    assert response.json()["size_bytes"] == len(payload)


def test_missing_resume_id_returns_404_for_download_replace_and_delete(client):
    # Checks missing resume ids are rejected consistently for download, replace and delete.
    headers = login_headers(client)
    missing_id = 999999

    download = client.get(f"{API}/resumes/{missing_id}/download", headers=headers)
    assert download.status_code == 404

    replace = client.put(
        f"{API}/resumes/{missing_id}",
        files={"file": ("missing.pdf", b"not found", PDF)},
        headers=headers,
    )
    assert replace.status_code == 404

    delete = client.delete(f"{API}/resumes/{missing_id}", headers=headers)
    assert delete.status_code == 404


def test_delete_then_download_returns_404(client):
    # Checks deleting a resume removes it and subsequent download attempts are 404.
    headers = login_headers(client)
    created = upload_pdf(client, headers)
    resume_id = created.json()["id"]

    delete_response = client.delete(f"{API}/resumes/{resume_id}", headers=headers)
    assert delete_response.status_code == 204

    download_response = client.get(f"{API}/resumes/{resume_id}/download", headers=headers)
    assert download_response.status_code == 404
