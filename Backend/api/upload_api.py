from fastapi import APIRouter, UploadFile, File
import os

router = APIRouter()

UPLOAD_FOLDER = "uploads"

os.makedirs(
    UPLOAD_FOLDER,
    exist_ok=True
)

@router.post("/upload")
async def upload_file(
    file: UploadFile = File(...)
):

    file_path = os.path.join(
        UPLOAD_FOLDER,
        file.filename
    )

    content = await file.read()

    with open(file_path, "wb") as f:
        f.write(content)

    return {
        "status": "SUCCESS",
        "fileName": file.filename,
        "size": len(content),
        "extension": file.filename.split(".")[-1]
    }