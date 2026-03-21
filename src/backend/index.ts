// ============================================
// Backend – Central export barrel
// ============================================

// Services
export { authService } from "./services/authService";
export { dashboardService } from "./services/dashboardService";
export { calendarService } from "./services/calendarService";
export { complianceService } from "./services/complianceService";
export { riskService } from "./services/riskService";
export { reportsService } from "./services/reportsService";
export { integrationsService } from "./services/integrationsService";
export { newsService } from "./services/newsService";
export { aiAssistantService } from "./services/aiAssistantService";
export { settingsService } from "./services/settingsService";

// Types
export type * from "./types";

// Utilities
export { delay, generateId, STORAGE_KEYS } from "./utils/api";
