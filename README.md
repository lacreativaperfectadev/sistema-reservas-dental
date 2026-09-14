# Sistema de reservas de citas — Consultorio dental

Landing pública + sistema de reservas online para una clínica dental de un único
dentista, con panel de administración interno. Sin backend: todo (citas,
horarios, servicios, textos e imágenes de la web) se guarda en el
`localStorage` del navegador — pensado como demo/entrega inicial, no como
sistema multi-dispositivo en producción (ver [Limitaciones](#limitaciones)).

## Stack

- React 19 + TypeScript + Vite
- Tailwind CSS v4
- react-router-dom (rutas del lado del cliente)
- framer-motion (animaciones)
- react-day-picker + date-fns (calendarios del admin)

## Arrancar en local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`.

Otros comandos:

```bash
npm run build     # build de producción a dist/
npm run preview   # sirve el build de producción localmente
npm run lint      # oxlint
```

## Estructura

```
src/
  components/
    booking/   → flujo de reserva público (selección de servicio, fecha, hora, formulario)
    info/      → secciones de la landing (hero, tratamientos, diferenciadores, CTA final...)
    admin/     → formularios y widgets del panel interno
    shared/    → header, footer, banner de cookies
  lib/         → storage.ts (localStorage), availability.ts (cálculo de huecos), ics.ts (export .ics)
  hooks/       → useServices, useSchedule, useAppointments, useClinicInfo, useLegalContent
  pages/       → home-page, admin-page, privacy-page, terms-page
public/images/ → fotos reales de la clínica usadas en la landing (no se editan por código,
                 se reemplazan desde el panel /admin)
```

## Panel de administración

Accesible en `/admin` (sin enlace visible desde la web pública). Protegido con
contraseña — el hash está en `src/contexts/admin-auth-context.tsx`.

**Antes de pasar a producción real, cambia la contraseña por defecto.** Para
generar el hash de una nueva contraseña:

```bash
printf "tu-nueva-contraseña" | shasum -a 256
```

y sustituye `ADMIN_PASSWORD_HASH` en ese archivo.

Desde el panel se gestiona, sin tocar código:

- Agenda del día y bloqueo de horas/días completos
- Horario semanal de la consulta
- Servicios ofrecidos (nombre, duración)
- Todos los textos e imágenes de la landing (hero, tratamientos, diferenciadores, CTA final)
- Textos legales (privacidad, términos)
- Copia de seguridad de citas (exportar/importar `.json`)

Guía paso a paso con capturas: [`docs/guia-panel-admin.html`](docs/guia-panel-admin.html)
(o su versión en PDF, `docs/guia-panel-admin.pdf`).

## Despliegue

Cualquier hosting de estáticos sirve (Netlify, Vercel, GitHub Pages...). Al
usar rutas del lado del cliente (`react-router-dom`), el hosting necesita
redirigir cualquier ruta a `index.html`:

- **Netlify**: ya incluido en `public/_redirects` (`/* /index.html 200`).
- **Vercel**: usar un rewrite en `vercel.json` equivalente.

## Limitaciones

Todo el estado (citas, bloqueos, configuración, contenido editado desde el
admin) vive en el `localStorage` del navegador, **no en un servidor**:

- Los datos no se comparten entre dispositivos ni navegadores — una cita
  reservada por un paciente desde su móvil no aparece en el `/admin` de la
  dentista si lo abre en otro navegador/ordenador.
- Borrar el historial/datos de navegación de ese navegador borra todo
  permanentemente (usa la copia de seguridad de citas del panel para
  mitigar esto).

Para un uso real con varios dispositivos accediendo a la misma agenda hace
falta añadir un backend con base de datos compartida (p. ej. Supabase o
Firebase) — no incluido en esta versión.
