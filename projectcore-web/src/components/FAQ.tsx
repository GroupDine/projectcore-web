"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const faqs = [
  {
    q: "¿Tengo que contratar todos los servicios a la vez?",
    a: "No. Cada servicio es independiente. Puedes empezar solo con la web y añadir automatizaciones más adelante cuando lo necesites.",
  },
  {
    q: "¿Cuánto tarda cada proyecto?",
    a: "Una web profesional está lista en 5-7 días. Las automatizaciones tardan entre 3 y 10 días según complejidad. El software a medida se entrega por fases acordadas.",
  },
  {
    q: "¿Hay contrato de permanencia?",
    a: "No. Los proyectos de setup (web, software) son pagos únicos. Los servicios de mantenimiento o marketing son mensuales y puedes cancelar cuando quieras.",
  },
  {
    q: "¿Qué pasa si quiero añadir más adelante?",
    a: "Perfecto. Diseñamos todo para que sea escalable. Puedes empezar con la web y añadir el agente de WhatsApp o el marketing digital cuando estés listo.",
  },
  {
    q: "¿Necesito conocimientos técnicos?",
    a: "Ninguno. Nos encargamos de todo. Te entregamos el resultado funcionando y te explicamos cómo usarlo en 30 minutos.",
  },
  {
    q: "¿Trabajáis con cualquier tipo de negocio?",
    a: "Sí. Trabajamos con despachos, restaurantes, clínicas, comercios, autónomos y cualquier negocio que quiera crecer con tecnología.",
  },
];

function FAQItem({ q, a }: { q: string; a: string }) {
  const [open, setOpen] = useState(false);

  return (
    <div
      className="border-b cursor-pointer"
      style={{ borderColor: "#1F2937" }}
      onClick={() => setOpen(!open)}
    >
      <button
        className="w-full flex items-center justify-between py-5 text-left gap-4 bg-transparent border-none cursor-pointer"
        aria-expanded={open}
      >
        <span className="text-base font-semibold text-white">{q}</span>
        <svg
          className="shrink-0 w-5 h-5 transition-transform duration-200"
          style={{
            color: "#1A6B5A",
            transform: open ? "rotate(180deg)" : "rotate(0deg)",
          }}
          fill="none"
          viewBox="0 0 24 24"
        >
          <path
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M19 9l-7 7-7-7"
          />
        </svg>
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <p className="pb-5 text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
              {a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function FAQ() {
  return (
    <section id="faq" className="py-24" style={{ backgroundColor: "#0D1421" }}>
      <div className="max-w-3xl mx-auto px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white"
          >
            Preguntas frecuentes
          </motion.h2>
        </div>

        {/* Acordeón */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="border-t"
          style={{ borderColor: "#1F2937" }}
        >
          {faqs.map((faq, i) => (
            <FAQItem key={i} q={faq.q} a={faq.a} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
