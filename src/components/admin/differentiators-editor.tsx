import type { Differentiator, DifferentiatorIconKey } from "../../types";
import { DIFFERENTIATOR_ICON_LABELS } from "../info/differentiator-icons";

interface DifferentiatorsEditorProps {
  differentiators: Differentiator[];
  onChange: (differentiators: Differentiator[]) => void;
}

const ICON_OPTIONS = Object.keys(
  DIFFERENTIATOR_ICON_LABELS,
) as DifferentiatorIconKey[];

export function DifferentiatorsEditor({
  differentiators,
  onChange,
}: DifferentiatorsEditorProps) {
  function updateItem(index: number, patch: Partial<Differentiator>) {
    const next = differentiators.map((item, i) =>
      i === index ? { ...item, ...patch } : item,
    );
    onChange(next);
  }

  return (
    <div className="space-y-4">
      <label className="text-sm font-medium text-clinic-700">
        Diferenciales del consultorio
      </label>
      {differentiators.map((item, index) => (
        <div
          key={index}
          className="space-y-2 rounded-lg border border-clinic-100 p-3"
        >
          <select
            value={item.icon}
            onChange={(e) =>
              updateItem(index, {
                icon: e.target.value as DifferentiatorIconKey,
              })
            }
            className="w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm"
          >
            {ICON_OPTIONS.map((icon) => (
              <option key={icon} value={icon}>
                {DIFFERENTIATOR_ICON_LABELS[icon]}
              </option>
            ))}
          </select>
          <input
            value={item.title}
            onChange={(e) => updateItem(index, { title: e.target.value })}
            placeholder="Título"
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
        </div>
      ))}
    </div>
  );
}
