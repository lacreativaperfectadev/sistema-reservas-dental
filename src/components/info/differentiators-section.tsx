import { motion } from "framer-motion";
import type { ClinicInfo, Differentiator } from "../../types";
import { DifferentiatorIcon } from "./differentiator-icons";

interface DifferentiatorsSectionProps {
  clinicInfo: ClinicInfo;
}

const DEFAULT_DIFFERENTIATORS: Differentiator[] = [
  {
    icon: "diamond",
    title: "Tecnología avanzada",
    description:
      "Equipo de última generación para diagnósticos más precisos.",
  },
  {
    icon: "people",
    title: "Trato cercano",
    description: "Te escucho y te acompaño en todo el proceso.",
  },
  {
    icon: "shield",
    title: "Entorno seguro",
    description: "Máxima higiene y protocolos de esterilización.",
  },
  {
    icon: "heart",
    title: "Resultados reales",
    description: "Sonrisas más sanas y pacientes más felices.",
  },
];

export function DifferentiatorsSection({
  clinicInfo,
}: DifferentiatorsSectionProps) {
  const differentiators =
    clinicInfo.differentiators && clinicInfo.differentiators.length > 0
      ? clinicInfo.differentiators
      : DEFAULT_DIFFERENTIATORS;

  return (
    <section id="nosotros" className="bg-clinic-800 py-16 text-sand-50 sm:py-20">
      <div className="mx-auto max-w-6xl px-4 sm:px-6">
        <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-4">
          {differentiators.map((item, index) => (
            <motion.div
              key={item.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: index * 0.08 }}
              className="flex flex-col items-center text-center"
            >
              <span className="flex h-14 w-14 items-center justify-center rounded-full bg-sand-50/10 text-sand-50">
                <DifferentiatorIcon icon={item.icon} className="h-7 w-7" />
              </span>
              <h3 className="mt-4 text-base font-semibold">{item.title}</h3>
              <p className="mt-2 text-sm text-clinic-100/80">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
