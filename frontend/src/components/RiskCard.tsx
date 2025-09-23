export default function RiskCard({ score }: { score: number }) {
  return (
    <div className="mt-4 border p-4 rounded">
      <p className="font-semibold">Estimated Risk</p>
      <p className="text-2xl">{Math.round(score * 100)}%</p>
    </div>
  );
}
