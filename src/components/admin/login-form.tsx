import { useState } from "react";
import { useAdminAuth } from "../../contexts/admin-auth-context";

export function LoginForm() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAdminAuth();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    const success = await login(password);
    if (!success) {
      setError("Contraseña incorrecta");
      setPassword("");
    }

    setIsLoading(false);
  }

  return (
    <div className="flex min-h-svh items-center justify-center bg-gradient-to-br from-clinic-50 to-clinic-100 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-8 shadow-lg">
        <h1 className="text-2xl font-semibold text-clinic-800">
          Panel administrativo
        </h1>
        <p className="mt-2 text-sm text-clinic-500">
          Ingresa la contraseña para acceder
        </p>

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <div>
            <label className="text-sm font-medium text-clinic-700">
              Contraseña
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => {
                setPassword(e.target.value);
                setError("");
              }}
              placeholder="••••••••"
              className="mt-2 w-full rounded-lg border border-clinic-200 px-3 py-2 text-sm focus:border-clinic-500 focus:ring-2 focus:ring-clinic-200 focus:outline-none"
              disabled={isLoading}
              autoFocus
            />
          </div>

          {error && (
            <div className="rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            className="w-full rounded-full bg-clinic-600 px-4 py-2 text-sm font-medium text-white hover:bg-clinic-700 disabled:opacity-50 transition"
          >
            {isLoading ? "Verificando..." : "Acceder"}
          </button>
        </form>

        <p className="mt-6 text-xs text-center text-clinic-400">
          Panel protegido por contraseña
        </p>
      </div>
    </div>
  );
}
