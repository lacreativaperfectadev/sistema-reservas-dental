import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function CookiesBanner() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const cookiesAccepted = localStorage.getItem("cookiesAccepted");
    if (!cookiesAccepted) {
      setIsVisible(true);
    }
  }, []);

  function handleAccept() {
    localStorage.setItem("cookiesAccepted", "true");
    setIsVisible(false);
  }

  function handleDecline() {
    localStorage.setItem("cookiesAccepted", "false");
    setIsVisible(false);
  }

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          className="fixed bottom-0 left-0 right-0 z-50 bg-clinic-900 text-sand-50 p-4 shadow-lg sm:p-6"
        >
          <div className="mx-auto max-w-5xl">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-sm font-medium">
                  🍪 Usamos cookies para mejorar tu experiencia
                </p>
                <p className="mt-1 text-xs text-clinic-200">
                  Utilizamos cookies técnicas y analíticas. Lee nuestra{" "}
                  <a
                    href="/privacy"
                    className="underline hover:text-sand-50 transition"
                  >
                    política de privacidad
                  </a>{" "}
                  para más información.
                </p>
              </div>
              <div className="flex gap-2 flex-shrink-0">
                <button
                  onClick={handleDecline}
                  className="rounded-full border border-clinic-600 px-4 py-2 text-xs font-medium text-clinic-100 hover:bg-clinic-800 transition"
                >
                  Rechazar
                </button>
                <button
                  onClick={handleAccept}
                  className="rounded-full bg-clinic-600 px-4 py-2 text-xs font-medium text-sand-50 hover:bg-clinic-700 transition"
                >
                  Aceptar
                </button>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
