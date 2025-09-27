from pydantic import BaseModel, Field

class HealthInput(BaseModel):
    pregnancies: float = Field(..., ge=0)
    glucose: float
    bloodPressure: float
    skinThickness: float
    insulin: float
    bmi: float
    diabetesPedigree: float
    age: float

class PredictionOut(BaseModel):
    risk: float
    modelVersion: str
    ts: str
