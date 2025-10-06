from fastapi import APIRouter
from app.schemas.prediction import HealthIndicators
from app.services.predict_service import predict_proba

router = APIRouter()

@router.post("")
def predict_endpoint(data: HealthIndicators):
    prob = predict_proba(data.dict())
    return {"probability": prob}
