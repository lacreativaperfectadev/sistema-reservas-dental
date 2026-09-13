import { useState } from "react";
import { getSchedule, saveSchedule } from "../lib/storage";
import type { Schedule } from "../types";

export function useSchedule() {
  const [schedule, setSchedule] = useState<Schedule>(() => getSchedule());

  function updateSchedule(next: Schedule) {
    setSchedule(next);
    saveSchedule(next);
  }

  return { schedule, updateSchedule };
}
