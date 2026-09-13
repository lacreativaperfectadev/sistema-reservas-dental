import { useState } from "react";
import { DailyAgenda } from "../components/admin/daily-agenda";
import { AppointmentsBackup } from "../components/admin/appointments-backup";
import { BlockHoursPanel } from "../components/admin/block-hours-panel";
import { ServicesManager } from "../components/admin/services-manager";
import { ScheduleManager } from "../components/admin/schedule-manager";
import { ClinicInfoForm } from "../components/admin/clinic-info-form";
import { LegalContentEditor } from "../components/admin/legal-content-editor";
import { useServices } from "../hooks/use-services";
import { useSchedule } from "../hooks/use-schedule";
import { useAppointments } from "../hooks/use-appointments";
import { useClinicInfo } from "../hooks/use-clinic-info";
import { useLegalContent } from "../hooks/use-legal-content";
import { useAdminAuth } from "../contexts/admin-auth-context";

type Tab = "agenda" | "horario" | "servicios" | "consultorio" | "legal";

const TABS: { id: Tab; label: string }[] = [
  { id: "agenda", label: "Agenda y bloqueos" },
  { id: "horario", label: "Horario semanal" },
  { id: "servicios", label: "Servicios" },
  { id: "consultorio", label: "Datos del consultorio" },
  { id: "legal", label: "Legal y privacidad" },
];

export function AdminPage() {
  const [tab, setTab] = useState<Tab>("agenda");
  const { logout } = useAdminAuth();

  const { services, updateServices } = useServices();
  const { schedule, updateSchedule } = useSchedule();
  const { appointments, removeAppointment, importAppointments } =
    useAppointments();
  const { clinicInfo, updateClinicInfo } = useClinicInfo();
  const { legalContent, updateLegalContent } = useLegalContent();

  return (
    <main className="mx-auto max-w-4xl px-4 py-10 sm:px-6">
      <div className="flex items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold text-clinic-800">
            Panel interno
          </h1>
          <p className="mt-1 text-sm text-clinic-500">
            Solo visible con el enlace directo /admin. Los datos se guardan en
            este navegador.
          </p>
        </div>
        <button
          onClick={logout}
          className="rounded-full bg-red-100 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-200 transition"
        >
          Cerrar sesión
        </button>
      </div>

      <div className="mt-6 flex flex-wrap gap-2">
        {TABS.map((t) => (
          <button
            key={t.id}
            type="button"
            onClick={() => setTab(t.id)}
            className={`rounded-full px-4 py-2 text-sm font-medium transition ${
              tab === t.id
                ? "bg-clinic-600 text-white"
                : "border border-clinic-200 text-clinic-600 hover:bg-clinic-50"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <div className="mt-6 space-y-6">
        {tab === "agenda" && (
          <>
            <DailyAgenda
              appointments={appointments}
              services={services}
              onRemove={removeAppointment}
            />
            <BlockHoursPanel schedule={schedule} onUpdate={updateSchedule} />
            <AppointmentsBackup
              appointments={appointments}
              onImport={importAppointments}
            />
          </>
        )}
        {tab === "horario" && (
          <ScheduleManager schedule={schedule} onUpdate={updateSchedule} />
        )}
        {tab === "servicios" && (
          <ServicesManager services={services} onUpdate={updateServices} />
        )}
        {tab === "consultorio" && (
          <ClinicInfoForm clinicInfo={clinicInfo} onUpdate={updateClinicInfo} />
        )}
        {tab === "legal" && (
          <LegalContentEditor legalContent={legalContent} onUpdate={updateLegalContent} />
        )}
      </div>
    </main>
  );
}
