import pandas as pd, joblib
from sklearn.model_selection import train_test_split
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

pipe = Pipeline([("scaler", StandardScaler()),
                 ("clf", LogisticRegression(max_iter=200))]).fit(Xtr, ytr)

print("AUC:", roc_auc_score(yte, pipe.predict_proba(Xte)[:,1]))
joblib.dump(pipe, "model.joblib")
