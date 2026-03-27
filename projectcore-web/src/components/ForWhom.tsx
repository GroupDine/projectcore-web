"use client";

import { motion } from "framer-motion";

const SECTORS = [
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
      </svg>
    ),
    label: "Despachos de abogados",
    description: "Alertas de plazos, captación de clientes y facturación Verifactu automatizadas.",
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
        <path d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8l-6-6zM14 2v6h6" />
      </svg>
    ),
    label: "Gestorías y asesorías",
    description: "Onboarding de clientes digitalizado y seguimiento de expedientes automatizado.",
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
        <circle cx="12" cy="8" r="4" /><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7" />
      </svg>
    ),
    label: "Clínicas de estética y belleza",
    description: "Citas online, recordatorios automáticos y fidelización de clientes sin llamadas.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2zM22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
      </svg>
    ),
    label: "Academias y centros formativos",
    description: "Matriculación online, pagos automáticos y comunicación con alumnos centralizada.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2z" /><polyline points="9 22 9 12 15 12 15 22" />
      </svg>
    ),
    label: "Inmobiliarias y agentes",
    description: "Captación de leads automatizada, visitas coordinadas y seguimiento sin esfuerzo.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="3" /><path d="M19.07 4.93a10 10 0 010 14.14M4.93 4.93a10 10 0 000 14.14" />
      </svg>
    ),
    label: "Talleres y servicios técnicos",
    description: "Presupuestos automáticos, seguimiento de reparaciones y avisos al cliente.",
  },
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <rect x="2" y="3" width="20" height="14" rx="2" /><path d="M8 21h8M12 17v4" />
      </svg>
    ),
    label: "Constructoras y reformas",
    description: "Gestión de proyectos, presupuestos digitales y comunicación con clientes ordenada.",
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
  {
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.2} strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <path d="M17 21v-2a4 4 0 00-4-4H5a4 4 0 00-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M23 21v-2a4 4 0 00-3-3.87M16 3.13a4 4 0 010 7.75" />
      </svg>
    ),
    label: "Empresas con equipos",
    description: "Automatiza procesos internos, reportes y comunicación entre departamentos.",
  },
];

export default function ForWhom() {
  return (
    <section
      id="para-quien"
      className="py-28 md:py-36 px-6"
      style={{ backgroundColor: "#0A0F1C" }}
    >
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
          {" "}que quieren crecer
        </motion.h2>

        {/* Sectors grid — 4 cols desktop, 2 tablet, 1 mobile */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SECTORS.map((sector, i) => (
            <motion.div
              key={sector.label}
              initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{
                duration: 0.65,
                delay: 0.05 * i,
                ease: [0.32, 0.72, 0, 1],
              }}
              className="group"
            >
              {/* Double-Bezel */}
              <div
                className="p-px rounded-[1.5rem] h-full transition-all duration-600 ease-[cubic-bezier(0.32,0.72,0,1)]"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(26,107,90,0.3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
                }}
              >
                <div
                  className="rounded-[calc(1.5rem-1px)] px-5 py-5 h-full flex flex-col gap-3 transition-all duration-600 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:bg-[rgba(26,107,90,0.04)]"
                  style={{
                    background: "rgba(255,255,255,0.01)",
                    boxShadow: "inset 0 1px 1px rgba(255,255,255,0.03)",
                  }}
                >
                  <span className="text-white/35 group-hover:text-[#1A6B5A] transition-colors duration-400 flex-shrink-0">
                    {sector.icon}
                  </span>
                  <div className="flex flex-col gap-1.5">
                    <span className="text-[14px] font-medium text-white/70 group-hover:text-white/90 transition-colors duration-400 leading-snug">
                      {sector.label}
                    </span>
                    <span className="text-[12px] text-white/30 group-hover:text-white/45 transition-colors duration-400 leading-relaxed">
                      {sector.description}
                    </span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.5, ease: [0.32, 0.72, 0, 1] }}
          className="mt-12 text-center max-w-2xl mx-auto"
        >
          <p className="text-[14px] text-white/30 leading-relaxed">
            ¿Tu sector no está aquí? Si tienes un negocio real con clientes reales, trabajamos contigo.{" "}
            <span className="text-white/45">
              ProjectCore se adapta a cualquier empresa que quiera crecer con tecnología.
            </span>
          </p>
        </motion.div>
      </div>
    </section>
  );
}
