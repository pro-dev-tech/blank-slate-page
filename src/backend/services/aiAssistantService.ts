// ============================================
// AI Assistant Service – Chat simulation with mock responses
// ============================================

import type { ChatMessage, ApiResponse } from "../types";
import { delay, generateId, safeParse, persist, ok, STORAGE_KEYS } from "../utils/api";

const INITIAL_MESSAGE: ChatMessage = {
  id: "msg-init",
  role: "ai",
  content: "Hello! I'm your AI Compliance Assistant. I can help you understand regulations, draft responses, and identify applicable compliances for your MSME. How can I help you today?",
  timestamp: new Date().toISOString(),
};

function generateAIResponse(userMessage: string): Omit<ChatMessage, "id" | "timestamp"> {
  const lower = userMessage.toLowerCase();

  if (lower.includes("gst")) {
    return {
      role: "ai",
      content:
        "The latest GST amendment (Notification No. 12/2026) introduces simplified return filing for MSMEs with turnover below ₹5 Cr. Key changes include:\n\n1. **Quarterly GSTR-3B** filing instead of monthly\n2. **Auto-populated GSTR-2A** for input tax credit\n3. **Reduced late fees** from ₹50/day to ₹20/day\n\nEffective from April 1, 2026. Your company qualifies for these simplified provisions.",
      risks: ["Late filing penalty: ₹20/day under new rules", "Input credit mismatch risk if vendors don't file"],
      actions: ["Opt-in for quarterly filing on GST portal", "Verify vendor compliance", "Update accounting software"],
    };
  }

  if (lower.includes("karnataka") || lower.includes("employee")) {
    return {
      role: "ai",
      content:
        "For a company with 35 employees operating in Karnataka, the following compliances are applicable:\n\n1. **Provident Fund (PF)** — Mandatory (>20 employees)\n2. **ESIC** — Applicable for employees earning ≤₹21,000/month\n3. **Professional Tax** — Karnataka-specific, monthly deduction\n4. **Shops & Establishment Act** — Karnataka State registration\n5. **GST** — Based on turnover threshold\n6. **Labour Welfare Fund** — Annual contribution",
      risks: ["PF Return overdue — ₹5,000/day penalty risk", "ESIC threshold change may affect 8 employees"],
      actions: ["File PF Return immediately", "Review ESIC applicability", "Schedule GST-3B preparation"],
    };
  }

  return {
    role: "ai",
    content:
      "Based on your company profile and current regulatory landscape, here's my analysis:\n\n**Current Status:** Your compliance score is 82/100, which is above the industry average of 74.\n\n**Key Recommendations:**\n1. Address the overdue PF return immediately to avoid penalties\n2. Review the new ESIC threshold changes for Karnataka\n3. Prepare for upcoming GST-3B filing deadline on Feb 20",
    risks: ["PF Return overdue — ₹5,000/day penalty risk", "ESIC threshold change may affect 8 employees"],
    actions: ["File PF Return immediately", "Review ESIC applicability", "Schedule GST-3B preparation"],
  };
}

function getChatHistory(): ChatMessage[] {
  return safeParse(STORAGE_KEYS.CHAT_HISTORY, [INITIAL_MESSAGE]);
}

export const aiAssistantService = {
  async getChatHistory(): Promise<ApiResponse<ChatMessage[]>> {
    await delay(300);
    return ok(getChatHistory());
  },

  async sendMessage(content: string): Promise<ApiResponse<ChatMessage>> {
    // Save user message
    const userMsg: ChatMessage = {
      id: generateId(),
      role: "user",
      content,
      timestamp: new Date().toISOString(),
    };
    const history = getChatHistory();
    history.push(userMsg);
    persist(STORAGE_KEYS.CHAT_HISTORY, history);

    // Generate AI response
    await delay(1500);
    const aiResponse = generateAIResponse(content);
    const aiMsg: ChatMessage = {
      ...aiResponse,
      id: generateId(),
      timestamp: new Date().toISOString(),
    };
    history.push(aiMsg);
    persist(STORAGE_KEYS.CHAT_HISTORY, history);

    return ok(aiMsg);
  },

  async clearHistory(): Promise<ApiResponse<null>> {
    await delay(300);
    persist(STORAGE_KEYS.CHAT_HISTORY, [INITIAL_MESSAGE]);
    return ok(null, "Chat history cleared.");
  },
};
