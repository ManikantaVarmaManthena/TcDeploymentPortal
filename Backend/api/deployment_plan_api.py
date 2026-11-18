from fastapi import APIRouter
from services.artifact_service import (
    load_artifact_matrix
)

router = APIRouter()

@router.get(
    "/deployment-plan/{artifact_type}"
)
def get_plan(
    artifact_type: str
):

    matrix = load_artifact_matrix()

    if artifact_type not in matrix:

        return {
            "status":"FAILED",
            "message":"Unknown artifact"
        }

    return {
        "status":"SUCCESS",
        "artifact":artifact_type,
        "plan":matrix[artifact_type]
    }