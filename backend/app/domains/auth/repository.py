from sqlalchemy.orm import Session
from app.domains.auth.models import User
from app.domains.auth.schemas import UserCreate, AuthSyncRequest
from app.core.security import get_password_hash

class UserRepository:
    def __init__(self, db: Session):
        self.db = db

    def get_by_id(self, user_id: str) -> User | None:
        return self.db.query(User).filter(User.id == user_id).first()

    def get_by_email(self, email: str) -> User | None:
        return self.db.query(User).filter(User.email == email).first()

    def create(self, user_in: UserCreate) -> User:
        db_user = User(
            email=user_in.email,
            hashed_password=get_password_hash(user_in.password),
            full_name=user_in.full_name
        )
        self.db.add(db_user)
        self.db.commit()
        self.db.refresh(db_user)
        return db_user

    def get_or_create_firebase_user(self, sync_req: AuthSyncRequest) -> User:
        user = self.get_by_id(sync_req.firebase_uid)
        if not user:
            user = self.get_by_email(sync_req.email)

        if not user:
            user = User(
                id=sync_req.firebase_uid,
                email=sync_req.email,
                hashed_password=get_password_hash("firebase_oauth_secure_dummy_pass"),
                full_name=sync_req.full_name or sync_req.email.split('@')[0]
            )
            self.db.add(user)
            self.db.commit()
            self.db.refresh(user)
        elif sync_req.full_name and not user.full_name:
            user.full_name = sync_req.full_name
            self.db.commit()
            self.db.refresh(user)

        return user
