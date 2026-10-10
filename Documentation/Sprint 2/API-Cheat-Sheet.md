# CareerNet API cheat sheet

This is the shared frontend/backend contract for the code currently in this
repository. It separates implemented endpoints from the endpoint draft shown in
the team guide. Do not build frontend calls against planned endpoints until their
request and response schemas are implemented and agreed on.

## Base URL and conventions

- Local API base URL: `http://localhost:8000`
- API prefix: `/api/v1`
- Interactive FastAPI documentation: `http://localhost:8000/docs`
- JSON requests use `Content-Type: application/json`.
- `VITE_API_BASE_URL` can override the frontend's default API base URL.
- Validation errors are returned as HTTP `400` with a single string in `detail`.
- The app's request-validation handler uses `400`, not FastAPI's default `422`.
- Unknown paths return `404`; there is currently no authorization behavior that
  returns `403`.
- Authentication tokens are returned by login, but there are no protected API
  routes or token-validation dependency yet. The frontend currently stores the
  token in browser local storage; it does not send a bearer token on API calls.

## Implemented endpoints

| Method and path | Authentication | Request | Success response |
| --- | --- | --- | --- |
| `GET /api/v1/health` | None | None | `200 { "status": "ok" }` |
| `POST /api/v1/auth/register` | None | JSON `RegisterRequest` below | `201 RegisterResponse` below |
| `POST /api/v1/auth/login` | None | JSON `LoginRequest` below | `200 LoginResponse` below |

### Register

`POST /api/v1/auth/register`

Request:

```json
{
  "full_name": "Alex Johnson",
  "email": "alex@example.com",
  "password": "password123",
  "role": "JOB_SEEKER"
}
```

- `full_name`: required, trimmed, 1-50 characters.
- `email`: required, valid email address. The backend stores it in lowercase.
- `password`: required, 8-128 characters. The backend stores a password hash,
  never the plaintext password.
- `role`: required; exactly `JOB_SEEKER` or `RECRUITER`.

Successful response (`201 Created`):

```json
{
  "message": "Registration successful!",
  "user": {
    "id": 1,
    "full_name": "Alex Johnson",
    "email": "alex@example.com",
    "role": "JOB_SEEKER"
  }
}
```

Possible errors:

| Status | Meaning | Response example |
| --- | --- | --- |
| `400` | Invalid/missing field or request validation failure | `{ "detail": "<field>: <validation message>" }` |
| `409` | Email is already registered | `{ "detail": "An account with this email already exists." }` |
| `500` | Unexpected server error | `{ "detail": "Internal server error." }` |

### Login

`POST /api/v1/auth/login`

Request:

```json
{
  "email": "alex@example.com",
  "password": "password123"
}
```

Successful response (`200 OK`):

```json
{
  "access_token": "<JWT>",
  "token_type": "bearer",
  "user": {
    "id": 1,
    "full_name": "Alex Johnson",
    "email": "alex@example.com",
    "role": "JOB_SEEKER"
  }
}
```

Possible errors:

| Status | Meaning | Response example |
| --- | --- | --- |
| `400` | Invalid/missing email or malformed request | `{ "detail": "<field>: <validation message>" }` |
| `401` | Email not found or password does not match | `{ "detail": "Invalid email or password." }` |
| `500` | Unexpected server error | `{ "detail": "Internal server error." }` |

The JWT expires after 60 minutes by default (`ACCESS_TOKEN_EXPIRE_MINUTES` can
override this). There is currently no refresh, logout, or current-user endpoint.
The frontend's logout action only clears browser storage.

## Frontend integration notes

- The frontend sends registration's `fullName` as backend `full_name`; the other
  request fields are already named the same.
- Backend user IDs are JSON numbers, and both registration and login include
  `full_name`, `email`, and `role` in their `user` object.
- Login can be switched to a local mock with `VITE_USE_MOCK_AUTH=true`. In that
  mode it does not call the login endpoint. Leave the setting unset or false to
  use the real API.
- No bearer authorization header is required or checked by the endpoints that
  exist today. When protected endpoints are added, the frontend and backend
  should agree on token verification and `Authorization: Bearer <token>` together.

## Draft endpoints that are not implemented

The team-guide draft lists the following API areas without the `/api/v1` prefix.
The paths below show where they would sit under the current API prefix, but
**none of these routes currently exist**, and the draft payloads/status rules
are not enforced by this backend. The frontend should not call them as live
endpoints yet.

| Draft area | Draft paths | Current repository status |
| --- | --- | --- |
| Profile | `GET /api/v1/profile/me`, `PUT /api/v1/profile/me` | A `Profile` database model exists; no profile router or API schema exists. |
| Resumes | `POST /api/v1/resumes`, `GET /api/v1/resumes`, `GET /api/v1/resumes/{id}/download`, `PUT /api/v1/resumes/{id}`, `DELETE /api/v1/resumes/{id}` | A `ResumeFile` database model exists; there are no upload, download, or ownership routes. The draft's 5 MB limit is not enforced. |
| Jobs | `GET /api/v1/jobs`, `GET /api/v1/jobs/{id}` | A `Job` database model exists; there is no jobs router, query/filter schema, or implemented category list. The model's `status` is a string defaulting to `open`, not a validated `open`/`closed` enum. |
| Applications | `POST /api/v1/applications`, `GET /api/v1/applications/me`, `PATCH /api/v1/applications/{id}/status` | No application model, router, or status enum exists. The draft's application statuses are not implemented. |
| Recruiter | `POST /api/v1/recruiter/jobs`, `GET /api/v1/recruiter/jobs/{id}/applications` | There are no recruiter routes or authorization checks. |

Database models alone do not guarantee matching API request/response fields.

Before implementing those routes, the frontend/backend team still needs to settle
their exact payloads, response fields, upload size/type rules, ownership and
role checks, pagination/filter behavior, and application status values.
