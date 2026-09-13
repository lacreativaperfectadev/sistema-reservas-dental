import { AnimatePresence, motion } from "framer-motion";
import type { ReactNode } from "react";

interface StepTransitionProps {
  stepKey: string;
  children: ReactNode;
}

/** Anima la entrada/salida de cada paso del flujo de reserva. */
export function StepTransition({ stepKey, children }: StepTransitionProps) {
  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={stepKey}
        initial={{ opacity: 0, x: 16 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -16 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
