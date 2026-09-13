import { motion } from "framer-motion";
import type { ClinicInfo, Service } from "../../types";
import { getServiceIcon } from "./service-icons";

interface ServicesOverviewProps {
  services: Service[];
  clinicInfo: ClinicInfo;
}

export function ServicesOverview({
  services,
  clinicInfo,
}: ServicesOverviewProps) {
  const heading = clinicInfo.servicesHeading || "Nuestros servicios";

  if (!services.length) {
    return (
      <section className="mx-auto max-w-5xl px-4 py-16 sm:px-6">
        <h2 className="text-center text-2xl font-semibold text-clinic-800">
          {heading}
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
          {heading}
        </h2>
        <p className="mt-2 text-center text-clinic-600">
          {clinicInfo.servicesSubtext ||
            "Todos nuestros tratamientos con un profesional certificado"}
        </p>
      </motion.div>

      <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {services.map((service, index) => {
          const ServiceIcon = getServiceIcon(service.name);
          return (
          <motion.div
            key={service.id}
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: index * 0.08 }}
            className="group rounded-2xl border border-clinic-100 bg-gradient-to-br from-white to-clinic-50 p-6 shadow-sm transition hover:shadow-md hover:border-clinic-200"
          >
            <div className="flex items-start justify-between">
              <ServiceIcon className="h-16 w-16" />
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
          );
        })}
      </div>
    </section>
  );
}
