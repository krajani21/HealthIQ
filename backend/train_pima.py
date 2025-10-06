import os
import pandas as pd, joblib
from sklearn.model_selection import train_test_split, GridSearchCV, StratifiedKFold
from sklearn.preprocessing import StandardScaler
from sklearn.linear_model import LogisticRegression
from sklearn.pipeline import Pipeline
from sklearn.metrics import roc_auc_score

# Load and normalize column names to what the API expects
df = pd.read_csv("pima_diabetes.csv")
df = df.rename(columns={
    "Pregnancies":"pregnancies",
    "Glucose":"glucose",
    "BloodPressure":"bloodPressure",
    "SkinThickness":"skinThickness",
    "Insulin":"insulin",
    "BMI":"bmi",
    "DiabetesPedigreeFunction":"diabetesPedigree",
    "Age":"age"
})

FEATURES = ["pregnancies","glucose","bloodPressure","skinThickness",
            "insulin","bmi","diabetesPedigree","age"]

X, y = df[FEATURES], df["Outcome"]  # 'Outcome' stays as-is
Xtr, Xte, ytr, yte = train_test_split(X, y, test_size=0.2, random_state=42, stratify=y)

# Base pipeline
pipe = Pipeline([("scaler", StandardScaler()),
			 ("clf", LogisticRegression(solver="lbfgs", max_iter=500))])

# Hyperparameter tuning with ROC AUC
param_grid = {
	"clf__C": [0.01, 0.1, 1.0, 3.0, 10.0],
	"clf__class_weight": [None, "balanced"],
}

cv = StratifiedKFold(n_splits=5, shuffle=True, random_state=42)
grid = GridSearchCV(pipe, param_grid=param_grid, scoring="roc_auc", cv=cv, n_jobs=-1, refit=True)
grid.fit(Xtr, ytr)

best_model = grid.best_estimator_
test_auc = roc_auc_score(yte, best_model.predict_proba(Xte)[:,1])

print("Best CV AUC:", round(grid.best_score_, 4))
print("Best Params:", grid.best_params_)
print("Test AUC:", round(test_auc, 4))

# Save the best model inside the backend model directory so the API can load it
model_dir = os.path.join("app", "model")
os.makedirs(model_dir, exist_ok=True)
joblib.dump(best_model, os.path.join(model_dir, "model.joblib"))
