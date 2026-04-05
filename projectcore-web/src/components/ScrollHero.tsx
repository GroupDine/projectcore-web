"use client";

import { useEffect, useRef, useState } from "react";

interface ScrollHeroProps {
  onOpenModal: () => void;
}

export default function ScrollHero({ onOpenModal }: ScrollHeroProps) {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [loaded, setLoaded] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    const onCanPlay = () => {
      setLoaded(true);
      setTimeout(() => setTextVisible(true), 300);
    };

    video.addEventListener("canplay", onCanPlay);
    // Si ya está listo (caché)
    if (video.readyState >= 3) onCanPlay();

    return () => video.removeEventListener("canplay", onCanPlay);
  }, []);

  return (
    <div style={{ height: "100dvh", position: "relative", overflow: "hidden", backgroundColor: "#0A0F1C" }}>
      {/* Video de fondo */}
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.6s ease",
        }}
      >
        <source src="/heroCore.mp4" type="video/mp4" />
      </video>

      {/* Overlay de gradiente para legibilidad del texto */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(to bottom, rgba(10,15,28,0.35) 0%, rgba(10,15,28,0.0) 40%, rgba(10,15,28,0.55) 100%)",
        }}
      />

      {/* Orbe verde sutil (visible solo si el video no está cargado) */}
      {!loaded && (
        <div
          className="absolute rounded-full pointer-events-none"
          style={{
            width: "600px",
            height: "600px",
            top: "-100px",
            left: "-100px",
            background:
              "radial-gradient(circle, rgba(26,107,90,0.14) 0%, transparent 70%)",
            filter: "blur(40px)",
          }}
        />
      )}

      {/* Contenido de texto */}
      <div
        className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center"
        style={{ zIndex: 10 }}
      >
        {/* Eyebrow badge */}
        <div
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s cubic-bezier(0.32,0.72,0,1), transform 0.6s cubic-bezier(0.32,0.72,0,1)",
            transitionDelay: "0ms",
          }}
          className="inline-flex items-center mb-8"
        >
          <span
            className="rounded-full px-3 py-1 text-[11px] uppercase tracking-[0.18em] font-medium text-white/50"
            style={{
              border: "1px solid rgba(255,255,255,0.08)",
              background: "rgba(10,15,28,0.6)",
            }}
          >
            Agencia digital full-service · España
          </span>
        </div>

        {/* Headline */}
        <h1
          className="font-[var(--font-geist)] text-4xl md:text-6xl lg:text-7xl font-bold text-white leading-[1.08] tracking-tight mb-7 max-w-4xl"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(24px)",
            filter: textVisible ? "blur(0px)" : "blur(8px)",
            transition:
              "opacity 0.85s cubic-bezier(0.32,0.72,0,1), transform 0.85s cubic-bezier(0.32,0.72,0,1), filter 0.85s cubic-bezier(0.32,0.72,0,1)",
            transitionDelay: "100ms",
          }}
        >
          Tu negocio merece un{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #1A6B5A 0%, #22956F 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            sistema digital
          </span>
          <br className="hidden md:block" />
          {" "}que trabaje por ti
        </h1>

        {/* Subtítulo */}
        <p
          className="text-lg md:text-xl text-white/60 max-w-2xl mx-auto mb-12 leading-relaxed"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(20px)",
            transition:
              "opacity 0.75s cubic-bezier(0.32,0.72,0,1), transform 0.75s cubic-bezier(0.32,0.72,0,1)",
            transitionDelay: "220ms",
          }}
        >
          Web, automatizaciones e IA para pymes españolas.
          <br className="hidden sm:block" />
          En días, no meses.
        </p>

        {/* CTAs */}
        <div
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
          style={{
            opacity: textVisible ? 1 : 0,
            transform: textVisible ? "translateY(0)" : "translateY(16px)",
            transition:
              "opacity 0.7s cubic-bezier(0.32,0.72,0,1), transform 0.7s cubic-bezier(0.32,0.72,0,1)",
            transitionDelay: "340ms",
          }}
        >
          {/* CTA principal */}
          <button
            onClick={onOpenModal}
            className="group flex items-center gap-3 rounded-full bg-[#1A6B5A] px-7 py-3.5 text-[15px] font-semibold text-white transition-all duration-500 hover:bg-[#22856F] hover:scale-[1.03] active:scale-[0.97] cursor-pointer"
            style={{
              boxShadow:
                "0 0 0 1px rgba(26,107,90,0.4), 0 4px 24px rgba(26,107,90,0.3)",
              transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
            }}
          >
            <span>Quiero mi diagnóstico gratuito</span>
            <span className="flex h-7 w-7 items-center justify-center rounded-full bg-black/20 text-sm transition-all duration-500 group-hover:translate-x-0.5 group-hover:-translate-y-px group-hover:scale-110"
              style={{ transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)" }}
            >
              →
            </span>
          </button>

          {/* CTA secundario */}
          <button
            onClick={() => {
              document
                .querySelector("#servicios")
                ?.scrollIntoView({ behavior: "smooth" });
            }}
            className="flex items-center gap-2 rounded-full px-7 py-3.5 text-[15px] font-medium text-white/60 hover:text-white transition-all duration-400 cursor-pointer bg-transparent"
            style={{
              border: "1px solid rgba(255,255,255,0.1)",
              transitionTimingFunction: "cubic-bezier(0.32,0.72,0,1)",
            }}
          >
            Ver servicios
          </button>
        </div>

        {/* Trust line */}
        <p
          className="mt-6 text-[13px] text-white/30"
          style={{
            opacity: textVisible ? 1 : 0,
            transition: "opacity 0.7s ease",
            transitionDelay: "500ms",
          }}
        >
          Sin compromiso · Sin permanencia · Primera consulta gratuita
        </p>
      </div>

      {/* Indicador de scroll */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{
          zIndex: 10,
          opacity: textVisible ? 1 : 0,
          transition: "opacity 0.7s ease",
          transitionDelay: "700ms",
        }}
      >
        <span className="text-[11px] uppercase tracking-[0.2em] text-white/25">
          scroll
        </span>
        <div className="w-px h-8 bg-gradient-to-b from-white/20 to-transparent" />
      </div>
    </div>
  );
}
