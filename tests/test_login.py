from conftest import API, register_user


def test_login_success(client):
    # Create a user first
    register_user(
        client,
        email="youssef@example.com",
        password="Password123!",
    )

    # Try logging in
    response = client.post(
        f"{API}/auth/login",
        json={
            "email": "youssef@example.com",
            "password": "Password123!",
        },
    )

    assert response.status_code == 200

    data = response.json()

    assert "access_token" in data
    assert data["token_type"] == "bearer"
    assert data["user"]["email"] == "youssef@example.com"

def test_login_wrong_password(client):
    register_user(
        client,
        email="youssef@example.com",
        password="Password123!",
    )

    response = client.post(
        f"{API}/auth/login",
        json={
            "email": "youssef@example.com",
            "password": "WrongPassword!",
        },
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password."


def test_login_nonexistent_email(client):
    response = client.post(
        f"{API}/auth/login",
        json={
            "email": "doesnotexist@example.com",
            "password": "Password123!",
        },
    )

    assert response.status_code == 401
    assert response.json()["detail"] == "Invalid email or password."


def test_login_email_is_case_insensitive(client):
    register_user(
        client,
        email="youssef@example.com",
        password="Password123!",
    )

    response = client.post(
        f"{API}/auth/login",
        json={
            "email": "YOUSSEF@EXAMPLE.COM",
            "password": "Password123!",
        },
    )

    assert response.status_code == 200
    assert response.json()["user"]["email"] == "youssef@example.com"


def test_login_never_returns_password(client):
    register_user(
        client,
        email="youssef@example.com",
        password="Password123!",
    )

    response = client.post(
        f"{API}/auth/login",
        json={
            "email": "youssef@example.com",
            "password": "Password123!",
        },
    )

    data = response.json()

    assert "password" not in data["user"]
    assert "hashed_password" not in data["user"]