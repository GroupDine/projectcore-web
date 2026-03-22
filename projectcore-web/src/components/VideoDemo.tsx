"use client";

import { motion } from "framer-motion";

const bullets = [
  "Agente de WhatsApp respondiendo leads automáticamente",
  "Dashboard de automatización en tiempo real",
  "Web entregada y en producción en 5 días",
];

export default function VideoDemo() {
  return (
    <section id="demo" className="py-24" style={{ backgroundColor: "#0D1421" }}>
      <div className="max-w-4xl mx-auto px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Mira cómo funciona
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ color: "#9CA3AF" }}
          >
            Un sistema real, construido para un negocio real
          </motion.p>
        </div>

        {/* Player placeholder */}
        <motion.div
          initial={{ opacity: 0, scale: 0.97 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative rounded-[12px] overflow-hidden border"
          style={{
            aspectRatio: "16/9",
            backgroundColor: "#111827",
            borderColor: "#1F2937",
          }}
        >
          {/* Icono play */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-4">
            <div
              className="w-20 h-20 rounded-full flex items-center justify-center border-2 transition-transform duration-200 hover:scale-110 cursor-pointer"
              style={{ borderColor: "#1A6B5A", backgroundColor: "rgba(26,107,90,0.15)" }}
            >
              <svg
                className="w-8 h-8 ml-1"
                fill="none"
                viewBox="0 0 24 24"
                style={{ color: "#1A6B5A" }}
              >
                <path
                  fill="currentColor"
                  d="M8 5.14v14l11-7-11-7z"
                />
              </svg>
            </div>
            <p className="text-sm font-medium" style={{ color: "#6B7280" }}>
              Demo en vídeo — próximamente
            </p>
          </div>
        </motion.div>

        {/* Bullets */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 flex flex-col sm:flex-row gap-4 justify-center"
        >
          {bullets.map((b, i) => (
            <div key={i} className="flex items-start gap-2 text-sm">
              <span style={{ color: "#1A6B5A" }} className="shrink-0 mt-0.5">✓</span>
              <span style={{ color: "#9CA3AF" }}>{b}</span>
            </div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
