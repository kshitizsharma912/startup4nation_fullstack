from pydantic import BaseModel, EmailStr


class UserRegister(BaseModel):
    name: str
    email: EmailStr
    password: str
    phone: str | None = None
    city: str | None = None
    bio: str | None = None


class UserLogin(BaseModel):
    email: EmailStr
    password: str


class UserUpdate(BaseModel):
    name: str | None = None
    phone: str | None = None
    city: str | None = None
    bio: str | None = None
    
class UserResponse(BaseModel):
    id: int
    name: str
    email: EmailStr
    phone: str | None
    city: str | None
    bio: str | None

    class Config:
        from_attributes = True