---
phase: 3
title: "Admin: Logo Upload + Service CRUD Complete"
status: pending
priority: P1
effort: "1.5h"
dependencies: [2]
---

# Phase 03: Admin Features - Logo & Service Management

## Overview

Agregar capacidad de subir logo personalizado en "Datos del consultorio" y permitir editar servicios existentes (no solo crear/eliminar).

## Requirements

- Upload de logo con preview
- Guardar logo en localStorage como base64
- Mostrar logo en landing page y admin
- CRUD completo para servicios (Create, Read, Update, Delete)
- Modal de edición para servicios

## Architecture

**Datos nuevos en localStorage:**
```
clinicInfo: {
  logo: "data:image/png;base64,..." | null
}
```

**Nuevos componentes:**
- `src/components/admin/logo-uploader.tsx` — upload + preview
- `src/components/admin/service-editor-modal.tsx` — modal para editar servicio

**Modificar:**
- `src/components/admin/clinic-info-form.tsx` — agregar logo uploader
- `src/components/admin/services-manager.tsx` — agregar funcionalidad de edit
- `src/components/shared/header.tsx` — mostrar logo si existe

## Related Code Files

- Create: `src/components/admin/logo-uploader.tsx`
- Create: `src/components/admin/service-editor-modal.tsx`
- Modify: `src/components/admin/clinic-info-form.tsx`
- Modify: `src/components/admin/services-manager.tsx`
- Modify: `src/components/shared/header.tsx`
- Modify: `src/hooks/use-clinic-info.ts` — agregar logo field

## Implementation Steps

1. Extender `types.ts` para agregar `logo?: string` en ClinicInfo
2. Crear `logo-uploader.tsx` con validación de imagen
3. Agregar logo uploader en `clinic-info-form.tsx`
4. Crear `service-editor-modal.tsx`
5. Agregar botón "Editar" en services-manager.tsx
6. Actualizar header para mostrar logo
7. Test: logo aparece en landing y admin

## Success Criteria

- [ ] Logo se carga, se muestra preview, se guarda
- [ ] Logo aparece en landing page y admin
- [ ] Servicios se pueden editar completamente
- [ ] Modal de edición es claro y funcional
- [ ] No hay servicios duplicados

## Risk Assessment

**Bajo-medio riesgo.** Cambios en UI clara. Solución: revisar en navegador después de cada paso.

## Notes

Base64 es simple pero no óptimo para archivos grandes. Alternativa: guardar URL de servicio externo (no necesario para MVP).
