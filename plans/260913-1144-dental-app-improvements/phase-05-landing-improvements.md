---
phase: 5
title: "Landing: Content Enhancement + Google Maps"
status: pending
priority: P1
effort: "2h"
dependencies: [3]
---

# Phase 05: Landing Page Improvements

## Overview

Mejorar landing basándose en ejemplo Odonto Vitta: agregar más contenido, secciones estructuradas, Google Maps embebido, y diseño más rico.

## Reference: Odonto Vitta Structure

**Secciones:**
1. **Hero** — Logo, headline impactante, CTA, foto dentista
2. **Diferenciadores** — Cards de beneficios (4-5 items)
3. **Tratamientos** — Grid de servicios con imágenes
4. **Información contacto** — Dirección, teléfono, horarios
5. **Google Maps** — Ubicación embebida
6. **Footer** — Cookie banner, links legales

## Requirements

- Expandir hero section con contenido más rico
- Crear sección "¿Por qué elegirnos?" (diferenciadores)
- Mejorar sección de servicios con imágenes/descripciones
- Agregar Google Maps embebido
- Actualizar footer con info contacto
- Revisar responsividad móvil/tablet
- Todos los textos editables desde admin

## Architecture

**Nuevas secciones en landing:**
- Diferenciadores (cards)
- Tratamientos con imágenes
- Google Maps

**Componentes a crear/modificar:**
- `src/components/info/differentiators-section.tsx` — NEW
- `src/components/info/treatments-section.tsx` — NEW
- `src/components/info/google-maps-section.tsx` — NEW
- `src/components/shared/footer.tsx` — NEW (con cookies banner)
- `src/components/info/hero-section.tsx` — ENHANCE
- `src/pages/home-page.tsx` — reordenar secciones

**Datos editables desde admin:**
- Headline hero
- Descripción hero
- Diferenciadores (texto + icono)
- Dirección + Google Maps embed URL
- Teléfono, horarios
- Textos de footer

## Related Code Files

- Create: `src/components/info/differentiators-section.tsx`
- Create: `src/components/info/treatments-section.tsx`
- Create: `src/components/info/google-maps-section.tsx`
- Create: `src/components/shared/footer.tsx`
- Modify: `src/components/info/hero-section.tsx`
- Modify: `src/pages/home-page.tsx`
- Modify: `src/components/admin/clinic-info-form.tsx` — agregar campos para editar landing

## Implementation Steps

1. Extender `ClinicInfo` type para agregar campos de landing (direccion, telefono, horarios, google_maps_url)
2. Crear `differentiators-section.tsx` con cards de beneficios
3. Crear `treatments-section.tsx` con grid de servicios + imágenes
4. Crear `google-maps-section.tsx` con embed de Google Maps
5. Crear `footer.tsx` con info contacto
6. Mejorar `hero-section.tsx` con más contenido
7. Reordenar secciones en `home-page.tsx`
8. Extender `clinic-info-form.tsx` para editar estos campos
9. Test responsividad en móvil/tablet

## Success Criteria

- [ ] Landing tiene estructura Odonto Vitta (hero → diferenciadores → tratamientos → maps → footer)
- [ ] Google Maps embebido y funcional
- [ ] Todos los textos editables desde admin
- [ ] Logo aparece en hero
- [ ] Responsive en móvil y tablet
- [ ] Botón "Agendar" visible y funcional

## Risk Assessment

**Medio riesgo.** Cambios grandes en landing. Solución: revisar en navegador después de agregar cada sección. Validar Google Maps API en desarrollo.

## Mobile-First Notes

- Hero debe ser compact en móvil
- Cards en grid: 1 col móvil, 2 cols tablet, 3+ cols desktop
- Google Maps: aspect ratio 16:9, responsive
- Footer sticky en móvil
