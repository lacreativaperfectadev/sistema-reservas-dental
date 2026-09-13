---
phase: 7
title: "Testing: Responsividad & QA"
status: pending
priority: P2
effort: "0.5h"
dependencies: [1, 2, 3, 4, 5, 6]
---

# Phase 07: Testing & QA

## Overview

Validar responsividad en móvil/tablet, verificar que no hay collapsos de UI, revisar todas las funcionalidades implementadas.

## Requirements

- Revisar layout en móvil (375px)
- Revisar layout en tablet (768px)
- Revisar landing completa end-to-end
- Verificar que no hay contenido colapsado
- Validar funcionalidades del admin
- Testing en navegadores reales

## Test Checklist

### Landing Page
- [ ] Hero visible y legible en móvil
- [ ] Diferenciadores: cards apiladas en móvil, 2-3 cols en tablet
- [ ] Servicios: imágenes responsive
- [ ] Google Maps: embebido y funcional
- [ ] Footer: links visibles, cookies banner accesible
- [ ] No hay overflow horizontal
- [ ] Botón "Agendar" accesible en móvil

### Admin Panel
- [ ] Login form responsive
- [ ] Tabs navegan correctamente
- [ ] Checkboxes verdes en todos los navegadores
- [ ] Time pickers funcionales
- [ ] Logo upload funciona
- [ ] Edición de servicios sin errores
- [ ] Logout funciona

### Booking Flow
- [ ] Formulario responsive
- [ ] Date picker accesible en móvil
- [ ] Time slots legibles
- [ ] Confirmación clara

### Legal Pages
- [ ] /privacy legible
- [ ] /terms legible
- [ ] Links en footer funcionales

## Related Code Files

- N/A (solo testing)
- Review todos los archivos modificados en fases anteriores

## Implementation Steps

1. Abrir dev tools (Chrome/Firefox)
2. Cambiar viewport a móvil (375px)
3. Revisar cada sección de landing
4. Cambiar a tablet (768px)
5. Revisar responsive design
6. Probar login admin
7. Probar todas las funcionalidades
8. Revisar en navegador real en dispositivo móvil si es posible
9. Screenshot de puntos problemáticos
10. Reportar bugs/issues

## Success Criteria

- [ ] Landing es fully responsive
- [ ] No hay contenido colapsado
- [ ] Todos los botones accesibles en móvil
- [ ] Admin funciona sin errores
- [ ] Colores corporativos consistentes
- [ ] No hay consola errors

## Device Testing Targets

- **Móvil:** iPhone 12 (390px), Samsung Galaxy A50 (412px)
- **Tablet:** iPad (768px), iPad Pro (1024px)
- **Desktop:** 1920px

## Known Issues Template

Si encuentras problemas:
```
## Issue: [Breve descripción]
- Device: [móvil/tablet/desktop]
- Browser: [Chrome/Safari/Firefox]
- Steps to reproduce: ...
- Expected: ...
- Actual: ...
- Priority: [P1/P2/P3]
```

## Browser Compatibility

- Chrome/Edge (latest)
- Safari (iOS 14+)
- Firefox (latest)

## Performance Check

- Lighthouse score (si es posible)
- Tiempo de carga de landing
- Responsividad al interactuar (sin lag)

## Next Steps

Después de esta fase, todas las mejoras están completas. Proceder a: staging/producción.
