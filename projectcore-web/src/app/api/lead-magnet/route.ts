import { NextRequest, NextResponse } from 'next/server';
import Airtable from 'airtable';
import { Resend } from 'resend';
import fs from 'fs';
import path from 'path';

export async function POST(request: NextRequest) {
  try {
    const { email, nombre } = await request.json();

    if (!email || !email.includes('@')) {
      return NextResponse.json({ error: 'Email inválido' }, { status: 400 });
    }

    const airtableKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID || 'appmEzgyFGxs1JfO8';
    const resendKey = process.env.RESEND_API_KEY;

    let airtableOk = false;
    let emailOk = false;

    // 1. Guardar en Airtable tabla "Lead Magnets"
    if (airtableKey) {
      try {
        const base = new Airtable({ apiKey: airtableKey }).base(baseId);
        await base('Lead Magnets').create({
          'Email': email,
          'Nombre': nombre || '',
          'Fecha descarga': new Date().toISOString().split('T')[0],
          'Estado': 'enviado',
        });
        airtableOk = true;
        console.log('[LEAD-MAGNET] Guardado en Airtable');
      } catch (airtableErr) {
        console.error('[LEAD-MAGNET] Error Airtable:', airtableErr);
      }
    }

    // 2. Enviar email con PDF adjunto via Resend
    if (resendKey) {
      try {
        const resend = new Resend(resendKey);
        const pdfPath = path.join(process.cwd(), 'public', 'lead-magnet.pdf');
        let attachments: { filename: string; content: Buffer }[] = [];

        if (fs.existsSync(pdfPath)) {
          const pdfBuffer = fs.readFileSync(pdfPath);
          attachments = [{ filename: '3-automatizaciones-en-7-dias-projectcore.pdf', content: pdfBuffer }];
        }

        await resend.emails.send({
          from: 'ProjectCore <hola@projectcore.io>',
          to: email,
          bcc: 'mohamed@projectcore.io',
          subject: 'Tu guía: 3 automatizaciones en 7 días',
          html: `
            <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; background: #0A0F1C; color: #ffffff; border-radius: 12px; overflow: hidden;">
              <div style="padding: 40px 32px; text-align: center; background: linear-gradient(135deg, #0A0F1C 0%, #111827 100%);">
                <p style="color: #1A6B5A; font-size: 11px; letter-spacing: 2px; text-transform: uppercase; margin-bottom: 16px;">ProjectCore</p>
                <h1 style="font-size: 24px; font-weight: 700; color: #ffffff; margin: 0 0 12px 0; line-height: 1.3;">
                  ${nombre ? `Hola ${nombre}, aquí tienes tu guía` : 'Aquí tienes tu guía'}
                </h1>
                <p style="color: #9CA3AF; font-size: 15px; margin: 0 0 32px 0;">
                  3 automatizaciones que cualquier negocio puede implementar en 7 días
                </p>
                <div style="background: #1A6B5A; color: #ffffff; padding: 14px 28px; border-radius: 8px; display: inline-block; font-weight: 600; font-size: 14px; margin-bottom: 32px;">
                  PDF adjunto a este email
                </div>
              </div>
              <div style="padding: 32px; background: #111827;">
                <p style="color: #D1D5DB; font-size: 14px; line-height: 1.7; margin: 0 0 20px 0;">
                  En la guía encontrarás las 3 automatizaciones con mayor retorno para negocios como el tuyo:
                </p>
                <ul style="color: #9CA3AF; font-size: 14px; line-height: 1.8; padding-left: 20px; margin: 0 0 24px 0;">
                  <li><strong style="color: #ffffff;">Automatización #1:</strong> Respuestas automáticas — 15h/semana ahorradas</li>
                  <li><strong style="color: #ffffff;">Automatización #2:</strong> Presupuestos instantáneos — 5h/día ahorradas</li>
                  <li><strong style="color: #ffffff;">Automatización #3:</strong> Seguimiento de leads — +30% conversión</li>
                </ul>
                <p style="color: #6B7280; font-size: 13px; border-top: 1px solid #1F2937; padding-top: 20px; margin: 0;">
                  ¿Quieres que lo implementemos por ti?<br>
                  <a href="https://projectcore.io" style="color: #1A6B5A;">Agenda tu diagnóstico gratuito en projectcore.io</a>
                </p>
              </div>
            </div>
          `,
          attachments,
        });
        emailOk = true;
        console.log('[LEAD-MAGNET] Email enviado a:', email);
      } catch (resendErr) {
        console.error('[LEAD-MAGNET] Error Resend:', resendErr);
      }
    }

    if (!airtableKey && !resendKey) {
      console.warn('[LEAD-MAGNET] Sin credenciales configuradas — modo debug');
    }

    return NextResponse.json({ success: true, airtableOk, emailOk });

  } catch (error) {
    console.error('[LEAD-MAGNET] Error crítico:', error);
    return NextResponse.json({ error: 'Error interno' }, { status: 500 });
  }
}
