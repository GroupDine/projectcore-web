import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';
import { Resend } from 'resend';

export async function POST(request: NextRequest) {
  try {
    const { nombre, email, telefono, empresa, notas, session_id } = await request.json();

    const calBaseUrl = process.env.CAL_COM_URL || 'https://cal.com';
    const params = new URLSearchParams();
    if (nombre) params.set('name', nombre);
    if (email) params.set('email', email);
    const calendarLink = `${calBaseUrl}?${params.toString()}`;

    // 1. Guardar en Airtable
    const airtableKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID || 'appmEzgyFGxs1JfO8';

    if (airtableKey) {
      try {
        const base = new Airtable({ apiKey: airtableKey }).base(baseId);
        await base('Interacciones Chatbot Core').create({
          'ID de interacción o referencia interna': `CHAT-${session_id || Date.now()}`,
          'Nombre del cliente': nombre || '',
          'Email del cliente': email || '',
          'Teléfono de contacto': telefono || '',
          'Empresa/Organización': empresa || '',
          'Pain Points': notas || '',
          'Estado de la cita': 'Pendiente confirmar',
        });
        console.log('[SCHEDULE] Lead guardado en Airtable');
      } catch (airtableErr) {
        console.error('[SCHEDULE] Error Airtable:', airtableErr);
        // No bloquear el flujo si Airtable falla
      }
    }

    // 2. Notificar por email a Mohamed
    const resendKey = process.env.RESEND_API_KEY;
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        await resend.emails.send({
          from: 'ProjectCore Core <hola@projectcore.io>',
          to: 'mohamed@projectcore.io',
          subject: `Nueva consulta agendada — ${nombre || 'Lead'} (${empresa || 'sin empresa'})`,
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 24px;">
              <h2 style="color: #1A6B5A; margin-bottom: 24px;">Nueva consulta solicitada</h2>
              <table style="width: 100%; border-collapse: collapse;">
                <tr><td style="padding: 8px 0; color: #666; width: 140px;">Nombre</td><td style="padding: 8px 0; font-weight: 600;">${nombre || '—'}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Email</td><td style="padding: 8px 0;"><a href="mailto:${email}" style="color: #1A6B5A;">${email || '—'}</a></td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Teléfono</td><td style="padding: 8px 0;">${telefono || '—'}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Empresa</td><td style="padding: 8px 0;">${empresa || '—'}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Notas</td><td style="padding: 8px 0;">${notas || '—'}</td></tr>
                <tr><td style="padding: 8px 0; color: #666;">Sesión</td><td style="padding: 8px 0; font-size: 12px; color: #999;">${session_id || '—'}</td></tr>
              </table>
              <div style="margin-top: 32px; padding: 16px; background: #f5f5f5; border-radius: 8px;">
                <p style="margin: 0; font-size: 14px; color: #444;">Han reservado a través del chatbot de projectcore.io</p>
              </div>
            </div>
          `,
        });
        console.log('[SCHEDULE] Email enviado a Mohamed');
      } catch (resendErr) {
        console.error('[SCHEDULE] Error Resend:', resendErr);
      }
    }

    return NextResponse.json({
      success: true,
      calendar_link: calendarLink,
    });

  } catch (error) {
    console.error('[SCHEDULE] Error crítico:', error);
    return NextResponse.json(
      { error: 'Error procesando agendamiento' },
      { status: 500 }
    );
  }
}
