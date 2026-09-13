import { useMemo, useState } from "react";
import { StepTransition } from "../shared/page-transition";
import { ServiceSelector } from "./service-selector";
import { DatePicker } from "./date-picker";
import { TimeSlotGrid } from "./time-slot-grid";
import { PatientForm, type PatientFormData } from "./patient-form";
import { ConfirmationCard } from "./confirmation-card";
import { useServices } from "../../hooks/use-services";
import { useSchedule } from "../../hooks/use-schedule";
import { useAppointments } from "../../hooks/use-appointments";
import { useClinicInfo } from "../../hooks/use-clinic-info";
import { getAvailableSlots, isSlotStillAvailable } from "../../lib/availability";
import type { Appointment, Service } from "../../types";

type Step = "service" | "date" | "time" | "form" | "confirmation";

export function BookingSection() {
  const { services } = useServices();
  const { schedule } = useSchedule();
  const { appointments, addAppointment } = useAppointments();
  const { clinicInfo } = useClinicInfo();

  const [step, setStep] = useState<Step>("service");
  const [selectedService, setSelectedService] = useState<Service | null>(null);
  const [selectedDate, setSelectedDate] = useState<string | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);
  const [lastAppointment, setLastAppointment] = useState<Appointment | null>(
    null,
  );
  const [error, setError] = useState<string | null>(null);

  const availableSlots = useMemo(() => {
    if (!selectedService || !selectedDate) return [];
    return getAvailableSlots(
      schedule,
      appointments,
      selectedDate,
      selectedService.durationMinutes,
    );
  }, [schedule, appointments, selectedDate, selectedService]);

  function reset() {
    setStep("service");
    setSelectedService(null);
    setSelectedDate(null);
    setSelectedTime(null);
    setLastAppointment(null);
    setError(null);
  }

  function handleServiceSelect(service: Service) {
    setSelectedService(service);
    setSelectedDate(null);
    setSelectedTime(null);
    setStep("date");
  }

  function handleDateSelect(date: string) {
    setSelectedDate(date);
    setSelectedTime(null);
    setStep("time");
  }

  function handleTimeSelect(time: string) {
    setSelectedTime(time);
    setStep("form");
  }

  function handlePatientSubmit(data: PatientFormData) {
    if (!selectedService || !selectedDate || !selectedTime) return;

    const stillFree = isSlotStillAvailable(
      schedule,
      appointments,
      selectedDate,
      selectedTime,
      selectedService.durationMinutes,
    );
    if (!stillFree) {
      setError("Ese hueco se acaba de ocupar. Elige otra hora, por favor.");
      setStep("time");
      return;
    }

    const appointment: Appointment = {
      id: crypto.randomUUID(),
      serviceId: selectedService.id,
      date: selectedDate,
      time: selectedTime,
      durationMinutes: selectedService.durationMinutes,
      patientName: data.patientName,
      phone: data.phone,
      email: data.email,
      reason: data.reason,
      createdAt: new Date().toISOString(),
    };

    addAppointment(appointment);
    setLastAppointment(appointment);
    setError(null);
    setStep("confirmation");
  }

  return (
    <section id="reservar" className="mx-auto max-w-2xl px-4 py-16 sm:px-6">
      <h2 className="text-center text-2xl font-semibold text-clinic-800">
        Reserva tu cita
      </h2>

      {error && (
        <p className="mt-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-600">
          {error}
        </p>
      )}

      <div className="mt-6">
        <StepTransition stepKey={step}>
          {step === "service" && (
            <ServiceSelector services={services} onSelect={handleServiceSelect} />
          )}

          {step === "date" && selectedService && (
            <div>
              <button
                type="button"
                onClick={() => setStep("service")}
                className="mb-3 text-sm text-clinic-500 hover:text-clinic-700"
              >
                ← Cambiar tipo de consulta ({selectedService.name})
              </button>
              <DatePicker
                schedule={schedule}
                selectedDate={selectedDate}
                onSelect={handleDateSelect}
              />
            </div>
          )}

          {step === "time" && selectedService && selectedDate && (
            <div>
              <button
                type="button"
                onClick={() => setStep("date")}
                className="mb-3 text-sm text-clinic-500 hover:text-clinic-700"
              >
                ← Cambiar día ({selectedDate})
              </button>
              <h3 className="text-lg font-semibold text-clinic-800">
                Horas disponibles
              </h3>
              <TimeSlotGrid
                slots={availableSlots}
                selectedTime={selectedTime}
                onSelect={handleTimeSelect}
              />
            </div>
          )}

          {step === "form" && selectedService && selectedDate && selectedTime && (
            <div>
              <button
                type="button"
                onClick={() => setStep("time")}
                className="mb-3 text-sm text-clinic-500 hover:text-clinic-700"
              >
                ← Cambiar hora
              </button>
              <p className="text-sm text-clinic-600">
                {selectedService.name} · {selectedDate} a las {selectedTime}
              </p>
              <PatientForm onSubmit={handlePatientSubmit} />
            </div>
          )}

          {step === "confirmation" && lastAppointment && selectedService && (
            <ConfirmationCard
              appointment={lastAppointment}
              service={selectedService}
              clinicInfo={clinicInfo}
              onBookAnother={reset}
            />
          )}
        </StepTransition>
      </div>
    </section>
  );
}
