"use client";

import { motion } from "framer-motion";

const PROBLEMS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 8v4m0 4h.01" />
      </svg>
    ),
    title: "Sin web o web mala",
    description:
      "Tu competencia aparece en Google. Tú no. Cada mes que pasa son clientes que van directamente a ellos, sin que te den ni la oportunidad de explicar lo que ofreces.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <rect x="3" y="4" width="18" height="16" rx="2" />
        <path d="M8 2v4M16 2v4M3 10h18" />
      </svg>
    ),
    title: "Sin automatización",
    description:
      "Contestas emails a mano. Envías presupuestos uno a uno. Gestionas citas en papel. Horas de trabajo administrativo que podrían hacerse solas mientras tú te enfocas en crecer.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-6 h-6">
        <path d="M3 3h7v7H3zM14 3h7v7h-7zM14 14h7v7h-7zM3 14h7v7H3z" />
      </svg>
    ),
    title: "Sin sistema",
    description:
      "Todo depende de ti. Si paras, el negocio para. No hay procesos, no hay escalabilidad, no hay forma de crecer sin contratar más gente. Eso no es un negocio, es un trabajo.",
  },
];

export default function Problem() {
  return (
    <section className="py-28 md:py-36 px-6" style={{ backgroundColor: "#0A0F1C" }}>
      <div className="max-w-6xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-5"
        >
          <span className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] font-medium text-white/40" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            El problema
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
          className="font-[var(--font-geist)] text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-tight tracking-tight mb-20"
        >
          ¿Cuántos clientes pierdes cada mes{" "}
          <br className="hidden md:block" />
          por no aparecer online?
        </motion.h2>

        {/* Cards — Z-Axis feel with slight variance */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PROBLEMS.map((problem, i) => (
            <motion.div
              key={problem.title}
              initial={{ opacity: 0, y: 32, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.8,
                delay: 0.1 * i,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              {/* Double-Bezel outer shell */}
              <div
                className="p-px rounded-[2rem] h-full"
                style={{
                  background: "rgba(255,255,255,0.05)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
              >
                {/* Inner core */}
                <div
                  className="rounded-[calc(2rem-1px)] p-8 h-full flex flex-col gap-5"
                  style={{
                    background: "rgba(255,255,255,0.02)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.05)",
                  }}
                >
                  {/* Icon */}
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center text-white/60"
                    style={{
                      background: "rgba(255,255,255,0.04)",
                      border: "1px solid rgba(255,255,255,0.08)",
                    }}
                  >
                    {problem.icon}
                  </div>

                  <h3 className="font-[var(--font-geist)] text-lg font-semibold text-white">
                    {problem.title}
                  </h3>

                  <p className="text-[15px] text-white/45 leading-relaxed">
                    {problem.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
