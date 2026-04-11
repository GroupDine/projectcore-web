/**
 * Genera el PDF lead magnet de ProjectCore.
 * Ejecutar: npx tsx scripts/generate-lead-magnet.tsx
 * Output: public/lead-magnet.pdf
 */

import { Document, Page, Text, View, StyleSheet, renderToFile, Image } from '@react-pdf/renderer';
import path from 'path';
import { createElement as h } from 'react';
import QRCode from 'qrcode';

// ─── COLORES ──────────────────────────────────────────────────────────────────
const C = {
  verde:       '#1A6B5A',
  verdeClaro:  '#22956F',
  verdePale:   '#EDF7F5',
  negro:       '#0A0F1C',
  texto:       '#1A1A2E',
  gris:        '#4A5568',
  grisClaro:   '#718096',
  grisBg:      '#F7F8FA',
  rojo:        '#E53E3E',
  rojoPale:    '#FFF5F5',
  blanco:      '#FFFFFF',
  borde:       '#E2E8F0',
};

// ─── ESTILOS ──────────────────────────────────────────────────────────────────
const S = StyleSheet.create({
  // Páginas
  page: {
    backgroundColor: C.blanco,
    fontFamily: 'Helvetica',
    paddingHorizontal: 48,
    paddingTop: 36,
    paddingBottom: 32,
  },
  coverPage: {
    backgroundColor: C.negro,
    fontFamily: 'Helvetica',
    padding: 0,
  },

  // Header / Footer
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingBottom: 12,
    marginBottom: 22,
    borderBottomWidth: 1,
    borderBottomColor: C.borde,
  },
  headerBrand: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.verde, letterSpacing: 2 },
  headerPage:  { fontSize: 9, color: C.grisClaro },
  footer: {
    position: 'absolute',
    bottom: 20,
    left: 48,
    right: 48,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderTopWidth: 1,
    borderTopColor: C.borde,
    paddingTop: 8,
  },
  footerText: { fontSize: 8, color: C.grisClaro },

  // Tipografía
  h1:     { fontSize: 22, fontFamily: 'Helvetica-Bold', color: C.texto, lineHeight: 1.25, marginBottom: 10 },
  h2:     { fontSize: 16, fontFamily: 'Helvetica-Bold', color: C.texto, marginBottom: 8 },
  h3:     { fontSize: 12, fontFamily: 'Helvetica-Bold', color: C.texto, marginBottom: 5 },
  body:   { fontSize: 10, color: C.gris, lineHeight: 1.6, marginBottom: 8 },
  small:  { fontSize: 9,  color: C.grisClaro, lineHeight: 1.5 },
  label:  { fontSize: 8,  fontFamily: 'Helvetica-Bold', color: C.verde, letterSpacing: 1.5, marginBottom: 6 },

  // Componentes
  badge: {
    alignSelf: 'flex-start',
    backgroundColor: C.verdePale,
    borderRadius: 20,
    paddingHorizontal: 10,
    paddingVertical: 3,
    marginBottom: 10,
  },
  badgeText: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.verde, letterSpacing: 1.5 },

  highlightBox: {
    backgroundColor: C.verdePale,
    borderLeftWidth: 3,
    borderLeftColor: C.verde,
    padding: 12,
    borderRadius: 4,
    marginVertical: 10,
  },
  highlightText: { fontSize: 10, color: C.texto, lineHeight: 1.5 },

  roiPill: {
    alignSelf: 'flex-start',
    backgroundColor: C.verde,
    borderRadius: 20,
    paddingHorizontal: 12,
    paddingVertical: 4,
    marginTop: 6,
  },
  roiPillText: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.blanco },

  divider: { height: 1, backgroundColor: C.borde, marginVertical: 14 },

  // Check items
  checkRow:  { flexDirection: 'row', alignItems: 'flex-start', marginBottom: 6 },
  checkbox:  { width: 14, height: 14, borderWidth: 1.5, borderColor: C.verde, borderRadius: 2, marginRight: 8, marginTop: 1, flexShrink: 0 },
  checkText: { fontSize: 10, color: C.gris, flex: 1, lineHeight: 1.4 },

  // Antes/Después
  beforeAfterRow: { flexDirection: 'row', marginVertical: 10 },
  beforeBox: {
    flex: 1,
    backgroundColor: C.rojoPale,
    borderWidth: 1,
    borderColor: '#FEB2B2',
    borderRadius: 6,
    padding: 10,
    marginRight: 6,
  },
  afterBox: {
    flex: 1,
    backgroundColor: C.verdePale,
    borderWidth: 1,
    borderColor: '#9AE6B4',
    borderRadius: 6,
    padding: 10,
    marginLeft: 6,
  },
  beforeTitle: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.rojo, marginBottom: 4 },
  afterTitle:  { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.verde, marginBottom: 4 },
  beforeAfterText: { fontSize: 9, color: C.gris, lineHeight: 1.5 },

  // Diagrama flujo
  flowRow:    { flexDirection: 'row', alignItems: 'center', marginVertical: 8, flexWrap: 'wrap' },
  flowBox:    { backgroundColor: C.grisBg, borderWidth: 1, borderColor: C.borde, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 },
  flowBoxG:   { backgroundColor: C.verdePale, borderWidth: 1, borderColor: C.verde, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 4 },
  flowText:   { fontSize: 8, color: C.texto, fontFamily: 'Helvetica-Bold' },
  flowArrow:  { fontSize: 12, color: C.grisClaro, marginHorizontal: 4 },

  // Tabla ROI
  table:      { borderWidth: 1, borderColor: C.borde, borderRadius: 6, marginVertical: 10, overflow: 'hidden' },
  tableRow:   { flexDirection: 'row', borderBottomWidth: 1, borderBottomColor: C.borde, paddingHorizontal: 14, paddingVertical: 7 },
  tableRowLast: { flexDirection: 'row', paddingHorizontal: 14, paddingVertical: 7 },
  tableHeader:  { backgroundColor: C.grisBg },
  tableCellLabel: { width: 180, fontSize: 9, color: C.gris },
  tableCellValue: { flex: 1, fontSize: 9, color: C.grisClaro, borderBottomWidth: 1, borderBottomColor: C.borde },

  // Gráfico barras
  barChart:   { flexDirection: 'row', alignItems: 'flex-end', marginVertical: 12, height: 80 },
  barWrap:    { flex: 1, alignItems: 'center' },
  barLabel:   { fontSize: 8, color: C.gris, marginTop: 4, textAlign: 'center' },
  barValue:   { fontSize: 8, fontFamily: 'Helvetica-Bold', marginBottom: 3, textAlign: 'center' },
});

