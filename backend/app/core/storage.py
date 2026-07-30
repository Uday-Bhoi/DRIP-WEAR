from abc import ABC, abstractmethod
from typing import Dict, Any

class StorageProvider(ABC):
    @abstractmethod
    def generate_upload_signature(self, folder: str) -> Dict[str, Any]:
        pass

    @abstractmethod
    def delete_file(self, public_id: str) -> bool:
        pass
