import { useState, type FormEvent } from "react";
import type { LegalContent } from "../../types";

interface LegalContentEditorProps {
  legalContent: LegalContent;
  onUpdate: (content: LegalContent) => void;
}

type Tab = "privacy" | "terms";

export function LegalContentEditor({
  legalContent,
  onUpdate,
}: LegalContentEditorProps) {
  const [tab, setTab] = useState<Tab>("privacy");
  const [form, setForm] = useState(legalContent);

  function handleSubmit(event: FormEvent) {
    event.preventDefault();
    onUpdate(form);
  }

  return (
    <div className="rounded-2xl border border-clinic-100 bg-white p-6 shadow-sm">
      <h3 className="text-lg font-semibold text-clinic-800">
        Política de privacidad y términos
      </h3>

      <div className="mt-4 flex gap-2">
        <button
          type="button"
          onClick={() => setTab("privacy")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            tab === "privacy"
              ? "bg-clinic-600 text-white"
              : "border border-clinic-200 text-clinic-600 hover:bg-clinic-50"
          }`}
        >
          Política de privacidad
        </button>
        <button
          type="button"
          onClick={() => setTab("terms")}
          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
            tab === "terms"
              ? "bg-clinic-600 text-white"
              : "border border-clinic-200 text-clinic-600 hover:bg-clinic-50"
          }`}
        >
          Términos y condiciones
        </button>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        {tab === "privacy" && (
          <div>
            <label className="text-sm font-medium text-clinic-700">
              Política de privacidad
            </label>
            <p className="mt-1 text-xs text-clinic-500">
              Usa markdown: # Título, ## Subtítulo, - Punto
            </p>
            <textarea
              value={form.privacy}
              onChange={(e) => setForm((f) => ({ ...f, privacy: e.target.value }))}
              className="mt-2 w-full h-96 rounded-lg border border-clinic-100 px-3 py-2 text-sm font-mono focus:border-clinic-500 focus:ring-2 focus:ring-clinic-200 focus:outline-none"
              placeholder="Escribe aquí..."
            />
          </div>
        )}

        {tab === "terms" && (
          <div>
            <label className="text-sm font-medium text-clinic-700">
              Términos y condiciones
            </label>
            <p className="mt-1 text-xs text-clinic-500">
              Usa markdown: # Título, ## Subtítulo, - Punto
            </p>
            <textarea
              value={form.terms}
              onChange={(e) => setForm((f) => ({ ...f, terms: e.target.value }))}
              className="mt-2 w-full h-96 rounded-lg border border-clinic-100 px-3 py-2 text-sm font-mono focus:border-clinic-500 focus:ring-2 focus:ring-clinic-200 focus:outline-none"
              placeholder="Escribe aquí..."
            />
          </div>
        )}

        <button
          type="submit"
          className="rounded-full bg-clinic-600 px-4 py-2 text-sm font-medium text-white hover:bg-clinic-700 transition"
        >
          Guardar cambios
        </button>
      </form>
    </div>
  );
}
