import { motion } from "framer-motion";
import type { ClinicInfo } from "../../types";

interface LocationHoursProps {
  clinicInfo: ClinicInfo;
}

export function LocationHours({ clinicInfo }: LocationHoursProps) {
  const address = clinicInfo.address || "consultorio dental";
  const mapsSearchUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(address)}`;

  return (
    <section id="contacto" className="bg-clinic-50 py-16">
      <div className="mx-auto max-w-5xl px-4 sm:px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="mb-12 text-center"
        >
          <h2 className="text-2xl font-semibold text-clinic-800">
            Ubicación y horario
          </h2>
          <p className="mt-2 text-clinic-600">
            Visítanos o contacta directamente
          </p>
        </motion.div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Información de contacto */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="space-y-6 lg:col-span-1"
          >
            {/* Horario */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-clinic-500">
                <span>🕐</span> Horario
              </h3>
              <p className="mt-3 whitespace-pre-line text-sm text-clinic-800">
                {clinicInfo.hoursText}
              </p>
            </div>

            {/* Contacto */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-clinic-500">
                <span>📞</span> Contacto
              </h3>
              <div className="mt-3 space-y-2 text-sm">
                <p className="text-clinic-800">
                  <span className="font-medium">Teléfono:</span>
                  <br />
                  <a
                    href={`tel:${clinicInfo.phone}`}
                    className="text-clinic-600 hover:text-clinic-700 transition"
                  >
                    {clinicInfo.phone}
                  </a>
                </p>
                <p className="text-clinic-800">
                  <span className="font-medium">Email:</span>
                  <br />
                  <a
                    href={`mailto:${clinicInfo.email}`}
                    className="text-clinic-600 hover:text-clinic-700 transition"
                  >
                    {clinicInfo.email}
                  </a>
                </p>
              </div>
            </div>

            {/* Dirección */}
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <h3 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-clinic-500">
                <span>📍</span> Dirección
              </h3>
              <p className="mt-3 text-sm text-clinic-800">
                {clinicInfo.address}
              </p>
            </div>
          </motion.div>

          {/* Cómo llegar */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col items-center justify-center gap-4 rounded-2xl bg-white p-10 text-center shadow-sm"
          >
            <span
              aria-hidden="true"
              className="flex h-14 w-14 items-center justify-center rounded-full bg-clinic-50 text-2xl"
            >
              📍
            </span>
            <div>
              <h3 className="text-lg font-semibold text-clinic-800">
                ¿Cómo llegar?
              </h3>
              <p className="mt-1 text-sm text-clinic-600">{clinicInfo.address}</p>
            </div>
            <a
              href={mapsSearchUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block rounded-full bg-clinic-800 px-6 py-2.5 text-sm font-semibold text-sand-50 shadow-md transition hover:-translate-y-0.5 hover:bg-clinic-700"
            >
              Cómo llegar
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
