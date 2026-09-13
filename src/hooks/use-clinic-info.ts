import { useState } from "react";
import { getClinicInfo, saveClinicInfo } from "../lib/storage";
import type { ClinicInfo } from "../types";

export function useClinicInfo() {
  const [clinicInfo, setClinicInfo] = useState<ClinicInfo>(() =>
    getClinicInfo(),
  );

  function updateClinicInfo(next: ClinicInfo) {
    setClinicInfo(next);
    saveClinicInfo(next);
  }

  return { clinicInfo, updateClinicInfo };
}
