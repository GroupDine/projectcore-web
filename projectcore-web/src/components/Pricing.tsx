"use client";

import { motion } from "framer-motion";

interface PricingProps {
  onOpenModal: () => void;
}

const rows = [
  {
    service: "Web Profesional",
    setup: "Desde 797€",
    monthly: "Desde 79€",
    includes: "Diseño, SEO, hosting",
  },
  {
    service: "Web + Automatización",
    setup: "Desde 1.597€",
    monthly: "Desde 197€",
    includes: "Web + captación automática",
  },
  {
    service: "Automatizaciones IA",
    setup: "Desde 799€",
    monthly: "Desde 147€",
    includes: "Sistemas, soporte",
  },
  {
    service: "Software a medida",
    setup: "Desde 2.497€",
    monthly: "Consultar",
    includes: "App o plataforma",
  },
  {
    service: "Marketing Digital",
    setup: "—",
    monthly: "Desde 397€",
    includes: "SEO, campañas, contenido",
  },
];

export default function Pricing({ onOpenModal }: PricingProps) {
  return (
    <section id="precios" className="py-24" style={{ backgroundColor: "#0A0F1C" }}>
      <div className="max-w-5xl mx-auto px-6 lg:px-8">
        {/* Encabezado */}
        <div className="text-center mb-12">
          <motion.h2
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl font-bold text-white mb-4"
          >
            Precios transparentes, sin sorpresas
          </motion.h2>
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            style={{ color: "#9CA3AF" }}
          >
            Elige el servicio que necesitas. Puedes combinarlos en cualquier momento.
          </motion.p>
        </div>

        {/* Tabla */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="rounded-[12px] border overflow-hidden overflow-x-auto"
          style={{ borderColor: "#1F2937" }}
        >
          <table className="w-full min-w-[560px]">
            <thead>
              <tr
                style={{
                  backgroundColor: "#111827",
                  borderBottom: "1px solid #1F2937",
                }}
              >
                {["SERVICIO", "SETUP", "MENSUAL", "INCLUYE"].map((h) => (
                  <th
                    key={h}
                    className="text-left px-6 py-4 text-xs font-semibold tracking-wider"
                    style={{ color: "#6B7280" }}
                  >
                    {h}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {rows.map((row, i) => (
                <tr
                  key={i}
                  className="transition-colors duration-150"
                  style={{
                    borderBottom:
                      i < rows.length - 1 ? "1px solid #1F2937" : "none",
                    backgroundColor: "#0D1421",
                  }}
                  onMouseEnter={(e) =>
                    (e.currentTarget.style.backgroundColor = "#111827")
                  }
                  onMouseLeave={(e) =>
                    (e.currentTarget.style.backgroundColor = "#0D1421")
                  }
                >
                  <td className="px-6 py-4 font-semibold text-white text-sm">
                    {row.service}
                  </td>
                  <td
                    className="px-6 py-4 text-sm font-medium"
                    style={{ color: "#E5E7EB" }}
                  >
                    {row.setup}
                  </td>
                  <td
                    className="px-6 py-4 text-sm"
                    style={{ color: "#9CA3AF" }}
                  >
                    {row.monthly}
                  </td>
                  <td
                    className="px-6 py-4 text-sm"
                    style={{ color: "#9CA3AF" }}
                  >
                    {row.includes}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </motion.div>

        {/* Nota al pie */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.25 }}
          className="mt-8 text-center"
        >
          <p className="text-sm mb-4" style={{ color: "#6B7280" }}>
            Todos los precios son orientativos. El diagnóstico gratuito define
            el precio exacto de tu proyecto.
          </p>
          <button
            onClick={onOpenModal}
            className="text-sm font-semibold transition-colors duration-200 cursor-pointer bg-transparent border-none"
            style={{ color: "#1A6B5A" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "#22856F")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "#1A6B5A")
            }
          >
            ¿No sabes cuál elegir? Hablamos gratis →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
