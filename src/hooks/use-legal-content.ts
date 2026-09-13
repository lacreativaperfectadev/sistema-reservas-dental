import { useState, useEffect } from "react";
import type { LegalContent } from "../types";

const STORAGE_KEY = "legalContent";

const DEFAULT_LEGAL_CONTENT: LegalContent = {
  privacy: `# Política de Privacidad

## Introducción
En ${new Date().getFullYear()}, nos comprometemos a proteger tu privacidad. Esta política explica cómo recopilamos y usamos tus datos.

## Recopilación de datos
- Información personal (nombre, teléfono, email) para reservas
- Datos técnicos (cookies, logs) para análisis

## Uso de datos
Utilizamos tus datos para:
- Confirmar y gestionar citas
- Enviar recordatorios
- Mejorar nuestros servicios

## Derechos
Tienes derecho a acceder, rectificar o eliminar tus datos en cualquier momento.

## Contacto
Para consultas sobre privacidad, contáctanos a través del formulario.`,

  terms: `# Términos y Condiciones

## Aceptación
Al usar esta plataforma, aceptas estos términos.

## Reservas
- Las reservas se confirman en línea
- Puedes cancelar hasta 24 horas antes
- Cambios de horario están permitidos

## Responsabilidad
No somos responsables de daños indirectos derivados del uso de este servicio.

## Cambios
Nos reservamos el derecho de modificar estos términos. Los cambios se notificarán en esta página.

## Ley aplicable
Estos términos se rigen por la ley española.`,
};

export function useLegalContent() {
  const [legalContent, setLegalContent] = useState<LegalContent>(DEFAULT_LEGAL_CONTENT);

  useEffect(() => {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      try {
        setLegalContent(JSON.parse(stored));
      } catch {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LEGAL_CONTENT));
      }
    } else {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(DEFAULT_LEGAL_CONTENT));
    }
  }, []);

  function updateLegalContent(content: LegalContent) {
    setLegalContent(content);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }

  return { legalContent, updateLegalContent };
}
