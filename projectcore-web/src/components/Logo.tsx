"use client";

import { useState } from "react";

/* ─────────────────────────────────────────────────────────────
   COORDENADAS DEL HEXÁGONO (pointy-top, centro 24,24)

   R=22 → outer ring  (#1A6B5A)
   R=16 → middle ring (#22856F)
   R=10 → inner fill  (#0F4A3A)

   CUBO ISOMÉTRICO 2:1 (edge ≈ 6px, centrado en 24,24)
   Top face:  (24,18) (30,21) (24,24) (18,21)
   Left face: (18,21) (24,24) (24,30) (18,27)
   Right face:(24,24) (30,21) (30,27) (24,30)
───────────────────────────────────────────────────────────── */

interface HexCubeProps {
  hovered?: boolean;
}

function HexCube({ hovered = false }: HexCubeProps) {
  return (
    <>
      {/* Outer hexagon — rota en hover */}
      <polygon
        points="24,2 43.1,13 43.1,35 24,46 4.9,35 4.9,13"
        fill="#1A6B5A"
        style={{
          transformBox: "fill-box",
          transformOrigin: "center",
          transform: hovered ? "rotate(30deg)" : "rotate(0deg)",
          transition: "transform 400ms ease",
        }}
      />
      {/* Middle hexagon */}
      <polygon
        points="24,8 37.9,16 37.9,32 24,40 10.1,32 10.1,16"
        fill="#22856F"
      />
      {/* Inner hexagon */}
      <polygon
        points="24,14 32.7,19 32.7,29 24,34 15.3,29 15.3,19"
        fill="#0F4A3A"
      />
      {/* Cube — cara superior (más clara) */}
      <polygon
        points="24,18 30,21 24,24 18,21"
        fill="#3B82F6"
      />
      {/* Cube — cara izquierda (media) */}
      <polygon
        points="18,21 24,24 24,30 18,27"
        fill="#1D4ED8"
      />
      {/* Cube — cara derecha (más oscura) */}
      <polygon
        points="24,24 30,21 30,27 24,30"
        fill="#1E3A8A"
      />
    </>
  );
}

/* ── Solo icono: 48×48 ── */
interface LogoIconProps {
  size?: number;
  className?: string;
  animated?: boolean;
}

export function LogoIcon({ size = 40, className, animated = true }: LogoIconProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 48 48"
      width={size}
      height={size}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ProjectCore logo"
      role="img"
      onMouseEnter={() => animated && setHovered(true)}
      onMouseLeave={() => animated && setHovered(false)}
      style={{
        transform: hovered ? "scale(1.05)" : "scale(1)",
        transition: "transform 200ms ease",
        overflow: "visible",
        flexShrink: 0,
      }}
    >
      <HexCube hovered={hovered} />
    </svg>
  );
}

/* ── Logo completo: icono + texto ── */
interface LogoFullProps {
  className?: string;
  height?: number;
  opacity?: number;
}

export function LogoFull({ className, height = 36, opacity = 1 }: LogoFullProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <svg
      viewBox="0 0 196 48"
      height={height}
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      aria-label="ProjectCore"
      role="img"
      style={{
        overflow: "visible",
        opacity,
        transform: hovered ? "scale(1.02)" : "scale(1)",
        transition: "transform 200ms ease",
        transformOrigin: "left center",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Icono (ocupa 0–48) */}
      <HexCube hovered={hovered} />

      {/* Texto "ProjectCore" */}
      <text
        x="58"
        y="24"
        dominantBaseline="middle"
        fontFamily="Inter, system-ui, -apple-system, sans-serif"
        fontSize="20"
        fontWeight="700"
        fill="#FFFFFF"
        letterSpacing="0.4"
      >
        ProjectCore
      </text>
    </svg>
  );
}

/* ── Default export: versión compacta para footer ── */
export default function Logo() {
  return <LogoFull height={30} opacity={0.8} />;
}
