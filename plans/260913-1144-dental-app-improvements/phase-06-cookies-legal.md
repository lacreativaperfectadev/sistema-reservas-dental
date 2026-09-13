---
phase: 6
title: "Cookies Banner + Legal Pages (Privacy/Terms)"
status: pending
priority: P1
effort: "1h"
dependencies: [5]
---

# Phase 06: Cookies Banner & Legal Pages

## Overview

Implementar banner de cookies con consentimiento y crear páginas /privacy y /terms con contenido editable desde admin.

## Requirements

- Banner sticky de cookies en footer
- Consentimiento de cookies guardado en localStorage
- Página /privacy editable desde admin
- Página /terms editable desde admin
- Contenido legal modificable en panel admin
- Cumplimiento GDPR/LSSI-CE básico

## Architecture

**Banner de cookies:**
- Sticky en bottom
- Botones: "Aceptar" y "Rechazar" (o "Leer más")
- Guardado en localStorage por 365 días
- Desaparece si ya fue aceptado

**Nuevas rutas:**
- `/privacy` — Página de privacidad
- `/terms` — Términos y condiciones

**Datos editables:**
- Texto banner cookies
- Contenido completo de /privacy
- Contenido completo de /terms

## Related Code Files

- Create: `src/components/shared/cookies-banner.tsx`
- Create: `src/pages/privacy-page.tsx`
- Create: `src/pages/terms-page.tsx`
- Modify: `src/App.tsx` — agregar rutas /privacy y /terms
- Modify: `src/types.ts` — agregar fields de legal en ClinicInfo
- Modify: `src/components/admin/clinic-info-form.tsx` — editor de contenido legal
- Modify: `src/components/shared/footer.tsx` — agregar links a privacy/terms

## Implementation Steps

1. Extender `ClinicInfo` type: agregar `privacyText`, `termsText`, `cookieBannerText`
2. Crear `cookies-banner.tsx`:
   - Mostrar solo si no hay cookie de consentimiento
   - Botones: Aceptar / Rechazar / Leer Política
   - Guardar elección en localStorage (365 días)
3. Crear `privacy-page.tsx` — renderizar `clinicInfo.privacyText`
4. Crear `terms-page.tsx` — renderizar `clinicInfo.termsText`
5. Agregar rutas en App.tsx
6. Crear editor en `clinic-info-form.tsx` para estos textos
7. Agregar links en footer
8. Test: banner aparece, se guarda elección, desaparece en reload

## Success Criteria

- [ ] Banner de cookies aparece en landing
- [ ] Consentimiento se guarda
- [ ] Páginas /privacy y /terms accesibles
- [ ] Contenido editable desde admin
- [ ] Links en footer funcionales
- [ ] Banner no molesta (sticky pero no invasivo)

## Risk Assessment

**Bajo riesgo.** Componentes independientes. Solución: revisar que localStorage funciona.

## Legal Compliance Notes

- ⚠️ Contenido legal es responsabilidad de la dentista
- ✅ Sistema permite editarlo fácilmente
- 📋 Template: proporcionar textos base en español (GDPR/LSSI-CE)

## Default Legal Content

Proporcionar templates básicos editables:
- Privacy: recolección datos, uso, derechos
- Terms: reservas, cancelaciones, responsabilidades
- Cookies: explicación de cookies

Usuario puede personalizar en admin.
