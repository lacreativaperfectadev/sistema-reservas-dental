import { motion } from "framer-motion";
import type { ClinicInfo } from "../../types";
import { getServiceIcon } from "./service-icons";

interface TreatmentsSectionProps {
  clinicInfo: ClinicInfo;
}

const DEFAULT_TREATMENTS = [
  {
    title: "Limpieza y Prevención",
    description:
      "Elimino placa y sarro para mantener tus encías sanas y prevenir enfermedades bucales a largo plazo.",
    imageUrl:
      "https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Blanqueamiento Dental",
    description:
      "Recupera el brillo natural de tu sonrisa con tratamientos seguros y resultados visibles desde la primera sesión.",
    imageUrl:
      "https://images.unsplash.com/photo-1571442463800-1337d7af9d2f?auto=format&fit=crop&w=800&q=80",
  },
  {
    title: "Ortodoncia",
    description:
      "Alineo tus dientes con brackets o alineadores invisibles, adaptados a tu estilo de vida y objetivos.",
    imageUrl:
      "https://images.unsplash.com/photo-1609840114035-3c981b782dfe?auto=format&fit=crop&w=800&q=80",
  },
];

export function TreatmentsSection({ clinicInfo }: TreatmentsSectionProps) {
  const treatments =
    clinicInfo.treatments && clinicInfo.treatments.length > 0
      ? clinicInfo.treatments
      : DEFAULT_TREATMENTS;

  return (
    <section id="tratamientos" className="bg-sand-50 py-16 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 lg:grid-cols-2 lg:items-end">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center lg:text-left"
          >
            <p className="text-sm font-semibold uppercase tracking-widest text-clinic-500">
              {clinicInfo.treatmentsEyebrow || "Nuestros tratamientos"}
            </p>
            <h2 className="mt-3 text-3xl font-bold tracking-tight sm:text-4xl">
              <span className="text-clinic-800">
                {clinicInfo.treatmentsHeading || "Salud, estética y bienestar"}
              </span>{" "}
              <span className="bg-gradient-to-r from-clinic-500 to-clinic-400 bg-clip-text text-transparent">
                {clinicInfo.treatmentsHeadingAccent || "en un mismo lugar"}
              </span>
            </h2>
          </motion.div>
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-center text-clinic-600 lg:text-left"
          >
            {clinicInfo.treatmentsDescription ||
              "Cada tratamiento está pensado para cuidar tu salud bucal y devolverte la confianza de sonreír, con un plan personalizado en cada visita."}
          </motion.p>
        </div>

        <div className="mt-12 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
          {treatments.map((treatment, index) => {
            const Icon = getServiceIcon(treatment.title);
            return (
              <motion.div
                key={treatment.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-left"
              >
                <div className="relative">
                  <img
                    src={treatment.imageUrl}
                    alt={treatment.title}
                    loading="lazy"
                    className="h-56 w-full rounded-2xl object-cover"
                  />
                  <span className="absolute -bottom-5 left-4 flex h-16 w-16 items-center justify-center rounded-xl bg-clinic-50 shadow-md">
                    <Icon className="h-12 w-12" />
                  </span>
                </div>
                <div className="mt-7">
                  <h3 className="text-lg font-bold text-clinic-800">
                    {treatment.title}
                  </h3>
                  <p className="mt-2 text-sm text-clinic-600">
                    {treatment.description}
                  </p>
                  <a
                    href="#reservar"
                    className="mt-3 inline-block text-sm font-semibold text-clinic-600 transition hover:text-clinic-800"
                  >
                    Saber más →
                  </a>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
