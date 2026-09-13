# Guía rápida del panel interno (/admin)

## Cómo bloquear horas

1. Abre `/admin` en el mismo dispositivo/navegador donde quieras gestionar la agenda.
2. En la pestaña **"Agenda y bloqueos"**:
   - Elige la fecha con el selector de calendario.
   - Pulsa **"Bloquear día completo"** para cerrar todo ese día (vacaciones, festivos).
   - O pulsa sobre una hora concreta de la rejilla para bloquearla solo a ella (vuelve a pulsar para desbloquearla).
3. Las horas bloqueadas dejan de aparecer como disponibles en la página de reservas al instante.
4. En **"Horario semanal"** puedes cambiar los días y tramos horarios habituales de consulta (por ejemplo, si cambian los horarios de mañana/tarde).
5. En **"Servicios"** puedes añadir, quitar o cambiar la duración de cada tipo de consulta.
6. En **"Datos del consultorio"** puedes actualizar el nombre, dirección, teléfono y horario que ven los pacientes.

## Qué pasa si se borra el historial del navegador

Todas las citas, servicios, horarios y datos del consultorio se guardan **solo en este navegador** (localStorage), no en un servidor. Esto significa:

- Si borras el historial/datos de navegación de este navegador, **se pierden todas las citas y la configuración** — no hay forma de recuperarlos.
- Si abres `/admin` o la página de reservas desde otro ordenador, móvil o navegador distinto, **no verás las mismas citas**: cada dispositivo tiene su propia copia de los datos.
- Recomendación: usa siempre el mismo navegador/dispositivo para gestionar la agenda, y evita el modo incógnito o "borrar datos al cerrar" en ese navegador.

Si en el futuro necesitáis que varios dispositivos compartan la misma agenda en tiempo real, hará falta añadir un servidor/base de datos — eso queda fuera del alcance de esta versión (localStorage, sin backend).
