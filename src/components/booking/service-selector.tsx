import { motion } from "framer-motion";
import type { Service } from "../../types";

interface ServiceSelectorProps {
  services: Service[];
  onSelect: (service: Service) => void;
}

export function ServiceSelector({ services, onSelect }: ServiceSelectorProps) {
  return (
    <div>
      <h3 className="text-lg font-semibold text-clinic-800">
        ¿Qué tipo de consulta necesitas?
      </h3>
      <div className="mt-4 grid gap-3 sm:grid-cols-3">
        {services.map((service) => (
          <motion.button
            key={service.id}
            type="button"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.98 }}
            onClick={() => onSelect(service)}
            className="rounded-xl border border-clinic-100 bg-white p-4 text-left shadow-sm transition hover:border-clinic-400 hover:shadow-md"
          >
            <p className="font-medium text-clinic-800">{service.name}</p>
            <p className="mt-1 text-xs text-clinic-500">
              {service.durationMinutes} min
            </p>
          </motion.button>
        ))}
      </div>
    </div>
  );
}
