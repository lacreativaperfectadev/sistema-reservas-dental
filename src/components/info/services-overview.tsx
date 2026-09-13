import { motion } from "framer-motion";
import type { Service } from "../../types";

interface ServicesOverviewProps {
  services: Service[];
}

const ICON_MAP: Record<string, string> = {
  limpieza: "🦷",
  blanqueamiento: "✨",
  ortodoncia: "→",
  implante: "🔧",
  endodoncia: "⚡",
  resina: "💎",
  extracción: "🦴",
  revisión: "👀",
  consulta: "💬",
  default: "🪥",
};

function getIcon(serviceName: string): string {
  const name = serviceName.toLowerCase();
  for (const [key, icon] of Object.entries(ICON_MAP)) {
    if (name.includes(key)) return icon;
  }
  return ICON_MAP.default;
}

export function ServicesOverview({ services }: ServicesOverviewProps) {
  if (!services.length) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-clinic-800">
          Nuestros servicios
        </h2>
        <p className="mt-4 text-center text-clinic-500">
          Configura los servicios en el panel administrativo
        </p>
      </section>
    );
  }

  return (
    <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-center text-2xl font-semibold text-clinic-800">
          Nuestros servicios
        </h2>
        <p className="mt-2 text-center text-clinic-600">
          Todos nuestros tratamientos con profesionales certificados
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group rounded-2xl border border-clinic-100 bg-gradient-to-br from-white to-clinic-50 p-6 shadow-sm transition hover:shadow-md hover:border-clinic-200"
          >
            <div className="flex items-start justify-between">
              <div className="text-4xl">{getIcon(service.name)}</div>
              <span className="text-xs font-semibold uppercase tracking-wide text-clinic-400 group-hover:text-clinic-600 transition">
                {service.durationMinutes} min
              </span>
            </div>
            <h3 className="mt-4 text-lg font-semibold text-clinic-800">
              {service.name}
            </h3>
            {service.description && (
              <p className="mt-2 text-sm text-clinic-600">
                {service.description}
              </p>
            )}
          </motion.div>
        ))}
      </div>
    </section>
  );
}
