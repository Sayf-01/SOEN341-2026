from pwdlib import PasswordHash

password_hash = PasswordHash.recommended()  # Argon2


def hash_password(plain_password: str) -> str:
    """Used during registration: turns the new user's password into a hash that is safe to store."""
    return password_hash.hash(plain_password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """Used during login: checks the typed password against the stored hash (True = correct)."""
    return password_hash.verify(plain_password, hashed_password)