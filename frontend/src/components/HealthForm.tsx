import { useState } from "react";
import { predict, ApiError, type HealthIndicators } from "../api/client";

type Props = { onResult: (risk: number) => void };

const binKeys: (keyof HealthIndicators)[] = [
  "HighBP","HighChol","CholCheck","Smoker","Stroke","HeartDiseaseorAttack",
  "PhysActivity","Fruits","Veggies","HvyAlcoholConsump","AnyHealthcare","NoDocbcCost","DiffWalk",
];

export default function HealthForm({ onResult }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<HealthIndicators>({
    HighBP: 0, HighChol: 0, CholCheck: 1, BMI: 25,
    Smoker: 0, Stroke: 0, HeartDiseaseorAttack: 0, PhysActivity: 1,
    Fruits: 1, Veggies: 1, HvyAlcoholConsump: 0, AnyHealthcare: 1,
    NoDocbcCost: 0, GenHlth: 3, MentHlth: 0, PhysHlth: 0, DiffWalk: 0,
    Sex: 1, Age: 9, Education: 4, Income: 5,
  });

  function up<K extends keyof HealthIndicators>(k: K, v: number) {
    setForm((f) => ({ ...f, [k]: v }));
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (Number.isNaN(form.BMI)) throw new Error("BMI must be a number");
      const p = await predict(form);
      onResult(p);
    } catch (err) {
      setError(err instanceof ApiError ? err.message : "Prediction failed");
    } finally {
      setLoading(false);
    }
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      {/* Section: Lifestyle and Access */}
      <div>
        <div className="section-title">Lifestyle & Access</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {binKeys.map((k) => (
            <label key={k} className="block">
              <span className="label">{k}</span>
              <select
                className="select"
                value={form[k]}
                onChange={(e) => up(k, Number(e.target.value))}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
              </select>
            </label>
          ))}
        </div>
      </div>

      {/* Section: Health metrics */}
      <div>
        <div className="section-title">Health Metrics</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="label">BMI</span>
            <input type="number" step="0.1" className="input"
              value={form.BMI} onChange={(e) => up("BMI", Number(e.target.value))}/>
            <div className="help">e.g., 24.5</div>
          </label>

          <label className="block">
            <span className="label">GenHlth (1–5)</span>
            <input type="number" min={1} max={5} className="input"
              value={form.GenHlth} onChange={(e) => up("GenHlth", Number(e.target.value))}/>
          </label>

          <label className="block">
            <span className="label">MentHlth days (0–30)</span>
            <input type="number" min={0} max={30} className="input"
              value={form.MentHlth} onChange={(e) => up("MentHlth", Number(e.target.value))}/>
          </label>

          <label className="block">
            <span className="label">PhysHlth days (0–30)</span>
            <input type="number" min={0} max={30} className="input"
              value={form.PhysHlth} onChange={(e) => up("PhysHlth", Number(e.target.value))}/>
          </label>
        </div>
      </div>

      {/* Section: Demographics */}
      <div>
        <div className="section-title">Demographics</div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <label className="block">
            <span className="label">Sex (0=female,1=male)</span>
            <select className="select" value={form.Sex} onChange={(e) => up("Sex", Number(e.target.value))}>
              <option value={0}>0</option><option value={1}>1</option>
            </select>
          </label>

          <label className="block">
            <span className="label">Age code (1–13)</span>
            <input type="number" min={1} max={13} className="input"
              value={form.Age} onChange={(e) => up("Age", Number(e.target.value))}/>
          </label>

          <label className="block">
            <span className="label">Education code (1–6)</span>
            <input type="number" min={1} max={6} className="input"
              value={form.Education} onChange={(e) => up("Education", Number(e.target.value))}/>
          </label>

          <label className="block">
            <span className="label">Income code (1–8)</span>
            <input type="number" min={1} max={8} className="input"
              value={form.Income} onChange={(e) => up("Income", Number(e.target.value))}/>
          </label>
        </div>
      </div>

      {error && (
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
          {error}
        </div>
      )}

      <button
        type="submit"
        disabled={loading}
        className={`w-full py-3 px-4 rounded-lg font-medium text-white shadow ${
          loading ? "bg-gray-400 cursor-not-allowed" : "bg-indigo-600 hover:bg-indigo-700"
        }`}
      >
        {loading ? "Predicting…" : "Predict Risk"}
      </button>
    </form>
  );
}
