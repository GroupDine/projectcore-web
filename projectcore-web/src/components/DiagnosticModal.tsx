"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const BUSINESS_TYPES = [
  "Despacho / Asesoría",
  "Clínica o salud",
  "Restaurante u hostelería",
  "Comercio local",
  "Autónomo / Freelance",
  "Otro",
];

const SERVICE_TYPES = [
  "Web profesional",
  "Web + automatización",
  "Automatizaciones IA",
  "Software a medida",
  "Marketing digital",
  "No sé — necesito orientación",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  businessType: "",
  serviceType: "",
  message: "",
};

export default function DiagnosticModal({ isOpen, onClose }: DiagnosticModalProps) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
    }, 350);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "12px 16px",
    borderRadius: "0.875rem",
    fontSize: "14px",
    color: "#fff",
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    outline: "none",
    transition: "border-color 0.3s",
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-6"
          style={{
            background: "rgba(6,11,20,0.85)",
            backdropFilter: "blur(16px)",
            WebkitBackdropFilter: "blur(16px)",
          }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 12 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
            className="relative w-full max-w-lg overflow-y-auto max-h-[90vh]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Double-Bezel container */}
            <div
              className="p-px rounded-[2rem]"
              style={{
                background: "rgba(255,255,255,0.06)",
                border: "1px solid rgba(255,255,255,0.1)",
                boxShadow: "0 32px 80px rgba(0,0,0,0.6)",
              }}
            >
              <div
                className="rounded-[calc(2rem-1px)] p-8"
                style={{
                  background: "#0D1421",
                  boxShadow: "inset 0 1px 1px rgba(255,255,255,0.06)",
                }}
              >
                {/* Close button */}
                <button
                  onClick={handleClose}
                  className="absolute top-6 right-6 w-8 h-8 rounded-full flex items-center justify-center text-white/35 hover:text-white/70 transition-all duration-300 cursor-pointer"
                  style={{ background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}
                  aria-label="Cerrar"
                >
                  <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24">
                    <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>

                {submitted ? (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.92 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                    className="text-center py-8 flex flex-col items-center gap-4"
                  >
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center"
                      style={{ background: "rgba(26,107,90,0.15)", border: "1px solid rgba(26,107,90,0.35)" }}
                    >
                      <svg viewBox="0 0 24 24" fill="none" stroke="#1A6B5A" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" className="w-7 h-7">
                        <polyline points="20 6 9 17 4 12" />
                      </svg>
                    </div>
                    <h3 className="font-[var(--font-geist)] text-2xl font-bold text-white">¡Recibido!</h3>
                    <p className="text-[15px] text-white/45 max-w-xs">
                      Te contactamos en menos de 24 horas para coordinar tu diagnóstico gratuito.
                    </p>
                    <button
                      onClick={handleClose}
                      className="mt-4 rounded-full bg-[#1A6B5A] px-7 py-3 text-[14px] font-semibold text-white transition-all duration-400 hover:bg-[#22856F] cursor-pointer"
                    >
                      Cerrar
                    </button>
                  </motion.div>
                ) : (
                  <>
                    <h2 className="font-[var(--font-geist)] text-2xl font-bold text-white mb-1.5">
                      Cuéntanos sobre tu negocio
                    </h2>
                    <p className="text-[14px] text-white/35 mb-7">
                      Respuesta garantizada en menos de 24 horas
                    </p>

                    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] uppercase tracking-[0.12em] font-medium text-white/30">Nombre *</label>
                          <input type="text" name="name" required value={form.name} onChange={handleChange} placeholder="Tu nombre" style={inputStyle} />
                        </div>
                        <div className="flex flex-col gap-1.5">
                          <label className="text-[11px] uppercase tracking-[0.12em] font-medium text-white/30">Email *</label>
                          <input type="email" name="email" required value={form.email} onChange={handleChange} placeholder="tu@email.com" style={inputStyle} />
                        </div>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] uppercase tracking-[0.12em] font-medium text-white/30">Teléfono / WhatsApp (opcional)</label>
                        <input type="tel" name="phone" value={form.phone} onChange={handleChange} placeholder="+34 600 000 000" style={inputStyle} />
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] uppercase tracking-[0.12em] font-medium text-white/30">Tipo de negocio</label>
                        <select name="businessType" value={form.businessType} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>
                          <option value="" style={{ background: "#0D1421" }}>Selecciona tu sector</option>
                          {BUSINESS_TYPES.map((t) => (
                            <option key={t} value={t} style={{ background: "#0D1421" }}>{t}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] uppercase tracking-[0.12em] font-medium text-white/30">¿Qué necesitas?</label>
                        <select name="serviceType" value={form.serviceType} onChange={handleChange} style={{ ...inputStyle, cursor: "pointer" }}>
                          <option value="" style={{ background: "#0D1421" }}>Selecciona un servicio</option>
                          {SERVICE_TYPES.map((t) => (
                            <option key={t} value={t} style={{ background: "#0D1421" }}>{t}</option>
                          ))}
                        </select>
                      </div>

                      <div className="flex flex-col gap-1.5">
                        <label className="text-[11px] uppercase tracking-[0.12em] font-medium text-white/30">Mensaje (opcional)</label>
                        <textarea name="message" value={form.message} onChange={handleChange} placeholder="Cuéntame más sobre tu proyecto..." rows={3} style={{ ...inputStyle, resize: "none" }} />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="group mt-2 flex items-center justify-center gap-3 w-full rounded-full bg-[#1A6B5A] py-3.5 text-[14px] font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#22856F] hover:scale-[1.02] active:scale-[0.97] disabled:opacity-60 cursor-pointer"
                        style={{ boxShadow: "0 0 0 1px rgba(26,107,90,0.3), 0 4px 20px rgba(26,107,90,0.2)" }}
                      >
                        {loading ? (
                          <span className="flex items-center gap-2">
                            <svg className="w-4 h-4 animate-spin" viewBox="0 0 24 24" fill="none">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                            </svg>
                            Enviando...
                          </span>
                        ) : (
                          <>
                            <span>Solicitar diagnóstico gratuito</span>
                            <span className="flex h-6 w-6 items-center justify-center rounded-full bg-black/20 text-sm transition-all duration-400 group-hover:translate-x-0.5 group-hover:scale-110">→</span>
                          </>
                        )}
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
