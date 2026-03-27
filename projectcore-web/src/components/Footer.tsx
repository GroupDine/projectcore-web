const FOOTER_LINKS = [
  { label: "Servicios", href: "#servicios" },
  { label: "Política de privacidad", href: "#" },
  { label: "Contacto", href: "#como-funciona" },
];

export default function Footer() {
  const handleClick = (href: string) => {
    if (href === "#") return;
    const el = document.querySelector(href);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <footer
      className="px-6 py-14"
      style={{
        backgroundColor: "#060B14",
        borderTop: "1px solid rgba(255,255,255,0.05)",
      }}
    >
      <div className="max-w-6xl mx-auto">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
          {/* Brand */}
          <div className="flex flex-col gap-2">
            <span className="font-[var(--font-geist)] text-base font-bold text-white tracking-tight">
              ProjectCore
            </span>
            <p className="text-[13px] text-white/30 max-w-xs leading-relaxed">
              Tu negocio merece un sistema digital que trabaje por ti.
            </p>
          </div>

          {/* Links */}
          <nav className="flex flex-wrap items-center gap-x-6 gap-y-3">
            {FOOTER_LINKS.map((link) => (
              <button
                key={link.label}
                onClick={() => handleClick(link.href)}
                className="text-[13px] text-white/35 hover:text-white/65 transition-colors duration-300 cursor-pointer bg-transparent border-none"
              >
                {link.label}
              </button>
            ))}
          </nav>

          {/* Email */}
          <a
            href="mailto:hola@projectcore.io"
            className="text-[13px] text-white/35 hover:text-[#1A6B5A] transition-colors duration-300"
          >
            hola@projectcore.io
          </a>
        </div>

        <div
          className="mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3"
          style={{ borderTop: "1px solid rgba(255,255,255,0.04)" }}
        >
          <p className="text-[12px] text-white/20">
            © 2026 ProjectCore. Todos los derechos reservados.
          </p>
          <p className="text-[12px] text-white/15">
            Construido con Next.js · Vercel · Supabase
          </p>
        </div>
      </div>
    </footer>
  );
}
