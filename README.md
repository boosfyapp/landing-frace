# Frace Solutions — Landing Page Premium

Landing page de alta conversión para Frace Solutions, construida con Next.js 14, Tailwind CSS y Framer Motion.

## Instalación

```bash
npm install
```

## Comandos

```bash
npm run dev      # Servidor de desarrollo en http://localhost:3000
npm run build    # Build de producción
npm run start    # Iniciar servidor de producción
npm run lint     # Verificar errores de linting
```

## Cómo editar los enlaces clave

Todos los links y precios están centralizados en un solo archivo:

**`src/lib/constants.ts`**

```typescript
export const LINKS = {
  calendly: 'https://calendly.com/fracesolutions/reunion',  // ← Link Calendly
  whatsapp: 'https://wa.me/message/DGPEYQD3I7OHB1',         // ← Link WhatsApp
  mpStarter:  'https://mpago.li/2ELwWJC',                   // ← Pago Starter MP
  mpPro:      'https://mpago.li/1ta547h',                   // ← Pago PRO MP
  mpUltimate: 'https://mpago.li/28iN2xz',                   // ← Pago Ultimate MP
}
```

## Estructura de carpetas

```
src/
  app/
    layout.tsx          — SEO, metadatos, fuente Inter
    page.tsx            — Ensambla todas las secciones
    globals.css         — Estilos globales, utilities glass, rangos
  lib/
    constants.ts        — ⭐ TODOS los links, precios y copy
    utils.ts            — Helper cn() para clases
  hooks/
    useMediaQuery.ts    — Detecta breakpoints (desactiva parallax en mobile)
  components/
    ui/
      Button.tsx        — Botón reutilizable (primary/whatsapp/ghost/outline)
      AnimatedNumber.tsx — Número con count-up animado
      ScrollReveal.tsx  — Wrapper de animación scroll
      Badge.tsx         — Pill badge de colores
    layout/
      Header.tsx        — Header sticky con menú mobile
      Footer.tsx        — Pie de página con copyright
      MobileBottomBar.tsx — Barra inferior fija en mobile
    sections/
      Hero.tsx          — Sección hero con mockup WA + parallax
      ProblemSolution.tsx — Comparativa antes/después
      Metrics.tsx       — 4 estadísticas con count-up
      Features.tsx      — Grid de 9 funciones
      HowItWorks.tsx    — Timeline de 5 pasos
      ROICalculator.tsx — Calculadora ROI interactiva con sliders
      BoosifyMockup.tsx — Mockup CSS del CRM Boosfy
      Pricing.tsx       — 3 planes con links a Mercado Pago
      Testimonials.tsx  — Testimonios (grid desktop / carrusel mobile)
      FAQ.tsx           — Acordeón de preguntas frecuentes
      FinalCTA.tsx      — CTA final con ambos botones
```

## Activos en /public

- `logo.png` — Logo Frace Solutions
- `favicon.svg` — Favicon
- `og.png` — Imagen Open Graph (1200×630) — **pendiente**: agregar imagen real para redes sociales

## Colores principales

| Token | Hex | Uso |
|-------|-----|-----|
| `brand-cyan` | `#22D3EE` | CTAs, bordes activos, gradiente |
| `brand-purple` | `#A855F7` | Gradiente, acentos |
| `brand-green` | `#10B981` | Éxito, checks, WhatsApp |
| `brand-wa` | `#25D366` | Botón WhatsApp |
| `bg` | `#050C16` | Fondo principal |
| `tx-1` | `#EDF4FF` | Texto primario |
| `tx-2` | `#8BA5C2` | Texto secundario |

## Pendientes opcionales

- [ ] Añadir imagen `public/og.png` real (1200×630px) para Open Graph
- [ ] Agregar Google Analytics o Meta Pixel en `layout.tsx` via `next/script`
- [ ] Configurar dominio en `metadataBase` de `layout.tsx`
- [ ] Agregar links reales a `/legal`, `/privacidad`, `/terminos` en `constants.ts`
