'use client';

import { useState, useEffect, useRef } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const QUICK_BUTTONS = [
  'Quiero una web profesional',
  'Necesito automatizar procesos',
  'Tengo una pregunta',
  'Quiero agendar una consulta',
];

interface ChatCoreProps {
  externalInput?: string;
  onExternalInputConsumed?: () => void;
}

export default function ChatCore({ externalInput, onExternalInputConsumed }: ChatCoreProps) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionId, setSessionId] = useState<string>('');
  const [calendarLink, setCalendarLink] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

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

  // Recibir prompt externo desde suggested prompts
  useEffect(() => {
    if (!externalInput) return;
    setInput(externalInput);
    inputRef.current?.focus();
    onExternalInputConsumed?.();
  }, [externalInput, onExternalInputConsumed]);

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

      // Si se agendó reunión, mostrar botón Cal.com
      if (data.action === 'meeting_scheduled' && data.calendar_link) {
        console.log('[CHATBOT V2] Reunión agendada:', data.calendar_link);
        setCalendarLink(data.calendar_link);
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

  // Envío directo desde botones rápidos
  const handleQuickButton = async (text: string) => {
    if (isLoading) return;
    setIsLoading(true);

    const userMessage = text;
    const newMessages: Message[] = [...messages, { role: 'user', content: userMessage }];
    setMessages(newMessages);

    const historyForAPI = newMessages.slice(1).map((msg) => ({
      role: msg.role,
      content: msg.content,
    }));

    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ session_id: sessionId, message: userMessage, history: historyForAPI }),
      });
      const data = await response.json();
      setMessages([...newMessages, { role: 'assistant', content: data.response }]);
      if (data.action === 'meeting_scheduled' && data.calendar_link) {
        setCalendarLink(data.calendar_link);
      }
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'Lo siento, estoy teniendo problemas técnicos. Por favor, intenta de nuevo.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const userHasMessaged = messages.length > 1;

  return (
    <div className="flex flex-col h-full">
      {/* Mensajes */}
      <div className="h-72 overflow-y-auto px-6 py-6 flex flex-col gap-4" style={{ scrollbarWidth: 'none' }}>
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
        {/* Botón Cal.com cuando se agenda */}
        {calendarLink && (
          <div className="flex justify-start">
            <a
              href={calendarLink}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 rounded-full px-4 py-2.5 text-[13px] font-semibold text-white transition-all duration-400 hover:scale-[1.02]"
              style={{ background: '#1A6B5A', border: '1px solid rgba(26,107,90,0.5)' }}
            >
              Reservar llamada gratuita →
            </a>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick buttons — solo hasta que el usuario manda su primer mensaje */}
      {!userHasMessaged && (
        <div className="px-6 pb-3 flex flex-wrap gap-2">
          {QUICK_BUTTONS.map((btn) => (
            <button
              key={btn}
              type="button"
              onClick={() => handleQuickButton(btn)}
              className="rounded-full px-3 py-1.5 text-[12px] text-white/60 hover:text-white transition-all duration-300 cursor-pointer"
              style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.1)' }}
            >
              {btn}
            </button>
          ))}
        </div>
      )}

      {/* Input */}
      <div style={{ height: '1px', background: 'rgba(255,255,255,0.05)' }}></div>
      <div className="px-4 py-4">
        <form onSubmit={handleSubmit} className="flex items-center gap-3">
          <div className="flex-1 flex items-center rounded-full px-4 py-2.5 transition-all duration-400" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(255,255,255,0.07)' }}>
            <input
              ref={inputRef}
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
