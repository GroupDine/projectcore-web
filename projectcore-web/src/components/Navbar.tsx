"use client";

import { useState, useEffect } from "react";
import { LogoFull, LogoIcon } from "@/components/Logo";

interface NavbarProps {
  onOpenModal: () => void;
}

const navLinks = [
  { label: "Servicios", href: "#servicios" },
  { label: "Precios", href: "#precios" },
  { label: "Cómo funciona", href: "#como-funciona" },
  { label: "Contacto", href: "#faq" },
];

export default function Navbar({ onOpenModal }: NavbarProps) {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Bloquear scroll del body cuando el menú está abierto
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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-[#0A0F1C]/90 backdrop-blur-md border-b border-[#1F2937]"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            {/* Logo */}
            <button
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="flex items-center bg-transparent border-none cursor-pointer p-0"
              aria-label="Ir al inicio"
            >
              {/* Desktop: logo completo */}
              <span className="hidden sm:block">
                <LogoFull height={34} />
              </span>
              {/* Móvil: solo icono */}
              <span className="block sm:hidden">
                <LogoIcon size={32} />
              </span>
            </button>

            {/* Nav links — desktop */}
            <nav className="hidden md:flex items-center gap-8">
              {navLinks.map((link) => (
                <button
                  key={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className="text-[#9CA3AF] hover:text-white text-sm font-medium transition-colors duration-200 cursor-pointer bg-transparent border-none"
                >
                  {link.label}
                </button>
              ))}
            </nav>

            {/* CTA desktop */}
            <button
              onClick={onOpenModal}
              className="hidden md:flex items-center gap-2 px-5 py-2.5 rounded-[8px] text-sm font-semibold text-white transition-all duration-200 cursor-pointer"
              style={{
                backgroundColor: "#1A6B5A",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#22856F")}
              onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A6B5A")}
            >
              Diagnóstico gratis →
            </button>

            {/* Hamburguesa móvil */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="md:hidden p-2 rounded-lg text-[#9CA3AF] hover:text-white hover:bg-[#1F2937] transition-colors"
              aria-label="Abrir menú"
            >
              {menuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Drawer móvil */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 md:hidden">
          <div
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={() => setMenuOpen(false)}
          />
          <div className="absolute top-0 right-0 h-full w-72 bg-[#0D1421] border-l border-[#1F2937] flex flex-col pt-20 px-6 gap-4">
            {navLinks.map((link) => (
              <button
                key={link.href}
                onClick={() => handleNavClick(link.href)}
                className="text-left text-white text-lg font-medium py-3 border-b border-[#1F2937] hover:text-[#1A6B5A] transition-colors cursor-pointer bg-transparent border-x-0"
              >
                {link.label}
              </button>
            ))}
            <button
              onClick={() => { setMenuOpen(false); onOpenModal(); }}
              className="mt-4 w-full px-5 py-3 rounded-[8px] text-sm font-semibold text-white transition-all duration-200"
              style={{ backgroundColor: "#1A6B5A" }}
            >
              Diagnóstico gratis →
            </button>
          </div>
        </div>
      )}
    </>
  );
}
