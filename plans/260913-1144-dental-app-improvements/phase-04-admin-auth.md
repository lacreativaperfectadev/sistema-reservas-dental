---
phase: 4
title: "Admin: Password Authentication & Session"
status: pending
priority: P1
effort: "1h"
dependencies: [2]
---

# Phase 04: Admin Authentication & Session

## Overview

Proteger la ruta /admin con autenticación por contraseña. Implementar sesión con token y logout automático.

## Requirements

- Cambiar /admin a ruta protegida
- Contraseña guardada como hash en localStorage (una sola contraseña para toda la dentista)
- Token de sesión con expiry (ej: 30 minutos)
- Logout automático
- Prevenir acceso si cliente intenta ir a /admin directamente

## Architecture

**Flujo:**
1. Usuario va a `/admin`
2. Si no hay token válido → muestra login form
3. Usuario ingresa contraseña → se hashea y compara con hash almacenado
4. Si correcto → genera token y guarda en localStorage con timestamp
5. Si token expiró → pide login nuevamente
6. Botón logout → elimina token

**Datos en localStorage:**
```
adminAuth: {
  passwordHash: "bcrypt_hash_or_sha256",  // One-time setup
  sessionToken: "xyz123...",
  sessionExpiry: 1234567890
}
```

**Opciones de hash:**
- Opción A: sha256 (simple, no require librería)
- Opción B: bcrypt (más seguro, require libería crypto-js o similar)
- **Recomendación:** SHA256 para MVP (más que suficiente)

## Related Code Files

- Create: `src/lib/auth-utils.ts` — hash y validación
- Create: `src/components/admin/login-form.tsx` — formulario de login
- Create: `src/contexts/admin-auth-context.tsx` — context para sesión
- Create: `src/hooks/use-admin-auth.ts` — hook para consumir auth
- Modify: `src/App.tsx` — proteger ruta /admin con ProtectedRoute
- Modify: `src/pages/admin-page.tsx` — agregar botón logout

## Implementation Steps

1. Crear `auth-utils.ts` con funciones de hash (SHA256)
2. Crear `admin-auth-context.tsx` para manejar sesión
3. Crear `login-form.tsx` con validación
4. Crear `ProtectedRoute` component en App.tsx
5. Agregar lógica de expiry de token (checkeo en context)
6. Agregar botón logout en admin page
7. First time: pedir que usuario configure contraseña
8. Test: no se puede entrar a /admin sin contraseña

## Success Criteria

- [ ] /admin requiere login
- [ ] Contraseña se valida correctamente
- [ ] Token expira después de 30 minutos
- [ ] Logout borra sesión
- [ ] No se puede entrar a /admin sin token válido
- [ ] First-time setup pide contraseña

## Risk Assessment

**Bajo riesgo.** localStorage no es super seguro, pero para una dentista está bien. Alternativa más segura: backend (fuera de scope).

## Security Notes

- ⚠️ localStorage no es el lugar ideal para credenciales
- ✅ Aceptable para MVP single-dentist
- 🔐 En producción: considerar backend + HTTP-only cookies

## Next Steps

Después de esta fase, /admin está protegida. Fase 05 continúa con landing improvements.
