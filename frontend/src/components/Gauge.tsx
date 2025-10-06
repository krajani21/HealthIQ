type Props = { value: number }; // 0..1
export default function Gauge({ value }: Props) {
  const pct = Math.max(0, Math.min(1, value));
  const size = 160, stroke = 14;
  const r = (size - stroke) / 2;
  const c = 2 * Math.PI * r;
  const dash = c * pct;
  const remainder = c - dash;
  const label = `${Math.round(pct * 100)}%`;
  const color =
    pct >= 0.8 ? "#dc2626" : pct >= 0.6 ? "#ea580c" : pct >= 0.4 ? "#d97706" : "#16a34a";

  return (
    <div className="relative inline-block">
      <svg width={size} height={size}>
        <defs>
          <linearGradient id="g" x1="0" x2="1" y1="0" y2="1">
            <stop offset="0%" stopColor={color} />
            <stop offset="100%" stopColor="#4f46e5" />
          </linearGradient>
        </defs>
        <g transform={`translate(${size/2},${size/2}) rotate(-90)`}>
          <circle r={r} fill="none" stroke="#e5e7eb" strokeWidth={stroke} />
          <circle
            r={r} fill="none" stroke="url(#g)" strokeWidth={stroke}
            strokeDasharray={`${dash} ${remainder}`} strokeLinecap="round"
          />
        </g>
      </svg>
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="text-center">
          <div className="text-3xl font-bold text-gray-800">{label}</div>
          <div className="text-xs text-gray-500">Predicted risk</div>
        </div>
      </div>
    </div>
  );
}
