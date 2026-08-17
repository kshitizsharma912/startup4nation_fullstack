from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app.dependencies import get_current_user
from app.models.event_registration import EventRegistration
from app.models.user import User
from app.database.connection import get_db
from app.models.event import Event
from app.schemas.event import EventCreate, EventResponse
from app.dependencies import get_current_user, get_current_admin


router = APIRouter(
    prefix="/events",
    tags=["Events"]
)


@router.post("/", response_model=EventResponse)
def create_event(
    event_data: EventCreate,
    db: Session = Depends(get_db)
):
    new_event = Event(
        title=event_data.title,
        description=event_data.description,
        date=event_data.date,
        location=event_data.location,
        category=event_data.category,
        max_participants=event_data.max_participants
    )

    db.add(new_event)
    db.commit()
    db.refresh(new_event)

    return new_event


@router.get("/", response_model=list[EventResponse])
def get_events(
    db: Session = Depends(get_db)
):
    events = db.query(Event).all()

    return events

@router.get("/registrations")
def get_event_registrations(
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    registrations = db.query(EventRegistration).all()

    return registrations 


@router.get("/{event_id}", response_model=EventResponse)
def get_event(
    event_id: int,
    db: Session = Depends(get_db)
):
    event = (
        db.query(Event)
        .filter(Event.id == event_id)
        .first()
    )

    if not event:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    return event

@router.post("/{event_id}/join")
def join_event(
    event_id: int,
    db: Session = Depends(get_db),
    current_user: User = Depends(get_current_user)
):
    event = (
        db.query(Event)
        .filter(Event.id == event_id)
        .first()
    )

    if not event:
        raise HTTPException(
            status_code=404,
            detail="Event not found"
        )

    existing_registration = (
        db.query(EventRegistration)
        .filter(
            EventRegistration.event_id == event_id,
            EventRegistration.user_id == current_user.id
        )
        .first()
    )

    if existing_registration:
        raise HTTPException(
            status_code=400,
            detail="You have already joined this event"
        )

    registration = EventRegistration(
        user_id=current_user.id,
        event_id=event_id,
        status="pending"
    )

    db.add(registration)
    db.commit()
    db.refresh(registration)

    return {
        "message": "Event join request submitted",
        "registration_id": registration.id,
        "event_id": event_id,
        "status": registration.status
    }
    
@router.patch("/registrations/{registration_id}/approve")
def approve_registration(
    registration_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    registration = (
        db.query(EventRegistration)
        .filter(EventRegistration.id == registration_id)
        .first()
    )

    if not registration:
        raise HTTPException(
            status_code=404,
            detail="Registration not found"
        )

    registration.status = "approved"

    db.commit()
    db.refresh(registration)

    return {
        "message": "Registration approved",
        "registration_id": registration.id,
        "status": registration.status
    }


@router.patch("/registrations/{registration_id}/reject")
def reject_registration(
    registration_id: int,
    db: Session = Depends(get_db),
    admin: User = Depends(get_current_admin)
):
    registration = (
        db.query(EventRegistration)
        .filter(EventRegistration.id == registration_id)
        .first()
    )

    if not registration:
        raise HTTPException(
            status_code=404,
            detail="Registration not found"
        )

    registration.status = "rejected"

    db.commit()
    db.refresh(registration)

    return {
        "message": "Registration rejected",
        "registration_id": registration.id,
        "status": registration.status
    }   