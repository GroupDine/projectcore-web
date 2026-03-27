"use client";

import { useState } from "react";
import { motion } from "framer-motion";

export default function LeadMagnet() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 800);
  };

  return (
    <section
      className="py-28 md:py-36 px-6"
      style={{
        background: "linear-gradient(180deg, #0A0F1C 0%, #080D19 50%, #0A0F1C 100%)",
      }}
    >
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.8, ease: [0.32, 0.72, 0, 1] }}
        >
          {/* Double-Bezel container */}
          <div
            className="p-px rounded-[2.5rem]"
            style={{
              background: "rgba(26,107,90,0.12)",
              border: "1px solid rgba(26,107,90,0.2)",
              boxShadow: "0 0 80px rgba(26,107,90,0.08)",
            }}
          >
            <div
              className="rounded-[calc(2.5rem-1px)] px-10 py-14 md:px-16 text-center"
              style={{
                background: "rgba(10,15,28,0.95)",
                boxShadow: "inset 0 1px 1px rgba(255,255,255,0.04)",
              }}
            >
              {/* Label */}
              <span
                className="inline-block mb-6 rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] font-medium"
                style={{
                  color: "#1A6B5A",
                  background: "rgba(26,107,90,0.1)",
                  border: "1px solid rgba(26,107,90,0.25)",
                }}
              >
                Descarga gratis
              </span>

              <h2 className="font-[var(--font-geist)] text-2xl md:text-3xl lg:text-4xl font-bold text-white leading-tight tracking-tight mb-4">
                3 automatizaciones que cualquier
                <br className="hidden sm:block" /> despacho puede tener en 7 días
              </h2>

              <p className="text-[15px] text-white/45 mb-10 max-w-md mx-auto leading-relaxed">
                Sin código. Sin contratar a nadie. Sin meses de implantación.
                La guía paso a paso que nadie te enseña.
              </p>

              {submitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.95 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, ease: [0.32, 0.72, 0, 1] }}
                  className="flex flex-col items-center gap-3"
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center"
                    style={{ background: "rgba(26,107,90,0.2)", border: "1px solid rgba(26,107,90,0.4)" }}
                  >
                    <svg viewBox="0 0 24 24" fill="none" stroke="#1A6B5A" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <p className="text-white/70 text-[15px]">
                    Enviado. Revisa tu email en los próximos minutos.
                  </p>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  {/* Email input — Double-Bezel */}
                  <div
                    className="flex-1 p-px rounded-full"
                    style={{
                      background: "rgba(255,255,255,0.06)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="tu@email.com"
                      required
                      className="w-full rounded-full px-5 py-3 text-[14px] text-white placeholder-white/25 bg-transparent outline-none"
                      style={{
                        background: "rgba(255,255,255,0.02)",
                      }}
                    />
                  </div>

                  <button
                    type="submit"
                    disabled={loading}
                    className="group flex items-center justify-center gap-2 rounded-full bg-[#1A6B5A] px-6 py-3 text-[14px] font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#22856F] hover:scale-[1.03] active:scale-[0.97] disabled:opacity-60 cursor-pointer whitespace-nowrap"
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
                        <span>Quiero la guía</span>
                        <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/20 text-[11px] transition-transform duration-400 group-hover:translate-x-0.5">→</span>
                      </>
                    )}
                  </button>
                </form>
              )}

              <p className="mt-5 text-[12px] text-white/20">
                Sin spam. Puedes darte de baja cuando quieras.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
