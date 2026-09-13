interface IconProps {
  className?: string;
}

export function ValoracionIcon({ className }: IconProps) {
  return (
    <img
      src="/images/icon-valoracion.png"
      alt=""
      aria-hidden="true"
      className={`object-contain ${className ?? ""}`}
    />
  );
}

export function OrtodonciaIcon({ className }: IconProps) {
  return (
    <img
      src="/images/icon-ortodoncia.png"
      alt=""
      aria-hidden="true"
      className={`object-contain ${className ?? ""}`}
    />
  );
}

export function EsteticaIcon({ className }: IconProps) {
  return (
    <img
      src="/images/icon-estetica.png"
      alt=""
      aria-hidden="true"
      className={`object-contain ${className ?? ""}`}
    />
  );
}

export function DefaultServiceIcon({ className }: IconProps) {
  return <ValoracionIcon className={className} />;
}

export function getServiceIcon(serviceName: string) {
  const name = serviceName.toLowerCase();
  if (name.includes("ortodoncia")) return OrtodonciaIcon;
  if (
    name.includes("estétic") ||
    name.includes("estetic") ||
    name.includes("blanqueamiento")
  )
    return EsteticaIcon;
  if (name.includes("valoraci")) return ValoracionIcon;
  return DefaultServiceIcon;
}
