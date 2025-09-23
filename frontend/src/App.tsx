import { useState } from "react";
import HealthForm from "./components/HealthForm";
import RiskCard from "./components/RiskCard";

function App() {
  const [risk, setRisk] = useState<number | null>(null);

  return (
    <div className="max-w-xl mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">HealthIQ MVP</h1>
      <HealthForm onResult={setRisk} />
      {risk !== null && <RiskCard score={risk} />}
    </div>
  );
}

export default App;
