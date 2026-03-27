"use client";

import { motion } from "framer-motion";

const SECTORS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 21h18M6 21V7l6-4 6 4v14M9 21v-6h6v6" />
      </svg>
    ),
    label: "Despachos de abogados",
    description: "Automatiza alertas de plazos, captación de clientes y emisión de facturas Verifactu.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
      </svg>
    ),
    label: "Clínicas y salud",
    description: "Agenda online, recordatorios automáticos y gestión de pacientes sin papel.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 11l19-9-9 19-2-8-8-2z" />
      </svg>
    ),
    label: "Restaurantes y hostelería",
    description: "Reservas automáticas, carta digital y gestión de reseñas sin esfuerzo.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M6 2L3 6v14a2 2 0 002 2h14a2 2 0 002-2V6l-3-4zM3 6h18M16 10a4 4 0 01-8 0" />
      </svg>
    ),
    label: "Comercios locales",
    description: "Catálogo online, pedidos por WhatsApp y atención automática 24/7.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6M16 13H8M16 17H8M10 9H8" />
      </svg>
    ),
    label: "Gestorías y asesorías",
    description: "Onboarding de clientes automatizado, documentación digital y seguimiento de expedientes.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2M12 11a4 4 0 100-8 4 4 0 000 8z" />
      </svg>
    ),
    label: "Autónomos y freelances",
    description: "Presupuestos automáticos, facturación y seguimiento de proyectos sin herramientas complicadas.",
  },
];

export default function ForWhom() {
  return (
    <section
      id="para-quien"
      className="py-28 md:py-36 px-6"
      style={{ backgroundColor: "#0A0F1C" }}
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
            Para quién
          </span>
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 20, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true, margin: "-60px" }}
          transition={{ duration: 0.75, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
          className="font-[var(--font-geist)] text-3xl md:text-4xl lg:text-5xl font-bold text-white text-center leading-tight tracking-tight mb-16"
        >
          Construido para negocios
          <br className="hidden md:block" />
          que quieren crecer
        </motion.h2>

        {/* Sectors grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {SECTORS.map((sector, i) => (
            <motion.div
              key={sector.label}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: 0.07 * i,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="group"
            >
              {/* Double-Bezel */}
              <div
                className="p-px rounded-[1.5rem] transition-all duration-600 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:border-[rgba(26,107,90,0.3)]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
              >
                <div
                  className="rounded-[calc(1.5rem-1px)] px-6 py-5 flex items-start gap-4 transition-all duration-600 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[rgba(26,107,90,0.04)]"
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.03)",
                  }}
                >
                  <span className="text-white/35 group-hover:text-[#1A6B5A] transition-colors duration-400 flex-shrink-0 mt-0.5">
                    {sector.icon}
                  </span>
                  <div className="flex flex-col gap-1">
                    <span className="text-[15px] font-medium text-white/60 group-hover:text-white/80 transition-colors duration-400">
                      {sector.label}
                    </span>
                    <span className="text-[13px] text-white/30 group-hover:text-white/45 transition-colors duration-400 leading-relaxed">
                      {sector.description}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="text-center text-[13px] text-white/25 mt-10"
        >
          ¿Tu sector no está aquí? Si tienes un negocio real con clientes reales, trabajamos contigo.
        </motion.p>
      </div>
    </section>
  );
}
