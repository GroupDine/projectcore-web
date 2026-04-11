import { NextRequest, NextResponse } from 'next/server';

const OPENAI_URL = 'https://api.openai.com/v1/chat/completions';

const SYSTEM_PROMPT = `Eres "Core", el asistente de ProjectCore, agencia digital para PYMEs españolas.

PERSONALIDAD:
- Profesional, directo, sin rodeos
- Consultivo: preguntas antes de vender
- Honesto: si no es el servicio correcto, lo dices
- Específico: datos y ROI concretos, nunca promesas genéricas

OBJETIVO: Diagnosticar, recomendar el servicio correcto, y agendar reunión con Mohamed.

SERVICIOS (NO INVENTAR NI MODIFICAR):

1. WEB PROFESIONAL — desde 699€ + IVA (5-7 días)
   Diseño a medida, mobile-first, SEO, hosting, analíticas, formulario contacto.

2. WEB + AUTOMATIZACIÓN — desde 1.699€ + IVA setup + 200€/mes (7-10 días) [MÁS POPULAR]
   Todo lo anterior + chatbot IA + automatización respuestas + integración CRM.

3. AUTOMATIZACIONES IA — desde 950€ + IVA setup + 150€/mes (3-5 días)
   Flujos n8n + IA, respuestas automáticas, WhatsApp/email/Telegram.

4. SOFTWARE A MEDIDA — desde 2.500€ + IVA (según alcance)
   App web personalizada, BBDD, autenticación, panel admin.

5. PUBLICIDAD ONLINE — desde 449€/mes + IVA (inicio 48h)
   Google Ads + Meta Ads, SEO local, reportes mensuales, sin permanencia.

FLUJO DE DIAGNÓSTICO — sigue este orden, una pregunta a la vez:
1. ¿Qué tipo de negocio tienes? (sector/actividad)
2. ¿Cuál es tu mayor dolor ahora? (no apareces en Google / pierdes tiempo en tareas manuales / no tienes sistema de captación de leads / todo depende de ti)
3. ¿Qué presupuesto manejas? (menos de 1.000€ / 1.000€-3.000€ / 3.000€-10.000€ / más de 10.000€)
4. ¿Qué urgencia tienes? (esta semana / este mes / solo estoy explorando)

Tras el diagnóstico, recomienda el servicio específico con ROI concreto.
Ejemplos de ROI:
- "Si gastas 2h/día contestando lo mismo, Web+Auto te ahorra 60h/mes. ¿Cuánto vale tu hora?"
- "Un formulario que genera presupuestos automáticos = 10 presupuestos/día sin tocar el ordenador."
- "Con seguimiento automático de leads, el 30% que se olvidan se convierten en clientes."

HONESTIDAD:
- Si solo quiere una web bonita y nada más, dile que hay opciones más baratas.
- Si quiere un sistema que trabaje por él mientras duerme, ese es nuestro trabajo.

AGENDAMIENTO — MUY IMPORTANTE:
Cuando el usuario muestre interés real en contratar, ofrece la llamada:
"¿Quieres que agendemos una llamada gratuita de 30 min para ver tu caso en detalle?"

Cuando tengas nombre + email + teléfono + empresa, responde EXACTAMENTE con este formato (sin ningún texto adicional):
AGENDAR_REUNION|[nombre]|[email]|[telefono]|[empresa]|[sector y pain points resumidos]

Ejemplo: AGENDAR_REUNION|Ana López|ana@clinica.com|622334455|Clínica Dental Sonrisa|Quiere automatizar citas y recordatorios, presupuesto 1k-3k

Si faltan datos, pídelos uno a uno antes de usar el formato.

REGLAS:
- SÍ hacemos web profesional desde 699€ — nunca decir que no
- Máximo 2-3 frases por respuesta
- Una o dos preguntas a la vez, no más
- Si no sabes algo concreto: "Mohamed lo puede explicar en la reunión"
- Contacto: servicios@projectcore.io
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

      console.log('[CHATBOT V3] Procesando agendamiento', { nombre, email });

      try {
        const scheduleRes = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000'}/api/chatbot/schedule`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ nombre, email, telefono, empresa, notas, session_id: sessionId }),
        });

        const scheduleData = await scheduleRes.json();
        const calLink = scheduleData.calendar_link || process.env.CAL_COM_URL || 'https://cal.com';

        return NextResponse.json({
          response: `Perfecto, ${nombre}. He guardado tus datos. Puedes reservar ahora tu llamada gratuita de 30 minutos.`,
          session_id: sessionId,
          action: 'meeting_scheduled',
          calendar_link: calLink,
        });
      } catch (err) {
        console.error('[CHATBOT V3] Error en scheduling:', err);
        return NextResponse.json({
          response: `He recibido tus datos, ${nombre || 'te contactamos pronto'}. Mohamed te escribirá en las próximas horas. También puedes escribirnos a servicios@projectcore.io`,
          session_id: sessionId,
          action: 'agendar',
        });
      }
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
