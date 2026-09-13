import { motion } from "framer-motion";

interface TimeSlotGridProps {
  slots: string[];
  selectedTime: string | null;
  onSelect: (time: string) => void;
}

export function TimeSlotGrid({
  slots,
  selectedTime,
  onSelect,
}: TimeSlotGridProps) {
  if (slots.length === 0) {
    return (
      <p className="mt-4 rounded-xl bg-sand-100 p-4 text-sm text-clinic-500">
        No hay huecos libres ese día para este tipo de consulta. Prueba con
        otro día.
      </p>
    );
  }

  return (
    <div className="mt-4 grid grid-cols-3 gap-2 sm:grid-cols-4">
      {slots.map((slot) => (
        <motion.button
          key={slot}
          type="button"
          whileHover={{ y: -2 }}
          whileTap={{ scale: 0.96 }}
          onClick={() => onSelect(slot)}
          className={`rounded-lg border px-3 py-2 text-sm font-medium transition ${
            slot === selectedTime
              ? "border-clinic-600 bg-clinic-600 text-white shadow-md"
              : "border-clinic-100 bg-white text-clinic-700 hover:border-clinic-400"
          }`}
        >
          {slot}
        </motion.button>
      ))}
    </div>
  );
}
