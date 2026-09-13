---
title: "Dental App Improvements: Branding, Security & Landing"
status: planning
priority: P1
effort: ~8h
created: 2026-09-13
updated: 2026-09-13
---

# Dental App Improvements Plan

## 📋 Overview

Comprehensive improvements to the dental booking system covering corporate branding consistency, admin security, enhanced landing page, and legal compliance with cookies/privacy.

**Stack:** React 19 + TypeScript + Tailwind 4 + Vite
**Colores corporativos:** Verde teal #2d8b81 (clinic-500)

---

## 🎯 Requirements Summary

### A. Admin Panel - Corporate Branding & Features
- [ ] Reemplazar checkboxes HTML nativos con checkboxes estilizados verdes
- [ ] Aplicar color verde corporativo a todos los datepickers/time-pickers
- [ ] Unificar botones primarios al color verde corporativo
- [ ] Agregar upload de logo en "Datos del consultorio"
- [ ] Permitir EDITAR servicios (no solo eliminar/crear nuevos)
- [ ] Agregar Google Map embebido con dirección del consultorio

### B. Security - Protect /admin
- [ ] Implementar autenticación por contraseña en /admin
- [ ] Hash de contraseña guardado en localStorage
- [ ] URL protegida con token/sesión
- [ ] Logout automático después de X minutos
- [ ] Prevenir acceso si cliente intenta acceder a /admin

### C. Landing Page - Content & Responsive
- [ ] Mejorar hero section con más contenido
- [ ] Agregar sección "¿Por qué elegirnos?" (beneficios)
- [ ] Integrar Google Map embebido
- [ ] Revisar responsividad móvil/tablet
- [ ] Basarse en ejemplo BrightSmile (dental clinic)
- [ ] Footer con banner de cookies

### D. Legal & Cookies
- [ ] Crear banner de cookies (aceptar/rechazar)
- [ ] Página /privacy editable desde admin
- [ ] Página /terms editable desde admin
- [ ] Contenido de privacy/terms editable en panel admin

---

## 📁 Phases

| Phase | Title | Status | Effort |
|-------|-------|--------|--------|
| 01 | Identificar componentes y crear estilo verde corporativo | pending | 1h |
| 02 | Admin: Checkboxes, datepickers y botones verdes | pending | 1.5h |
| 03 | Admin: Upload de logo + CRUD completo para servicios | pending | 1.5h |
| 04 | Admin: Autenticación por contraseña | pending | 1h |
| 05 | Landing: Mejorar contenido y agregar Google Map | pending | 2h |
| 06 | Landing: Banner de cookies + páginas legales | pending | 1h |
| 07 | Testing: Responsividad móvil/tablet + QA | pending | 0.5h |

---

## 🔍 Key Decisions

1. **Color Corporativo Global:** Usar CSS variable `--color-clinic-500` (#2d8b81) en todos los componentes
2. **Checkboxes Personalizados:** Crear componente reutilizable con Tailwind (no librerías externas)
3. **Autenticación Admin:** Simple password + localStorage (no necesita OAuth para una dentista)
4. **Google Maps:** Usar Google Maps Embed API (gratuito, sin API key en frontend)
5. **Cookies:** Banner sticky en footer, consentimiento guardado en localStorage
6. **Logo:** Guardar en storage local como base64 o URL

---

## ⚠️ Risks

| Risk | Impact | Mitigation |
|------|--------|-----------|
| Cambios visuales amplios pueden romper UI | High | Revisar en múltiples resoluciones |
| localStorage no es seguro para contraseña | Medium | Usar bcrypt en frontend O token con expiry |
| Google Maps requiere API key | Low | Usar embed API (gratuito) |
| Responsividad mobile compleja | Medium | Test en móvil/tablet desde inicio |

---

## 🚀 Next Step

Proceder con **Phase 01** para mapear todos los componentes que usan colores azules y crear la estrategia de estilos.
