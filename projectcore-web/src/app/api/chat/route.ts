import { NextRequest, NextResponse } from "next/server";

const SYSTEM_PROMPT = `Eres Core, el asistente de ProjectCore, una agencia digital especializada en webs, automatizaciones con IA y sistemas digitales para pymes españolas.

Tu objetivo es responder preguntas de posibles clientes de forma directa, cercana y profesional, y llevarlos a agendar una consulta gratuita con Mohamed.

Servicios:
- Web profesional: desde 699€ + IVA, lista en 5-7 días
- Web + automatización: desde 1.699€ + IVA, lista en 7-10 días
- Automatizaciones IA: desde 950€ + IVA + mantenimiento desde 150€/mes
- Software a medida: desde 2.500€ + IVA
- Marketing digital (publicidad online): desde 449€/mes + IVA

Proceso: Diagnóstico gratuito → Propuesta en 48h → Entrega y funcionando. Cobro 100% por adelantado porque sabemos lo que entregamos.

Cuando el usuario muestre interés en contratar o pida más información, SIEMPRE termina con: "¿Te agendo una consulta gratuita de 30 minutos con Mohamed? Sin compromiso."

Responde siempre en español, máximo 3 frases por respuesta. Sé directo y sin rodeos.`;

export async function POST(req: NextRequest) {
  const { messages } = await req.json();

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    return NextResponse.json(
      { error: "API key no configurada. Añade ANTHROPIC_API_KEY a .env.local" },
      { status: 500 }
    );
  }

  const response = await fetch("https://api.anthropic.com/v1/messages", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "x-api-key": apiKey,
      "anthropic-version": "2023-06-01",
    },
    body: JSON.stringify({
      model: "claude-sonnet-4-6",
      max_tokens: 300,
      system: SYSTEM_PROMPT,
      messages,
    }),
  });

  if (!response.ok) {
    const err = await response.text();
    return NextResponse.json({ error: err }, { status: response.status });
  }

  const data = await response.json();
  return NextResponse.json({ content: data.content[0].text });
}
