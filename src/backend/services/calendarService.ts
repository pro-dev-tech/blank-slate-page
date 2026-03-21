// ============================================
// Calendar Service – CRUD for compliance calendar events
// ============================================

import type { CalendarEvent, ApiResponse } from "../types";
import { delay, generateId, safeParse, persist, ok, fail, STORAGE_KEYS } from "../utils/api";

const DEFAULT_EVENTS: CalendarEvent[] = [
  { id: "ev-1", day: 7, month: 0, year: 2026, title: "TDS Payment", status: "completed", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-2", day: 10, month: 0, year: 2026, title: "GST-1 Filing", status: "completed", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-3", day: 15, month: 0, year: 2026, title: "PF Return", status: "completed", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-4", day: 20, month: 0, year: 2026, title: "GST-3B Filing", status: "completed", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-5", day: 25, month: 0, year: 2026, title: "ESI Return", status: "completed", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-6", day: 7, month: 1, year: 2026, title: "TDS Payment", status: "completed", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-7", day: 10, month: 1, year: 2026, title: "GST-1 Filing", status: "completed", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-8", day: 15, month: 1, year: 2026, title: "PF Return", status: "overdue", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-9", day: 20, month: 1, year: 2026, title: "GST-3B Filing", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-10", day: 25, month: 1, year: 2026, title: "ESI Return", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-11", day: 28, month: 1, year: 2026, title: "Professional Tax", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-12", day: 7, month: 2, year: 2026, title: "TDS Payment", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-13", day: 10, month: 2, year: 2026, title: "GST-1 Filing", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-14", day: 15, month: 2, year: 2026, title: "PF Return", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-15", day: 20, month: 2, year: 2026, title: "GST-3B Filing", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-16", day: 25, month: 2, year: 2026, title: "ESI Return", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-17", day: 31, month: 2, year: 2026, title: "TDS Return Q3", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-18", day: 1, month: 3, year: 2026, title: "Annual Return Filing", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-19", day: 7, month: 3, year: 2026, title: "TDS Payment", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-20", day: 15, month: 3, year: 2026, title: "Advance Tax Q4", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-21", day: 20, month: 3, year: 2026, title: "GST-3B Filing", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
  { id: "ev-22", day: 30, month: 3, year: 2026, title: "GSTR-9 Annual", status: "upcoming", createdAt: "2026-01-01T00:00:00Z" },
];

function getEvents(): CalendarEvent[] {
  return safeParse(STORAGE_KEYS.CALENDAR_EVENTS, DEFAULT_EVENTS);
}

export const calendarService = {
  async getAllEvents(): Promise<ApiResponse<CalendarEvent[]>> {
    await delay(400);
    return ok(getEvents());
  },

  async getEventsByMonth(month: number, year: number): Promise<ApiResponse<CalendarEvent[]>> {
    await delay(300);
    const filtered = getEvents().filter((e) => e.month === month && e.year === year);
    return ok(filtered);
  },

  async addEvent(event: Omit<CalendarEvent, "id" | "createdAt">): Promise<ApiResponse<CalendarEvent>> {
    await delay(500);
    const newEvent: CalendarEvent = {
      ...event,
      id: generateId(),
      createdAt: new Date().toISOString(),
    };
    const events = getEvents();
    events.push(newEvent);
    persist(STORAGE_KEYS.CALENDAR_EVENTS, events);
    return ok(newEvent, "Event added successfully.");
  },

  async deleteEvent(id: string): Promise<ApiResponse<null>> {
    await delay(400);
    const events = getEvents();
    const index = events.findIndex((e) => e.id === id);
    if (index === -1) return fail("Event not found.", null);
    events.splice(index, 1);
    persist(STORAGE_KEYS.CALENDAR_EVENTS, events);
    return ok(null, "Event deleted.");
  },

  async updateEventStatus(id: string, status: CalendarEvent["status"]): Promise<ApiResponse<CalendarEvent | null>> {
    await delay(400);
    const events = getEvents();
    const event = events.find((e) => e.id === id);
    if (!event) return fail("Event not found.", null);
    event.status = status;
    persist(STORAGE_KEYS.CALENDAR_EVENTS, events);
    return ok(event, "Status updated.");
  },
};
