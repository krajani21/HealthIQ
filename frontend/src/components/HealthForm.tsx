import { useState } from "react";
import { predict, ApiError, type HealthIndicators } from "../api/client";

type Props = { onResult: (risk: number) => void };

const binaryKeys: (keyof HealthIndicators)[] = [
  "HighBP","HighChol","CholCheck","Smoker","Stroke","HeartDiseaseorAttack",
  "PhysActivity","Fruits","Veggies","HvyAlcoholConsump","AnyHealthcare",
  "NoDocbcCost","DiffWalk",
];

export default function HealthForm({ onResult }: Props) {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [form, setForm] = useState<HealthIndicators>({
    HighBP: 0,
    HighChol: 0,
    CholCheck: 1,
    BMI: 25,
    Smoker: 0,
    Stroke: 0,
    HeartDiseaseorAttack: 0,
    PhysActivity: 1,
    Fruits: 1,
    Veggies: 1,
    HvyAlcoholConsump: 0,
    AnyHealthcare: 1,
    NoDocbcCost: 0,
    GenHlth: 3,        // 1=excellent ... 5=poor
    MentHlth: 0,       // days 0..30
    PhysHlth: 0,       // days 0..30
    DiffWalk: 0,
    Sex: 1,            // 0=female,1=male
    Age: 9,            // BRFSS age bucket 9≈45-49; keep as coded integer
    Education: 4,      // ordinal
    Income: 5,         // ordinal
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
    <div className="bg-white rounded-lg shadow-lg p-6">
      <form onSubmit={onSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {binaryKeys.map((k) => (
            <label key={k} className="flex items-center justify-between border rounded-md px-3 py-2">
              <span>{k}</span>
              <select
                className="border rounded px-2 py-1"
                value={form[k]}
                onChange={(e) => up(k, Number(e.target.value))}
              >
                <option value={0}>0</option>
                <option value={1}>1</option>
              </select>
            </label>
          ))}

          <label className="flex items-center justify-between border rounded-md px-3 py-2">
            <span>BMI</span>
            <input
              type="number"
              step="0.1"
              className="border rounded px-2 py-1 w-28 text-right"
              value={form.BMI}
              onChange={(e) => up("BMI", Number(e.target.value))}
            />
          </label>

          <label className="flex items-center justify-between border rounded-md px-3 py-2">
            <span>GenHlth (1–5)</span>
            <input
              type="number" min={1} max={5}
              className="border rounded px-2 py-1 w-20 text-right"
              value={form.GenHlth}
              onChange={(e) => up("GenHlth", Number(e.target.value))}
            />
          </label>

          <label className="flex items-center justify-between border rounded-md px-3 py-2">
            <span>MentHlth days (0–30)</span>
            <input
              type="number" min={0} max={30}
              className="border rounded px-2 py-1 w-20 text-right"
              value={form.MentHlth}
              onChange={(e) => up("MentHlth", Number(e.target.value))}
            />
          </label>

          <label className="flex items-center justify-between border rounded-md px-3 py-2">
            <span>PhysHlth days (0–30)</span>
            <input
              type="number" min={0} max={30}
              className="border rounded px-2 py-1 w-20 text-right"
              value={form.PhysHlth}
              onChange={(e) => up("PhysHlth", Number(e.target.value))}
            />
          </label>

          <label className="flex items-center justify-between border rounded-md px-3 py-2">
            <span>Sex (0=female,1=male)</span>
            <select
              className="border rounded px-2 py-1"
              value={form.Sex}
              onChange={(e) => up("Sex", Number(e.target.value))}
            >
              <option value={0}>0</option>
              <option value={1}>1</option>
            </select>
          </label>

          <label className="flex items-center justify-between border rounded-md px-3 py-2">
            <span>Age code</span>
            <input
              type="number" min={1} max={13}
              className="border rounded px-2 py-1 w-20 text-right"
              value={form.Age}
              onChange={(e) => up("Age", Number(e.target.value))}
            />
          </label>

          <label className="flex items-center justify-between border rounded-md px-3 py-2">
            <span>Education code</span>
            <input
              type="number" min={1} max={6}
              className="border rounded px-2 py-1 w-20 text-right"
              value={form.Education}
              onChange={(e) => up("Education", Number(e.target.value))}
            />
          </label>

          <label className="flex items-center justify-between border rounded-md px-3 py-2">
            <span>Income code</span>
            <input
              type="number" min={1} max={8}
              className="border rounded px-2 py-1 w-20 text-right"
              value={form.Income}
              onChange={(e) => up("Income", Number(e.target.value))}
            />
          </label>
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-md text-sm">
            {error}
          </div>
        )}

        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 px-4 rounded-md font-medium ${
            loading ? "bg-gray-400 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"
          }`}
        >
          {loading ? "Predicting…" : "Predict Diabetes Risk"}
        </button>
      </form>
    </div>
  );
}
