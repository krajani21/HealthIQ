from ..schemas.prediction import PredictRequest

def predict_risk(req: PredictRequest) -> float:
    # Simple placeholder logic — replace with ML model later
    score = (req.bmi / 40) * 0.5 + (req.glucose - 80) / 200 * 0.5
    return round(max(0, min(score, 1)), 3)
