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
  name: "Clínica Dental Sonrisa",
  address: "Calle Mayor 24, Madrid",
  phone: "912 345 678",
  email: "info@clinicasonrisa.es",
  hoursText: "Lunes a viernes, 9:00-14:00 y 16:00-20:00",
  heroHeadline: "Tu sonrisa,",
  heroAccentText: "nuestra prioridad",
  heroSubtext:
    "Cuido tu salud bucal con tecnología moderna, atención cercana y planes de tratamiento pensados para ti. Agenda tu cita en segundos, sin llamadas ni esperas.",
  heroImageUrl: "/images/hero-banner.webp",
  dentistName: "Dra. Laura Martínez",
  treatmentsEyebrow: "Nuestros tratamientos",
  treatmentsHeading: "Salud, estética y bienestar",
  treatmentsHeadingAccent: "en un mismo lugar",
  treatmentsDescription:
    "Cada tratamiento está pensado para cuidar tu salud bucal y devolverte la confianza de sonreír, con un plan personalizado en cada visita.",
  finalCtaEyebrow: "Tu sonrisa empieza aquí",
  finalCtaHeading: "Reserva tu cita y da",
  finalCtaHeadingAccent: "el primer paso",
  finalCtaDescription:
    "Agenda en pocos segundos y empieza a cuidar tu sonrisa con un plan de tratamiento pensado para ti.",
  finalCtaButtonText: "Reservar cita ahora",
  finalCtaImageUrl: "/images/cta-sonrisas.webp",
  servicesHeading: "Nuestros servicios",
  servicesSubtext: "Todos nuestros tratamientos con un profesional certificado",
  differentiators: [
    {
      icon: "diamond",
      title: "Tecnología avanzada",
      description:
        "Equipo de última generación para diagnósticos más precisos.",
    },
    {
      icon: "people",
      title: "Trato cercano",
      description: "Te escucho y te acompaño en todo el proceso.",
    },
    {
      icon: "shield",
      title: "Entorno seguro",
      description: "Máxima higiene y protocolos de esterilización.",
    },
    {
      icon: "heart",
      title: "Resultados reales",
      description: "Sonrisas más sanas y pacientes más felices.",
    },
  ],
  treatments: [
    {
      title: "Limpieza y Prevención",
      description:
        "Elimino placa y sarro para mantener tus encías sanas y prevenir enfermedades bucales a largo plazo.",
      imageUrl: "/images/limpieza.webp",
    },
    {
      title: "Blanqueamiento Dental",
      description:
        "Recupera el brillo natural de tu sonrisa con tratamientos seguros y resultados visibles desde la primera sesión.",
      imageUrl: "/images/blanqueamiento.webp",
    },
    {
      title: "Ortodoncia",
      description:
        "Alineo tus dientes con brackets o alineadores invisibles, adaptados a tu estilo de vida y objetivos.",
      imageUrl: "/images/ortodoncia.webp",
    },
  ],
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
