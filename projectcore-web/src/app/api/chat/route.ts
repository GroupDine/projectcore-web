import { NextRequest, NextResponse } from "next/server";

const WEBHOOK_URL =
  process.env.N8N_WEBHOOK_URL ||
  "https://n8nprojects-n8n.libhya.easypanel.host/webhook/chatbot-projectcore";

export async function POST(req: NextRequest) {
  let body: { message?: string; session_id?: string; history?: unknown[] };

  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Petición inválida" }, { status: 400 });
  }

  const { message, session_id, history } = body;

  if (!message?.trim()) {
    return NextResponse.json({ error: "Mensaje vacío" }, { status: 400 });
  }

  const payload = {
    session_id: session_id || `session_${Date.now()}`,
    message: message.trim(),
    history: history || [],
  };

  try {
    const response = await fetch(WEBHOOK_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
      signal: AbortSignal.timeout(25000),
    });

    if (!response.ok) {
      console.error(`n8n webhook error: ${response.status} ${response.statusText}`);
      return NextResponse.json(
        { error: "El asistente no está disponible en este momento." },
        { status: 502 }
      );
    }

    const data = await response.json().catch(() => ({}));

    return NextResponse.json({
      message: data.response ?? data.message ?? data.text ?? data.content ?? "",
      action: data.action ?? "message",
      metadata: data.metadata ?? null,
    });
  } catch (err) {
    console.error("Error conectando con n8n:", err);
    return NextResponse.json(
      { error: "No se pudo conectar con el asistente. Inténtalo de nuevo." },
      { status: 503 }
    );
  }
}
