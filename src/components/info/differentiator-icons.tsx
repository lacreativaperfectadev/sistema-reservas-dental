import type { ReactElement } from "react";
import type { DifferentiatorIconKey } from "../../types";

interface IconProps {
  className?: string;
}

function ClinicIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2 3 6v3c0 5.25 3.75 9.75 9 11 5.25-1.25 9-5.75 9-11V6l-9-4Z" />
      <path d="M12 8v6M9 11h6" />
    </svg>
  );
}

function GraduationIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="m2 9 10-5 10 5-10 5-10-5Z" />
      <path d="M6 11v5c0 1.1 2.7 3 6 3s6-1.9 6-3v-5" />
      <path d="M22 9v6" />
    </svg>
  );
}

function HeartIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78Z" />
    </svg>
  );
}

function CardIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="2" y="5" width="20" height="14" rx="2" />
      <path d="M2 10h20M6 15h4" />
    </svg>
  );
}

function GiftIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <rect x="3" y="9" width="18" height="12" rx="1" />
      <path d="M3 13h18M12 9v12" />
      <path d="M12 9C9 9 7.5 7.5 7.5 6a2.5 2.5 0 0 1 5 0v3ZM12 9c3 0 4.5-1.5 4.5-3a2.5 2.5 0 0 0-5 0v3Z" />
    </svg>
  );
}

function DiamondIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M6 3h12l3 5-9 13L3 8Z" />
      <path d="M3 8h18M9 3l-2 5 5 13 5-13-2-5" />
    </svg>
  );
}

function PeopleIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <path d="M16 9.5a2.5 2.5 0 1 0 0-5" />
      <path d="M18.5 14c2 .5 3.5 2.4 3.5 4.6" />
    </svg>
  );
}

function ShieldIcon({ className }: IconProps) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.8}
      strokeLinecap="round"
      strokeLinejoin="round"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 2 3 6v3c0 5.25 3.75 9.75 9 11 5.25-1.25 9-5.75 9-11V6l-9-4Z" />
      <path d="m8.5 12 2.3 2.3L15.5 9.5" />
    </svg>
  );
}

const ICONS: Record<DifferentiatorIconKey, (props: IconProps) => ReactElement> = {
  clinic: ClinicIcon,
  graduation: GraduationIcon,
  heart: HeartIcon,
  card: CardIcon,
  gift: GiftIcon,
  diamond: DiamondIcon,
  people: PeopleIcon,
  shield: ShieldIcon,
};

interface DifferentiatorIconProps {
  icon: DifferentiatorIconKey;
  className?: string;
}

export function DifferentiatorIcon({ icon, className }: DifferentiatorIconProps) {
  const Icon = ICONS[icon] ?? ClinicIcon;
  return <Icon className={className} />;
}

export const DIFFERENTIATOR_ICON_LABELS: Record<DifferentiatorIconKey, string> = {
  clinic: "Infraestructura",
  graduation: "Formación",
  heart: "Trato cercano",
  card: "Financiación",
  gift: "Oferta de bienvenida",
  diamond: "Tecnología",
  people: "Trato cercano",
  shield: "Seguridad",
};
