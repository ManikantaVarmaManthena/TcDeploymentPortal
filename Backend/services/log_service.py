import json
from pathlib import Path

LOG_FILE = Path(
    "logs/deployments.json"
)

def save_log(record):

    with open(LOG_FILE, "r") as file:
        logs = json.load(file)

    logs.append(record)

    with open(LOG_FILE, "w") as file:
        json.dump(
            logs,
            file,
            indent=4
        )