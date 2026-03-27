"use client";

import { useEffect, useRef, useState, useCallback } from "react";

const TOTAL_FRAMES = 151;
const PRELOAD_IMMEDIATE = 15;

function frameUrl(n: number): string {
  const padded = String(n).padStart(4, "0");
  return `/frames/frame_${padded}.jpg`;
}

interface ScrollHeroProps {
  onOpenModal: () => void;
}

export default function ScrollHero({ onOpenModal }: ScrollHeroProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const rafRef = useRef<number | null>(null);
  const lastFrameRef = useRef<number>(-1);
  const [loaded, setLoaded] = useState(false);
  const [textVisible, setTextVisible] = useState(false);

  // Dibuja un frame en el canvas
  const drawFrame = useCallback((index: number) => {
    const img = imagesRef.current[index];
    const canvas = canvasRef.current;
    if (!canvas || !img || !img.complete || img.naturalWidth === 0) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Mantener ratio de aspecto cubriendo el canvas (object-fit: cover)
    const cw = canvas.width;
    const ch = canvas.height;
    const iw = img.naturalWidth;
    const ih = img.naturalHeight;
    const scale = Math.max(cw / iw, ch / ih);
    const sw = iw * scale;
    const sh = ih * scale;
    const sx = (cw - sw) / 2;
    const sy = (ch - sh) / 2;

    ctx.clearRect(0, 0, cw, ch);
    ctx.drawImage(img, sx, sy, sw, sh);
  }, []);

  // Actualiza el canvas basado en el progreso del scroll
  const updateFrame = useCallback(() => {
    const section = sectionRef.current;
    if (!section) return;

    const rect = section.getBoundingClientRect();
    const scrollableHeight = section.offsetHeight - window.innerHeight;
    const scrolled = Math.max(0, -rect.top);
    const progress = Math.min(1, scrolled / scrollableHeight);
    const frameIndex = Math.min(
      TOTAL_FRAMES - 1,
      Math.floor(progress * (TOTAL_FRAMES - 1))
    );

    if (frameIndex !== lastFrameRef.current) {
      lastFrameRef.current = frameIndex;
      drawFrame(frameIndex);
    }
  }, [drawFrame]);

  // Ajusta resolución del canvas al viewport
  const resizeCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    // Redibuja el frame actual tras resize
    if (lastFrameRef.current >= 0) {
      drawFrame(lastFrameRef.current);
    }
  }, [drawFrame]);

  // Precargar frames
  useEffect(() => {
    const images: HTMLImageElement[] = new Array(TOTAL_FRAMES);
    let immediateLoaded = 0;

    const loadFrame = (i: number, priority: boolean) => {
      const img = new Image();
      img.src = frameUrl(i + 1);
      images[i] = img;

      if (priority) {
        img.onload = () => {
          immediateLoaded++;
          if (i === 0) {
            imagesRef.current = images;
            drawFrame(0);
            lastFrameRef.current = 0;
            setLoaded(true);
            // Mostrar texto con delay
            setTimeout(() => setTextVisible(true), 300);
          }
          if (immediateLoaded === PRELOAD_IMMEDIATE) {
            // Cargar el resto en background
            for (let j = PRELOAD_IMMEDIATE; j < TOTAL_FRAMES; j++) {
              loadFrame(j, false);
            }
          }
        };
      }
      return img;
    };

    // Precargar primeros N frames con prioridad
    for (let i = 0; i < PRELOAD_IMMEDIATE; i++) {
      loadFrame(i, true);
    }

    imagesRef.current = images;
  }, [drawFrame]);

  // Scroll listener con rAF
  useEffect(() => {
    const onScroll = () => {
      if (rafRef.current !== null) return;
      rafRef.current = requestAnimationFrame(() => {
        updateFrame();
        rafRef.current = null;
      });
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      if (rafRef.current !== null) cancelAnimationFrame(rafRef.current);
    };
  }, [updateFrame]);

  // Resize listener
  useEffect(() => {
    resizeCanvas();
    window.addEventListener("resize", resizeCanvas, { passive: true });
    return () => window.removeEventListener("resize", resizeCanvas);
  }, [resizeCanvas]);

  return (
    /* 300vh para que el scroll tenga recorrido completo */
    <div ref={sectionRef} style={{ height: "300vh" }}>
      {/* Panel sticky que ocupa la pantalla */}
      <div
        className="sticky top-0 overflow-hidden"
        style={{ height: "100dvh", backgroundColor: "#0A0F1C" }}
      >
        {/* Canvas de frames */}
        <canvas
          ref={canvasRef}
          className="absolute inset-0"
          style={{
            width: "100%",
            height: "100%",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.6s ease",
            willChange: "opacity",
          }}
        />

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
    </div>
  );
}
