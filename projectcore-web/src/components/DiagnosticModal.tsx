"use client";

import { useState, useEffect, useCallback } from "react";
import { AnimatePresence, motion } from "framer-motion";

interface DiagnosticModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const businessTypes = [
  "Despacho / Asesoría",
  "Restaurante",
  "Clínica",
  "Comercio",
  "Autónomo",
  "Otro",
];

const serviceTypes = [
  "Web",
  "Automatización",
  "Marketing",
  "Software",
  "No sé, necesito consejo",
];

const initialForm = {
  name: "",
  email: "",
  phone: "",
  businessType: "",
  serviceType: "",
  message: "",
};

export default function DiagnosticModal({ isOpen, onClose }: DiagnosticModalProps) {
  const [form, setForm] = useState(initialForm);
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  // Bloquear scroll del body
  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [isOpen]);

  // Cerrar con Escape
  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); },
    [onClose]
  );
  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [handleKeyDown]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulación de envío
    await new Promise((r) => setTimeout(r, 1000));
    setLoading(false);
    setSubmitted(true);
  };

  const handleClose = () => {
    onClose();
    setTimeout(() => {
      setSubmitted(false);
      setForm(initialForm);
    }, 300);
  };

  const inputClass =
    "w-full px-4 py-3 rounded-[8px] text-sm text-white border outline-none transition-colors duration-200 focus:border-[#1A6B5A]";
  const inputStyle = { backgroundColor: "#0D1421", borderColor: "#1F2937" };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[100] flex items-center justify-center px-4"
          style={{ backgroundColor: "rgba(0,0,0,0.7)", backdropFilter: "blur(4px)" }}
          onClick={handleClose}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-lg rounded-[12px] border overflow-y-auto max-h-[90vh]"
            style={{ backgroundColor: "#111827", borderColor: "#1F2937" }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cerrar */}
            <button
              onClick={handleClose}
              className="absolute top-4 right-4 p-2 rounded-lg transition-colors duration-200 cursor-pointer"
              style={{ color: "#6B7280" }}
              onMouseEnter={(e) => (e.currentTarget.style.color = "#FFFFFF")}
              onMouseLeave={(e) => (e.currentTarget.style.color = "#6B7280")}
              aria-label="Cerrar"
            >
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            <div className="p-8">
              {submitted ? (
                /* Estado de éxito */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="text-center py-8"
                >
                  <div
                    className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6"
                    style={{ backgroundColor: "rgba(26,107,90,0.2)" }}
                  >
                    <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" style={{ color: "#1A6B5A" }}>
                      <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3">¡Recibido!</h3>
                  <p className="text-sm" style={{ color: "#9CA3AF" }}>
                    Te contactamos en menos de 24 horas. ¡Gracias por confiar en ProjectCore!
                  </p>
                  <button
                    onClick={handleClose}
                    className="mt-8 px-6 py-2.5 rounded-[8px] text-sm font-semibold text-white cursor-pointer transition-colors"
                    style={{ backgroundColor: "#1A6B5A" }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = "#22856F")}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "#1A6B5A")}
                  >
                    Cerrar
                  </button>
                </motion.div>
              ) : (
                /* Formulario */
                <>
                  <h2 className="text-2xl font-bold text-white mb-2">
                    Cuéntanos sobre tu negocio
                  </h2>
                  <p className="text-sm mb-8" style={{ color: "#9CA3AF" }}>
                    Te respondemos en menos de 24 horas
                  </p>

                  <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    {/* Nombre */}
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#9CA3AF" }}>
                        Nombre completo *
                      </label>
                      <input
                        type="text"
                        name="name"
                        required
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Tu nombre"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>

                    {/* Email */}
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#9CA3AF" }}>
                        Email *
                      </label>
                      <input
                        type="email"
                        name="email"
                        required
                        value={form.email}
                        onChange={handleChange}
                        placeholder="tu@email.com"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>

                    {/* Teléfono */}
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#9CA3AF" }}>
                        Teléfono / WhatsApp (opcional)
                      </label>
                      <input
                        type="tel"
                        name="phone"
                        value={form.phone}
                        onChange={handleChange}
                        placeholder="+34 600 000 000"
                        className={inputClass}
                        style={inputStyle}
                      />
                    </div>

                    {/* Tipo de negocio */}
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#9CA3AF" }}>
                        Tipo de negocio
                      </label>
                      <select
                        name="businessType"
                        value={form.businessType}
                        onChange={handleChange}
                        className={inputClass}
                        style={{ ...inputStyle, cursor: "pointer" }}
                      >
                        <option value="">Selecciona una opción</option>
                        {businessTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Qué necesitas */}
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#9CA3AF" }}>
                        ¿Qué necesitas?
                      </label>
                      <select
                        name="serviceType"
                        value={form.serviceType}
                        onChange={handleChange}
                        className={inputClass}
                        style={{ ...inputStyle, cursor: "pointer" }}
                      >
                        <option value="">Selecciona una opción</option>
                        {serviceTypes.map((t) => (
                          <option key={t} value={t}>{t}</option>
                        ))}
                      </select>
                    </div>

                    {/* Mensaje */}
                    <div>
                      <label className="block text-xs font-medium mb-1.5" style={{ color: "#9CA3AF" }}>
                        Mensaje (opcional)
                      </label>
                      <textarea
                        name="message"
                        value={form.message}
                        onChange={handleChange}
                        placeholder="Cuéntanos más sobre tu proyecto..."
                        rows={3}
                        className={inputClass}
                        style={{ ...inputStyle, resize: "none" }}
                      />
                    </div>

                    {/* Submit */}
                    <button
                      type="submit"
                      disabled={loading}
                      className="mt-2 w-full py-3 rounded-[8px] text-sm font-bold text-white transition-all duration-200 cursor-pointer disabled:opacity-60"
                      style={{ backgroundColor: "#1A6B5A" }}
                      onMouseEnter={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#22856F"; }}
                      onMouseLeave={(e) => { if (!loading) e.currentTarget.style.backgroundColor = "#1A6B5A"; }}
                    >
                      {loading ? "Enviando..." : "Enviar →"}
                    </button>
                  </form>
                </>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
