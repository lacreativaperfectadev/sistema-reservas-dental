---
phase: 2
title: "Admin: Corporate Colors (Checkboxes, Datepickers, Buttons)"
status: pending
priority: P1
effort: "1.5h"
dependencies: [1]
---

# Phase 02: Admin Styling - Corporate Colors

## Overview

Reemplazar todos los inputs HTML nativos con componentes estilizados en verde corporativo. Aplicar consistencia visual en todo el panel admin.

## Requirements

- Crear componentes personalizados: Checkbox, TimePicker, DatePicker
- Aplicar color verde teal (#2d8b81) a todos los inputs
- Unificar botones primarios al color corporativo
- Mantener accesibilidad (labels, ARIA)

## Architecture

**Nuevos componentes en `src/components/admin/`:**
- `checkbox-custom.tsx` — reemplazo de `<input type="checkbox">`
- `time-picker-custom.tsx` — reemplazo de `<input type="time">`
- Actualizar clases Tailwind en `src/index.css` si es necesario

**Colores:**
- Checkbox checked: `bg-clinic-500 border-clinic-500`
- Checkbox focus: `ring-clinic-300`
- Time/Date inputs: `border-clinic-300 focus:border-clinic-500 focus:ring-clinic-200`
- Botones primarios: `bg-clinic-600 hover:bg-clinic-700`

## Related Code Files

- Create: `src/components/admin/checkbox-custom.tsx`
- Create: `src/components/admin/time-picker-custom.tsx`
- Modify: `src/components/admin/schedule-manager.tsx`
- Modify: `src/components/admin/daily-agenda.tsx`
- Modify: `src/components/admin/block-hours-panel.tsx`

## Implementation Steps

1. Crear `checkbox-custom.tsx` con Tailwind
2. Crear `time-picker-custom.tsx` con Tailwind
3. Reemplazar inputs en `schedule-manager.tsx`
4. Reemplazar inputs en `daily-agenda.tsx`
5. Reemplazar inputs en `block-hours-panel.tsx`
6. Revisar todos los botones primarios (deben ser `bg-clinic-600`)
7. Test en navegador: todos los inputs deben ser verdes

## Success Criteria

- [ ] Checkboxes estilizados en verde corporativo
- [ ] Time pickers con bordes verdes
- [ ] Botones primarios consistentes
- [ ] Todos los inputs focusables con ring verde
- [ ] Sin inputs HTML nativos visibles en panel admin

## Risk Assessment

**Medio riesgo.** Cambios visuales amplios. Solución: revisar en navegador inmediatamente después.

## Notes

Los componentes personalizados deben ser simples y reutilizables. No agregar lógica compleja aquí — solo estilos.
