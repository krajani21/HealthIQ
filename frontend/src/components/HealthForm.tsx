import { useState } from "react";
import { predict } from "../api/client";

type Props = { onResult: (risk: number) => void };

export default function HealthForm({ onResult }: Props) {
  const [loading, setLoading] = useState(false);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    try {
      // TODO: collect real values from inputs; demo payload:
      const body = {
        pregnancies: 2, glucose: 148, bloodPressure: 72, skinThickness: 35,
        insulin: 0, bmi: 33.6, diabetesPedigree: 0.627, age: 50
      };
      const res = await predict(body);
      onResult(res.risk);
    } finally { setLoading(false); }
  }

  return (
    <form onSubmit={onSubmit}>
      <button disabled={loading}>{loading ? "Predicting..." : "Predict"}</button>
    </form>
  );
}
