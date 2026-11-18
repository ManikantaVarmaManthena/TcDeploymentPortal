from fastapi import FastAPI
from api.validation_api import router as validation_router
from api.artifact_api import router as artifact_router
from api.environment_api import  router as env_router
from api.upload_api import router as upload_router
from api.deployment_plan_api import router as deployment_plan_router
from api.execute_api import router as execute_router
from api.log_api import router as log_router


app = FastAPI(
    title="Teamcenter Deployment Portal",
    version="1.0"
)

app.include_router(env_router)
app.include_router(upload_router)
app.include_router(validation_router)
app.include_router(artifact_router)
app.include_router(deployment_plan_router)
app.include_router(execute_router)
app.include_router(log_router)

@app.get("/")
def home():
    return {
        "application":
        "Teamcenter Deployment Portal"
    }