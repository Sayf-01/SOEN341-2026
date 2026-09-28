from tests.conftest import API, register_user

# Each test pretends to be the frontend sending a registration request,
# then checks the backend's reply (status code + response body).
# Status codes: 201 = created, 400 = invalid input, 409 = email already used.


def test_register_job_seeker(client):
    # A valid job seeker registers -> 201, and the reply contains the new user (no password).
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
    # A valid recruiter registers -> 201, and the role is saved as RECRUITER.
    response = register_user(client, email="rec@example.com", role="RECRUITER")
    assert response.status_code == 201
    assert response.json()["user"]["role"] == "RECRUITER"


def test_response_never_contains_password(client):
    # The reply must never include the password or its hash.
    text = register_user(client).text.lower()
    assert "password" not in text
    assert "hash" not in text


def test_duplicate_email_any_casing_is_409(client):
    # Registering the same email twice (even with different capital letters) -> 409.
    register_user(client, email="lamees@example.com")
    response = register_user(client, email="LAMEES@Example.com")
    assert response.status_code == 409
    assert response.json() == {"detail": "An account with this email already exists."}


def test_invalid_email_is_400_with_string_detail(client):
    # An email without an @ -> 400, with one readable error message (a string, not a list).
    response = register_user(client, email="not-an-email")
    assert response.status_code == 400
    assert isinstance(response.json()["detail"], str)


def test_short_password_is_400(client):
    # A password under 8 characters -> 400, and the error mentions "password".
    response = register_user(client, password="short")
    assert response.status_code == 400
    assert response.json()["detail"].startswith("password")


def test_missing_role_is_400(client):
    # No role selected at all -> 400.
    response = client.post(
        f"{API}/auth/register",
        json={"full_name": "Lamees Ibeid", "email": "lamees@example.com", "password": "Password123!"},
    )
    assert response.status_code == 400
    assert response.json()["detail"].startswith("role")


def test_blank_full_name_is_400(client):
    # A name made only of spaces -> 400 "Full name is required".
    response = client.post(
        f"{API}/auth/register",
        json={"full_name": "   ", "email": "a@b.com", "password": "Password123!", "role": "JOB_SEEKER"},
    )
    assert response.status_code == 400
    assert response.json()["detail"] == "full_name: Full name is required"


def test_missing_field_is_400(client):
    # Sending only an email (no name, password or role) -> 400.
    response = client.post(f"{API}/auth/register", json={"email": "a@b.com"})
    assert response.status_code == 400


def test_cors_allows_frontend_origin(client):
    # The browser asks "may localhost:5173 call this?" -> the backend says yes (CORS).
    response = client.options(
        f"{API}/auth/register",
        headers={"Origin": "http://localhost:5173", "Access-Control-Request-Method": "POST"},
    )
    assert response.headers["access-control-allow-origin"] == "http://localhost:5173"