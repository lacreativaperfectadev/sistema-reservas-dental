import { useState } from "react";
import type { Treatment } from "../../types";
import { ImageUploader } from "./image-uploader";

interface TreatmentsEditorProps {
  treatments: Treatment[];
  onChange: (treatments: Treatment[]) => void;
}

export function TreatmentsEditor({
  treatments,
  onChange,
}: TreatmentsEditorProps) {
  // Ruta original de cada tratamiento (antes de cualquier subida), para poder "restaurar".
  const [defaults] = useState(() => treatments.map((t) => t.imageUrl));

  function updateItem(index: number, patch: Partial<Treatment>) {
    const next = treatments.map((item, i) =>
      i === index ? { ...item, ...patch } : item,
    );
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-clinic-700">
        Tratamientos destacados
      </label>
      {treatments.map((item, index) => {
        const isUploaded = item.imageUrl.startsWith("data:");
        return (
          <div
            key={index}
            className="space-y-2 rounded-lg border border-clinic-100 p-3"
          >
            <input
              value={item.title}
              onChange={(e) => updateItem(index, { title: e.target.value })}
              placeholder="Título del tratamiento"
              className="w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm"
            />
            <textarea
              value={item.description}
              onChange={(e) =>
                updateItem(index, { description: e.target.value })
              }
              placeholder="Descripción"
              rows={2}
              className="w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm"
            />
            <ImageUploader
              label="Foto del tratamiento"
              image={isUploaded ? item.imageUrl : null}
              fallbackImage={isUploaded ? undefined : item.imageUrl}
              onImageChange={(image) =>
                updateItem(index, { imageUrl: image ?? defaults[index] })
              }
            />
          </div>
        );
      })}
    </div>
  );
}
