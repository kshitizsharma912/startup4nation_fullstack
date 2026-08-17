from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_current_user
from app.models.user import User
from app.schemas.user import UserResponse , UserUpdate
from app.models.event_registration import EventRegistration
from app.models.event import Event
from app.database.connection import get_db

router = APIRouter(
    prefix="/users",
    tags=["Users"]
)


@router.get("/me", response_model=UserResponse)
def get_my_profile(
    current_user: User = Depends(get_current_user)
):
    return current_user
@router.get("/me/events")
def get_my_events(
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    registrations = (
        db.query(EventRegistration, Event)
        .join(
            Event,
            Event.id == EventRegistration.event_id
        )
        .filter(
            EventRegistration.user_id == current_user.id
        )
        .all()
    )

    return [
        {
            "registration_id": registration.id,
            "event_id": event.id,
            "title": event.title,
            "date": event.date,
            "location": event.location,
            "status": registration.status
        }
        for registration, event in registrations
    ]
    
@router.put("/me", response_model=UserResponse)
def update_my_profile(
    data: UserUpdate,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    if data.name is not None:
        current_user.name = data.name

    if data.phone is not None:
        current_user.phone = data.phone

    if data.city is not None:
        current_user.city = data.city

    if data.bio is not None:
        current_user.bio = data.bio

    db.commit()
    db.refresh(current_user)

    return current_user