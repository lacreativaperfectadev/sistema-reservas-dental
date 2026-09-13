import { motion } from "framer-motion";
import { useLegalContent } from "../hooks/use-legal-content";

export function TermsPage() {
  const { legalContent } = useLegalContent();

  return (
    <main className="mx-auto max-w-3xl px-4 py-16 sm:px-6">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h1 className="mb-8 text-3xl font-semibold text-clinic-800">
          Términos y Condiciones
        </h1>

        <div className="prose prose-sm max-w-none text-clinic-700">
          {legalContent.terms.split("\n").map((line, index) => {
            if (line.startsWith("# ")) {
              return (
                <h2 key={index} className="mb-4 mt-6 text-2xl font-semibold text-clinic-800">
                  {line.replace(/^# /, "")}
                </h2>
              );
            }
            if (line.startsWith("## ")) {
              return (
                <h3 key={index} className="mb-3 mt-4 text-lg font-semibold text-clinic-700">
                  {line.replace(/^## /, "")}
                </h3>
              );
            }
            if (line.startsWith("- ")) {
              return (
                <li key={index} className="ml-4 mb-2">
                  {line.replace(/^- /, "")}
                </li>
              );
            }
            if (line.trim()) {
              return (
                <p key={index} className="mb-3 leading-relaxed">
                  {line}
                </p>
              );
            }
            return null;
          })}
        </div>

        <div className="mt-12 rounded-2xl bg-clinic-50 p-6">
          <p className="text-sm text-clinic-600">
            <span className="font-semibold">Última actualización:</span>{" "}
            {new Date().toLocaleDateString("es-ES", {
              year: "numeric",
              month: "long",
              day: "numeric",
            })}
          </p>
        </div>
      </motion.div>
    </main>
  );
}
