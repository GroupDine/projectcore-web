"use client";

import { motion } from "framer-motion";

interface ServicesProps {
  onOpenModal: () => void;
}

const SERVICES = [
  {
    tag: "01",
    name: "Web profesional",
    price: "desde 800€",
    delivery: "Lista en 5–7 días",
    color: "#1A6B5A",
    features: [
      "Diseño a medida, sin plantillas",
      "Mobile-first y optimizada para Google",
      "Formulario de contacto y analíticas",
    ],
  },
  {
    tag: "02",
    name: "Web + automatización",
    price: "desde 1.800€",
    monthly: "+ 200€/mes",
    delivery: "Lista en 7–10 días",
    color: "#6C63FF",
    badge: "Más popular",
    features: [
      "Todo lo de Web profesional",
      "Automatización de leads y respuestas",
      "Integración con CRM o email marketing",
    ],
  },
  {
    tag: "03",
    name: "Automatizaciones IA",
    price: "desde 600€",
    monthly: "+ 150€/mes",
    delivery: "En 3–5 días",
    color: "#1A6B5A",
    features: [
      "Flujos automáticos con IA (n8n + Claude)",
      "Respuestas, notificaciones y reportes solos",
      "Sin código, sin mantenimiento tuyo",
    ],
  },
  {
    tag: "04",
    name: "Software a medida",
    price: "desde 2.500€",
    delivery: "Según alcance",
    color: "#6C63FF",
    features: [
      "Aplicación web o interna a tu medida",
      "Base de datos, autenticación y panel admin",
      "Escala contigo — sin límites de plataforma",
    ],
  },
  {
    tag: "05",
    name: "Marketing digital",
    price: "desde 400€/mes",
    delivery: "Inicio en 48h",
    color: "#1A6B5A",
    features: [
      "Contenido para redes sociales + SEO",
      "Campañas de ads (Google / Meta)",
      "Reportes mensuales de resultados reales",
    ],
  },
];

export default function Services({ onOpenModal }: ServicesProps) {
  return (
    <section id="servicios" className="py-28 md:py-36 px-6" style={{ backgroundColor: "#0A0F1C" }}>
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
            Servicios
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
          className="font-[var(--font-geist)] text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-tight tracking-tight mb-4"
        >
          Elige lo que necesita tu negocio
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.1, ease: [0.32, 0.72, 0, 1] }}
          className="text-center text-white/40 text-[15px] mb-16"
        >
          Precios fijos. Plazos claros. Cobro 100% por adelantado.
        </motion.p>

        {/* Cards grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {SERVICES.map((service, i) => (
            <motion.div
              key={service.tag}
              initial={{ opacity: 0, y: 28, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.75,
                delay: 0.07 * i,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="group"
            >
              {/* Double-Bezel outer shell */}
              <div
                className="p-px rounded-[1.75rem] h-full transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  background: "rgba(255,255,255,0.04)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                {/* Inner core */}
                <div
                  className="rounded-[calc(1.75rem-1px)] p-7 h-full flex flex-col gap-5 transition-all duration-700 ease-[cubic-bezier(0.32,0.72,0,1)]"
                  style={{
                    background: "rgba(255,255,255,0.015)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.04)",
                  }}
                >
                  {/* Header row */}
                  <div className="flex items-start justify-between">
                    <span
                      className="text-[11px] font-mono font-medium"
                      style={{ color: service.color }}
                    >
                      {service.tag}
                    </span>
                    {service.badge && (
                      <span
                        className="rounded-full px-2.5 py-0.5 text-[10px] font-medium"
                        style={{
                          background: `${service.color}22`,
                          color: service.color,
                          border: `1px solid ${service.color}40`,
                        }}
                      >
                        {service.badge}
                      </span>
                    )}
                  </div>

                  <div>
                    <h3 className="font-[var(--font-geist)] text-lg font-semibold text-white mb-2 leading-snug">
                      {service.name}
                    </h3>
                    <div className="flex items-baseline gap-2 flex-wrap">
                      <span className="text-2xl font-bold text-white font-[var(--font-geist)]">
                        {service.price}
                      </span>
                      {service.monthly && (
                        <span className="text-sm text-white/35">{service.monthly}</span>
                      )}
                    </div>
                    <p
                      className="text-[12px] mt-1"
                      style={{ color: service.color, opacity: 0.8 }}
                    >
                      {service.delivery}
                    </p>
                  </div>

                  {/* Features */}
                  <ul className="flex flex-col gap-2.5 flex-1">
                    {service.features.map((feature) => (
                      <li key={feature} className="flex items-start gap-2.5 text-[14px] text-white/45">
                        <span
                          className="mt-[3px] w-1.5 h-1.5 rounded-full flex-shrink-0"
                          style={{ backgroundColor: service.color, opacity: 0.7 }}
                        />
                        {feature}
                      </li>
                    ))}
                  </ul>

                  {/* CTA */}
                  <button
                    onClick={onOpenModal}
                    className="group/btn mt-auto flex items-center justify-between w-full rounded-full px-5 py-3 text-[13px] font-medium text-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:scale-[1.02] active:scale-[0.98] cursor-pointer"
                    style={{
                      background: `${service.color}18`,
                      border: `1px solid ${service.color}35`,
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.background = `${service.color}30`;
                      e.currentTarget.style.borderColor = `${service.color}60`;
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.background = `${service.color}18`;
                      e.currentTarget.style.borderColor = `${service.color}35`;
                    }}
                  >
                    <span>Solicitar este servicio</span>
                    <span
                      className="w-6 h-6 rounded-full flex items-center justify-center text-[11px] transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover/btn:translate-x-0.5"
                      style={{ background: `${service.color}25` }}
                    >
                      →
                    </span>
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
