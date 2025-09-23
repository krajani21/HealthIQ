from pydantic import BaseModel, Field

class PredictRequest(BaseModel):
    age: int = Field(..., ge=1, le=120)
    bmi: float = Field(..., ge=10, le=60)
    systolic_bp: float = Field(..., ge=60, le=220)
    glucose: float = Field(..., ge=50, le=300)

class PredictResponse(BaseModel):
    risk_score: float
