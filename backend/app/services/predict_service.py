import os, joblib, numpy as np
from datetime import datetime, timezone
from dotenv import load_dotenv

load_dotenv()

FEATURES = [
    "pregnancies","glucose","bloodPressure","skinThickness",
    "insulin","bmi","diabetesPedigree","age"
]

MODEL_DIR = os.getenv("MODEL_DIR", "app/model")
MODEL_VERSION = os.getenv("MODEL_VERSION", "unknown")
MODEL_PATH = os.path.join(MODEL_DIR, "model.joblib")
MODEL = joblib.load(MODEL_PATH)

def predict_one(payload: dict):
    x = np.array([[payload[f] for f in FEATURES]], dtype=float)
    risk = float(MODEL.predict_proba(x)[0, 1])
    return {
        "risk": risk,
        "modelVersion": MODEL_VERSION,
        "ts": datetime.now(timezone.utc).isoformat()
    }
