import { useState } from "react";
import type { Service } from "../../types";
import { ServiceEditorModal } from "./service-editor-modal";

interface ServicesManagerProps {
  services: Service[];
  onUpdate: (services: Service[]) => void;
}

const emptyForm = { name: "", durationMinutes: 30, description: "" };

export function ServicesManager({ services, onUpdate }: ServicesManagerProps) {
  const [form, setForm] = useState(emptyForm);
  const [editingService, setEditingService] = useState<Service | null>(null);

  function addService() {
    if (!form.name.trim()) return;
    const service: Service = {
      id: crypto.randomUUID(),
      name: form.name.trim(),
      durationMinutes: Number(form.durationMinutes) || 30,
      description: form.description.trim(),
    };
    onUpdate([...services, service]);
    setForm(emptyForm);
  }

  function removeService(id: string) {
    onUpdate(services.filter((s) => s.id !== id));
  }

  function handleEditService(updatedService: Service) {
    onUpdate(
      services.map((s) => (s.id === updatedService.id ? updatedService : s))
    );
    setEditingService(null);
  }

  function updateDuration(id: string, durationMinutes: number) {
    onUpdate(
      services.map((s) => (s.id === id ? { ...s, durationMinutes } : s)),
    );
  }

  return (
    <div className="rounded-2xl border border-clinic-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-clinic-800">Servicios</h3>

      <ul className="mt-4 space-y-2">
        {services.map((service) => (
          <li
            key={service.id}
            className="flex items-center justify-between gap-3 rounded-lg border border-clinic-100 px-3 py-2"
          >
            <div>
              <p className="text-sm font-medium text-clinic-800">
                {service.name}
              </p>
              <p className="text-xs text-clinic-500">{service.description}</p>
            </div>
            <div className="flex items-center gap-2">
              <input
                type="number"
                min={5}
                step={5}
                value={service.durationMinutes}
                onChange={(e) =>
                  updateDuration(service.id, Number(e.target.value))
                }
                className="w-16 rounded border border-clinic-100 px-1.5 py-1 text-xs"
              />
              <span className="text-xs text-clinic-400">min</span>
              <button
                type="button"
                onClick={() => setEditingService(service)}
                className="text-xs font-medium text-clinic-600 hover:text-clinic-800"
              >
                Editar
              </button>
              <button
                type="button"
                onClick={() => removeService(service.id)}
                className="text-xs font-medium text-red-500 hover:text-red-700"
              >
                Eliminar
              </button>
            </div>
          </li>
        ))}
      </ul>

      <div className="mt-4 space-y-2 border-t border-clinic-100 pt-4">
        <p className="text-sm font-medium text-clinic-700">
          Añadir nuevo servicio
        </p>
        <input
          value={form.name}
          onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
          placeholder="Nombre del servicio"
          className="w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm"
        />
        <div className="flex gap-2">
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
            className="w-24 rounded-lg border border-clinic-100 px-3 py-2 text-sm"
          />
          <input
            value={form.description}
            onChange={(e) =>
              setForm((f) => ({ ...f, description: e.target.value }))
            }
            placeholder="Descripción breve (opcional)"
            className="flex-1 rounded-lg border border-clinic-100 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="button"
          onClick={addService}
          className="rounded-full bg-clinic-600 px-4 py-2 text-sm font-medium text-white hover:bg-clinic-700"
        >
          Añadir servicio
        </button>
      </div>

      <ServiceEditorModal
        service={editingService}
        onSave={handleEditService}
        onClose={() => setEditingService(null)}
      />
    </div>
  );
}
