const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8787";

// Helper to get frontend base URL for generating invitation links
export function getFrontendBaseUrl(): string {
  if (typeof window !== "undefined") {
    return window.location.origin;
  }
  return process.env.NEXT_PUBLIC_FRONTEND_URL || "http://localhost:3000";
}

interface ApiError {
  success: false;
  message: string;
}

async function handleResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const error: ApiError = await response.json().catch(() => ({
      success: false,
      message: "An error occurred",
    }));
    throw new Error(error.message || `HTTP ${response.status}`);
  }
  return response.json();
}

export async function get<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "GET",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse<T>(response);
}

export async function post<T>(
  endpoint: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(response);
}

export async function patch<T>(
  endpoint: string,
  body?: Record<string, unknown>,
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "PATCH",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: body ? JSON.stringify(body) : undefined,
  });
  return handleResponse<T>(response);
}

export async function del<T>(endpoint: string): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${endpoint}`, {
    method: "DELETE",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
  });
  return handleResponse<T>(response);
}

// Public API endpoints
export interface Zodiac {
  id: number;
  name: string;
  name_en: string;
  image: string;
}

export async function getZodiacs(): Promise<{
  success: boolean;
  data: Zodiac[];
}> {
  return get<{ success: boolean; data: Zodiac[] }>("/api/public/zodiac");
}

export interface ForecastData {
  general_forecast?: string;
  ranking?: number;
  career: { text: string; rating?: number };
  wealth: { text: string; rating?: number };
  health: { text: string; rating?: number };
  romance: { text: string; rating?: number };
  lucky_number?: string;
  source_link?: string;
}

export async function getForecastByZodiac(
  zodiacName: string,
  year: number,
): Promise<{ success: boolean; data: ForecastData }> {
  return get<{ success: boolean; data: ForecastData }>(
    `/api/public/zodiac/${zodiacName}/forecast/${year}`,
  );
}
