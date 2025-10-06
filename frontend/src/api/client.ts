export const API_BASE =
  (import.meta.env.VITE_API_BASE_URL as string) ||
  (import.meta.env.VITE_API_BASE as string) || // fallback to your old var
  "http://localhost:8000";

/** BRFSS 2015 feature schema */
export interface HealthIndicators {
  HighBP: number;
  HighChol: number;
  CholCheck: number;
  BMI: number;
  Smoker: number;
  Stroke: number;
  HeartDiseaseorAttack: number;
  PhysActivity: number;
  Fruits: number;
  Veggies: number;
  HvyAlcoholConsump: number;
  AnyHealthcare: number;
  NoDocbcCost: number;
  GenHlth: number;
  MentHlth: number;
  PhysHlth: number;
  DiffWalk: number;
  Sex: number;
  Age: number;
  Education: number;
  Income: number;
}

type PredictionResponse = { probability: number };

export class ApiError extends Error {
  public status?: number;
  public statusText?: string;

  constructor(message: string, status?: number, statusText?: string) {
    super(message);
    this.name = "ApiError";
    this.status = status;
    this.statusText = statusText;
  }
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    let msg = `HTTP ${response.status}: ${response.statusText}`;
    try {
      const j = await response.json();
      if (j?.detail) {
        msg = Array.isArray(j.detail)
          ? j.detail.map((e: any) => e.msg || e.message || JSON.stringify(e)).join(", ")
          : j.detail;
      } else if (j?.message) msg = j.message;
      else if (j?.error) msg = j.error;
    } catch {
      try {
        const t = await response.text();
        if (t) msg = t;
      } catch {}
    }
    throw new ApiError(msg, response.status, response.statusText);
  }
  return response.json();
}

export async function predict(body: HealthIndicators): Promise<number> {
  try {
    const res = await fetch(`${API_BASE}/predict`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await handleResponse<PredictionResponse>(res);
    return data.probability; // 0..1
  } catch (error) {
    if (error instanceof ApiError) throw error;
    if (error instanceof TypeError && error.message.includes("fetch")) {
      throw new ApiError(
        "Unable to connect to the server. Ensure the backend is running.",
        0,
        "Network Error"
      );
    }
    throw new ApiError(error instanceof Error ? error.message : "Unknown error", 0, "Unknown");
  }
}

export async function healthCheck(): Promise<boolean> {
  try {
    const r = await fetch(`${API_BASE}/health`);
    return r.ok;
  } catch {
    return false;
  }
}
