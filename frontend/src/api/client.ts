export const API_BASE = (import.meta.env.VITE_API_BASE as string) || "http://localhost:8000";

export async function predict(body: any) {
  const res = await fetch(`${API_BASE}/predict`, {
    method: "POST",
    headers: {"Content-Type":"application/json"},
    body: JSON.stringify(body)
  });
  if (!res.ok) throw new Error(await res.text());
  return res.json();
}
