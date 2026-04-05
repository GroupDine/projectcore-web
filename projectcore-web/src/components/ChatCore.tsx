'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

export default function ChatCore() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Generar session_id único al cargar
  useEffect(() => {
    let storedSessionId = localStorage.getItem('projectcore_chatbot_session_v2');
    if (!storedSessionId) {
      storedSessionId = `session-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
      localStorage.setItem('projectcore_chatbot_session_v2', storedSessionId);
      console.log('[CHATBOT V2] Nuevo session_id creado:', storedSessionId);
    } else {
      console.log('[CHATBOT V2] Session_id existente:', storedSessionId);
    }
    setSessionId(storedSessionId);

    // Mensaje de bienvenida
    setMessages([
      {
        role: 'assistant',
        content: 'Hola, soy Core — el asistente de ProjectCore. ¿En qué puedo ayudarte hoy?',
      },
    ]);
  }, []);

  // Auto-scroll al último mensaje
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage = input.trim();
    setInput('');
    setIsLoading(true);

    // Añadir mensaje del usuario
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);

    // Preparar historial (sin el mensaje de bienvenida)
    const historyForAPI = newMessages.slice(1).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    console.log('[CHATBOT V2] Enviando mensaje:', {
      message: userMessage,
      session_id: sessionId,
      historyLength: historyForAPI.length,
    });

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          session_id: sessionId,
          message: userMessage,
          history: historyForAPI,
        }),
      });

      const data = await response.json();
      console.log('[CHATBOT V2] Respuesta recibida:', data);

      // Añadir respuesta del bot
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);

      // Si se agendó reunión
      if (data.action === 'meeting_scheduled' && data.calendar_link) {
        console.log('[CHATBOT V2] Reunión agendada:', data.calendar_link);
        // Opcional: mostrar notificación o abrir link
      }
    } catch (error) {
      console.error('[CHATBOT V2] Error al enviar mensaje:', error);
      setMessages([
        ...newMessages,
        {
          role: 'assistant',
          content: 'Lo siento, estoy teniendo problemas técnicos. Por favor, intenta de nuevo.',
        },
      ]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col h-full">
      {/* Mensajes */}
      <div className="flex-1 overflow-y-auto px-6 py-6 space-y-4" style={{ scrollbarWidth: 'none' }}>
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            style={{
              opacity: 1,
              filter: 'blur(0px)',
              transform: 'none',
            }}
          >
            <div
              className={`max-w-[80%] px-4 py-3 rounded-2xl text-[14px] leading-relaxed ${
                msg.role === 'user'
                  ? 'bg-[#1A6B5A] text-white'
                  : 'bg-white/5 border border-white/10 text-white/75'
              }`}
              style={{
                borderBottomLeftRadius: msg.role === 'assistant' ? '6px' : undefined,
                borderBottomRightRadius: msg.role === 'user' ? '6px' : undefined,
              }}
            >
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-white/5 border border-white/10 px-4 py-3 rounded-2xl rounded-bl-md">
              <span className="text-white/50 text-[14px]">Core está escribiendo...</span>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
      <div className="px-4 py-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1 flex items-center rounded-full px-4 py-2.5 transition-all duration-400" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu pregunta sobre ProjectCore..."
              disabled={isLoading}
              className="flex-1 bg-transparent text-[14px] text-white placeholder-white/25 outline-none"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading || !input.trim()}
            className="w-10 h-10 rounded-full flex items-center justify-center transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] disabled:opacity-40 cursor-pointer active:scale-[0.96]"
            style={{ background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(255,255,255,0.1)' }}
          >
            <svg
              viewBox="0 0 24 24"
              fill="none"
              stroke="white"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="w-4 h-4 -rotate-45 translate-x-px -translate-y-px"
            >
              <line x1="22" y1="2" x2="11" y2="13"></line>
              <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
