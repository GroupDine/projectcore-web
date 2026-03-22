"use client";

import { motion, type Variants, type Easing } from "framer-motion";

interface HeroProps {
  onOpenModal: () => void;
}

const easeOut: Easing = "easeOut";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.5, ease: easeOut },
  }),
};

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden" style={{ backgroundColor: "#0A0F1C" }}>
      {/* Fondo glow sutil */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 60% 40% at 50% 30%, rgba(26,107,90,0.12) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-4xl mx-auto px-6 lg:px-8 text-center pt-24 pb-20 lg:pt-36 lg:pb-28">
        {/* Badge */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2 mb-8"
        >
          <span
            className="px-4 py-1.5 rounded-full text-sm font-medium text-[#9CA3AF] border"
            style={{ backgroundColor: "#1F2937", borderColor: "#374151" }}
          >
            ✦ Agencia digital full-service
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-4xl md:text-5xl lg:text-6xl font-bold text-white leading-tight tracking-tight mb-6"
        >
          Haz{" "}
          <span style={{ color: "#1A6B5A" }}>crecer</span>{" "}
          tu negocio con<br className="hidden md:block" /> tecnología que trabaja por ti.
        </motion.h1>

        {/* Subtítulo */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg md:text-xl max-w-2xl mx-auto mb-10 leading-relaxed"
          style={{ color: "#9CA3AF" }}
        >
          Webs profesionales, automatizaciones con IA, marketing digital y software a medida.
          Elige lo que necesitas — paga solo por eso.
        </motion.p>

        {/* CTA */}
        <motion.div
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center gap-4"
        >
          <button
            onClick={onOpenModal}
            className="group relative px-8 py-4 rounded-[8px] text-base font-semibold text-white transition-all duration-300 cursor-pointer"
            style={{ backgroundColor: "#1A6B5A" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#22856F";
              e.currentTarget.style.boxShadow = "0 0 32px rgba(26,107,90,0.5)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1A6B5A";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            → Diagnóstico gratuito — 30 min
          </button>
          <p className="text-sm" style={{ color: "#6B7280" }}>
            Sin compromiso · Sin permanencia · Respuesta en 24h
          </p>
        </motion.div>
      </div>
    </section>
  );
}
