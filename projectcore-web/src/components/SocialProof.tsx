"use client";

import { motion } from "framer-motion";

const LOGOS = [
  { name: "n8n", svg: (
    <svg viewBox="0 0 60 24" fill="none" className="h-5 w-auto">
      <text x="0" y="18" fontFamily="var(--font-geist), sans-serif" fontSize="18" fontWeight="700" fill="currentColor">n8n</text>
    </svg>
  )},
  { name: "Claude AI", svg: (
    <svg viewBox="0 0 100 24" fill="none" className="h-5 w-auto">
      <text x="0" y="18" fontFamily="var(--font-geist), sans-serif" fontSize="15" fontWeight="600" fill="currentColor">Claude AI</text>
    </svg>
  )},
  { name: "Supabase", svg: (
    <svg viewBox="0 0 90 24" fill="none" className="h-5 w-auto">
      <text x="0" y="18" fontFamily="var(--font-geist), sans-serif" fontSize="15" fontWeight="600" fill="currentColor">Supabase</text>
    </svg>
  )},
  { name: "Vercel", svg: (
    <svg viewBox="0 0 70 24" fill="none" className="h-5 w-auto">
      <text x="0" y="18" fontFamily="var(--font-geist), sans-serif" fontSize="15" fontWeight="600" fill="currentColor">Vercel</text>
    </svg>
  )},
  { name: "Next.js", svg: (
    <svg viewBox="0 0 75 24" fill="none" className="h-5 w-auto">
      <text x="0" y="18" fontFamily="var(--font-geist), sans-serif" fontSize="15" fontWeight="600" fill="currentColor">Next.js</text>
    </svg>
  )},
  { name: "Stripe", svg: (
    <svg viewBox="0 0 60 24" fill="none" className="h-5 w-auto">
      <text x="0" y="18" fontFamily="var(--font-geist), sans-serif" fontSize="15" fontWeight="600" fill="currentColor">Stripe</text>
    </svg>
  )},
];

// Duplicate for seamless marquee
const LOGOS_DOUBLED = [...LOGOS, ...LOGOS];

export default function SocialProof() {
  return (
    <section className="py-20 overflow-hidden" style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
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

      {/* Marquee container with fade masks */}
      <div className="relative">
        <div
          className="absolute left-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to right, #0A0F1C, transparent)" }}
        />
        <div
          className="absolute right-0 top-0 bottom-0 w-24 z-10 pointer-events-none"
          style={{ background: "linear-gradient(to left, #0A0F1C, transparent)" }}
        />

        <div className="overflow-hidden">
          <div className="animate-marquee-left flex items-center gap-14">
            {LOGOS_DOUBLED.map((logo, i) => (
              <div
                key={`${logo.name}-${i}`}
                className="flex items-center text-white/30 hover:text-white/70 transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] whitespace-nowrap flex-shrink-0"
              >
                {logo.svg}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
