import Gauge from "./Gauge";

export default function RiskCard({ score }: { score: number }) {
  const pct = Math.round(score * 100);
  const bucket = pct < 30 ? "low" : pct < 60 ? "moderate" : pct < 80 ? "high" : "veryhigh";

  const styles: Record<string, { box: string; text: string; label: string }> = {
    low:      { box: "bg-green-50 border-green-200", text: "text-green-800", label: "Low" },
    moderate: { box: "bg-yellow-50 border-yellow-200", text: "text-yellow-800", label: "Moderate" },
    high:     { box: "bg-orange-50 border-orange-200", text: "text-orange-800", label: "High" },
    veryhigh: { box: "bg-red-50 border-red-200", text: "text-red-800", label: "Very High" },
  };
  const s = styles[bucket];

  const msg =
    bucket === "low" ? "Risk is low. Maintain healthy habits."
    : bucket === "moderate" ? "Moderate risk. Consider a checkup."
    : bucket === "high" ? "High risk. Book a consultation."
    : "Very high risk. Seek medical advice.";

  const recs =
    bucket === "low" ? ["Balanced diet", "Regular activity", "Periodic screening"]
    : bucket === "moderate" ? ["Consult a provider", "Improve diet quality", "Increase activity", "Monitor glucose"]
    : bucket === "high" ? ["Book screening", "Implement changes", "Track metrics closely"]
    : ["See a clinician", "Comprehensive screening", "Tight lifestyle controls"];

  return (
    <div className={`border-2 rounded-2xl p-6 lg:p-8 ${s.box}`}>
      <div className="flex flex-col items-center gap-4">
        <Gauge value={score} />
        <div className={`px-3 py-1 rounded-full text-sm font-medium ${s.text} bg-white border ${s.box.split(" ").at(-1)}`}>
          {s.label} risk
        </div>
        <div className="text-sm text-gray-700 text-center max-w-sm">{msg}</div>
      </div>

      <div className="mt-6">
        <h4 className="font-semibold text-gray-800 mb-2">Recommendations</h4>
        <ul className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {recs.map((r, i) => (
            <li key={i} className="text-sm text-gray-700 flex items-start">
              <span className="text-indigo-600 mr-2">•</span>{r}
            </li>
          ))}
        </ul>
      </div>

      <div className="mt-6 p-3 bg-blue-50 border border-blue-200 rounded-md text-xs text-blue-800">
        Informational only. Not medical advice.
      </div>
    </div>
  );
}
