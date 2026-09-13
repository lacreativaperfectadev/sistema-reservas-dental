---
phase: 1
title: "Audit & Corporate Color Strategy"
status: pending
priority: P1
effort: "1h"
dependencies: []
---

# Phase 01: Audit & Corporate Color Strategy

## Overview

Mapear todos los componentes que usan colores azules/no corporativos e identificar dónde implementar el verde teal (#2d8b81). Crear estrategia global de estilos.

## Requirements

- Inventariar componentes con inputs HTML nativos (checkboxes, datepickers)
- Identificar botones que no usan color corporativo
- Crear guía de migración de colores
- Definir componentes reutilizables personalizados

## Architecture

**Enfoque:**
1. Grep todo el código para encontrar inputs nativos sin estilo
2. Crear archivo `src/lib/tailwind-utils.ts` con clases de estilo reutilizables
3. Documentar dónde están los cambios necesarios

**Archivos afectados:**
- `src/components/admin/schedule-manager.tsx` (checkboxes)
- `src/components/admin/daily-agenda.tsx` (checkboxes/datepicker)
- `src/components/admin/block-hours-panel.tsx` (datepicker/time-pickers)
- `src/components/booking/date-picker.tsx` (datepicker)
- `src/components/booking/time-slot-grid.tsx` (puede tener botones azules)

## Implementation Steps

1. **Audit visual:** Revisar cada componente admin en navegador
2. **Grep para inputs:** `grep -r "type=\"checkbox\"" src/components/`
3. **Grep para time inputs:** `grep -r "type=\"time\"" src/components/`
4. **Grep para datepickers:** `grep -r "input.*date" src/components/`
5. **Documentar colores azules:** Buscar `blue`, `blue-600`, hardcoded colores azules
6. **Crear utility file:** `src/lib/tailwind-utils.ts` con clases Tailwind reutilizables
7. **Generar reporte:** Listar todos los puntos que necesitan cambio

## Related Code Files

- Create: `src/lib/tailwind-utils.ts` — utility functions para estilos corporativos
- Modify: Ninguno en esta fase (solo auditoría)

## Success Criteria

- [ ] Reporte completo de componentes con inputs no estilizados
- [ ] Lista de 5-10 puntos específicos que cambiar
- [ ] Archivo utility creado con clases Tailwind reutilizables
- [ ] Documentación clara de qué color cambiar a dónde

## Risk Assessment

**Bajo riesgo.** Solo auditoría, no cambios de código.

## Notes

Este es un paso preparatorio. Los cambios reales vienen en Phase 02 y 03.
