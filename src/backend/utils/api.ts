// ============================================
// API Utility – Simulates network delay + localStorage persistence
// ============================================

import type { ApiResponse } from "../types";

/** Simulate network latency */
export function delay(ms: number = 500): Promise<void> {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

/** Generate a simple unique ID */
export function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
}

/** Safe JSON parse with fallback */
export function safeParse<T>(key: string, fallback: T): T {
  try {
    const raw = localStorage.getItem(key);
    return raw ? JSON.parse(raw) : fallback;
  } catch {
    return fallback;
  }
}

/** Save to localStorage */
export function persist<T>(key: string, data: T): void {
  localStorage.setItem(key, JSON.stringify(data));
}

/** Build a success response */
export function ok<T>(data: T, message?: string): ApiResponse<T> {
  return { success: true, data, message };
}

/** Build an error response */
export function fail<T>(error: string, data: T): ApiResponse<T> {
  return { success: false, data, error };
}

/** Storage keys enum */
export const STORAGE_KEYS = {
  AUTH_SESSION: "cai_auth_session",
  CALENDAR_EVENTS: "cai_calendar_events",
  REPORTS: "cai_reports",
  INTEGRATIONS: "cai_integrations",
  NOTIFICATIONS: "cai_notifications",
  SETTINGS: "cai_settings",
  RISK_DATA: "cai_risk_data",
  CHAT_HISTORY: "cai_chat_history",
  NEWS_ENABLED: "cai_news_enabled",
} as const;
