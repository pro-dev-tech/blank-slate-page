// ============================================
// Auth Service – Login, Register, Session management
// ============================================

import type { AuthSession, LoginPayload, RegisterPayload, User, ApiResponse } from "../types";
import { delay, generateId, safeParse, persist, ok, fail, STORAGE_KEYS } from "../utils/api";

const DEFAULT_USER: User = {
  id: "usr-001",
  firstName: "Rahul",
  lastName: "Agarwal",
  email: "rahul@acmepvt.com",
  phone: "+91 98765 43210",
  company: {
    name: "Acme Pvt Ltd",
    gstin: "27AABCU9603R1ZX",
    cin: "U72200MH2020PTC123456",
    state: "Maharashtra",
    employees: "35",
  },
  role: "admin",
  createdAt: "2025-06-15T10:00:00Z",
};

function createSession(user: User): AuthSession {
  return {
    user,
    token: `tok_${generateId()}`,
    expiresAt: new Date(Date.now() + 24 * 60 * 60 * 1000).toISOString(),
  };
}

export const authService = {
  async login(payload: LoginPayload): Promise<ApiResponse<AuthSession | null>> {
    await delay(800);

    if (!payload.email || !payload.password) {
      return fail("Email and password are required.", null);
    }

    // Accept any credentials for demo; in production, validate against DB
    const session = createSession(DEFAULT_USER);
    persist(STORAGE_KEYS.AUTH_SESSION, session);
    return ok(session, "Login successful.");
  },

  async register(payload: RegisterPayload): Promise<ApiResponse<AuthSession | null>> {
    await delay(1000);

    if (!payload.email || !payload.password || !payload.firstName) {
      return fail("All fields are required.", null);
    }

    const user: User = {
      id: generateId(),
      firstName: payload.firstName,
      lastName: payload.lastName,
      email: payload.email,
      phone: "",
      company: {
        name: payload.companyName || "",
        gstin: "",
        cin: "",
        state: "",
        employees: "0",
      },
      role: "admin",
      createdAt: new Date().toISOString(),
    };

    const session = createSession(user);
    persist(STORAGE_KEYS.AUTH_SESSION, session);
    return ok(session, "Registration successful.");
  },

  async getSession(): Promise<ApiResponse<AuthSession | null>> {
    await delay(200);
    const session = safeParse<AuthSession | null>(STORAGE_KEYS.AUTH_SESSION, null);
    if (session && new Date(session.expiresAt) > new Date()) {
      return ok(session);
    }
    return fail("No active session.", null);
  },

  async logout(): Promise<ApiResponse<null>> {
    await delay(300);
    localStorage.removeItem(STORAGE_KEYS.AUTH_SESSION);
    return ok(null, "Logged out successfully.");
  },

  async updateProfile(updates: Partial<User>): Promise<ApiResponse<User | null>> {
    await delay(500);
    const session = safeParse<AuthSession | null>(STORAGE_KEYS.AUTH_SESSION, null);
    if (!session) return fail("Not authenticated.", null);

    const updatedUser = { ...session.user, ...updates };
    session.user = updatedUser;
    persist(STORAGE_KEYS.AUTH_SESSION, session);
    return ok(updatedUser, "Profile updated.");
  },
};
