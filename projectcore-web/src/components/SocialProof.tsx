"use client";

import { motion } from "framer-motion";

const ROW_ONE = [
  { name: "n8n" },
  { name: "Make" },
  { name: "Zapier" },
  { name: "Claude AI" },
  { name: "OpenAI" },
  { name: "Supabase" },
];

const ROW_TWO = [
  { name: "Vercel" },
  { name: "Next.js" },
  { name: "Stripe" },
  { name: "Google Workspace" },
  { name: "WhatsApp Business" },
  { name: "Notion" },
];

function ToolBadge({ name }: { name: string }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center px-5 py-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-default"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
        e.currentTarget.style.color = "rgba(255,255,255,1)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
        e.currentTarget.style.color = "rgba(255,255,255,0.4)";
      }}
    >
      <span
        className="text-[13px] font-medium whitespace-nowrap transition-colors duration-500"
        style={{ color: "rgba(255,255,255,0.4)" }}
      >
        {name}
      </span>
    </div>
  );
}

export default function SocialProof() {
  return (
    <section
      className="py-20 px-6"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="text-center mb-10"
      >
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-medium">
          Construido con las mejores herramientas
        </p>
      </motion.div>

      <div className="max-w-5xl mx-auto flex flex-col gap-4">
        {/* Fila 1 — desktop: 6 items, mobile: scroll horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.05, ease: [0.32, 0.72, 0, 1] }}
          className="flex gap-3 overflow-x-auto pb-1 scrollbar-none md:justify-center"
        >
          {ROW_ONE.map((tool) => (
            <ToolBadge key={tool.name} name={tool.name} />
          ))}
        </motion.div>

        {/* Fila 2 — desktop: 6 items, mobile: scroll horizontal */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.65, delay: 0.12, ease: [0.32, 0.72, 0, 1] }}
          className="flex gap-3 overflow-x-auto pb-1 scrollbar-none md:justify-center"
        >
          {ROW_TWO.map((tool) => (
            <ToolBadge key={tool.name} name={tool.name} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
