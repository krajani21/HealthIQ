export default function RiskCard({ score }: { score: number }) {
  const pct = Math.round(score * 100);

  const bucket =
    pct < 30 ? "low" : pct < 60 ? "moderate" : pct < 80 ? "high" : "veryhigh";

  const styles: Record<string, { box: string; text: string; pill: string; label: string }> = {
    low:      { box: "bg-green-50 border-green-200", text: "text-green-800", pill: "bg-green-100", label: "Low" },
    moderate: { box: "bg-yellow-50 border-yellow-200", text: "text-yellow-800", pill: "bg-yellow-100", label: "Moderate" },
    high:     { box: "bg-orange-50 border-orange-200", text: "text-orange-800", pill: "bg-orange-100", label: "High" },
    veryhigh: { box: "bg-red-50 border-red-200", text: "text-red-800", pill: "bg-red-100", label: "Very High" },
  };

  const msg =
    bucket === "low" ? "Risk is relatively low. Maintain healthy habits."
    : bucket === "moderate" ? "Moderate risk. Consider a checkup."
    : bucket === "high" ? "High risk. Schedule a consultation soon."
    : "Very high risk. Seek medical advice promptly.";

  const recs =
    bucket === "low" ? ["Balanced diet", "Regular exercise", "Periodic checkups"]
    : bucket === "moderate" ? ["Consult a provider", "Improve diet quality", "Increase activity", "Monitor glucose"]
    : bucket === "high" ? ["Book screening", "Implement changes", "Track metrics closely"]
    : ["Seek medical attention", "Comprehensive screening", "Tight lifestyle controls"];

  const s = styles[bucket];

  return (
    <div className={`mt-6 ${s.box} border-2 rounded-lg p-6 shadow-lg`}>
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold mb-2">Diabetes Risk</h3>
        <div className={`text-4xl font-bold ${s.text} mb-2`}>{pct}%</div>
        <div className={`inline-block px-3 py-1 rounded-full text-sm font-medium ${s.pill} ${s.text}`}>
          {s.label} Risk
        </div>
      </div>
      <p className="text-gray-700 text-sm mb-3">{msg}</p>
      <h4 className="font-semibold text-gray-800 mb-2">Recommendations</h4>
      <ul className="space-y-1">
        {recs.map((r, i) => (
          <li key={i} className="text-sm text-gray-700 flex items-start">
            <span className="text-blue-500 mr-2">•</span>{r}
          </li>
        ))}
      </ul>
      <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
        <p className="text-xs text-blue-800">
          <strong>Disclaimer:</strong> Informational only. Consult a clinician.
        </p>
      </div>
    </div>
  );
}
