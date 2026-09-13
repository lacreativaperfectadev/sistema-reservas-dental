import { Link, useLocation } from "react-router-dom";

const NAV_LINKS = [
  { label: "Inicio", href: "#inicio" },
  { label: "Tratamientos", href: "#tratamientos" },
  { label: "Contacto", href: "#contacto" },
];

export function Header() {
  const location = useLocation();
  const isAdmin = location.pathname.startsWith("/admin");

  return (
    <header className="sticky top-0 z-40 border-b border-clinic-100 bg-sand-50/90 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-4 px-4 py-4 sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2 text-lg font-semibold tracking-tight text-clinic-800"
        >
          <span className="flex h-9 w-9 items-center justify-center rounded-full border border-clinic-200 bg-white text-clinic-600">
            <svg
              viewBox="0 0 24 24"
              className="h-5 w-5"
              fill="none"
              stroke="currentColor"
              strokeWidth={1.4}
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <path d="M12 3c1.8 0 2.6 1 3.8 1 1.4 0 2.4 1.3 2.4 3.1 0 1.6-.6 2.8-.6 4.6 0 2-1.2 5.4-2.8 5.4-1.1 0-1.3-2-2.8-2s-1.7 2-2.8 2c-1.6 0-2.8-3.4-2.8-5.4 0-1.8-.6-3-.6-4.6C5.8 5.3 6.8 4 8.2 4 9.4 4 10.2 3 12 3Z" />
            </svg>
          </span>
          Sonrisa Clara
        </Link>

        {!isAdmin && (
          <>
            <nav className="hidden items-center gap-6 text-sm font-medium text-clinic-700 md:flex">
              {NAV_LINKS.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className="transition hover:text-clinic-900"
                >
                  {link.label}
                </a>
              ))}
            </nav>

            <a
              href="#reservar"
              className="inline-flex shrink-0 items-center gap-2 rounded-full bg-clinic-800 px-4 py-2 text-sm font-medium text-sand-50 shadow-sm transition hover:bg-clinic-700"
            >
              <svg
                viewBox="0 0 24 24"
                className="h-4 w-4"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.8}
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="16" rx="2" />
                <path d="M3 10h18M8 3v4M16 3v4" />
              </svg>
              Reserva tu cita
            </a>
          </>
        )}
      </div>
    </header>
  );
}
