import { useState } from "react";
import { api } from "../api/client";

type Props = { onResult: (score: number) => void };

export default function HealthForm({ onResult }: Props) {
  const [age, setAge] = useState(30);
  const [bmi, setBmi] = useState(25);
  const [systolic_bp, setBp] = useState(120);
  const [glucose, setGlucose] = useState(100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const { data } = await api.post("/predict", { age, bmi, systolic_bp, glucose });
    onResult(data.risk_score);
  };

  return (
    <form className="grid gap-3" onSubmit={handleSubmit}>
      <input type="number" value={age} onChange={e => setAge(+e.target.value)} placeholder="Age" className="border p-2 rounded"/>
      <input type="number" step="0.1" value={bmi} onChange={e => setBmi(+e.target.value)} placeholder="BMI" className="border p-2 rounded"/>
      <input type="number" value={systolic_bp} onChange={e => setBp(+e.target.value)} placeholder="Systolic BP" className="border p-2 rounded"/>
      <input type="number" value={glucose} onChange={e => setGlucose(+e.target.value)} placeholder="Glucose" className="border p-2 rounded"/>
      <button className="bg-black text-white px-4 py-2 rounded">Predict</button>
    </form>
  );
}
