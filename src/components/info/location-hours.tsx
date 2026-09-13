import { motion } from "framer-motion";
import type { ClinicInfo } from "../../types";

interface LocationHoursProps {
  clinicInfo: ClinicInfo;
}

export function LocationHours({ clinicInfo }: LocationHoursProps) {
  const mapsUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyDNr0YG2_lk_20yzb9_BzzZPYJQCVvLGUg&q=${encodeURIComponent(clinicInfo.address || "consultorio dental")}`;

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

          {/* Google Maps */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="lg:col-span-2 rounded-2xl shadow-sm overflow-hidden h-80"
          >
            <iframe
              src={mapsUrl}
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Ubicación del consultorio"
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
