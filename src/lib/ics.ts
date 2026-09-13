import type { Appointment, ClinicInfo, Service } from "../types";

function pad(n: number): string {
  return n.toString().padStart(2, "0");
}

/** "2026-09-20" + "09:30" -> "20260920T093000" (hora local, sin conversión UTC). */
function toIcsLocalDateTime(date: string, time: string): string {
  const [y, m, d] = date.split("-");
  const [h, min] = time.split(":");
  return `${y}${m}${d}T${pad(Number(h))}${pad(Number(min))}00`;
}

function escapeIcsText(text: string): string {
  return text.replace(/([,;])/g, "\\$1").replace(/\n/g, "\\n");
}

export function buildIcsFile(
  appointment: Appointment,
  service: Service,
  clinic: ClinicInfo,
): string {
  const start = toIcsLocalDateTime(appointment.date, appointment.time);
  const endDate = new Date(`${appointment.date}T${appointment.time}:00`);
  endDate.setMinutes(endDate.getMinutes() + appointment.durationMinutes);
  const end = `${endDate.getFullYear()}${pad(endDate.getMonth() + 1)}${pad(
    endDate.getDate(),
  )}T${pad(endDate.getHours())}${pad(endDate.getMinutes())}${pad(
    endDate.getSeconds(),
  )}`;

  const now = new Date();
  const stamp = `${now.getUTCFullYear()}${pad(now.getUTCMonth() + 1)}${pad(
    now.getUTCDate(),
  )}T${pad(now.getUTCHours())}${pad(now.getUTCMinutes())}${pad(
    now.getUTCSeconds(),
  )}Z`;

  const description = [
    `Servicio: ${service.name}`,
    appointment.reason ? `Motivo: ${appointment.reason}` : null,
    clinic.phone ? `Contacto: ${clinic.phone}` : null,
  ]
    .filter(Boolean)
    .join("\\n");

  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//" + clinic.name + "//Reservas//ES",
    "CALSCALE:GREGORIAN",
    "BEGIN:VEVENT",
    `UID:${appointment.id}@dental-booking`,
    `DTSTAMP:${stamp}`,
    `DTSTART:${start}`,
    `DTEND:${end}`,
    `SUMMARY:${escapeIcsText(`Cita: ${service.name} - ${clinic.name}`)}`,
    `DESCRIPTION:${escapeIcsText(description)}`,
    clinic.address ? `LOCATION:${escapeIcsText(clinic.address)}` : null,
    "END:VEVENT",
    "END:VCALENDAR",
  ].filter((line): line is string => line !== null);

  return lines.join("\r\n");
}

export function downloadIcsFile(fileName: string, content: string): void {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = fileName;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
