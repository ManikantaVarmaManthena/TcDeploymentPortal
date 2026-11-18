from fastapi import APIRouter

router = APIRouter()

@router.get("/artifact/{file_name}")
def get_artifact_type(file_name: str):

    print("Artifact API Called")

    return {
        "status": "SUCCESS",
        "fileName": file_name,
        "artifactType": "Preference"
    }