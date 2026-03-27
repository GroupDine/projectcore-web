"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const SUGGESTIONS = [
  "¿Cuánto cuesta una web profesional?",
  "¿En cuánto tiempo entregas?",
  "¿Qué automatizaciones puedo tener?",
  "Quiero agendar una consulta gratuita",
];

const INITIAL_MESSAGE: Message = {
  role: "assistant",
  content: "Hola, soy Core — el asistente de ProjectCore. ¿En qué puedo ayudarte hoy?",
};

export default function ChatCore() {
  const [messages, setMessages] = useState<Message[]>([INITIAL_MESSAGE]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed || loading) return;

    const userMsg: Message = { role: "user", content: trimmed };
    const newMessages = [...messages, userMsg];
    setMessages(newMessages);
    setInput("");
    setLoading(true);

    try {
      // Solo enviamos los mensajes sin el inicial del sistema (que es el mensaje de bienvenida)
      const apiMessages = newMessages
        .filter((m) => !(m.role === "assistant" && m.content === INITIAL_MESSAGE.content))
        .map((m) => ({ role: m.role, content: m.content }));

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: apiMessages }),
      });

      const data = await res.json();

      if (data.error) {
        setMessages((prev) => [
          ...prev,
          { role: "assistant", content: "Lo siento, no puedo responder ahora mismo. Escríbenos a hola@projectcore.io o usa el formulario de contacto." },
        ]);
      } else {
        setMessages((prev) => [...prev, { role: "assistant", content: data.content }]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Algo falló. Escríbenos directamente a hola@projectcore.io y te respondemos en menos de 24h." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const visibleMessages = messages.slice(-6);

  return (
    <section
      className="py-28 md:py-36 px-6"
      style={{ backgroundColor: "#0D1117" }}
    >
      <div className="max-w-3xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-5"
        >
          <span
            className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] font-medium"
            style={{
              color: "#1A6B5A",
              border: "1px solid rgba(26,107,90,0.25)",
              background: "rgba(26,107,90,0.08)",
            }}
          >
            Asistente IA
          </span>
        </motion.div>

        {/* Avatar + título */}
        <motion.div
          initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-col items-center gap-5 mb-12"
        >
          {/* Orbe animado */}
          <div className="relative w-16 h-16">
            {/* Anillo exterior pulsante */}
            <div
              className="absolute inset-0 rounded-full animate-ping"
              style={{
                background: "radial-gradient(circle, rgba(26,107,90,0.3) 0%, transparent 70%)",
                animationDuration: "2.5s",
              }}
            />
            {/* Anillo medio */}
            <div
              className="absolute inset-1 rounded-full animate-pulse"
              style={{
                background: "radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)",
                animationDuration: "2s",
              }}
            />
            {/* Core */}
            <div
              className="absolute inset-2 rounded-full flex items-center justify-center"
              style={{
                background: "linear-gradient(135deg, #1A6B5A 0%, #6C63FF 100%)",
                boxShadow: "0 0 24px rgba(26,107,90,0.5), 0 0 48px rgba(108,99,255,0.2)",
              }}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                <path d="M8 12h8M12 8v8" />
              </svg>
            </div>
          </div>

          <div className="text-center">
            <h2 className="font-[var(--font-geist)] text-3xl md:text-4xl font-bold text-white tracking-tight">
              Hola, soy Core
            </h2>
            <p className="text-[15px] text-white/45 mt-2">
              ¿En qué puedo ayudarte?
            </p>
          </div>
        </motion.div>

        {/* Chat container — Double-Bezel */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
        >
          <div
            className="p-px rounded-[2rem]"
            style={{
              background: "rgba(26,107,90,0.1)",
              border: "1px solid rgba(26,107,90,0.15)",
              boxShadow: "0 0 60px rgba(26,107,90,0.06)",
            }}
          >
            <div
              className="rounded-[calc(2rem-1px)] overflow-hidden"
              style={{
                background: "#0A0F1C",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Messages area */}
              <div
                className="h-72 overflow-y-auto px-6 py-6 flex flex-col gap-4"
                style={{ scrollbarWidth: "none" }}
              >
                <AnimatePresence initial={false}>
                  {visibleMessages.map((msg, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, y: 12, filter: "blur(4px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{ duration: 0.4, ease: [0.32, 0.72, 0, 1] }}
                      className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
                    >
                      <div
                        className="max-w-[80%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed"
                        style={
                          msg.role === "user"
                            ? {
                                background: "#1A6B5A",
                                color: "rgba(255,255,255,0.92)",
                                borderBottomRightRadius: "6px",
                              }
                            : {
                                background: "rgba(255,255,255,0.05)",
                                border: "1px solid rgba(255,255,255,0.07)",
                                color: "rgba(255,255,255,0.75)",
                                borderBottomLeftRadius: "6px",
                              }
                        }
                      >
                        {msg.content}
                      </div>
                    </motion.div>
                  ))}
                </AnimatePresence>

                {/* Indicador de escritura */}
                {loading && (
                  <motion.div
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex justify-start"
                  >
                    <div
                      className="px-4 py-3 rounded-2xl flex items-center gap-1.5"
                      style={{
                        background: "rgba(255,255,255,0.05)",
                        border: "1px solid rgba(255,255,255,0.07)",
                        borderBottomLeftRadius: "6px",
                      }}
                    >
                      {[0, 1, 2].map((dot) => (
                        <span
                          key={dot}
                          className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                          style={{ animationDelay: `${dot * 120}ms` }}
                        />
                      ))}
                    </div>
                  </motion.div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Separador */}
              <div style={{ height: "1px", background: "rgba(255,255,255,0.05)" }} />

              {/* Input area */}
              <form onSubmit={handleSubmit} className="px-4 py-4 flex items-center gap-3">
                <div
                  className="flex-1 flex items-center rounded-full px-4 py-2.5 transition-all duration-400"
                  style={{
                    background: "rgba(255,255,255,0.04)",
                    border: "1px solid rgba(255,255,255,0.07)",
                  }}
                  onFocusCapture={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(26,107,90,0.5)";
                  }}
                  onBlurCapture={(e) => {
                    (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.07)";
                  }}
                >
                  <input
                    ref={inputRef}
                    type="text"
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Escribe tu pregunta sobre ProjectCore..."
                    className="flex-1 bg-transparent text-[14px] text-white placeholder-white/25 outline-none"
                    disabled={loading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || !input.trim()}
                  className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:opacity-40 cursor-pointer active:scale-[0.96]"
                  style={{
                    background: input.trim() ? "#1A6B5A" : "rgba(255,255,255,0.06)",
                    border: "1px solid rgba(255,255,255,0.1)",
                  }}
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 -rotate-45 translate-x-px -translate-y-px">
                    <line x1="22" y1="2" x2="11" y2="13" />
                    <polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            </div>
          </div>

          {/* Chips de sugerencias */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
            className="flex flex-wrap justify-center gap-2.5 mt-5"
          >
            {SUGGESTIONS.map((suggestion) => (
              <button
                key={suggestion}
                onClick={() => sendMessage(suggestion)}
                disabled={loading}
                className="rounded-full px-4 py-2 text-[13px] text-white/55 hover:text-white/90 transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:opacity-40 cursor-pointer"
                style={{
                  border: "1px solid rgba(26,107,90,0.25)",
                  background: "rgba(26,107,90,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(26,107,90,0.14)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(26,107,90,0.45)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLButtonElement).style.background = "rgba(26,107,90,0.06)";
                  (e.currentTarget as HTMLButtonElement).style.borderColor = "rgba(26,107,90,0.25)";
                }}
              >
                {suggestion}
              </button>
            ))}
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
