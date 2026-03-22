"use client";

import { motion } from "framer-motion";

const metrics = [
  {
    value: "5-7 días",
    description: "Para tener tu web profesional lista y en producción",
  },
  {
    value: "−80%",
    description: "Tiempo en tareas repetitivas con automatización IA",
  },
  {
    value: "+40%",
    description: "Leads captados con agente de WhatsApp activo 24/7",
  },
];

export default function Metrics() {
  return (
    <section
      id="resultados"
      className="py-20 border-y"
      style={{ backgroundColor: "#0D1421", borderColor: "#1F2937" }}
    >
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4">
          {metrics.map((m, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.1 }}
              className="text-center px-4"
            >
              <div
                className="text-4xl md:text-5xl font-bold mb-3"
                style={{ color: "#1A6B5A" }}
              >
                {m.value}
              </div>
              <p className="text-sm leading-relaxed" style={{ color: "#9CA3AF" }}>
                {m.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
