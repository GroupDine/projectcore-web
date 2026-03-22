"use client";

import { motion } from "framer-motion";

interface HowItWorksProps {
  onOpenModal: () => void;
}

const steps = [
  {
    number: "01",
    title: "Diagnóstico gratuito",
    description:
      "Analizamos tu situación actual y te decimos exactamente qué tiene más sentido para tu negocio. Sin compromiso.",
    duration: "Duración: 30 minutos",
  },
  {
    number: "02",
    title: "Propuesta clara",
    description:
      "Recibes una propuesta con alcance definido, precio fijo y plazos concretos. Sin letra pequeña.",
    duration: "Duración: 24-48h",
  },
  {
    number: "03",
    title: "Entregamos resultados",
    description:
      "Construimos, lanzamos y te mostramos el impacto con métricas reales. Tú decides si continuar.",
    duration: "Duración: según servicio",
  },
];

export default function HowItWorks({ onOpenModal }: HowItWorksProps) {
  return (
    <section id="como-funciona" className="py-24" style={{ backgroundColor: "#0A0F1C" }}>
      <div className="max-w-6xl mx-auto px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Simple, claro y sin sorpresas
          </motion.h2>
        </div>

        {/* Pasos */}
        <div className="flex flex-col lg:flex-row items-stretch gap-4 lg:gap-0 mb-12">
          {steps.map((step, i) => (
            <div key={i} className="flex items-stretch flex-1">
              {/* Card */}
              <motion.div
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.1 }}
                className="flex-1 rounded-[12px] p-8 border"
                style={{ backgroundColor: "#111827", borderColor: "#1F2937" }}
              >
                {/* Número */}
                <div
                  className="text-4xl font-bold mb-4 leading-none"
                  style={{ color: "#1A6B5A" }}
                >
                  {step.number}
                </div>
                <h3 className="text-lg font-bold text-white mb-3">{step.title}</h3>
                <p className="text-sm leading-relaxed mb-4" style={{ color: "#9CA3AF" }}>
                  {step.description}
                </p>
                <span
                  className="inline-block text-xs px-3 py-1 rounded-full border font-medium"
                  style={{ color: "#9CA3AF", borderColor: "#1F2937" }}
                >
                  {step.duration}
                </span>
              </motion.div>

              {/* Flecha entre pasos (desktop) */}
              {i < steps.length - 1 && (
                <div className="hidden lg:flex items-center px-4 shrink-0">
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    viewBox="0 0 24 24"
                    style={{ color: "#374151" }}
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 5l7 7-7 7"
                    />
                  </svg>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="flex justify-center">
          <motion.button
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: 0.3 }}
            onClick={onOpenModal}
            className="px-8 py-4 rounded-[8px] text-base font-semibold text-white transition-all duration-300 cursor-pointer"
            style={{ backgroundColor: "#1A6B5A" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#22856F";
              e.currentTarget.style.boxShadow = "0 0 28px rgba(26,107,90,0.4)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#1A6B5A";
              e.currentTarget.style.boxShadow = "none";
            }}
          >
            Empezar diagnóstico gratuito →
          </motion.button>
        </div>
      </div>
    </section>
  );
}
