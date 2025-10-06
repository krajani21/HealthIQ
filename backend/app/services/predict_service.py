# services/predict_service.py
import joblib, pandas as pd, os

MODEL_PATH = os.path.join(os.path.dirname(__file__), "..", "model", "model.joblib")
_art = joblib.load(MODEL_PATH)               # {"model": clf, "features": [...]}
_model = _art["model"]
_FEATURES = _art["features"]

def predict_proba(payload_dict: dict) -> float:
    # payload_dict keys must match schema and FEATURES names
    X = pd.DataFrame([[payload_dict[f] for f in _FEATURES]], columns=_FEATURES)
    return float(_model.predict_proba(X)[:,1][0])
