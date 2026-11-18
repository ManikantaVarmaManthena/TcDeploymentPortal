import json
from pathlib import Path
from fastapi import APIRouter

router = APIRouter()

@router.get("/environments")
def get_environments():

    config_file = (
        Path("config")
        / "environments.json"
    )

    with open(config_file, "r") as file:
        data = json.load(file)

    return data