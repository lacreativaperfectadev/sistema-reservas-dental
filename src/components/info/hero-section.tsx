import { motion } from "framer-motion";
import type { ClinicInfo } from "../../types";

interface HeroSectionProps {
  clinicInfo: ClinicInfo;
}

/** Extrae la ciudad del campo dirección ("Calle Mayor 24, Madrid" -> "Madrid") */
function extractCity(address: string): string | null {
  const parts = address.split(",").map((part) => part.trim());
  return parts.length > 1 ? parts[parts.length - 1] : null;
}

export function HeroSection({ clinicInfo }: HeroSectionProps) {
  const city = extractCity(clinicInfo.address || "");
  const eyebrow = city ? `Clínica dental en ${city}` : "Clínica dental";

  return (
    <section id="inicio" className="relative overflow-hidden bg-sand-50">
      <img
        src={clinicInfo.heroImageUrl || "/images/hero-banner.webp"}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 h-full w-full object-cover object-left"
      />
      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:py-28">
        {/* Copy (overlaps the pale left side of the banner photo) */}
        <div className="max-w-xl text-center lg:text-left">
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-sm font-semibold uppercase tracking-widest text-clinic-500"
          >
            {eyebrow.toUpperCase()}
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="mt-4 text-4xl font-bold leading-tight tracking-tight sm:text-5xl"
          >
            <span className="block text-clinic-800">
              {clinicInfo.heroHeadline ||
                "Transforma tu sonrisa con quien entiende de salud y estética"}
            </span>
            <span className="block bg-gradient-to-r from-clinic-500 to-clinic-400 bg-clip-text text-transparent">
              {clinicInfo.heroAccentText || "nuestra prioridad"}
            </span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="mx-auto mt-5 max-w-lg text-balance text-clinic-600 lg:mx-0"
          >
            {clinicInfo.heroSubtext ||
              "Cuido tu salud bucal con tecnología moderna, atención cercana y planes de tratamiento pensados para ti. Agenda tu cita en segundos, sin llamadas ni esperas."}
          </motion.p>

          {clinicInfo.dentistName && (
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="mt-3 text-sm font-medium text-clinic-500"
            >
              {clinicInfo.dentistName}
            </motion.p>
          )}

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center lg:justify-start"
          >
            <a
              href="#reservar"
              className="inline-flex items-center gap-2 rounded-full bg-clinic-800 px-8 py-3 text-sm font-semibold text-sand-50 shadow-lg transition hover:-translate-y-0.5 hover:bg-clinic-700 hover:shadow-xl"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              Reserva tu cita
            </a>
            <a
              href="#tratamientos"
              className="inline-block rounded-full border-2 border-clinic-800 px-8 py-3 text-sm font-semibold text-clinic-800 transition hover:bg-clinic-800/5"
            >
              Conoce nuestros tratamientos →
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
