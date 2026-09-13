import { useState } from "react";
import { getServices, saveServices } from "../lib/storage";
import type { Service } from "../types";

export function useServices() {
  const [services, setServices] = useState<Service[]>(() => getServices());

  function updateServices(next: Service[]) {
    setServices(next);
    saveServices(next);
  }

  return { services, updateServices };
}
