import { NextRequest, NextResponse } from 'next/server';

const N8N_WEBHOOK_URL = 'https://n8nprojects-n8n.libhya.easypanel.host/webhook/chatbot-projectcore-v2';
const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

const SYSTEM_PROMPT = `Eres "Core", el asistente virtual de ProjectCore, una agencia digital full-service para PYMEs españolas.

OBJETIVO: Diagnosticar necesidades, responder preguntas sobre ProjectCore, y agendar reuniones con Mohamed (fundador).

SERVICIOS DE PROJECTCORE (MEMORIZA ESTO — NO INVENTAR):

1. WEB PROFESIONAL
   - Precio: desde 699€ + IVA
   - Plazo: 5-7 días
   - Incluye: Diseño a medida, mobile-first, optimizada para Google, dominio + hosting + analíticas, formulario de contacto

2. WEB + AUTOMATIZACIÓN
   - Precio: desde 1.699€ + IVA setup + 200€/mes + IVA mantenimiento
   - Plazo: 7-10 días
   - Incluye: Todo de Web profesional + chatbot IA + automatización de respuestas + integración CRM

3. AUTOMATIZACIONES IA
   - Precio: desde 950€ + IVA setup + desde 150€/mes + IVA
   - Plazo: 3-5 días
   - Incluye: Flujos automáticos con IA (n8n + Claude), respuestas/notificaciones/reportes automáticos, integración WhatsApp/email/Telegram

4. SOFTWARE A MEDIDA
   - Precio: desde 2.500€ + IVA
   - Plazo: Según alcance
   - Incluye: Aplicación web/interna personalizada, base de datos + autenticación + panel admin, soporte primer mes

5. PUBLICIDAD ONLINE
   - Precio: desde 449€/mes + IVA
   - Inicio: 48h
   - Incluye: Google Ads + Meta Ads, contenido redes + SEO local, reportes mensuales, sin permanencia

SECTORES PRINCIPALES: Despachos de abogados, Clínicas y salud, Restaurantes y hostelería, Gestorías y asesorías, Comercios locales, Clínicas de estética, Academias, Inmobiliarias, Talleres, Constructoras, Autónomos, Empresas con equipos.

FLUJO DE CONVERSACIÓN:
1. Saluda: "Hola, soy Core de ProjectCore. ¿En qué puedo ayudarte?"
2. Diagnostica: pregunta por empresa, sector, tamaño, pain points, qué quiere automatizar
3. Explica el servicio más relevante con casos de uso concretos
4. Ofrece agendar reunión gratuita con Mohamed

AGENDAMIENTO — IMPORTANTE:
Si el usuario quiere agendar una reunión, responde EXACTAMENTE con este formato (sin nada más):
AGENDAR_REUNION|[nombre]|[email]|[telefono]|[empresa]|[notas]

Ejemplo: AGENDAR_REUNION|Juan García|juan@empresa.com|612345678|Restaurante La Viña|Quiere automatizar reservas

Solo usa este formato cuando tengas nombre + email + teléfono + empresa. Si faltan datos, pídelos primero.

REGLAS CRÍTICAS:
- NUNCA digas que NO hacemos desarrollo web — SÍ hacemos Web profesional desde 699€
- NUNCA inventes servicios o precios no listados arriba
- Sé conversacional pero preciso. Máximo 2-3 frases por respuesta
- Máximo 1-2 preguntas a la vez
- Si no sabes algo específico, di que Mohamed puede explicarlo en reunión
- Email de contacto: servicios@projectcore.io
- Sin permanencia en todos los servicios salvo Software a medida`;

interface OpenAIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [], session_id } = body;

    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { response: 'Por favor, escribe un mensaje válido.', error: true },
        { status: 400 }
      );
    }

    const sessionId = session_id || `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
    const apiKey = process.env.OPENAI_API_KEY;

    if (!apiKey) {
      console.error('[CHATBOT] Missing OPENAI_API_KEY');
      return NextResponse.json(
        { response: 'Disculpa, estoy teniendo problemas técnicos. Escríbenos a servicios@projectcore.io', error: true },
        { status: 500 }
      );
    }

    // Construir historial para OpenAI
    const messages: OpenAIMessage[] = [
      { role: 'system', content: SYSTEM_PROMPT },
      // Incluir historial previo (sin el mensaje de bienvenida inicial si lo hay)
      ...history
        .filter((m: { role: string; content: string }) => m.content && m.role)
        .map((m: { role: string; content: string }) => ({
          role: m.role as 'user' | 'assistant',
          content: m.content,
        })),
      { role: 'user', content: message.trim() },
    ];

    console.log('[CHATBOT V3] Llamando OpenAI directamente', {
      sessionId,
      historyLength: history.length,
      messageLength: message.length,
    });

    const openaiRes = await fetch(OPENAI_URL, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${apiKey}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o-mini',
        temperature: 0.4,
        max_tokens: 300,
        messages,
      }),
    });

    if (!openaiRes.ok) {
      const err = await openaiRes.text();
      console.error('[CHATBOT V3] OpenAI error:', openaiRes.status, err);
      throw new Error(`OpenAI error: ${openaiRes.status}`);
    }

    const openaiData = await openaiRes.json();
    const responseText: string = openaiData.choices?.[0]?.message?.content || '';

    console.log('[CHATBOT V3] Respuesta OpenAI:', responseText.substring(0, 80));

    // Detectar si Core quiere agendar reunión
    if (responseText.startsWith('AGENDAR_REUNION|')) {
      const parts = responseText.split('|');
      const [, nombre = '', email = '', telefono = '', empresa = '', notas = ''] = parts;

      console.log('[CHATBOT V3] Delegando agendamiento a n8n', { nombre, email });

      try {
        const n8nRes = await fetch(N8N_WEBHOOK_URL, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ session_id: sessionId, message: message.trim(), nombre, email, telefono, empresa, notas, history }),
        });

        if (n8nRes.ok) {
          const n8nData = await n8nRes.json();
          return NextResponse.json({
            response: n8nData.message || 'Perfecto, voy a buscar hueco en el calendario. ¿Cuál es tu nombre completo y email para confirmar la reunión?',
            session_id: sessionId,
            action: n8nData.action || 'agendar',
            calendar_link: n8nData.calendar_link || null,
          });
        }
      } catch (n8nErr) {
        console.error('[CHATBOT V3] n8n error, respondiendo manualmente:', n8nErr);
      }

      // Fallback si n8n falla
      return NextResponse.json({
        response: `¡Perfecto! He recibido tus datos. Mohamed se pondrá en contacto contigo en las próximas horas para confirmar la reunión. También puedes escribirnos a servicios@projectcore.io`,
        session_id: sessionId,
        action: 'agendar',
      });
    }

    return NextResponse.json({
      response: responseText,
      session_id: sessionId,
      action: 'message',
    });

  } catch (error) {
    console.error('[CHATBOT V3] Error crítico:', error);
    return NextResponse.json(
      {
        response: 'Disculpa, estoy teniendo problemas técnicos ahora mismo. Por favor, escríbenos a servicios@projectcore.io',
        error: true,
      },
      { status: 500 }
    );
  }
}
