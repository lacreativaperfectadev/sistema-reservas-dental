import type {
  Appointment,
  ClinicInfo,
  Schedule,
  Service,
} from "../types";

const KEYS = {
  services: "dental-booking:services",
  schedule: "dental-booking:schedule",
  appointments: "dental-booking:appointments",
  clinicInfo: "dental-booking:clinic-info",
} as const;

const DEFAULT_SERVICES: Service[] = [
  {
    id: "valoracion",
    name: "Valoración",
    durationMinutes: 20,
    description: "Primera visita para evaluar tu caso y proponerte un plan de tratamiento.",
  },
  {
    id: "ortodoncia",
    name: "Ortodoncia",
    durationMinutes: 30,
    description: "Revisión o ajuste de tu tratamiento de ortodoncia.",
  },
  {
    id: "estetica-dental",
    name: "Estética dental",
    durationMinutes: 45,
    description: "Blanqueamiento, carillas y otros tratamientos estéticos.",
  },
];

const DEFAULT_SCHEDULE: Schedule = {
  days: [1, 2, 3, 4, 5].map((weekday) => ({
    weekday,
    ranges: [
      { start: "09:00", end: "14:00" },
      { start: "16:00", end: "20:00" },
    ],
  })),
  blockedSlots: [],
  slotStepMinutes: 15,
};

const DEFAULT_CLINIC_INFO: ClinicInfo = {
  name: "[Nombre de la clínica]",
  address: "[Dirección del consultorio]",
  phone: "[Teléfono / WhatsApp]",
  email: "[Correo de contacto]",
  hoursText: "Lunes a viernes, 9:00-14:00 y 16:00-20:00",
};

function readJson<T>(key: string, fallback: T): T {
  try {
    const raw = window.localStorage.getItem(key);
    if (!raw) return fallback;
    return JSON.parse(raw) as T;
  } catch {
    return fallback;
  }
}

function writeJson<T>(key: string, value: T): void {
  window.localStorage.setItem(key, JSON.stringify(value));
}

export function getServices(): Service[] {
  return readJson(KEYS.services, DEFAULT_SERVICES);
}

export function saveServices(services: Service[]): void {
  writeJson(KEYS.services, services);
}

export function getSchedule(): Schedule {
  return readJson(KEYS.schedule, DEFAULT_SCHEDULE);
}

export function saveSchedule(schedule: Schedule): void {
  writeJson(KEYS.schedule, schedule);
}

export function getAppointments(): Appointment[] {
  return readJson(KEYS.appointments, []);
}

export function saveAppointments(appointments: Appointment[]): void {
  writeJson(KEYS.appointments, appointments);
}

export function getClinicInfo(): ClinicInfo {
  return readJson(KEYS.clinicInfo, DEFAULT_CLINIC_INFO);
}

export function saveClinicInfo(info: ClinicInfo): void {
  writeJson(KEYS.clinicInfo, info);
}
