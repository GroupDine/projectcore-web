"use client";

import { useState, useEffect, useRef } from "react";
import Navbar from "@/components/Navbar";
import ScrollHero from "@/components/ScrollHero";
import SocialProof from "@/components/SocialProof";
import Problem from "@/components/Problem";
import Services from "@/components/Services";
import HowItWorks from "@/components/HowItWorks";
import ForWhom from "@/components/ForWhom";
import LeadMagnet from "@/components/LeadMagnet";
import ChatCore from "@/components/ChatCore";
import CTAFinal from "@/components/CTAFinal";
import Footer from "@/components/Footer";
import DiagnosticModal from "@/components/DiagnosticModal";

const SUGGESTED_PROMPTS = [
  "¿Cuánto cuesta una web profesional?",
  "¿En cuánto tiempo entregas?",
  "¿Qué automatizaciones puedo tener?",
  "Quiero agendar una consulta gratuita",
];

export default function Home() {
  const [modalOpen, setModalOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const chatSectionRef = useRef<HTMLDivElement>(null);

  const openModal = () => setModalOpen(true);
  const closeModal = () => setModalOpen(false);

  // Animaciones de aparición por scroll
  useEffect(() => {
    const targets = chatSectionRef.current?.querySelectorAll("[data-animate]");
    if (!targets) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const el = entry.target as HTMLElement;
            const delay = el.dataset.delay ?? "0";
            setTimeout(() => {
              el.style.opacity = "1";
              el.style.filter = "blur(0px)";
              el.style.transform = "translateY(0)";
            }, Number(delay));
            observer.unobserve(el);
          }
        });
      },
      { threshold: 0.15 }
    );

    targets.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <main style={{ backgroundColor: "#0A0F1C" }}>
      <Navbar onOpenModal={openModal} />
      <ScrollHero onOpenModal={openModal} />
      <SocialProof />

      {/* Sección Chatbot Core */}
      <section
        ref={chatSectionRef}
        className="py-28 md:py-36 px-6"
        style={{ background: "linear-gradient(180deg, #0A0F1C 0%, #0D1117 50%, #0A0F1C 100%)" }}
      >
        <div className="max-w-3xl mx-auto">
          {/* Badge superior */}
          <div
            className="text-center mb-5"
            data-animate
            data-delay="0"
            style={{ opacity: 0, transform: "translateY(16px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
          >
            <span
              className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] font-medium"
              style={{ color: "#1A6B5A", border: "1px solid rgba(26,107,90,0.25)", background: "rgba(26,107,90,0.08)" }}
            >
              Asistente IA
            </span>
          </div>

          {/* Header con icono animado */}
          <div
            className="flex flex-col items-center gap-5 mb-12"
            data-animate
            data-delay="100"
            style={{ opacity: 0, filter: "blur(8px)", transform: "translateY(20px)", transition: "opacity 0.85s ease, filter 0.85s ease, transform 0.85s ease" }}
          >
            <div className="relative w-16 h-16">
              <div
                className="absolute inset-0 rounded-full animate-ping"
                style={{ background: "radial-gradient(circle, rgba(26,107,90,0.3) 0%, transparent 70%)", animationDuration: "2.5s" }}
              />
              <div
                className="absolute inset-1 rounded-full animate-pulse"
                style={{ background: "radial-gradient(circle, rgba(108,99,255,0.2) 0%, transparent 70%)", animationDuration: "2s" }}
              />
              <div
                className="absolute inset-2 rounded-full flex items-center justify-center"
                style={{ background: "linear-gradient(135deg, #1A6B5A 0%, #6C63FF 100%)", boxShadow: "0 0 24px rgba(26,107,90,0.5), 0 0 48px rgba(108,99,255,0.2)" }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z" />
                  <path d="M8 12h8M12 8v8" />
                </svg>
              </div>
            </div>

            <div className="text-center">
              <h2 className="font-[var(--font-geist)] text-3xl md:text-4xl font-bold text-white tracking-tight">
                Hola, soy Core
              </h2>
              <p className="text-[15px] text-white/45 mt-2">¿En qué puedo ayudarte?</p>
            </div>
          </div>

          {/* Contenedor del chatbot */}
          <div
            data-animate
            data-delay="200"
            style={{ opacity: 0, transform: "translateY(24px)", transition: "opacity 0.75s ease, transform 0.75s ease" }}
          >
            <div
              className="p-px rounded-[2rem]"
              style={{ background: "rgba(26,107,90,0.1)", border: "1px solid rgba(26,107,90,0.15)", boxShadow: "0 0 60px rgba(26,107,90,0.06)" }}
            >
              <div
                className="rounded-[calc(2rem-1px)] overflow-hidden"
                style={{ background: "#0A0F1C", boxShadow: "inset 0 1px 1px rgba(255,255,255,0.04)" }}
              >
                <ChatCore externalInput={chatInput} onExternalInputConsumed={() => setChatInput("")} />
              </div>
            </div>

            {/* Suggested prompts */}
            <div
              className="flex flex-wrap justify-center gap-2.5 mt-5"
              data-animate
              data-delay="350"
              style={{ opacity: 0, transform: "translateY(10px)", transition: "opacity 0.6s ease, transform 0.6s ease" }}
            >
              {SUGGESTED_PROMPTS.map((prompt) => (
                <button
                  key={prompt}
                  onClick={() => setChatInput(prompt)}
                  className="rounded-full px-4 py-2 text-[13px] text-white/55 hover:text-white/90 transition-all duration-300 cursor-pointer"
                  style={{ border: "1px solid rgba(26,107,90,0.25)", background: "rgba(26,107,90,0.06)" }}
                >
                  {prompt}
                </button>
              ))}
            </div>
          </div>
        </div>
      </section>

      <Problem />
      <Services onOpenModal={openModal} />
      <HowItWorks onOpenModal={openModal} />
      <ForWhom />
      <LeadMagnet />
      <CTAFinal onOpenModal={openModal} />
      <Footer />
      <DiagnosticModal isOpen={modalOpen} onClose={closeModal} />
    </main>
  );
}
