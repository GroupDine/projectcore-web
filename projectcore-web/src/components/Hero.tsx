"use client";

import { motion } from "framer-motion";

interface HeroProps {
  onOpenModal: () => void;
}

export default function Hero({ onOpenModal }: HeroProps) {
  return (
    <section
      className="relative min-h-[100dvh] flex items-center justify-center overflow-hidden"
      style={{ backgroundColor: "#0A0F1C" }}
    >
      {/* Background orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div
          className="orb-float absolute rounded-full"
          style={{
            width: "600px",
            height: "600px",
            top: "-100px",
            left: "-100px",
            background:
              "radial-gradient(circle, rgba(26,107,90,0.14) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="orb-float-delay absolute rounded-full"
          style={{
            width: "500px",
            height: "500px",
            bottom: "0",
            right: "-80px",
            background:
              "radial-gradient(circle, rgba(108,99,255,0.1) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
        <div
          className="absolute inset-0"
          style={{
            background:
              "radial-gradient(ellipse 70% 50% at 50% 40%, rgba(26,107,90,0.07) 0%, transparent 65%)",
          }}
        />
      </div>

      <div className="relative z-10 max-w-5xl mx-auto px-6 text-center pt-32 pb-24 lg:pt-44 lg:pb-32">
        {/* Eyebrow badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
          className="inline-flex items-center mb-8"
        >
          <span
            className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] font-medium text-white/50"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(255,255,255,0.03)",
            }}
          >
            Agencia digital full-service · España
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          initial={{ opacity: 0, y: 24, filter: "blur(8px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.85, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="font-[var(--font-geist)] text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-7"
        >
          Tu negocio merece un{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #1A6B5A 0%, #22956F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            sistema digital
          </span>
          <br className="hidden md:block" />
          {" "}que trabaje por ti
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.25, ease: [0.32, 0.72, 0, 1] }}
          className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-12 leading-relaxed"
        >
          Web, automatizaciones e IA para pymes españolas.
          <br className="hidden sm:block" />
          En días, no meses.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.38, ease: [0.32, 0.72, 0, 1] }}
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          {/* Primary CTA — Button-in-Button */}
          <button
            onClick={onOpenModal}
            className="group flex items-center gap-3 rounded-full bg-[#1A6B5A] px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#22856F] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
            style={{
              boxShadow: "0 0 0 1px rgba(26,107,90,0.4), 0 4px 24px rgba(26,107,90,0.25)",
            }}
          >
            <span>Quiero mi diagnóstico gratuito</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-sm transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110">
              →
            </span>
          </button>

          {/* Secondary CTA */}
          <button
            onClick={() => {
              document.querySelector("#servicios")?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium text-white/60 hover:text-white transition-all duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-pointer bg-transparent"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
            }}
          >
            Ver servicios
          </button>
        </motion.div>

        {/* Trust line */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.55 }}
          className="mt-6 text-[13px] text-white/25"
        >
          Sin compromiso · Sin permanencia · Primera consulta gratuita
        </motion.p>
      </div>
    </section>
  );
}
