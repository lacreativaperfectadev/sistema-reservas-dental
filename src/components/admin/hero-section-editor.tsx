import type { ClinicInfo } from "../../types";
import { ImageUploader } from "./image-uploader";

interface HeroSectionEditorProps {
  form: ClinicInfo;
  onChange: (patch: Partial<ClinicInfo>) => void;
}

export function HeroSectionEditor({ form, onChange }: HeroSectionEditorProps) {
  return (
    <div className="space-y-4 rounded-lg border border-clinic-100 p-3">
      <h4 className="text-sm font-semibold text-clinic-800">Sección Hero</h4>

      <div>
        <label className="text-sm font-medium text-clinic-700">
          Titular (primera línea)
        </label>
        <input
          value={form.heroHeadline || ""}
          onChange={(e) => onChange({ heroHeadline: e.target.value })}
          className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-clinic-700">
          Titular (segunda línea, destacada en color)
        </label>
        <input
          value={form.heroAccentText || ""}
          onChange={(e) => onChange({ heroAccentText: e.target.value })}
          className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm"
        />
      </div>

      <div>
        <label className="text-sm font-medium text-clinic-700">
          Texto de apoyo
        </label>
        <textarea
          value={form.heroSubtext || ""}
          onChange={(e) => onChange({ heroSubtext: e.target.value })}
          rows={3}
          className="mt-1 w-full rounded-lg border border-clinic-100 px-3 py-2 text-sm"
        />
      </div>

      <ImageUploader
        label="Imagen de fondo del hero"
        image={form.heroImageUrl?.startsWith("data:") ? form.heroImageUrl : null}
        fallbackImage={form.heroImageUrl || "/images/hero-banner.webp"}
        onImageChange={(image) =>
          onChange({ heroImageUrl: image || "/images/hero-banner.webp" })
        }
      />
    </div>
  );
}
