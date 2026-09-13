import { useState } from "react";
import type { Service } from "../../types";

interface ServiceEditorModalProps {
  service: Service | null;
  onSave: (service: Service) => void;
  onClose: () => void;
}

export function ServiceEditorModal({
  service,
  onSave,
  onClose,
}: ServiceEditorModalProps) {
  const [form, setForm] = useState(
    service || { id: "", name: "", durationMinutes: 30, description: "" }
  );

  if (!service) return null;

  function handleSave() {
    if (!form.name.trim()) return;
    onSave({
      ...form,
      name: form.name.trim(),
      description: form.description.trim(),
      durationMinutes: Number(form.durationMinutes) || 30,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-md rounded-lg bg-white p-6 shadow-lg">
        <h2 className="text-lg font-semibold text-clinic-800">Editar servicio</h2>

        <div className="mt-4 space-y-3">
          <div>
            <label className="text-sm font-medium text-clinic-700">
              Nombre del servicio
            </label>
            <input
              value={form.name}
              onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
              placeholder="Ej: Limpieza dental"
              className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm focus:border-clinic-500 focus:ring-2 focus:ring-clinic-200 focus:outline-none"
            />
          </div>

          <div className="flex gap-2">
            <div className="flex-1">
              <label className="text-sm font-medium text-clinic-700">
                Duración (min)
              </label>
              <input
                type="number"
                min={5}
                step={5}
                value={form.durationMinutes}
                onChange={(e) =>
                  setForm((f) => ({
                    ...f,
                    durationMinutes: Number(e.target.value),
                  }))
                }
                className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm focus:border-clinic-500 focus:ring-2 focus:ring-clinic-200 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="text-sm font-medium text-clinic-700">
              Descripción (opcional)
            </label>
            <input
              value={form.description}
              onChange={(e) =>
                setForm((f) => ({ ...f, description: e.target.value }))
              }
              placeholder="Descripción breve del servicio"
              className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm focus:border-clinic-500 focus:ring-2 focus:ring-clinic-200 focus:outline-none"
            />
          </div>
        </div>

        <div className="mt-6 flex gap-2">
          <button
            type="button"
            onClick={onClose}
            className="flex-1 rounded-lg border border-clinic-200 px-4 py-2 text-sm font-medium text-clinic-700 hover:bg-clinic-50 transition"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="flex-1 rounded-lg bg-clinic-600 px-4 py-2 text-sm font-medium text-white hover:bg-clinic-700 transition"
          >
            Guardar cambios
          </button>
        </div>
      </div>
    </div>
  );
}
