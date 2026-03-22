"use client";

import { motion } from "framer-motion";
import { Globe, Zap, Workflow, Code2, TrendingUp } from "lucide-react";

interface ServicesProps {
  onOpenModal: () => void;
}

const services = [
  {
    Icon: Globe,
    name: "Web Profesional",
    description: "Tu presencia online lista en 5-7 días, diseñada para convertir visitantes en clientes.",
    includes: [
      "Diseño moderno y responsive",
      "SEO básico incluido",
      "Dominio y hosting configurado",
    ],
    price: "Desde 797€",
    monthly: "Desde 79€/mes mantenimiento",
    popular: false,
  },
  {
    Icon: Zap,
    name: "Web + Automatización",
    description: "Web completa con un sistema automático de captación de leads activo 24/7.",
    includes: [
      "Todo lo de Web Profesional",
      "Agente de captación automática de leads",
      "CRM básico configurado",
    ],
    price: "Desde 1.597€",
    monthly: "Desde 197€/mes mantenimiento",
    popular: true,
  },
  {
    Icon: Workflow,
    name: "Automatizaciones IA",
    description: "Flujos inteligentes que eliminan tareas repetitivas y trabajan mientras tú descansas.",
    includes: [
      "Diagnóstico de procesos automatizables",
      "Sistemas inteligentes a medida para tu negocio",
      "Mantenimiento, soporte y mejora continua",
    ],
    price: "Desde 799€",
    monthly: "Desde 147€/mes",
    popular: false,
  },
  {
    Icon: Code2,
    name: "Software a Medida",
    description: "Herramientas, apps o plataformas construidas exactamente para cómo funciona tu negocio.",
    includes: [
      "Análisis y prototipo previo",
      "Desarrollo con stack moderno",
      "Entrega iterativa por fases",
    ],
    price: "Desde 2.497€",
    monthly: null,
    popular: false,
  },
  {
    Icon: TrendingUp,
    name: "Marketing Digital",
    description: "Visibilidad, contenido y campañas que atraen clientes reales de forma constante.",
    includes: [
      "SEO + contenido optimizado",
      "Gestión de redes y campañas",
      "Reporting mensual de resultados",
    ],
    price: "Desde 397€/mes",
    monthly: null,
    popular: false,
  },
];

function ServiceCard({
  s,
  onOpenModal,
}: {
  s: (typeof services)[0];
  onOpenModal: () => void;
}) {
  const { Icon } = s;

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4 }}
      className="relative flex flex-col rounded-[12px] p-6 transition-all duration-200 cursor-default"
      style={{
        backgroundColor: "#111827",
        border: s.popular ? "1px solid #1A6B5A" : "1px solid #1F2937",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)";
        (e.currentTarget as HTMLElement).style.boxShadow =
          "0 8px 32px rgba(26,107,90,0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
        (e.currentTarget as HTMLElement).style.boxShadow = "none";
      }}
    >
      {/* Badge popular */}
      {s.popular && (
        <div
          className="absolute -top-3 left-6 px-3 py-1 rounded-full text-xs font-semibold text-white"
          style={{ backgroundColor: "#6C63FF" }}
        >
          MÁS POPULAR
        </div>
      )}

      {/* Icono circular */}
      <div
        className="w-16 h-16 rounded-full flex items-center justify-center mb-5"
        style={{ backgroundColor: "#1A2E27" }}
      >
        <Icon size={28} color="#1A6B5A" strokeWidth={1.75} />
      </div>

      {/* Nombre */}
      <h3 className="text-lg font-bold text-white mb-2">{s.name}</h3>

      {/* Descripción */}
      <p className="text-sm mb-4 leading-relaxed" style={{ color: "#9CA3AF" }}>
        {s.description}
      </p>

      {/* Bullets */}
      <ul className="flex flex-col gap-2 mb-5 flex-1">
        {s.includes.map((item, i) => (
          <li key={i} className="flex items-start gap-2 text-sm text-white">
            <span className="mt-0.5 shrink-0" style={{ color: "#1A6B5A" }}>
              ✓
            </span>
            <span>{item}</span>
          </li>
        ))}
      </ul>

      {/* Separador */}
      <div className="border-t my-4" style={{ borderColor: "#1F2937" }} />

      {/* Precio */}
      <div className="mb-5">
        <span className="text-xs mb-1 block" style={{ color: "#6B7280" }}>
          Precio
        </span>
        <span className="text-xl font-bold text-white">{s.price}</span>
        {s.monthly && (
          <span className="block text-xs mt-1" style={{ color: "#6B7280" }}>
            + {s.monthly}
          </span>
        )}
      </div>

      {/* Botón */}
      <button
        onClick={onOpenModal}
        className="w-full px-4 py-2.5 rounded-[8px] text-sm font-semibold border transition-all duration-200 cursor-pointer"
        style={{
          borderColor: "#1A6B5A",
          color: "#1A6B5A",
          backgroundColor: "transparent",
        }}
        onMouseEnter={(e) => {
          e.currentTarget.style.backgroundColor = "#1A6B5A";
          e.currentTarget.style.color = "#FFFFFF";
        }}
        onMouseLeave={(e) => {
          e.currentTarget.style.backgroundColor = "transparent";
          e.currentTarget.style.color = "#1A6B5A";
        }}
      >
        Empezar →
      </button>
    </motion.div>
  );
}

export default function Services({ onOpenModal }: ServicesProps) {
  const topThree = services.slice(0, 3);
  const bottomTwo = services.slice(3);

  return (
    <section id="servicios" className="py-24" style={{ backgroundColor: "#0A0F1C" }}>
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-16">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            ¿Qué necesita tu negocio?
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ color: "#9CA3AF" }}
          >
            Elige uno o combínalos. Sin paquetes obligatorios.
          </motion.p>
        </div>

        {/* Grid 3 arriba */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
          {topThree.map((s) => (
            <ServiceCard key={s.name} s={s} onOpenModal={onOpenModal} />
          ))}
        </div>

        {/* Grid 2 abajo centrados */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:max-w-4xl lg:mx-auto">
          {bottomTwo.map((s) => (
            <ServiceCard key={s.name} s={s} onOpenModal={onOpenModal} />
          ))}
        </div>
      </div>
    </section>
  );
}
