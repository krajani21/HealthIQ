from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.routes import predict

app = FastAPI(title="HealthIQ API", version="1.0.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/health")
def health_check():
    return {"status": "healthy", "service": "HealthIQ API"}

@app.get("/")
def root():
    return {"message": "HealthIQ API - Diabetes Risk Prediction", "version": "1.0.0"}

app.include_router(predict.router, prefix="/predict", tags=["predict"])
