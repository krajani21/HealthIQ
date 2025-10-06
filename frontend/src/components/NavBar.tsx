export default function NavBar() {
  return (
    <header className="sticky top-0 z-10">
      <div className="mx-auto max-w-6xl px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="h-8 w-8 rounded-xl bg-indigo-600"></div>
          <span className="text-lg font-semibold text-gray-800">HealthIQ</span>
        </div>
        <div className="hidden sm:flex items-center gap-3 text-xs">
          <span className="kbd">CDC BRFSS 2015</span>
          <span className="kbd">FastAPI</span>
          <span className="kbd">Logistic Regression</span>
        </div>
      </div>
    </header>
  );
}
