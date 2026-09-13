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

  return { appointments, addAppointment, removeAppointment };
}
