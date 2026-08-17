from pydantic import BaseModel
from datetime import datetime


class EventCreate(BaseModel):
    title: str
    description: str | None = None
    date: datetime
    location: str | None = None
    category: str | None = None
    max_participants: int | None = None


class EventResponse(BaseModel):
    id: int
    title: str
    description: str | None
    date: datetime
    location: str | None
    category: str | None
    max_participants: int | None
    created_at: datetime

    class Config:
        from_attributes = True