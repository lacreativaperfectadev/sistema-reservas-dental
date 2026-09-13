import { Link, useLocation } from "react-router-dom";

export function Header() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-40 border-b border-clinic-100 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="text-lg font-semibold tracking-tight text-clinic-800"
        >
          Sonrisa Clara
        </Link>
        {!isAdmin && (
          <a
            href="#reservar"
            className="rounded-full bg-clinic-600 px-4 py-2 text-sm font-medium text-white shadow-sm transition hover:bg-clinic-700"
          >
            Reservar cita
          </a>
        )}
      </div>
    </header>
  );
}
