import { useRef } from "react";

interface LogoUploaderProps {
  logo: string | null;
  onLogoChange: (logo: string | null) => void;
}

export function LogoUploader({ logo, onLogoChange }: LogoUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  function handleFileSelect(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Por favor selecciona una imagen válida");
      return;
    }

    if (file.size > 2 * 1024 * 1024) {
      alert("La imagen debe ser menor a 2MB");
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      onLogoChange(result);
    };
    reader.readAsDataURL(file);
  }

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium text-clinic-700">Logo del consultorio</label>

      <div className="flex items-center gap-4">
        {logo && (
          <div className="relative h-24 w-24 rounded-lg border-2 border-clinic-200 bg-clinic-50 p-2">
            <img
              src={logo}
              alt="Logo preview"
              className="h-full w-full object-contain"
            />
          </div>
        )}

        <div className="flex flex-col gap-2">
          <button
            type="button"
            onClick={() => inputRef.current?.click()}
            className="rounded-lg bg-clinic-600 px-4 py-2 text-sm font-medium text-white hover:bg-clinic-700 transition"
          >
            {logo ? "Cambiar logo" : "Subir logo"}
          </button>

          {logo && (
            <button
              type="button"
              onClick={() => onLogoChange(null)}
              className="rounded-lg border border-red-300 px-4 py-2 text-sm font-medium text-red-600 hover:bg-red-50 transition"
            >
              Eliminar
            </button>
          )}

          <input
            ref={inputRef}
            type="file"
            accept="image/*"
            onChange={handleFileSelect}
            className="sr-only"
          />

          <p className="text-xs text-clinic-500">
            PNG, JPG o GIF • Máx 2MB
          </p>
        </div>
      </div>
    </div>
  );
}
