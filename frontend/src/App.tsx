import { useEffect, useState } from "react";
import HealthForm from "./components/HealthForm";
import RiskCard from "./components/RiskCard";
import NavBar from "./components/NavBar";
import { healthCheck } from "./api/client";
import "./styles/theme.css";

export default function App() {
  const [risk, setRisk] = useState<number | null>(null);
  const [alive, setAlive] = useState<boolean | null>(null);

  useEffect(() => { healthCheck().then(setAlive).catch(() => setAlive(false)); }, []);

  return (
    <div className="min-h-screen">
      <NavBar />

      <main className="mx-auto max-w-6xl px-4 py-8 grid lg:grid-cols-2 gap-8">
        {/* Left: Form */}
        <section className="glass rounded-2xl p-6 lg:p-8 shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-gray-800">Diabetes Risk Assessment</h1>
            {alive !== null && (
              <span className={`px-2 py-1 text-xs rounded-full ${
                alive ? "bg-emerald-100 text-emerald-700" : "bg-red-100 text-red-700"
              }`}>
                API {alive ? "Connected" : "Offline"}
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 mb-6">
            Model trained on CDC BRFSS 2015 indicators. Enter your data to compute probability.
          </p>
          <HealthForm onResult={setRisk} />
        </section>

        {/* Right: Result + Info */}
        <section className="space-y-8">
          <div className="glass rounded-2xl p-6 lg:p-8 shadow-md">
            {risk !== null ? (
              <RiskCard score={risk} />
            ) : (
              <div className="text-center py-10">
                <div className="mx-auto mb-4 h-16 w-16 rounded-2xl bg-indigo-100 flex items-center justify-center">
                  <svg width="28" height="28" viewBox="0 0 24 24" className="text-indigo-600">
                    <path fill="currentColor" d="M11 7h2v6h-2zm0 8h2v2h-2z"/>
                  </svg>
                </div>
                <div className="text-gray-700 font-medium">Ready when you are</div>
                <div className="text-sm text-gray-500">Fill the form to see your risk</div>
              </div>
            )}
          </div>

          <div className="glass rounded-2xl p-6 lg:p-8 shadow-md">
            <h3 className="font-semibold text-gray-800 mb-3">Inputs you will provide</h3>
            <ul className="grid grid-cols-2 gap-2 text-sm text-gray-700">
              <li>• BMI</li>
              <li>• General health (1–5)</li>
              <li>• Physical activity</li>
              <li>• Smoking, alcohol</li>
              <li>• Healthcare access flags</li>
              <li>• Age, education, income</li>
            </ul>
          </div>
        </section>
      </main>

      <footer className="px-4 py-8 text-center text-xs text-gray-500">
        Not medical advice. For education only.
      </footer>
    </div>
  );
}
