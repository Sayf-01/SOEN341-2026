from tests.conftest import API, register_user


def test_register_job_seeker(client):
    response = register_user(client)
    assert response.status_code == 201
    body = response.json()
    assert body["message"] == "Registration successful!"
    assert body["user"] == {
        "id": 1,
        "full_name": "Lamees Ibeid",
        "email": "lamees@example.com",
        "role": "JOB_SEEKER",
    }


def test_register_recruiter(client):
    response = register_user(client, email="rec@example.com", role="RECRUITER")
    assert response.status_code == 201
    assert response.json()["user"]["role"] == "RECRUITER"


def test_response_never_contains_password(client):
    text = register_user(client).text.lower()
    assert "password" not in text
    assert "hash" not in text


def test_duplicate_email_any_casing_is_409(client):
    register_user(client, email="lamees@example.com")
    response = register_user(client, email="LAMEES@Example.com")
    assert response.status_code == 409
    assert response.json() == {"detail": "An account with this email already exists."}


def test_invalid_email_is_400_with_string_detail(client):
    response = register_user(client, email="not-an-email")
    assert response.status_code == 400
    assert isinstance(response.json()["detail"], str)


def test_short_password_is_400(client):
    response = register_user(client, password="short")
    assert response.status_code == 400
    assert response.json()["detail"].startswith("password")


def test_unknown_role_is_400(client):
    response = register_user(client, role="ADMIN")
    assert response.status_code == 400


def test_blank_full_name_is_400(client):
    response = client.post(
        f"{API}/auth/register",
        json={"full_name": "   ", "email": "a@b.com", "password": "Password123!", "role": "JOB_SEEKER"},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "full_name: Full name is required"


def test_missing_field_is_400(client):
    response = client.post(f"{API}/auth/register", json={"email": "a@b.com"})
    assert response.status_code == 400


def test_cors_allows_frontend_origin(client):
    response = client.options(
        f"{API}/auth/register",
        headers={"Origin": "http://localhost:5173", "Access-Control-Request-Method": "POST"},
    )
    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"