from datetime import datetime, timedelta, timezone

from jose import jwt


SECRET_KEY = "startup4nation-secret-key"
ALGORITHM = "HS256"


def create_access_token(user_id: int):
    expire = datetime.now(timezone.utc) + timedelta(hours=24)

    payload = {
        "user_id": user_id,
        "exp": expire
    }

    token = jwt.encode(
        payload,
        SECRET_KEY,
        algorithm=ALGORITHM
    )

    return token