from fastapi import APIRouter
from app.schemas.prediction import HealthInput, PredictionOut
from app.services.predict_service import predict_one

router = APIRouter()

@router.post("", response_model=PredictionOut)
def predict_endpoint(data: HealthInput):
    return predict_one(data.dict())
