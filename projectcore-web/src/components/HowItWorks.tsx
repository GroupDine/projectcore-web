"use client";

import { motion } from "framer-motion";

interface HowItWorksProps {
  onOpenModal: () => void;
}

const STEPS = [
  {
    number: "01",
    title: "Diagnóstico gratuito",
    description:
      "30 minutos para entender tu negocio, tus objetivos y qué es lo que más impacto tendría ahora mismo. Sin compromisos, sin letra pequeña.",
  },
  {
    number: "02",
    title: "Propuesta en 48h",
    description:
      "Precio fijo. Plazo claro. Sin sorpresas. Recibes una propuesta detallada con exactamente lo que vas a obtener y cuándo.",
  },
  {
    number: "03",
    title: "Entrega y funcionando",
    description:
      "Cobro 100% por adelantado y entrega en el plazo acordado. Cuando termina, tienes algo que funciona — no una promesa.",
  },
];

export default function HowItWorks({ onOpenModal }: HowItWorksProps) {
  return (
    <section
      id="como-funciona"
      className="py-28 md:py-36 px-6"
      style={{ backgroundColor: "#070C18" }}
    >
      <div className="max-w-5xl mx-auto">
        {/* Eyebrow */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.65, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mb-5"
        >
          <span className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] font-medium text-white/40" style={{ border: "1px solid rgba(255,255,255,0.07)" }}>
            El proceso
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
          className="font-[var(--font-geist)] text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-tight tracking-tight mb-20"
        >
          Sencillo. Rápido. Sin sorpresas.
        </motion.h2>

        {/* Steps */}
        <div className="flex flex-col gap-6">
          {STEPS.map((step, i) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: -24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, x: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.75,
                delay: 0.12 * i,
                ease: [0.32, 0.72, 0, 1],
              }}
            >
              {/* Double-Bezel */}
              <div
                className="p-px rounded-[1.75rem]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="rounded-[calc(1.75rem-1px)] px-8 py-8 flex items-start gap-8"
                  style={{
                    background: "rgba(255,255,255,0.015)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Big number */}
                  <motion.span
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.6,
                      delay: 0.12 * i + 0.15,
                      ease: [0.32, 0.72, 0, 1],
                    }}
                    className="font-[var(--font-geist)] text-5xl md:text-6xl font-bold leading-none flex-shrink-0 select-none"
                    style={{
                      background: "linear-gradient(135deg, rgba(26,107,90,0.6) 0%, rgba(26,107,90,0.15) 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}
                  >
                    {step.number}
                  </motion.span>

                  <div className="flex flex-col gap-2 pt-1">
                    <h3 className="font-[var(--font-geist)] text-xl font-semibold text-white">
                      {step.title}
                    </h3>
                    <p className="text-[15px] text-white/45 leading-relaxed">
                      {step.description}
                    </p>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* CTA under steps */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.4, ease: [0.32, 0.72, 0, 1] }}
          className="text-center mt-14"
        >
          <button
            onClick={onOpenModal}
            className="group inline-flex items-center gap-3 rounded-full bg-[#1A6B5A] px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#22856F] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
            style={{ boxShadow: "0 0 0 1px rgba(26,107,90,0.3), 0 4px 20px rgba(26,107,90,0.2)" }}
          >
            <span>Empezar ahora — gratis</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-sm transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110">
              →
            </span>
          </button>
        </motion.div>
      </div>
    </section>
  );
}