// ─── COMPONENTES REUTILIZABLES ────────────────────────────────────────────────

const Header = ({ page }: { page: string }) =>
  h(View, { style: S.header },
    h(Text, { style: S.headerBrand }, 'PROJECTCORE'),
    h(Text, { style: S.headerPage }, page),
  );

const Footer = () =>
  h(View, { style: S.footer },
    h(Text, { style: S.footerText }, 'projectcore.io  ·  servicios@projectcore.io'),
    h(Text, { style: S.footerText }, '© 2026 ProjectCore'),
  );

const Divider = () => h(View, { style: S.divider });

const Badge = ({ text }: { text: string }) =>
  h(View, { style: S.badge }, h(Text, { style: S.badgeText }, text));

const HighlightBox = ({ text }: { text: string }) =>
  h(View, { style: S.highlightBox }, h(Text, { style: S.highlightText }, text));

const RoiPill = ({ text }: { text: string }) =>
  h(View, { style: S.roiPill }, h(Text, { style: S.roiPillText }, text));

const CheckItem = ({ text }: { text: string }) =>
  h(View, { style: S.checkRow },
    h(View, { style: S.checkbox }),
    h(Text, { style: S.checkText }, text),
  );

// Diagrama de flujo horizontal
const FlowDiagram = ({ steps, highlight }: { steps: string[]; highlight?: number[] }) =>
  h(View, { style: S.flowRow },
    ...steps.flatMap((step, i) => {
      const isHighlight = highlight?.includes(i);
      const elements = [
        h(View, { key: `box-${i}`, style: isHighlight ? S.flowBoxG : S.flowBox },
          h(Text, { style: S.flowText }, step)
        ),
      ];
      if (i < steps.length - 1) {
        elements.push(h(Text, { key: `arrow-${i}`, style: S.flowArrow }, '→'));
      }
      return elements;
    })
  );

