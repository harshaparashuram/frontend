import { apiFetch } from "./client";

export interface HealthResponse {
  status: string;
}

export interface AppInfoResponse {
  name: string;
  version: string;
  environment: string;
}

export function getHealth(): Promise<HealthResponse> {
  return apiFetch<HealthResponse>("/api/v1/health");
}

export function getAppInfo(): Promise<AppInfoResponse> {
  return apiFetch<AppInfoResponse>("/api/v1/info");
}
