export interface Service {
  id: string;
  name: string;
  durationMinutes: number;
  description: string;
}

export interface TimeRange {
  start: string; // "09:00"
  end: string; // "14:00"
}

export interface ScheduleDay {
  weekday: number; // 0 (domingo) - 6 (sábado)
  ranges: TimeRange[];
}

export interface BlockedSlot {
  id: string;
  date: string; // "2026-09-20"
  time: string | null; // null = bloquea el día completo
}

export interface Schedule {
  days: ScheduleDay[];
  blockedSlots: BlockedSlot[];
  slotStepMinutes: number;
}

export interface Appointment {
  id: string;
  serviceId: string;
  date: string; // "2026-09-20"
  time: string; // "09:30"
  durationMinutes: number;
  patientName: string;
  phone: string;
  email: string;
  reason: string;
  createdAt: string;
}

export interface ClinicInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  hoursText: string;
  logo?: string | null; // base64 data URL
}

export interface LegalContent {
  privacy: string;
  terms: string;
}
