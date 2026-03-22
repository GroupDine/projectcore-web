"use client";

import { motion } from "framer-motion";

interface CTAFinalProps {
  onOpenModal: () => void;
}

const guarantees = [
  "Sin compromiso",
  "Respuesta en 24h",
  "100% gratuito",
];

export default function CTAFinal({ onOpenModal }: CTAFinalProps) {
  return (
    <section
      className="py-28 relative overflow-hidden"
      style={{
        background: "linear-gradient(135deg, #0F4A3A 0%, #0A0F1C 60%)",
      }}
    >
      {/* Glow decorativo */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "radial-gradient(ellipse 50% 60% at 30% 50%, rgba(26,107,90,0.2) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto px-6 lg:px-8 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-3xl md:text-5xl font-bold text-white mb-6"
        >
          ¿Por dónde empezamos?
        </motion.h2>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-lg mb-10 leading-relaxed"
          style={{ color: "#9CA3AF" }}
        >
          Cuéntanos tu situación. Te decimos qué tiene más sentido para ti
          — gratis y sin compromiso.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="flex flex-col items-center gap-6"
        >
          <button
            onClick={onOpenModal}
            className="px-10 py-4 rounded-[8px] text-base font-bold text-[#0A0F1C] bg-white transition-all duration-200 cursor-pointer hover:bg-gray-100"
            style={{ boxShadow: "0 4px 24px rgba(255,255,255,0.1)" }}
          >
            Reservar diagnóstico gratuito →
          </button>

          {/* Garantías */}
          <div className="flex flex-wrap justify-center items-center gap-4">
            {guarantees.map((g, i) => (
              <span key={i} className="flex items-center gap-1.5 text-sm" style={{ color: "#9CA3AF" }}>
                <span style={{ color: "#1A6B5A" }}>✓</span>
                {g}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
