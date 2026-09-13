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

export type DifferentiatorIconKey =
  | "clinic"
  | "graduation"
  | "heart"
  | "card"
  | "gift"
  | "diamond"
  | "people"
  | "shield";

export interface Differentiator {
  icon: DifferentiatorIconKey;
  title: string;
  description: string;
}

export interface Treatment {
  title: string;
  description: string;
  imageUrl: string;
}

export interface ClinicInfo {
  name: string;
  address: string;
  phone: string;
  email: string;
  hoursText: string;
  logo?: string | null; // base64 data URL
  heroHeadline?: string;
  heroAccentText?: string;
  heroSubtext?: string;
  heroImageUrl?: string;
  dentistName?: string;
  differentiators?: Differentiator[];
  treatments?: Treatment[];
  treatmentsEyebrow?: string;
  treatmentsHeading?: string;
  treatmentsHeadingAccent?: string;
  treatmentsDescription?: string;
  finalCtaEyebrow?: string;
  finalCtaHeading?: string;
  finalCtaHeadingAccent?: string;
  finalCtaDescription?: string;
  finalCtaButtonText?: string;
  finalCtaImageUrl?: string;
  servicesHeading?: string;
  servicesSubtext?: string;
}

export interface LegalContent {
  privacy: string;
  terms: string;
}
