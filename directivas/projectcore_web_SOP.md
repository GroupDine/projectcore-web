# SOP: ProjectCore Web — Agencia Digital Full-Service

## Objetivo
Construir sitio web profesional para ProjectCore, inspirado en clay.com.
Stack: Next.js 15 (App Router) + TypeScript + Tailwind CSS + Framer Motion.

## Paleta de Colores
- Fondo principal: `#0A0F1C`
- Fondo secundario: `#0D1421`
- Fondo cards: `#111827` con borde `#1F2937`
- Texto principal: `#FFFFFF`
- Texto secundario: `#9CA3AF`
- Acento primario: `#1A6B5A` (verde)
- Acento hover: `#22856F`
- Acento morado: `#6C63FF`

## Estructura de Archivos
```
src/
  app/
    layout.tsx          — RootLayout con metadata SEO
    page.tsx            — Página principal
    globals.css         — Estilos globales, scroll suave
  components/
    Navbar.tsx
    Hero.tsx
    SocialProof.tsx
    Services.tsx
    VideoDemo.tsx
    HowItWorks.tsx
    Metrics.tsx
    Pricing.tsx
    FAQ.tsx
    CTAFinal.tsx
    Footer.tsx
    DiagnosticModal.tsx
```

## Secciones (orden)
1. Navbar fija con blur
2. Hero con headline + CTA
3. Social Proof (logos tecnologías)
4. Servicios (5 cards)
5. Vídeo Demo
6. Cómo funciona (3 pasos)
7. Métricas
8. Precios comparativos
9. FAQ acordeón
10. CTA Final
11. Footer

## Restricciones / Casos Borde
- Framer Motion: usar `"use client"` en todos los componentes con animaciones
- Next.js 15: metadata en layout.tsx con el nuevo formato (no Head)
- Tailwind: configurar colores custom en tailwind.config.ts
- Mobile-first: menú hamburguesa con estado React (useState)
- Modal: usar portal o conditional render con z-index alto
- logos de tecnologías: usar SVGs inline o de Simple Icons CDN
- Sin errores de hidratación: evitar window en SSR

## Precios
- Web Profesional: 800€ setup + 80€/mes
- Web + Automatización: 1.800€ + 200€/mes
- Automatizaciones IA: 600€+ + 150€+/mes
- Software a medida: 2.500€+
- Marketing Digital: 400€+/mes
