from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.database.connection import Base


class Event(Base):
    __tablename__ = "events"

    id = Column(Integer, primary_key=True, index=True)

    title = Column(String(200), nullable=False)

    description = Column(Text, nullable=True)

    date = Column(DateTime, nullable=False)

    location = Column(String(200), nullable=True)

    category = Column(String(100), nullable=True)

    max_participants = Column(Integer, nullable=True)

    created_at = Column(
        DateTime,
        default=datetime.utcnow
    )