import json
from fastapi import APIRouter

router = APIRouter()

@router.get("/logs")
def get_logs():

    with open(
        "logs/deployments.json",
        "r"
    ) as file:

        logs = json.load(file)

    return logs