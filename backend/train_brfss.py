# train_brfss.py
import os, joblib, pandas as pd
from sklearn.model_selection import train_test_split, StratifiedKFold, GridSearchCV
from sklearn.compose import ColumnTransformer
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import roc_auc_score

# 1) Load BRFSS 2015 diabetes health indicators
CSV_PATH = "diabetes_binary_health_indicators_BRFSS2015.csv"  # adjust if your filename differs
df = pd.read_csv(CSV_PATH)

TARGET = "Diabetes_binary"
FEATURES = [
    "HighBP","HighChol","CholCheck","BMI","Smoker","Stroke","HeartDiseaseorAttack",
    "PhysActivity","Fruits","Veggies","HvyAlcoholConsump","AnyHealthcare","NoDocbcCost",
    "GenHlth","MentHlth","PhysHlth","DiffWalk","Sex","Age","Education","Income"
]

X, y = df[FEATURES], df[TARGET].astype(int)

# 2) Scale only quasi-continuous columns; passthrough the rest
num_cols = ["BMI","MentHlth","PhysHlth"]
pre = ColumnTransformer([
    ("num", StandardScaler(), num_cols),
    ("ord", "passthrough", [c for c in FEATURES if c not in num_cols]),
])

# 3) Model + CV
pipe = Pipeline([
    ("pre", pre),
    ("clf", LogisticRegression(max_iter=1000, solver="lbfgs"))
])

param_grid = {
    "clf__C": [0.05, 0.1, 0.3, 1, 3],
    "clf__class_weight": [None, "balanced"],
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, stratify=y, random_state=42)
grid = GridSearchCV(pipe, param_grid, scoring="roc_auc", cv=cv, n_jobs=-1, refit=True)
grid.fit(Xtr, ytr)

best = grid.best_estimator_
auc_te = roc_auc_score(yte, best.predict_proba(Xte)[:,1])
print("Best CV AUC:", round(grid.best_score_, 4))
print("Best Params:", grid.best_params_)
print("Test AUC:", round(auc_te, 4))

# 4) Save model + feature order for the API
model_dir = os.path.join("app","model")
os.makedirs(model_dir, exist_ok=True)
joblib.dump({"model": best, "features": FEATURES}, os.path.join(model_dir, "model.joblib"))