// Bloque Antes / Después
const BeforeAfter = ({ before, after }: { before: string[]; after: string[] }) =>
  h(View, { style: S.beforeAfterRow },
    h(View, { style: S.beforeBox },
      h(Text, { style: S.beforeTitle }, '✗  ANTES (Manual)'),
      ...before.map((line, i) => h(Text, { key: i, style: S.beforeAfterText }, `• ${line}`))
    ),
    h(View, { style: S.afterBox },
      h(Text, { style: S.afterTitle }, '✓  DESPUÉS (Automatizado)'),
      ...after.map((line, i) => h(Text, { key: i, style: S.beforeAfterText }, `• ${line}`))
    ),
  );

// Gráfico de barras simple (2 barras)
const BarChart = ({ manualH, autoH, manualLabel, autoLabel, manualVal, autoVal }: {
  manualH: number; autoH: number;
  manualLabel: string; autoLabel: string;
  manualVal: string; autoVal: string;
}) =>
  h(View, { style: S.barChart },
    h(View, { style: S.barWrap },
      h(Text, { style: { ...S.barValue, color: C.rojo } }, manualVal),
      h(View, { style: { width: 40, height: manualH, backgroundColor: '#FC8181', borderRadius: 4 } }),
      h(Text, { style: S.barLabel }, manualLabel),
    ),
    h(View, { style: { width: 20 } }),
    h(View, { style: S.barWrap },
      h(Text, { style: { ...S.barValue, color: C.verde } }, autoVal),
      h(View, { style: { width: 40, height: autoH, backgroundColor: C.verde, borderRadius: 4 } }),
      h(Text, { style: S.barLabel }, autoLabel),
    ),
  );

// ─── DOCUMENTO ────────────────────────────────────────────────────────────────

