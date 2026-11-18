from fastapi import APIRouter
from datetime import datetime
from services.log_service import save_log

router = APIRouter()

@router.post(
    "/execute/{artifact_type}"
)
def execute_deployment(
        artifact_type: str
):

    record = {

        "artifact":
            artifact_type,

        "status":
            "SUCCESS",

        "time":
            str(datetime.now())
    }

    save_log(record)

    return {
        "status": "SUCCESS",
        "artifact": artifact_type,
        "executionTime":
            str(datetime.now()),
        "message":
            "Deployment simulated successfully"
    }