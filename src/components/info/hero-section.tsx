import { motion } from "framer-motion";
import type { ClinicInfo } from "../../types";

interface HeroSectionProps {
  clinicInfo: ClinicInfo;
}

export function HeroSection({ clinicInfo }: HeroSectionProps) {
  return (
    <section className="relative overflow-hidden bg-clinic-800 text-sand-50">
      <div className="absolute -right-24 -top-24 h-72 w-72 rounded-full bg-clinic-600/40 blur-3xl" />
      <div className="absolute -left-16 bottom-0 h-56 w-56 rounded-full bg-clinic-400/30 blur-3xl" />

      <div className="relative mx-auto max-w-5xl px-4 py-20 text-center sm:px-6">
        {clinicInfo.logo && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-6 flex justify-center"
          >
            <img
              src={clinicInfo.logo}
              alt={clinicInfo.name}
              className="h-24 w-24 rounded-full shadow-lg object-cover"
            />
          </motion.div>
        )}

        <motion.p
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-sm font-medium uppercase tracking-widest text-clinic-200"
        >
          {clinicInfo.name}
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl"
        >
          Reserva tu cita dental en menos de un minuto
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mx-auto mt-4 max-w-xl text-balance text-clinic-100"
        >
          Elige el tipo de consulta, mira los huecos libres y confirma —
          sin llamadas ni esperar respuesta por WhatsApp.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 flex flex-col gap-3 justify-center sm:flex-row"
        >
          <a
            href="#reservar"
            className="inline-block rounded-full bg-sand-50 px-8 py-3 text-sm font-semibold text-clinic-800 shadow-lg transition hover:-translate-y-0.5 hover:shadow-xl"
          >
            Reservar ahora
          </a>
          <a
            href="#contacto"
            className="inline-block rounded-full border-2 border-sand-50 px-8 py-3 text-sm font-semibold text-sand-50 transition hover:bg-white/10"
          >
            Más información
          </a>
        </motion.div>
      </div>
    </section>
  );
}
