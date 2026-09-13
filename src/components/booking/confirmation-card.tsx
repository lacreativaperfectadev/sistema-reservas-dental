import { motion } from "framer-motion";
import type { Appointment, ClinicInfo, Service } from "../../types";
import { buildIcsFile, downloadIcsFile } from "../../lib/ics";

interface ConfirmationCardProps {
  appointment: Appointment;
  service: Service;
  clinicInfo: ClinicInfo;
  onBookAnother: () => void;
}

export function ConfirmationCard({
  appointment,
  service,
  clinicInfo,
  onBookAnother,
}: ConfirmationCardProps) {
  function handleDownloadIcs() {
    const ics = buildIcsFile(appointment, service, clinicInfo);
    downloadIcsFile(`cita-${appointment.date}-${appointment.time}.ics`, ics);
  }

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className="rounded-2xl border border-clinic-200 bg-white p-6 text-center shadow-md"
    >
      <motion.div
        initial={{ scale: 0 }}
        animate={{ scale: 1 }}
        transition={{ type: "spring", stiffness: 260, damping: 18, delay: 0.1 }}
        className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-clinic-100 text-2xl text-clinic-600"
      >
        ✓
      </motion.div>
      <h3 className="mt-4 text-lg font-semibold text-clinic-800">
        ¡Cita confirmada!
      </h3>
      <p className="mt-1 text-sm text-clinic-600">
        {service.name} · {appointment.date} a las {appointment.time}
      </p>
      <p className="mt-1 text-xs text-clinic-400">
        Te esperamos en {clinicInfo.address}
      </p>

      <div className="mt-6 flex flex-col gap-2 sm:flex-row sm:justify-center">
        <button
          type="button"
          onClick={handleDownloadIcs}
          className="rounded-full bg-clinic-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-clinic-700"
        >
          Añadir al calendario
        </button>
        <button
          type="button"
          onClick={onBookAnother}
          className="rounded-full border border-clinic-200 px-4 py-2 text-sm font-medium text-clinic-700 transition hover:bg-clinic-50"
        >
          Reservar otra cita
        </button>
      </div>
    </motion.div>
  );
}
