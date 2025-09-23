from fastapi import FastAPI
from .routes import predict

app = FastAPI(title="HealthIQ API")

# include prediction route
app.include_router(predict.router, prefix="/predict", tags=["predict"])

@app.get("/health")
def health_check():
    return {"status": "ok"}
