import { motion } from "framer-motion";
import type { ClinicInfo } from "../../types";

interface FinalCtaSectionProps {
  clinicInfo: ClinicInfo;
}

export function FinalCtaSection({ clinicInfo }: FinalCtaSectionProps) {
  return (
    <section className="bg-sand-50 py-16 sm:py-20">
      <div className="mx-auto grid max-w-6xl gap-12 px-4 sm:px-6 lg:grid-cols-2 lg:items-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center lg:text-left"
        >
          <p className="text-sm font-semibold uppercase tracking-widest text-clinic-500">
            {clinicInfo.finalCtaEyebrow || "Tu sonrisa empieza aquí"}
          </p>
          <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
            <span className="text-clinic-800">
              {clinicInfo.finalCtaHeading || "Reserva tu cita y da"}
            </span>{" "}
            <span className="bg-gradient-to-r from-clinic-500 to-clinic-400 bg-clip-text text-transparent">
              {clinicInfo.finalCtaHeadingAccent || "el primer paso"}
            </span>
          </h2>
          <p className="mx-auto mt-4 max-w-md text-clinic-600 lg:mx-0">
            {clinicInfo.finalCtaDescription ||
              "Agenda en pocos segundos y empieza a cuidar tu sonrisa con un plan de tratamiento pensado para ti."}
          </p>
          <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row sm:justify-center lg:justify-start">
            <a
              href="#reservar"
              className="inline-flex items-center gap-2 rounded-full bg-clinic-800 px-8 py-3 text-sm font-semibold text-sand-50 shadow-lg transition hover:-translate-y-0.5 hover:bg-clinic-700 hover:shadow-xl"
            >
              {clinicInfo.finalCtaButtonText || "Reservar cita ahora"}
            </a>
            <a
              href="#contacto"
              className="text-sm font-semibold text-clinic-700 transition hover:text-clinic-900"
            >
              ¿Tienes dudas? Contáctanos →
            </a>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          className="mx-auto w-full max-w-md"
        >
          <img
            src={clinicInfo.finalCtaImageUrl || "/images/cta-sonrisas.webp"}
            alt="Sonrisas que cambian vidas"
            loading="lazy"
            className="w-full"
          />
        </motion.div>
      </div>
    </section>
  );
}
