import os

# Use a throwaway in-memory database for tests. Must be set BEFORE importing the app.
os.environ["DATABASE_URL"] = "sqlite://"

import pytest
from fastapi.testclient import TestClient
from sqlalchemy import create_engine
from sqlalchemy.orm import sessionmaker
from sqlalchemy.pool import StaticPool

from App.database.base import Base
from App.database.connection import get_db
from App.main import app

engine = create_engine(
    "sqlite://", connect_args={"check_same_thread": False}, poolclass=StaticPool
)
TestingSessionLocal = sessionmaker(bind=engine, autoflush=False, autocommit=False)


def override_get_db():
    db = TestingSessionLocal()
    try:
        yield db
    finally:
        db.close()


@pytest.fixture
def client():
    Base.metadata.create_all(bind=engine)  # fresh tables for every test
    app.dependency_overrides[get_db] = override_get_db
    with TestClient(app) as test_client:
        yield test_client
    app.dependency_overrides.clear()
    Base.metadata.drop_all(bind=engine)


# ---------- Helpers shared by the test files ----------

API = "/api/v1"


def register_user(client, email="lamees@example.com", role="JOB_SEEKER", password="Password123!"):
    return client.post(
        f"{API}/auth/register",
        json={"full_name": "Lamees Ibeid", "email": email, "password": password, "role": role},
    )


def login_headers(client, email="lamees@example.com", role="JOB_SEEKER", password="Password123!"):
    register_user(client, email=email, role=role, password=password)
    token = client.post(
        f"{API}/auth/login", json={"email": email, "password": password}
    ).json()["access_token"]
    return {"Authorization": f"Bearer {token}"}