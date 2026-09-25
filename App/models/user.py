from sqlalchemy import Column, Integer, String, DateTime
from datetime import datetime, timezone
from App.database.base import Base

# "Base" is basically the interface that allows python to manipulate the database. It is the base class that all models will inherit from. 
class User(Base):
    """
    The User model defines the 'users' table structure in the PostgreSQL database.
    It stores credentials required for user registration and login.
    """
    __tablename__ = "users"

    # Primary key 
    id = Column(Integer, primary_key=True, index=True)
    
    # Registration details
    username = Column(String(50), unique=True, index=True, nullable=False)
    email = Column(String(100), unique=True, index=True, nullable=False)
    
    # Secure login detail (this will be stored as a HASHED password, never plaintext)
    hashed_password = Column(String(255), nullable=False)
    
    # Audit trail (tracks when the user registered)
    created_at = Column(DateTime, default=lambda: datetime.now(timezone.utc))
