# SOP: Troubleshoot Despliegue ProjectCore

## Objetivo
Resolver problemas donde las actualizaciones locales no se reflejan en la web en vivo (projectcore.io).

## Diagnóstico Inicial
1. **Verificar Git Status**: Confirmar si hay cambios sin commitear localmente.
2. **Verificar Git Push**: Confirmar si la rama local `master` está sincronizada con `origin/master`.
3. **Verificar Vercel Build**: Comprobar si el último commit ha disparado un build en Vercel y si este terminó exitosamente.

## Protocolo de Acción

### Escenario A: Cambios no commiteados
Si `git status` muestra archivos modificados:
1. Hacer commit de los cambios: `git add .` y `git commit -m "update: descripción"`
2. Subir a producción: `git push origin master`

### Escenario B: Cambios commiteados pero no en la web
Si el push fue exitoso pero el dominio no se actualiza:
1. **Fuerza de Despliegue**: Ejecutar `vercel --prod` si el CLI está disponible.
2. **Verificar Alias**: En el dashboard de Vercel, asegurar que `projectcore.io` no está estancado en un deployment específico (pining).
3. **Cache**: Aunque `vercel.json` tiene `max-age=0`, algunos navegadores o CDNs pueden cachear. Probar en modo incógnito.

## Restricciones y Advertencias
- **IMPORTANTE**: No forzar `git push --force` a menos que sea estrictamente necesario.
- **Vercel CLI**: Requiere login previo. Si falla por falta de token, pedir al usuario que ejecute el comando manualmente o proporcione credenciales.
- **Rama Master**: ProjectCore usa `master` como rama de producción.

## Historial de Errores Conocidos
- **2026-04-07**: El dominio estaba "pineado" a un deployment antiguo. Se solucionó redeployment y re-aliasing.
- **2026-04-11**: Cambios locales presentes pero no commiteados ni subidos a origin.
