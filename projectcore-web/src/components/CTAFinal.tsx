"use client";

import { useState } from "react";
import { motion } from "framer-motion";

interface CTAFinalProps {
  onOpenModal: () => void;
}

const BUSINESS_TYPES = [
  "Despacho de abogados",
  "Clínica o centro de salud",
  "Restaurante u hostelería",
  "Comercio local",
  "Gestoría o asesoría",
  "Autónomo o freelance",
  "Otro tipo de negocio",
];

export default function CTAFinal({ onOpenModal }: CTAFinalProps) {
  const [form, setForm] = useState({ name: "", email: "", type: "", message: "" });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 900);
  };

  const inputBase = {
    background: "rgba(255,255,255,0.03)",
    border: "1px solid rgba(255,255,255,0.08)",
    borderRadius: "1rem",
    color: "#fff",
    outline: "none",
  } as React.CSSProperties;

  return (
    <section
      className="py-28 md:py-40 px-6 relative overflow-hidden"
      style={{ backgroundColor: "#070C18" }}
    >
      {/* Background glow */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "radial-gradient(ellipse 60% 50% at 50% 100%, rgba(26,107,90,0.06) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-5"
        >
          <span className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] font-medium text-white/40" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            Empieza hoy
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
          className="font-[var(--font-geist)] text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-tight tracking-tight mb-4"
        >
          ¿Listo para construir el sistema
          <br className="hidden md:block" />
          que tu negocio necesita?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="text-center text-white/40 text-[15px] mb-14"
        >
          Primera consulta gratuita. Sin compromiso. Sin letra pequeña.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.15, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Double-Bezel form container */}
          <div
            className="p-px rounded-[2rem]"
            style={{
              background: "rgba(255,255,255,0.05)",
              border: "1px solid rgba(255,255,255,0.07)",
            }}
          >
            <div
              className="rounded-[calc(2rem-1px)] p-8 md:p-10"
              style={{
                background: "rgba(255,255,255,0.015)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.04)",
              }}
            >
              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
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
                  <h3 className="font-[var(--font-geist)] text-xl font-semibold text-white">Solicitud recibida</h3>
                  <p className="text-white/45 text-[15px] max-w-xs">Te contactamos en menos de 24 horas para coordinar el diagnóstico.</p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] text-white/35 uppercase tracking-[0.12em] font-medium">Nombre</label>
                      <input
                        name="name"
                        type="text"
                        placeholder="Mohamed"
                        value={form.name}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 text-[14px] placeholder-white/20 transition-all duration-300 focus:border-[rgba(26,107,90,0.5)]"
                        style={inputBase}
                      />
                    </div>
                    <div className="flex flex-col gap-1.5">
                      <label className="text-[12px] text-white/35 uppercase tracking-[0.12em] font-medium">Email</label>
                      <input
                        name="email"
                        type="email"
                        placeholder="tu@email.com"
                        value={form.email}
                        onChange={handleChange}
                        required
                        className="px-4 py-3 text-[14px] placeholder-white/20 transition-all duration-300 focus:border-[rgba(26,107,90,0.5)]"
                        style={inputBase}
                      />
                    </div>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-white/35 uppercase tracking-[0.12em] font-medium">Tipo de negocio</label>
                    <select
                      name="type"
                      value={form.type}
                      onChange={handleChange}
                      className="px-4 py-3 text-[14px] transition-all duration-300 appearance-none cursor-pointer"
                      style={{ ...inputBase, color: form.type ? "#fff" : "rgba(255,255,255,0.2)" }}
                    >
                      <option value="" disabled>Selecciona tu sector</option>
                      {BUSINESS_TYPES.map((t) => (
                        <option key={t} value={t} style={{ background: "#0A0F1C", color: "#fff" }}>{t}</option>
                      ))}
                    </select>
                  </div>

                  <div className="flex flex-col gap-1.5">
                    <label className="text-[12px] text-white/35 uppercase tracking-[0.12em] font-medium">¿Qué necesitas?</label>
                    <textarea
                      name="message"
                      placeholder="Cuéntame brevemente qué quieres conseguir..."
                      value={form.message}
                      onChange={handleChange}
                      rows={3}
                      className="px-4 py-3 text-[14px] placeholder-white/20 resize-none transition-all duration-300 focus:border-[rgba(26,107,90,0.5)]"
                      style={inputBase}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group mt-2 flex items-center justify-center gap-3 w-full rounded-full bg-[#1A6B5A] py-4 text-[15px] font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#22856F] hover:scale-[1.02] active:scale-[0.98] disabled:opacity-60 cursor-pointer"
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
                        <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-sm transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110">
                          →
                        </span>
                      </>
                    )}
                  </button>
                </form>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
