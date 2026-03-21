// ============================================
// Integrations Service – Connect/disconnect/sync third-party tools
// ============================================

import type { Integration, ApiResponse } from "../types";
import { delay, generateId, safeParse, persist, ok, fail, STORAGE_KEYS } from "../utils/api";

const DEFAULT_INTEGRATIONS: Integration[] = [
  { id: "int-1", name: "Tally", description: "Accounting & bookkeeping", connected: true, lastSync: "2 hours ago", icon: "T" },
  { id: "int-2", name: "Zoho Books", description: "Invoice management", connected: true, lastSync: "30 min ago", icon: "Z" },
  { id: "int-3", name: "HRMS Portal", description: "Employee management", connected: true, lastSync: "1 hour ago", icon: "H" },
  { id: "int-4", name: "GSTN", description: "GST Network portal", connected: true, lastSync: "15 min ago", icon: "G" },
  { id: "int-5", name: "MCA21", description: "Ministry of Corporate Affairs", connected: false, lastSync: "—", icon: "M" },
  { id: "int-6", name: "EPFO", description: "Provident Fund portal", connected: true, lastSync: "4 hours ago", icon: "E" },
];

function getIntegrations(): Integration[] {
  return safeParse(STORAGE_KEYS.INTEGRATIONS, DEFAULT_INTEGRATIONS);
}

export const integrationsService = {
  async getAll(): Promise<ApiResponse<Integration[]>> {
    await delay(400);
    return ok(getIntegrations());
  },

  async connect(id: string): Promise<ApiResponse<Integration | null>> {
    await delay(1500);
    const integrations = getIntegrations();
    const integration = integrations.find((i) => i.id === id);
    if (!integration) return fail("Integration not found.", null);

    integration.connected = true;
    integration.lastSync = "Just now";
    persist(STORAGE_KEYS.INTEGRATIONS, integrations);
    return ok(integration, `${integration.name} connected successfully.`);
  },

  async disconnect(id: string): Promise<ApiResponse<Integration | null>> {
    await delay(500);
    const integrations = getIntegrations();
    const integration = integrations.find((i) => i.id === id);
    if (!integration) return fail("Integration not found.", null);

    integration.connected = false;
    integration.lastSync = "—";
    persist(STORAGE_KEYS.INTEGRATIONS, integrations);
    return ok(integration, `${integration.name} disconnected.`);
  },

  async sync(id: string): Promise<ApiResponse<Integration | null>> {
    await delay(2000);
    const integrations = getIntegrations();
    const integration = integrations.find((i) => i.id === id);
    if (!integration) return fail("Integration not found.", null);

    integration.lastSync = "Just now";
    persist(STORAGE_KEYS.INTEGRATIONS, integrations);
    return ok(integration, `${integration.name} synced successfully.`);
  },
};
