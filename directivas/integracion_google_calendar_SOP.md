# Directiva: Integración Google Calendar con Chatbot ProjectCore

## Objetivo
Conectar el chatbot de ProjectCore (OpenAI) con Google Calendar a través de n8n para agendar reuniones reales.

## Requisitos
- Email principal: `mohamed@projectcore.io`
- Usar credenciales existentes en n8n
- Validar disponibilidad antes de agendar
- Horario laboral: 9:00 - 18:00 (Europe/Madrid)
- Duración de reunión: 30 minutos
- Responder al chatbot con resultado

## Arquitectura del Workflow

### Nodos Requeridos

1. **Webhook** (n8n-nodes-base.webhook)
   - Método: POST
   - Path: `calendar-schedule`
   - Response Mode: `responseNode`
   - Autenticación: Ninguna (o API key si se requiere)

2. **Code Node - Parseo de Fecha** (n8n-nodes-base.code)
   - Lenguaje: JavaScript
   - Extraer fecha y hora del mensaje del usuario
   - Usar expresiones regulares o llamada a OpenAI para parsear
   - Output: `{ date, time, timezone: "Europe/Madrid" }`

3. **Google Calendar - Check Availability** (n8n-nodes-base.googleCalendar)
   - Operation: `Get Events`
   - Calendar ID: `primary` (o el calendar específico de mohamed)
   - Date/Time: desde fecha propuesta hasta fecha + 30 min
   - Retornar lista de eventos en ese rango

4. **IF Node - Disponibilidad**
   - Condition: `{{ $json.events.length === 0 }}`
   - true: Crear evento
   - false: Responder "horario ocupado"

5. **Google Calendar - Create Event** (n8n-nodes-base.googleCalendar)
   - Operation: `Create Event`
   - Summary: "Reunión ProjectCore - {{ $json.userEmail }}"
   - Description: "Agendada desde chatbot. Mensaje: {{ $json.message }}"
   - Start/End: fecha/hora parseada + 30 min
   - Attendees: `mohamed@projectcore.io`, `{{ $json.userEmail }}`
   - Timezone: `Europe/Madrid`

6. **HTTP Request - Responder a Chatbot** (n8n-nodes-base.httpRequest)
   - Método: POST (o directamente el response del webhook)
   - URL: endpoint del chatbot para recibir respuesta (o usar webhook response)
   - Body: `{ action: "meeting_scheduled", date: "...", time: "...", eventId: "..." }`

## Credenciales Requeridas

1. **Google Calendar OAuth2**
   - Debe estar configurada en n8n previamente
   - Permisos: `https://www.googleapis.com/auth/calendar`
   - Email: `mohamed@projectcore.io`
   - Credential ID: necesitaremos saber cuál es para referenciarla

2. **n8n Webhook Authentication** (opcional)
   - Si se quiere proteger el webhook

## Modificaciones en el Chatbot (Next.js)

### Archivo: `src/app/api/chat/route.ts`

Agregar lógica para:
1. Detectar intención de agendar (palabras clave: "agendar", "reunión", "cita", "consulta")
2. Enviar request al webhook de n8n: `POST /webhook/calendar-schedule`
3. Esperar respuesta y formatear para el usuario

### Archivo: `src/components/ChatCore.tsx`

Mostrar notificación especial cuando `action: "meeting_scheduled"`:
- Mensaje de confirmación
- Posible botón para agregar a Google Calendar

## Validaciones

1. **Fecha futura**: No aceptar fechas pasadas
2. **Horario laboral**: 9:00 - 18:00 (solo entre semana)
3. **Disponibilidad**: Verificar eventos existentes
4. **Email válido**: Formato correcto del usuario

## Formato de Request a n8n

```json
{
  "message": "Quiero agendar una reunión para mañana a las 11:00",
  "userEmail": "cliente@ejemplo.com",
  "userId": "optional"
}
```

## Formato de Response desde n8n

```json
{
  "success": true,
  "action": "meeting_scheduled",
  "date": "2026-03-30",
  "time": "11:00",
  "eventId": "abc123",
  "message": "Reunión agendada para el lunes 30 de marzo a las 11:00. Te llegará un email de confirmación."
}
```

o en caso de error:

```json
{
  "success": false,
  "action": "meeting_failed",
  "reason": "conflict" | "invalid_date" | "outside_business_hours",
  "message": "Lo siento, ese horario ya está ocupado. ¿Te sirve otra hora?"
}
```

## Pasos de Implementación

1. Crear workflow en n8n con los nodos especificados
2. Configurar credenciales (Google Calendar)
3. Activar workflow
4. Probar con curl:
   ```bash
   curl -X POST https://n8nprojects-n8n.libhya.easypanel.host/webhook/calendar-schedule \
     -H "Content-Type: application/json" \
     -d '{"message":"Agéndame mañana a las 11:00","userEmail":"test@ejemplo.com"}'
   ```
5. Modificar API de chat para integrar llamada a n8n
6. Actualizar frontend para mostrar notificaciones
7. Probar flujo completo

## Restricciones

- No simular: debe usarse Google Calendar real
- Email principal: `mohamed@projectcore.io` (no `hola@projectcore.io`)
- Timezone: `Europe/Madrid`
- Duración fija: 30 minutos

## Variables de Entorno

En `projectcore-web/.env.local` añadir:
```
N8N_WEBHOOK_URL=https://n8nprojects-n8n.libhya.easypanel.host/webhook/calendar-schedule
```

## Datos de Configuración de n8n

- URL instancia: `https://n8nprojects-n8n.libhya.easypanel.host`
- API Key: Ya configurada en CloudCode_N8N/.env
- Webhook path: `calendar-schedule`

## Entregables

1. Workflow JSON exportable para n8n
2. Código actualizado en `route.ts` y `ChatCore.tsx`
3. Instrucciones de despliegue
4. Pruebas de integración
