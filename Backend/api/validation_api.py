from fastapi import APIRouter
from validators.xml_validator import validate_xml
import os

router = APIRouter()


@router.get("/validate/{file_name}")
def validate_file(file_name: str):

    file_path = os.path.join(
        "uploads",
        file_name
    )

    if not os.path.exists(file_path):
        return {
            "status": "FAILED",
            "message": "File not found"
        }

    return validate_xml(file_path)