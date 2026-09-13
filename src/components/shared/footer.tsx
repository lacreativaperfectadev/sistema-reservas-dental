import { motion } from "framer-motion";
import type { ClinicInfo } from "../../types";

interface FooterProps {
  clinicInfo: ClinicInfo;
}

export function Footer({ clinicInfo }: FooterProps) {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-clinic-900 text-clinic-50">
      <div className="mx-auto max-w-5xl px-4 py-12 sm:px-6">
        {/* Main content */}
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Clinic info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
          >
            {clinicInfo.logo && (
              <img
                src={clinicInfo.logo}
                alt={clinicInfo.name}
                className="mb-3 h-12 w-12 rounded-full object-cover shadow-md"
              />
            )}
            <h3 className="text-lg font-semibold">{clinicInfo.name}</h3>
            <p className="mt-2 text-sm text-clinic-200">
              Reserva tus citas dentales en línea, rápido y fácil.
            </p>
          </motion.div>

          {/* Quick links */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.1 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wide text-clinic-200">
              Navegación
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href="#reservar"
                  className="text-clinic-100 hover:text-sand-50 transition"
                >
                  Reservar cita
                </a>
              </li>
              <li>
                <a
                  href="#servicios"
                  className="text-clinic-100 hover:text-sand-50 transition"
                >
                  Servicios
                </a>
              </li>
              <li>
                <a
                  href="#contacto"
                  className="text-clinic-100 hover:text-sand-50 transition"
                >
                  Contacto
                </a>
              </li>
              <li>
                <a
                  href="/privacy"
                  className="text-clinic-100 hover:text-sand-50 transition"
                >
                  Privacidad
                </a>
              </li>
            </ul>
          </motion.div>

          {/* Contact info */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.2 }}
          >
            <h4 className="text-sm font-semibold uppercase tracking-wide text-clinic-200">
              Contacto
            </h4>
            <ul className="mt-4 space-y-2 text-sm">
              <li>
                <a
                  href={`tel:${clinicInfo.phone}`}
                  className="text-clinic-100 hover:text-sand-50 transition"
                >
                  {clinicInfo.phone}
                </a>
              </li>
              <li>
                <a
                  href={`mailto:${clinicInfo.email}`}
                  className="text-clinic-100 hover:text-sand-50 transition"
                >
                  {clinicInfo.email}
                </a>
              </li>
              <li className="text-clinic-300">{clinicInfo.address}</li>
            </ul>
          </motion.div>
        </div>

        {/* Divider */}
        <div className="mt-8 border-t border-clinic-800" />

        {/* Bottom */}
        <div className="mt-8 flex flex-col gap-4 text-center text-sm text-clinic-300 sm:flex-row sm:justify-between">
          <p>
            © {currentYear} {clinicInfo.name}. Todos los derechos reservados.
          </p>
          <p>
            Hecho con{" "}
            <span className="text-red-400">❤️</span> para tu sonrisa
          </p>
        </div>
      </div>
    </footer>
  );
}
