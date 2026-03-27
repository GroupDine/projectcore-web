"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface NavbarProps {
  onOpenModal: () => void;
}

const NAV_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Para quién", href: "#para-quien" },
];

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const handleNavClick = (href: string) => {
    setMenuOpen(false);
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Floating Island Nav */}
      <motion.nav
        className="fixed top-5 left-0 right-0 z-40 flex justify-center px-4"
        initial={{ opacity: 0, y: -16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7, ease: [0.32, 0.72, 0, 1] }}
      >
        <div
          className="flex items-center gap-4 md:gap-6 rounded-full px-5 py-2.5 transition-all duration-700"
          style={{
            background: scrolled ? "rgba(10,15,28,0.92)" : "rgba(10,15,28,0.55)",
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            border: "1px solid rgba(255,255,255,0.07)",
            boxShadow: scrolled
              ? "0 8px 32px rgba(0,0,0,0.5), inset 0 1px 0 rgba(255,255,255,0.06)"
              : "inset 0 1px 0 rgba(255,255,255,0.04)",
          }}
        >
          {/* Logo */}
          <button
            onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
            className="font-[var(--font-geist)] text-sm font-bold text-white tracking-tight whitespace-nowrap cursor-pointer bg-transparent border-none"
          >
            ProjectCore
          </button>

          {/* Separator */}
          <div className="hidden md:block w-px h-4 bg-white/10" />

          {/* Links — desktop */}
          <div className="hidden md:flex items-center gap-5">
            {NAV_LINKS.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-[13px] text-white/55 hover:text-white/90 transition-colors duration-300 cursor-pointer bg-transparent border-none whitespace-nowrap"
              >
                {link.label}
              </button>
            ))}
          </div>

          {/* CTA — desktop */}
          <button
            onClick={onOpenModal}
            className="hidden md:flex items-center gap-2 rounded-full bg-[#1A6B5A] px-4 py-2 text-[13px] font-medium text-white group transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)] hover:bg-[#22856F] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
          >
            <span>Hablar con nosotros</span>
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-black/20 text-[11px] transition-transform duration-400 ease-[cubic-bezier(0.32,0.72,0,1)] group-hover:translate-x-0.5 group-hover:-translate-y-px">
              →
            </span>
          </button>

          {/* Hamburger — mobile */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="md:hidden flex flex-col gap-[5px] justify-center items-center w-7 h-7 cursor-pointer bg-transparent border-none"
            aria-label="Menú"
          >
            <span
              className="block h-px bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                width: menuOpen ? "20px" : "20px",
                transform: menuOpen ? "translateY(6px) rotate(45deg)" : "none",
              }}
            />
            <span
              className="block h-px bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                width: menuOpen ? "20px" : "14px",
                opacity: menuOpen ? 0 : 1,
              }}
            />
            <span
              className="block h-px bg-white transition-all duration-500 ease-[cubic-bezier(0.32,0.72,0,1)]"
              style={{
                width: "20px",
                transform: menuOpen ? "translateY(-6px) rotate(-45deg)" : "none",
              }}
            />
          </button>
        </div>
      </motion.nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-30 flex flex-col items-center justify-center md:hidden"
            style={{
              background: "rgba(10,15,28,0.97)",
              backdropFilter: "blur(40px)",
              WebkitBackdropFilter: "blur(40px)",
            }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: [0.32, 0.72, 0, 1] }}
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="font-[var(--font-geist)] text-3xl font-semibold text-white cursor-pointer bg-transparent border-none"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 10 }}
                  transition={{
                    duration: 0.5,
                    delay: 0.06 * i,
                    ease: [0.32, 0.72, 0, 1],
                  }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={() => { setMenuOpen(false); onOpenModal(); }}
                className="mt-2 rounded-full bg-[#1A6B5A] px-8 py-4 text-base font-medium text-white cursor-pointer"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2, ease: [0.32, 0.72, 0, 1] }}
              >
                Diagnóstico gratuito
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
