import { useState } from "react";
import { getAppointments, saveAppointments } from "../lib/storage";
import type { Appointment } from "../types";

export function useAppointments() {
  const [appointments, setAppointments] = useState<Appointment[]>(() =>
    getAppointments(),
  );

  function addAppointment(appointment: Appointment) {
    const next = [...appointments, appointment];
    setAppointments(next);
    saveAppointments(next);
  }

  function removeAppointment(id: string) {
    const next = appointments.filter((a) => a.id !== id);
    setAppointments(next);
    saveAppointments(next);
  }

  /** Añade las citas del archivo importado que no existan ya (por id), sin borrar las actuales. */
  function importAppointments(imported: Appointment[]): number {
    const existingIds = new Set(appointments.map((a) => a.id));
    const newOnes = imported.filter((a) => !existingIds.has(a.id));
    if (newOnes.length === 0) return 0;
    const next = [...appointments, ...newOnes];
    setAppointments(next);
    saveAppointments(next);
    return newOnes.length;
  }

  return { appointments, addAppointment, removeAppointment, importAppointments };
}
