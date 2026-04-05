import { NextRequest, NextResponse } from 'next/server';

const WEBHOOK_URL = 'https://n8nprojects-n8n.libhya.easypanel.host/webhook/chatbot-projectcore-v2';

export async function POST(req: NextRequest) {
  try {
    const body = await req.json();
    const { message, history = [], session_id } = body;

    // Validar mensaje
    if (!message || typeof message !== 'string' || message.trim().length === 0) {
      return NextResponse.json(
        { response: 'Por favor, escribe un mensaje válido.', error: true },
        { status: 400 }
      );
    }

    // Generar session_id si no existe
    const sessionId = session_id || `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

    console.log('[CHATBOT V2] Enviando a webhook:', {
      sessionId,
      messageLength: message.length,
      historyLength: history.length,
      webhookUrl: WEBHOOK_URL,
    });

    // Llamar al webhook de n8n v2
    const response = await fetch(WEBHOOK_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        session_id: sessionId,
        message: message.trim(),
        history,
      }),
    });

    console.log('[CHATBOT V2] Status del webhook:', response.status);

    if (!response.ok) {
      const errorText = await response.text();
      console.error('[CHATBOT V2] Error del webhook:', response.status, errorText);
      throw new Error(`Webhook error: ${response.status}`);
    }

    const data = await response.json();
    console.log('[CHATBOT V2] Respuesta recibida:', {
      hasResponse: !!data.response,
      action: data.action,
      hasCalendarLink: !!data.calendar_link,
    });

    return NextResponse.json({
      response: data.response || data.message || 'Mensaje recibido correctamente',
      session_id: sessionId,
      action: data.action || 'message',
      calendar_link: data.calendar_link || null,
    });

  } catch (error) {
    console.error('[CHATBOT V2] Error crítico:', error);

    return NextResponse.json(
      {
        response: 'Disculpa, estoy teniendo problemas técnicos ahora mismo. Por favor, escríbenos a servicios@projectcore.io',
        error: true,
      },
      { status: 500 }
    );
  }
}
