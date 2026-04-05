"use client";

import { motion } from "framer-motion";

const TOOLS = [
  "n8n",
  "Make",
  "Zapier",
  "Claude AI",
  "OpenAI",
  "Supabase",
  "Vercel",
  "Next.js",
  "Stripe",
  "Google Workspace",
  "WhatsApp Business",
  "Notion",
  "Airtable",
  "Anthropic",
  "TypeScript",
  "Python",
  "PostgreSQL",
  "MongoDB",
];

function ToolBadge({ name }: { name: string }) {
  return (
    <div
      className="flex-shrink-0 flex items-center justify-center px-5 py-2.5 rounded-full transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] cursor-default hover:scale-105"
      style={{
        background: "rgba(255,255,255,0.03)",
        border: "1px solid rgba(255,255,255,0.07)",
      }}
      onMouseEnter={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.06)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.14)";
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.background = "rgba(255,255,255,0.03)";
        e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)";
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
      className="py-20 overflow-hidden"
      style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, ease: [0.32, 0.72, 0, 1] }}
        className="text-center mb-10 px-6"
      >
        <p className="text-[11px] uppercase tracking-[0.2em] text-white/25 font-medium">
          Construido con las mejores herramientas
        </p>
      </motion.div>

      {/* Carousel infinito */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8, delay: 0.1 }}
        className="relative"
      >
        {/* Gradient mask izquierda */}
        <div
          className="absolute inset-y-0 left-0 z-10 w-24 md:w-40 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0A0F1C, transparent)" }}
        />
        {/* Gradient mask derecha */}
        <div
          className="absolute inset-y-0 right-0 z-10 w-24 md:w-40 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0A0F1C, transparent)" }}
        />

        {/* Pista del carousel */}
        <div className="flex overflow-hidden">
          <div className="animate-marquee-left flex gap-3">
            {/* Primera pasada */}
            {TOOLS.map((name) => (
              <ToolBadge key={`a-${name}`} name={name} />
            ))}
            {/* Segunda pasada — necesaria para el loop seamless */}
            {TOOLS.map((name) => (
              <ToolBadge key={`b-${name}`} name={name} />
            ))}
          </div>
        </div>
      </motion.div>
    </section>
  );
}
