// ============================================
// Settings Service – User preferences, notifications, appearance
// ============================================

import type { UserSettings, NotificationPreferences, Company, ApiResponse } from "../types";
import { delay, safeParse, persist, ok, STORAGE_KEYS } from "../utils/api";

const DEFAULT_SETTINGS: UserSettings = {
  profile: {
    firstName: "Rahul",
    lastName: "Agarwal",
    email: "rahul@acmepvt.com",
    phone: "+91 98765 43210",
  },
  company: {
    name: "Acme Pvt Ltd",
    gstin: "27AABCU9603R1ZX",
    cin: "U72200MH2020PTC123456",
    state: "Maharashtra",
    employees: "35",
  },
  notifications: {
    email: true,
    sms: false,
    deadlineReminder: true,
    riskAlerts: true,
    newsUpdates: false,
    weeklyReport: true,
  },
  twoFA: false,
  accentColor: "220 90% 56%",
  theme: "dark",
};

function getSettings(): UserSettings {
  return safeParse(STORAGE_KEYS.SETTINGS, DEFAULT_SETTINGS);
}

export const settingsService = {
  async getSettings(): Promise<ApiResponse<UserSettings>> {
    await delay(300);
    return ok(getSettings());
  },

  async updateProfile(profile: Partial<UserSettings["profile"]>): Promise<ApiResponse<UserSettings>> {
    await delay(500);
    const settings = getSettings();
    settings.profile = { ...settings.profile, ...profile };
    persist(STORAGE_KEYS.SETTINGS, settings);
    return ok(settings, "Profile updated successfully.");
  },

  async updateCompany(company: Partial<Company>): Promise<ApiResponse<UserSettings>> {
    await delay(500);
    const settings = getSettings();
    settings.company = { ...settings.company, ...company };
    persist(STORAGE_KEYS.SETTINGS, settings);
    return ok(settings, "Company details updated.");
  },

  async updateNotifications(prefs: Partial<NotificationPreferences>): Promise<ApiResponse<UserSettings>> {
    await delay(400);
    const settings = getSettings();
    settings.notifications = { ...settings.notifications, ...prefs };
    persist(STORAGE_KEYS.SETTINGS, settings);
    return ok(settings, "Notification preferences saved.");
  },

  async toggleTwoFA(enabled: boolean): Promise<ApiResponse<UserSettings>> {
    await delay(500);
    const settings = getSettings();
    settings.twoFA = enabled;
    persist(STORAGE_KEYS.SETTINGS, settings);
    return ok(settings, enabled ? "2FA enabled." : "2FA disabled.");
  },

  async updateAppearance(updates: { accentColor?: string; theme?: "light" | "dark" }): Promise<ApiResponse<UserSettings>> {
    await delay(300);
    const settings = getSettings();
    if (updates.accentColor) settings.accentColor = updates.accentColor;
    if (updates.theme) settings.theme = updates.theme;
    persist(STORAGE_KEYS.SETTINGS, settings);
    return ok(settings, "Appearance updated.");
  },

  async changePassword(_current: string, _newPassword: string): Promise<ApiResponse<null>> {
    await delay(800);
    // Mock validation — in production, verify current password against hash
    return ok(null, "Password changed successfully.");
  },
};