async function buildDocument() {
  // Generar QR code
  const qrDataUrl = await QRCode.toDataURL('https://cal.com/mo-si-ybloon/30min', {
    width: 160,
    margin: 1,
    color: { dark: '#0A0F1C', light: '#FFFFFF' },
  });

  return h(Document, { title: '3 Sistemas que hacen que tu negocio funcione solo — ProjectCore' },

    // ─── PÁG 1: PORTADA ───────────────────────────────────────────────────────
    h(Page, { size: 'A4', style: S.coverPage },
      h(View, { style: { flex: 1, backgroundColor: C.negro, padding: 60, justifyContent: 'center', alignItems: 'center' } },
        h(View, { style: { borderWidth: 1, borderColor: C.verde, borderRadius: 20, paddingHorizontal: 14, paddingVertical: 4, marginBottom: 36 } },
          h(Text, { style: { fontSize: 8, color: C.verde, letterSpacing: 2, fontFamily: 'Helvetica-Bold' } }, 'GUÍA GRATUITA  ·  PROJECTCORE'),
        ),
        h(Text, { style: { fontSize: 34, fontFamily: 'Helvetica-Bold', color: C.blanco, textAlign: 'center', lineHeight: 1.15, marginBottom: 20 } },
          '3 sistemas que hacen que\ntu negocio funcione solo'
        ),
        h(View, { style: { width: 60, height: 2, backgroundColor: C.verde, marginVertical: 20 } }),
        h(Text, { style: { fontSize: 14, color: C.verdeClaro, textAlign: 'center', marginBottom: 8 } },
          'Sin código. Sin contratar. Sin meses.'
        ),
        h(Text, { style: { fontSize: 11, color: '#666', textAlign: 'center', marginTop: 8 } },
          'La guía paso a paso que nadie te enseña.'
        ),
        h(View, { style: { marginTop: 60, flexDirection: 'row', alignItems: 'center' } },
          h(Text, { style: { fontSize: 9, color: '#444', letterSpacing: 1.5 } }, 'PROJECTCORE  ·  projectcore.io'),
        ),
      ),
    ),

    // ─── PÁG 2: INTRODUCCIÓN ──────────────────────────────────────────────────
    h(Page, { size: 'A4', style: S.page },
      h(Header, { page: 'Introducción' }),

      h(Badge, { text: 'EL PROBLEMA' }),
      h(Text, { style: S.h1 }, 'El coste oculto del\ntrabajo manual'),
      h(Text, { style: S.body },
        'La mayoría de los negocios pierden entre 15 y 25 horas a la semana en tareas que podrían hacerse solas. Cada hora gastada en trabajo manual es una hora que no inviertes en crecer.'
      ),

      h(View, { style: S.beforeAfterRow },
        h(View, { style: { ...S.beforeBox, flex: 1 } },
          h(Text, { style: S.beforeTitle }, '✗  Cada hora que gastas en...'),
          h(Text, { style: S.beforeAfterText }, '• Contestar emails repetitivos'),
          h(Text, { style: S.beforeAfterText }, '• Enviar presupuestos a mano'),
          h(Text, { style: S.beforeAfterText }, '• Hacer seguimiento de leads'),
          h(Text, { style: S.beforeAfterText }, '• Responder las mismas preguntas'),
        ),
        h(View, { style: { ...S.afterBox, flex: 1 } },
          h(Text, { style: S.afterTitle }, '✓  Es una hora que NO gastas en...'),
          h(Text, { style: S.beforeAfterText }, '• Conseguir nuevos clientes'),
          h(Text, { style: S.beforeAfterText }, '• Mejorar tu servicio'),
          h(Text, { style: S.beforeAfterText }, '• Hacer crecer tu negocio'),
          h(Text, { style: S.beforeAfterText }, '• Descansar y desconectar'),
        ),
      ),

      h(Divider),
      h(Text, { style: { ...S.h2, color: C.verde } }, '2026 es el año de automatizar.'),
      h(Text, { style: S.body },
        'Las herramientas de IA han democratizado la automatización. Lo que antes costaba 50.000€ y 6 meses, hoy cuesta desde 950€ y se implementa en días. Los negocios que no automatizan en 2026 perderán clientes frente a los que sí lo hagan.'
      ),

      h(HighlightBox, { text: '"Si tu negocio depende de que tú estés siempre disponible, no tienes un negocio — tienes un trabajo de autónomo sin vacaciones."' }),

      h(Text, { style: { ...S.body, fontFamily: 'Helvetica-Bold', color: C.verde, marginTop: 4 } },
        'En esta guía: 3 sistemas concretos, sin código, que puedes implementar en 7 días. →'
      ),

      h(Footer),
    ),

    // ─── PÁG 3: CALCULADORA ROI ───────────────────────────────────────────────
    h(Page, { size: 'A4', style: S.page },
      h(Header, { page: 'Calculadora de ROI' }),

      h(Badge, { text: 'HERRAMIENTA PRÁCTICA' }),
      h(Text, { style: S.h1 }, 'Calcula cuánto pierdes\nal mes'),
      h(Text, { style: S.body },
        'Rellena esta tabla con tu situación actual. Los resultados te dirán exactamente cuánto estás dejando sobre la mesa.'
      ),

      // Tabla de inputs
      h(View, { style: S.table },
        h(View, { style: { ...S.tableRow, ...S.tableHeader } },
          h(Text, { style: { ...S.tableCellLabel, fontFamily: 'Helvetica-Bold', color: C.texto } }, 'Tarea manual'),
          h(Text, { style: { ...S.tableCellValue, color: C.texto, fontFamily: 'Helvetica-Bold' } }, 'Tu tiempo actual'),
        ),
        h(View, { style: S.tableRow },
          h(Text, { style: S.tableCellLabel }, 'Responder emails / WhatsApp'),
          h(Text, { style: S.tableCellValue }, '_______ h/semana'),
        ),
        h(View, { style: S.tableRow },
          h(Text, { style: S.tableCellLabel }, 'Crear y enviar presupuestos'),
          h(Text, { style: S.tableCellValue }, '_______ h/semana'),
        ),
        h(View, { style: S.tableRow },
          h(Text, { style: S.tableCellLabel }, 'Seguimiento de leads / clientes'),
          h(Text, { style: S.tableCellValue }, '_______ h/semana'),
        ),
        h(View, { style: S.tableRow },
          h(Text, { style: { ...S.tableCellLabel, fontFamily: 'Helvetica-Bold', color: C.texto } }, 'TOTAL horas/semana'),
          h(Text, { style: { ...S.tableCellValue, fontFamily: 'Helvetica-Bold', color: C.rojo } }, '_______ h/semana = _______ h/mes'),
        ),
        h(View, { style: S.tableRowLast },
          h(Text, { style: S.tableCellLabel }, 'Valor de tu hora'),
          h(Text, { style: S.tableCellValue }, '_______ €/hora'),
        ),
      ),

      // Fórmula
      h(View, { style: { backgroundColor: C.grisBg, borderRadius: 6, padding: 12, marginVertical: 10 } },
        h(Text, { style: { fontSize: 10, fontFamily: 'Helvetica-Bold', color: C.texto, textAlign: 'center' } },
          'Coste mensual del trabajo manual:'
        ),
        h(Text, { style: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: C.rojo, textAlign: 'center', marginTop: 6 } },
          '_____ h/mes  ×  _____€/h  =  _____€/mes perdidos'
        ),
        h(Text, { style: { fontSize: 9, color: C.gris, textAlign: 'center', marginTop: 6 } },
          'Con automatización ahorras el 60-80% → Inversión desde 950€ → Retorno en 1-3 meses'
        ),
      ),

      // Gráfico barras
      h(View, { style: { flexDirection: 'row', alignItems: 'flex-end', justifyContent: 'center', marginTop: 16 } },
        h(View, { style: { alignItems: 'center' } },
          h(Text, { style: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.rojo, marginBottom: 4 } }, '~1.500€/mes'),
          h(View, { style: { width: 70, height: 70, backgroundColor: '#FC8181', borderRadius: 4 } }),
          h(Text, { style: { fontSize: 8, color: C.gris, marginTop: 4 } }, 'Sin automatizar'),
        ),
        h(View, { style: { width: 24 } }),
        h(View, { style: { alignItems: 'center' } },
          h(Text, { style: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: C.verde, marginBottom: 4 } }, '~300€/mes'),
          h(View, { style: { width: 70, height: 20, backgroundColor: C.verde, borderRadius: 4 } }),
          h(Text, { style: { fontSize: 8, color: C.gris, marginTop: 4 } }, 'Con automatización'),
        ),
      ),

      h(Text, { style: { fontSize: 8, color: C.grisClaro, textAlign: 'center', marginTop: 6 } },
        '* Ejemplo basado en 30h/mes × 50€/h. Tus cifras pueden variar.'
      ),

      h(Footer),
    ),

    // ─── PÁG 4: SISTEMA #1 ────────────────────────────────────────────────────
    h(Page, { size: 'A4', style: S.page },
      h(Header, { page: 'Sistema #1 de 3' }),

      h(Badge, { text: 'SISTEMA #1 DE 3' }),
      h(Text, { style: S.h1 }, 'Respuestas automáticas\npara consultas repetidas'),

      h(BeforeAfter, {
        before: [
          'Cliente escribe WhatsApp a las 11PM',
          'Ves el mensaje a las 9AM del día siguiente',
          'Tardas 20 min en responder con info básica',
          'Cliente ya contrató a tu competencia',
        ],
        after: [
          'Cliente escribe WhatsApp a las 11PM',
          'Respuesta automática en 10 segundos',
          'Info completa + link para agendar cita',
          'Cita confirmada antes de que despiertes',
        ],
      }),

      h(Divider),
      h(Text, { style: S.label }, 'FLUJO AUTOMATIZADO'),
      h(FlowDiagram, {
        steps: ['Cliente escribe', 'n8n recibe', 'Claude AI procesa', 'Respuesta enviada', 'Lead guardado'],
        highlight: [2, 3],
      }),

      h(View, { style: { marginTop: 10 } },
        h(Text, { style: S.h3 }, 'Herramientas necesarias'),
        h(View, { style: { flexDirection: 'row', flexWrap: 'wrap' } },
          ...['n8n (automatización)', 'Claude AI / GPT-4 (IA)', 'WhatsApp Business API', 'Gmail / SMTP'].map((tool, i) =>
            h(View, { key: i, style: { backgroundColor: C.grisBg, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3, marginRight: 6, marginBottom: 4 } },
              h(Text, { style: { fontSize: 9, color: C.texto } }, tool)
            )
          )
        ),
      ),

      h(View, { style: { marginTop: 10 } },
        h(Text, { style: S.h3 }, 'Pasos de implementación (días 1-4)'),
        h(CheckItem, { text: 'Día 1-2: Crear cuenta n8n + conectar WhatsApp Business o email' }),
        h(CheckItem, { text: 'Día 2-3: Configurar IA con el prompt de tu negocio (precios, FAQs, horarios)' }),
        h(CheckItem, { text: 'Día 3-4: Definir excepciones y probar con 10 mensajes reales' }),
      ),

      h(RoiPill, { text: 'ROI: 15h/semana ahorradas = 60h/mes = 720h/año' }),

      h(Footer),
    ),

    // ─── PÁG 5: SISTEMA #2 ────────────────────────────────────────────────────
    h(Page, { size: 'A4', style: S.page },
      h(Header, { page: 'Sistema #2 de 3' }),

      h(Badge, { text: 'SISTEMA #2 DE 3' }),
      h(Text, { style: S.h1 }, 'Presupuestos instantáneos\nsin tocar el ordenador'),

      h(BeforeAfter, {
        before: [
          'Cliente pide presupuesto por email',
          'Abres Excel, rellenas datos manualmente',
          '30 minutos para generar un presupuesto',
          'Lo envías a mano y esperas respuesta',
          'El seguimiento… te olvidas',
        ],
        after: [
          'Cliente rellena formulario en tu web',
          'PDF profesional generado en 10 segundos',
          'Email automático con presupuesto adjunto',
          'Recordatorio automático a los 3 días',
          'Todo registrado en tu CRM automáticamente',
        ],
      }),

      h(Divider),
      h(Text, { style: S.label }, 'FLUJO AUTOMATIZADO'),
      h(FlowDiagram, {
        steps: ['Formulario web', 'Airtable guarda', 'PDF generado', 'Email enviado', 'Recordatorio 3d'],
        highlight: [2, 3, 4],
      }),

      h(View, { style: { marginTop: 10 } },
        h(Text, { style: S.h3 }, 'Herramientas necesarias'),
        h(View, { style: { flexDirection: 'row', flexWrap: 'wrap' } },
          ...['Airtable (CRM/datos)', 'Make / n8n (flujo)', 'Carbone.io (PDF)', 'Resend / Gmail (email)'].map((tool, i) =>
            h(View, { key: i, style: { backgroundColor: C.grisBg, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3, marginRight: 6, marginBottom: 4 } },
              h(Text, { style: { fontSize: 9, color: C.texto } }, tool)
            )
          )
        ),
      ),

      h(View, { style: { marginTop: 10 } },
        h(Text, { style: S.h3 }, 'Pasos de implementación (días 1-4)'),
        h(CheckItem, { text: 'Día 1-2: Crear formulario en Airtable con los campos del presupuesto' }),
        h(CheckItem, { text: 'Día 2-3: Diseñar plantilla PDF y conectar Make/n8n para generación automática' }),
        h(CheckItem, { text: 'Día 3-4: Configurar envío por email + recordatorio a 3 días sin respuesta' }),
      ),

      h(RoiPill, { text: 'ROI: 10 presupuestos/día × 30 min = 5h/día ahorradas' }),

      h(Footer),
    ),

    // ─── PÁG 6: SISTEMA #3 ────────────────────────────────────────────────────
    h(Page, { size: 'A4', style: S.page },
      h(Header, { page: 'Sistema #3 de 3' }),

      h(Badge, { text: 'SISTEMA #3 DE 3' }),
      h(Text, { style: S.h1 }, 'Seguimiento de leads\nsin esfuerzo'),

      h(BeforeAfter, {
        before: [
          'Lead te contacta, lo apuntas en papel',
          'Pasan los días… te olvidas',
          'El lead ya contrató con otro',
          'El 40% de leads nunca son contactados',
          'Pierdes clientes sin saber cuántos',
        ],
        after: [
          'Lead entra → automáticamente al CRM',
          'Email de bienvenida enviado al instante',
          'Recordatorio automático a los 3 días',
          'Notificación si el lead está "caliente"',
          '+30% de conversión sin esfuerzo extra',
        ],
      }),

      h(Divider),
      h(Text, { style: S.label }, 'FLUJO AUTOMATIZADO'),
      h(FlowDiagram, {
        steps: ['Lead entra', 'CRM Airtable', 'Email bienvenida', 'Recordatorio 3d', 'Notif. caliente'],
        highlight: [2, 3, 4],
      }),

      h(View, { style: { marginTop: 10 } },
        h(Text, { style: S.h3 }, 'Herramientas necesarias'),
        h(View, { style: { flexDirection: 'row', flexWrap: 'wrap' } },
          ...['Airtable (CRM)', 'n8n (recordatorios)', 'Resend / Email (seguimiento)', 'Slack / Telegram (alertas)'].map((tool, i) =>
            h(View, { key: i, style: { backgroundColor: C.grisBg, borderRadius: 4, paddingHorizontal: 8, paddingVertical: 3, marginRight: 6, marginBottom: 4 } },
              h(Text, { style: { fontSize: 9, color: C.texto } }, tool)
            )
          )
        ),
      ),

      h(View, { style: { marginTop: 10 } },
        h(Text, { style: S.h3 }, 'Pasos de implementación (días 1-4)'),
        h(CheckItem, { text: 'Día 1-2: Crear base CRM en Airtable (Nombre, Email, Estado, Fecha contacto)' }),
        h(CheckItem, { text: 'Día 2-3: Configurar email automático de bienvenida cuando entra un lead' }),
        h(CheckItem, { text: 'Día 3-4: Añadir recordatorios automáticos a 3 y 7 días sin respuesta' }),
      ),

      h(RoiPill, { text: 'ROI: +30% conversión de leads = más ingresos sin más trabajo' }),

      h(Footer),
    ),

    // ─── PÁG 7: CHECKLIST ─────────────────────────────────────────────────────
    h(Page, { size: 'A4', style: S.page },
      h(Header, { page: 'Plan de implementación' }),

      h(Badge, { text: 'TU PLAN DE ACCIÓN' }),
      h(Text, { style: S.h1 }, '3 semanas,\n3 automatizaciones'),
      h(Text, { style: S.body },
        'Una automatización por semana. Asumible y sostenible. En 21 días tienes un negocio que funciona más solo.'
      ),

      h(Divider),

      // Semana 1
      h(Text, { style: { ...S.h3, color: C.verde, marginTop: 6 } }, 'SEMANA 1  —  Respuestas automáticas'),
      h(CheckItem, { text: 'Crear o configurar cuenta WhatsApp Business' }),
      h(CheckItem, { text: 'Instalar y configurar n8n (5 min en la nube)' }),
      h(CheckItem, { text: 'Escribir respuestas para las 10 preguntas más comunes' }),
      h(CheckItem, { text: 'Conectar IA y probar con 5 mensajes reales' }),
      h(CheckItem, { text: 'Activar y monitorizar los primeros 2 días' }),

      h(Divider),

      // Semana 2
      h(Text, { style: { ...S.h3, color: C.verde } }, 'SEMANA 2  —  Presupuestos automáticos'),
      h(CheckItem, { text: 'Crear base de datos en Airtable con campos del presupuesto' }),
      h(CheckItem, { text: 'Diseñar plantilla PDF con tu branding' }),
      h(CheckItem, { text: 'Conectar Make/n8n para generar PDF al enviar formulario' }),
      h(CheckItem, { text: 'Configurar email automático con PDF adjunto' }),
      h(CheckItem, { text: 'Probar el flujo completo 3 veces' }),

      h(Divider),

      // Semana 3
      h(Text, { style: { ...S.h3, color: C.verde } }, 'SEMANA 3  —  Seguimiento de leads'),
      h(CheckItem, { text: 'Crear CRM simple en Airtable (6 campos básicos)' }),
      h(CheckItem, { text: 'Configurar email de bienvenida automático' }),
      h(CheckItem, { text: 'Activar recordatorios automáticos a 3 y 7 días' }),
      h(CheckItem, { text: 'Migrar leads actuales a la nueva base' }),
      h(CheckItem, { text: 'Conectar formulario web al CRM automáticamente' }),

      h(Footer),
    ),

    // ─── PÁG 8: CTA FINAL ─────────────────────────────────────────────────────
    h(Page, { size: 'A4', style: { ...S.page, backgroundColor: C.negro } },
      // Header especial oscuro
      h(View, { style: { ...S.header, borderBottomColor: '#1F2937' } },
        h(Text, { style: S.headerBrand }, 'PROJECTCORE'),
        h(Text, { style: { ...S.headerPage, color: '#444' } }, 'Siguiente paso'),
      ),

      h(View, { style: { alignItems: 'center', marginBottom: 28 } },
        h(Text, { style: { fontSize: 22, fontFamily: 'Helvetica-Bold', color: C.blanco, textAlign: 'center', lineHeight: 1.2 } },
          '¿Listo para automatizar?'
        ),
        h(Text, { style: { fontSize: 11, color: '#666', textAlign: 'center', marginTop: 8 } },
          'Implementamos estos sistemas por ti en menos de 10 días.'
        ),
      ),

      // Dos columnas
      h(View, { style: { flexDirection: 'row' } },

        // Columna izquierda — Automatización/Software
        h(View, { style: { flex: 1, backgroundColor: '#0D1B16', borderWidth: 1, borderColor: C.verde, borderRadius: 10, padding: 20, marginRight: 8 } },
          h(Text, { style: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: C.verde, letterSpacing: 1.5, marginBottom: 10 } },
            '¿NECESITAS AUTOMATIZACIÓN O SOFTWARE?'
          ),
          h(Text, { style: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: C.blanco, marginBottom: 6, lineHeight: 1.3 } },
            'Agenda tu diagnóstico\ngratuito'
          ),
          h(Text, { style: { fontSize: 9, color: '#888', marginBottom: 16, lineHeight: 1.5 } },
            '30 minutos. Sin compromiso.\nAnalizamos tu caso y te decimos exactamente qué automatizar primero.'
          ),
          // QR Code
          h(View, { style: { alignItems: 'center' } },
            h(Image, { src: qrDataUrl, style: { width: 90, height: 90 } }),
            h(Text, { style: { fontSize: 8, color: '#666', marginTop: 6, textAlign: 'center' } },
              'Escanea o visita:'
            ),
            h(Text, { style: { fontSize: 8, color: C.verdeClaro, textAlign: 'center' } },
              'cal.com/mo-si-ybloon/30min'
            ),
          ),
        ),

        // Columna derecha — Solo web
        h(View, { style: { flex: 1, backgroundColor: '#111827', borderWidth: 1, borderColor: '#1F2937', borderRadius: 10, padding: 20, marginLeft: 8 } },
          h(Text, { style: { fontSize: 8, fontFamily: 'Helvetica-Bold', color: '#666', letterSpacing: 1.5, marginBottom: 10 } },
            '¿SOLO NECESITAS PÁGINA WEB?'
          ),
          h(Text, { style: { fontSize: 13, fontFamily: 'Helvetica-Bold', color: C.blanco, marginBottom: 6, lineHeight: 1.3 } },
            'Contáctanos\ndirectamente'
          ),
          h(Text, { style: { fontSize: 9, color: '#888', marginBottom: 20, lineHeight: 1.5 } },
            'Web profesional desde 699€ + IVA.\nEntrega en 5-7 días. Sin permanencia.'
          ),
          h(View, { style: { marginBottom: 10 } },
            h(Text, { style: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#aaa', marginBottom: 3 } }, '✉  Email'),
            h(Text, { style: { fontSize: 10, color: C.verdeClaro } }, 'mohamed@projectcore.io'),
          ),
          h(View, { style: { marginBottom: 10 } },
            h(Text, { style: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#aaa', marginBottom: 3 } }, '🌐  Web'),
            h(Text, { style: { fontSize: 10, color: C.verdeClaro } }, 'projectcore.io'),
          ),
          h(View, {},
            h(Text, { style: { fontSize: 9, fontFamily: 'Helvetica-Bold', color: '#aaa', marginBottom: 3 } }, 'Servicios desde'),
            h(Text, { style: { fontSize: 12, fontFamily: 'Helvetica-Bold', color: C.blanco } }, '699€ + IVA'),
          ),
        ),
      ),

      // Footer oscuro
      h(View, { style: { marginTop: 24, alignItems: 'center' } },
        h(Text, { style: { fontSize: 8, color: '#333' } },
          'ProjectCore  ·  projectcore.io  ·  servicios@projectcore.io  ·  © 2026'
        ),
      ),
    ),

  ); // fin Document
}

// ─── MAIN ─────────────────────────────────────────────────────────────────────
async function main() {
  const outputPath = path.join(process.cwd(), 'public', 'lead-magnet.pdf');
  console.log('Generando PDF...');

  const doc = await buildDocument();
  await renderToFile(doc, outputPath);

  console.log(`PDF generado: ${outputPath}`);
}

main().catch((err) => {
  console.error('Error generando PDF:', err);
  process.exit(1);
});
