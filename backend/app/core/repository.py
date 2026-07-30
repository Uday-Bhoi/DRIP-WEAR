from abc import ABC, abstractmethod
from typing import Generic, TypeVar, List, Optional

T = TypeVar('T')

class AbstractRepository(ABC, Generic[T]):
    @abstractmethod
    def get_by_id(self, id: int) -> Optional[T]:
        pass

    @abstractmethod
    def get_all(self, skip: int = 0, limit: int = 100) -> List[T]:
        pass

    @abstractmethod
    def create(self, obj_in: T) -> T:
        pass

    @abstractmethod
    def delete(self, id: int) -> bool:
        pass
