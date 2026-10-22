import jwt
from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from sqlalchemy.orm import Session

from App.core.security import ALGORITHM, SECRET_KEY
from App.database.connection import get_db
from App.models.user import User

# Reads the "Authorization: Bearer <token>" header.
# It also adds the "Authorize" button to the /docs page.
bearer_scheme = HTTPBearer(auto_error=False)

NOT_LOGGED_IN = HTTPException(
    status_code=status.HTTP_401_UNAUTHORIZED,
    detail="Not logged in.",
    headers={"WWW-Authenticate": "Bearer"},
)


def get_current_user(
    credentials: HTTPAuthorizationCredentials | None = Depends(bearer_scheme),
    db: Session = Depends(get_db),
) -> User:
    """Finds out who is logged in from their login token.

    Any endpoint that needs a logged-in user adds:
        current_user: User = Depends(get_current_user)
    No token, a fake token or an expired token -> 401.
    """
    if credentials is None:
        raise NOT_LOGGED_IN

    try:
        payload = jwt.decode(credentials.credentials, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = int(payload["sub"])  # login put the user's id in "sub"
    except (jwt.PyJWTError, KeyError, ValueError):
        raise NOT_LOGGED_IN

    user = db.get(User, user_id)
    if user is None:  # the account was deleted after the token was made
        raise NOT_LOGGED_IN
    return user