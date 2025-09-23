from fastapi import APIRouter
from ..schemas.prediction import PredictRequest, PredictResponse
from ..services.predict_service import predict_risk

router = APIRouter()

@router.post("", response_model=PredictResponse)
def predict(req: PredictRequest):
    score = predict_risk(req)
    return PredictResponse(risk_score=score)
