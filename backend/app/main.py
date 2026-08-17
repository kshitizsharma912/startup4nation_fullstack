from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.database.connection import Base, engine
from app.models.user import User
from app.routers import auth ,users ,events
from app.models.event import Event
from app.models.event_registration import EventRegistration

Base.metadata.create_all(bind=engine)


app = FastAPI(
    title="Startup4Nation API",
    description="Backend API for Startup4Nation",
    version="1.0.0"
)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://startup4nation-frontend-8eaf.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(auth.router)
app.include_router(users.router)
app.include_router(events.router)

@app.get("/")
def root():
    return {
        "message": "Startup4Nation API is running"
    }