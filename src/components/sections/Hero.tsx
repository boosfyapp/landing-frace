'use client'
import React, { useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import { CalendarCheck, Check, Bot, Zap, Image as ImageIcon, FileText, Mic, Play } from 'lucide-react'
import { LINKS } from '@/lib/constants'
import { useMediaQuery } from '@/hooks/useMediaQuery'

const WA_ICON = (
  <svg viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4" aria-hidden="true">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
  </svg>
)

const TRUST_BULLETS = [
  'Asistente IA listo en menos de 24 horas',
  'Sin cambiar tu número de WhatsApp',
  'Sin contrato forzoso · Sin conocimientos técnicos',
]

type BubbleType = 'text' | 'image' | 'audio' | 'document'

interface Bubble {
  side: 'left' | 'right'
  type: BubbleType
  text?: string
  time: string
  delay: number
  isAI?: boolean
  imageLabel?: string
  audioDuration?: string
  docName?: string
}

// Delays relativos al momento en que el chat entra en viewport
const CHAT_BUBBLES: Bubble[] = [
  { side: 'left',  type: 'text',     text: 'Hola, me interesa una cita',                                time: '09:14', delay: 0.4  },
  { side: 'right', type: 'text',     text: '¡Hola! Con gusto agendo tu cita. ¿Cuál es tu nombre?',      time: '09:14', delay: 1.3,  isAI: true },
  { side: 'left',  type: 'text',     text: 'Soy Carlos García',                                          time: '09:15', delay: 2.3  },
  { side: 'right', type: 'image',    text: 'Te comparto nuestro catálogo de servicios 📎',               time: '09:15', delay: 3.3,  isAI: true, imageLabel: 'Catálogo 2024' },
  { side: 'left',  type: 'audio',    audioDuration: '0:09',                                              time: '09:16', delay: 4.5  },
  { side: 'right', type: 'text',     text: 'Escuché tu nota 🎧 Entendido, te agendo el martes 10am.',   time: '09:16', delay: 5.7,  isAI: true },
  { side: 'right', type: 'document', text: 'Aquí tu confirmación de cita:',                              time: '09:16', delay: 6.7,  isAI: true, docName: 'Confirmacion_cita.pdf' },
  { side: 'left',  type: 'text',     text: '¡Perfecto, muchas gracias! 🙏',                              time: '09:17', delay: 7.8  },
  { side: 'right', type: 'text',     text: '¡Nos vemos el martes! Recibirás un recordatorio automático 🔔', time: '09:17', delay: 8.8, isAI: true },
]

function ImageBubble({ label }: { label: string }) {
  return (
    <div className="rounded-xl overflow-hidden">
      <div className="w-full h-20 bg-gradient-to-br from-brand-purple/30 to-brand-cyan/20 flex flex-col items-center justify-center gap-1 border border-white/10 rounded-t-xl">
        <ImageIcon size={18} className="text-brand-cyan/70" />
        <span style={{ fontSize: '9px' }} className="text-tx-3">{label}</span>
      </div>
    </div>
  )
}

function AudioBubble({ duration, isLeft }: { duration: string; isLeft: boolean }) {
  const bars = [3, 5, 8, 6, 10, 7, 4, 9, 6, 8, 5, 7, 4, 6, 8, 5, 7, 4, 6, 3]
  return (
    <div className="flex items-center gap-2 px-1 py-0.5">
      <div className={`w-6 h-6 rounded-full flex items-center justify-center flex-shrink-0 ${isLeft ? 'bg-surface-2' : 'bg-brand-cyan/20'}`}>
        <Play size={9} className={isLeft ? 'text-tx-2' : 'text-brand-cyan'} />
      </div>
      <div className="flex items-center gap-px h-6">
        {bars.map((h, i) => (
          <div
            key={i}
            className={`w-0.5 rounded-full ${isLeft ? 'bg-tx-3' : 'bg-brand-cyan/60'}`}
            style={{ height: `${h}px` }}
          />
        ))}
      </div>
      <span style={{ fontSize: '9px' }} className="text-tx-3 flex-shrink-0">{duration}</span>
      <Mic size={9} className="text-tx-3 flex-shrink-0" />
    </div>
  )
}

function DocumentBubble({ name, isLeft }: { name: string; isLeft: boolean }) {
  return (
    <div className={`flex items-center gap-2 p-2 rounded-xl border ${isLeft ? 'border-border/60 bg-surface/40' : 'border-brand-cyan/15 bg-brand-cyan/5'}`}>
      <div className="w-7 h-7 rounded-lg bg-red-500/20 flex items-center justify-center flex-shrink-0">
        <FileText size={13} className="text-red-400" />
      </div>
      <div className="min-w-0">
        <p style={{ fontSize: '9px' }} className="text-tx-1 font-semibold truncate">{name}</p>
        <p style={{ fontSize: '8px' }} className="text-tx-3">PDF · 42 KB</p>
      </div>
    </div>
  )
}

function ChatBubble({ bubble }: { bubble: Bubble }) {
  const isLeft = bubble.side === 'left'
  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -14 : 14, y: 4 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: bubble.delay, duration: 0.35, ease: 'easeOut' }}
      className={`flex ${isLeft ? 'justify-start' : 'justify-end'}`}
    >
      <div
        className={`rounded-2xl overflow-hidden ${
          bubble.type === 'image' ? 'w-44' : 'max-w-[82%]'
        } ${
          isLeft
            ? 'bg-surface rounded-tl-sm'
            : 'bg-brand-cyan/15 rounded-tr-sm'
        } ${bubble.type !== 'image' ? 'px-3 py-2' : ''}`}
      >
        {bubble.isAI && bubble.type !== 'image' && (
          <div className="flex items-center gap-1 mb-1">
            <Bot size={9} className="text-brand-cyan" />
            <span className="text-brand-cyan" style={{ fontSize: '8px', fontWeight: 800 }}>IA</span>
          </div>
        )}

        {bubble.type === 'image' && (
          <>
            {bubble.isAI && (
              <div className="flex items-center gap-1 px-3 pt-2 mb-1">
                <Bot size={9} className="text-brand-cyan" />
                <span className="text-brand-cyan" style={{ fontSize: '8px', fontWeight: 800 }}>IA</span>
              </div>
            )}
            {bubble.text && (
              <p className="text-xs text-tx-1 leading-relaxed px-3 pb-1">{bubble.text}</p>
            )}
            <ImageBubble label={bubble.imageLabel ?? ''} />
          </>
        )}

        {bubble.type === 'audio' && (
          <AudioBubble duration={bubble.audioDuration ?? '0:00'} isLeft={isLeft} />
        )}

        {bubble.type === 'document' && (
          <>
            {bubble.text && (
              <p className="text-xs text-tx-1 leading-relaxed mb-1.5">{bubble.text}</p>
            )}
            <DocumentBubble name={bubble.docName ?? 'documento.pdf'} isLeft={isLeft} />
          </>
        )}

        {bubble.type === 'text' && (
          <p className="text-xs text-tx-1 leading-relaxed">{bubble.text}</p>
        )}

        <p
          className={`text-tx-3 mt-0.5 text-right ${bubble.type === 'image' ? 'px-3 pb-2' : ''}`}
          style={{ fontSize: '8px' }}
        >
          {bubble.time}
        </p>
      </div>
    </motion.div>
  )
}

function WAChatMockup({ compact = false }: { compact?: boolean }) {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)
  const [visibleCount, setVisibleCount] = React.useState(0)
  const started = useRef(false)

  // Trigger only once when the chat enters the viewport
  const inView = useInView(wrapperRef, { once: true, margin: '0px 0px -80px 0px' })

  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const timers = CHAT_BUBBLES.map((bubble, i) =>
      setTimeout(() => {
        setVisibleCount(i + 1)
        requestAnimationFrame(() => {
          const el = containerRef.current
          if (el) el.scrollTop = el.scrollHeight
        })
      }, bubble.delay * 1000)
    )

    return () => timers.forEach(clearTimeout)
  }, [inView])

  const visibleBubbles = CHAT_BUBBLES.slice(0, visibleCount)

  return (
    <motion.div
      ref={wrapperRef}
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3, duration: 0.6 }}
      className={`glass rounded-2xl border border-border/80 overflow-hidden ${!compact ? 'animate-float' : ''}`}
      style={!compact ? { animationDelay: '0.5s' } : {}}
    >
      {/* Header */}
      <div className="bg-surface/80 px-4 py-3 flex items-center gap-3 border-b border-border/60">
        <div className="w-8 h-8 rounded-full bg-brand-wa/20 flex items-center justify-center">
          {WA_ICON}
        </div>
        <div className="flex-1">
          <p className="text-xs font-bold text-tx-1">Tu Negocio</p>
          <div className="flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
            <p className="text-xs text-tx-3">Asistente IA activo</p>
          </div>
        </div>
        <div className="text-xs bg-brand-cyan/15 text-brand-cyan px-2 py-0.5 rounded-full font-bold">IA</div>
      </div>

      {/* Messages — fixed height, el contenedor scrollea internamente, sin scrollbar visible */}
      <div
        ref={containerRef}
        className={`p-3 space-y-2.5 no-scrollbar ${compact ? 'h-[260px]' : 'h-[300px]'}`}
        style={{ overflowY: 'scroll' }}
      >
        {visibleBubbles.map((bubble, i) => (
          <ChatBubble key={i} bubble={bubble} />
        ))}
      </div>

      {/* Input */}
      <div className="px-3 py-2 border-t border-border/60 bg-surface/40">
        <div className="flex items-center gap-2 bg-bg rounded-xl px-3 py-2">
          <span className="text-xs text-tx-3 flex-1">Respuesta automática en segundos...</span>
          <div className="flex gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse-dot" />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse-dot" style={{ animationDelay: '0.3s' }} />
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse-dot" style={{ animationDelay: '0.6s' }} />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function CRMMini({ compact = false }: { compact?: boolean }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: compact ? 1.0 : 1.2, duration: 0.6 }}
      className={`glass rounded-xl border border-border/70 p-4 ${!compact ? 'animate-float' : ''}`}
      style={!compact ? { animationDelay: '2s' } : {}}
    >
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-bold text-tx-1">Pipeline de ventas</span>
        <span className="text-xs text-brand-green font-semibold">+23% este mes</span>
      </div>
      <div className="flex gap-2">
        {[
          { label: 'Nuevo',      count: 12, color: 'bg-brand-cyan' },
          { label: 'Contactado', count: 8,  color: 'bg-brand-purple' },
          { label: 'Propuesta',  count: 5,  color: 'bg-yellow-400' },
          { label: 'Cerrado',    count: 3,  color: 'bg-brand-green' },
        ].map((col, i) => (
          <div key={i} className="flex-1 text-center">
            <div className={`h-1.5 rounded-full ${col.color} mb-1.5`} />
            <p className="text-xs font-bold text-tx-1">{col.count}</p>
            <p className="text-tx-3" style={{ fontSize: '9px' }}>{col.label}</p>
          </div>
        ))}
      </div>
    </motion.div>
  )
}

export function Hero() {
  const heroRef = useRef<HTMLElement>(null)
  const isDesktop = useMediaQuery('(min-width: 1024px)')

  const { scrollYProgress } = useScroll({
    target: heroRef,
    offset: ['start start', 'end start'],
  })

  // Parallax orbs — desktop only
  const orbY1 = useTransform(scrollYProgress, [0, 1], ['0%', '-28%'])
  const orbY2 = useTransform(scrollYProgress, [0, 1], ['0%', '-14%'])
  // Fade text content on desktop only — NOT applied to mobile mockup
  const contentOpacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section
      id="inicio"
      ref={heroRef}
      className="relative bg-bg overflow-hidden"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-hero-radial pointer-events-none" />

      {/* Parallax orbs — clipped inside section */}
      {isDesktop && (
        <>
          <motion.div
            style={{ y: orbY1 }}
            className="absolute top-20 right-[10%] w-[420px] h-[420px] rounded-full bg-brand-purple/10 blur-[90px] pointer-events-none"
          />
          <motion.div
            style={{ y: orbY2 }}
            className="absolute bottom-10 left-[10%] w-[320px] h-[320px] rounded-full bg-brand-cyan/8 blur-[70px] pointer-events-none"
          />
        </>
      )}

      {/* ── DESKTOP: two-column with opacity fade on scroll ── */}
      <motion.div
        style={isDesktop ? { opacity: contentOpacity } : undefined}
        className="hidden lg:block relative max-w-7xl mx-auto px-6 lg:px-8 pt-32 pb-20"
      >
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Left — copy */}
          <DesktopCopy />
          {/* Right — mockup */}
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-2 justify-end mb-2">
              <Zap size={12} className="text-brand-cyan" />
              <span className="text-xs text-tx-3 font-semibold">Respondido automáticamente en 2s</span>
            </div>
            <WAChatMockup />
            <CRMMini />
          </div>
        </div>
      </motion.div>

      {/* ── MOBILE: stacked, NO opacity fade ever ── */}
      <div className="lg:hidden relative max-w-xl mx-auto px-4 pt-24 pb-10">
        <MobileCopy />
        {/* Mockup — always at full opacity, never fades */}
        <div className="mt-8 space-y-3">
          <div className="flex items-center gap-2">
            <Zap size={12} className="text-brand-cyan" />
            <span className="text-xs text-tx-3 font-semibold">Respondido automáticamente en 2s</span>
          </div>
          <WAChatMockup compact />
          <CRMMini compact />
        </div>
      </div>
    </section>
  )
}

/* ── Shared copy blocks split to avoid duplication ── */

function DesktopCopy() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/8 border border-brand-cyan/20 mb-7"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse-dot" />
        <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
          Usado por +500 PyMEs mexicanas
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1, duration: 0.55 }}
        className="text-5xl lg:text-6xl font-black text-tx-1 leading-[1.05] tracking-tight mb-5"
      >
        Automatiza tu WhatsApp.
        <br />
        <span className="gradient-text">Cierra más ventas,</span>
        <br />
        sin contratar a nadie más.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 16 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.5 }}
        className="text-lg text-tx-2 mb-7 leading-relaxed max-w-xl"
      >
        Frace Solutions crea tu asistente IA personalizado conectado a Boosfy para responder,
        agendar, dar seguimiento y organizar tus ventas desde WhatsApp.
      </motion.p>

      <motion.ul
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.28, duration: 0.5 }}
        className="space-y-2.5 mb-9"
      >
        {TRUST_BULLETS.map((b, i) => (
          <li key={i} className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-full bg-brand-cyan/15 flex items-center justify-center flex-shrink-0">
              <Check size={11} className="text-brand-cyan" />
            </div>
            <span className="text-sm text-tx-2">{b}</span>
          </li>
        ))}
      </motion.ul>

      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.36, duration: 0.5 }}
        className="flex flex-row gap-4"
      >
        <CTAButtons />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5, duration: 0.5 }}
        className="flex items-center gap-4 mt-7"
      >
        <TrustAvatars />
      </motion.div>
    </div>
  )
}

function MobileCopy() {
  return (
    <div>
      <motion.div
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0, duration: 0.45 }}
        className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/8 border border-brand-cyan/20 mb-6"
      >
        <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse-dot" />
        <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
          +500 PyMEs mexicanas
        </span>
      </motion.div>

      <motion.h1
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.08, duration: 0.5 }}
        className="text-4xl sm:text-5xl font-black text-tx-1 leading-[1.08] tracking-tight mb-5"
      >
        Automatiza tu WhatsApp.
        <br />
        <span className="gradient-text">Cierra más ventas,</span>
        <br />
        sin contratar a nadie.
      </motion.h1>

      <motion.p
        initial={{ opacity: 0, y: 14 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.16, duration: 0.45 }}
        className="text-base text-tx-2 mb-7 leading-relaxed"
      >
        Asistente IA personalizado conectado a Boosfy para responder, agendar y organizar
        tus ventas desde WhatsApp.
      </motion.p>

      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.24, duration: 0.45 }}
        className="flex flex-col gap-3"
      >
        <CTAButtons />
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.38, duration: 0.45 }}
        className="flex items-center gap-4 mt-6"
      >
        <TrustAvatars />
      </motion.div>
    </div>
  )
}

function CTAButtons() {
  return (
    <>
      <a
        href={LINKS.calendly}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl bg-brand-cyan text-bg font-black text-base hover:bg-brand-cyan-dim transition-colors shadow-glow-cyan cursor-pointer"
      >
        <CalendarCheck size={18} />
        Agendar demo de 15 min
      </a>
      <a
        href={LINKS.whatsapp}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl border border-border-2 text-tx-2 font-bold text-base hover:border-brand-wa/40 hover:text-brand-wa transition-colors cursor-pointer"
      >
        {WA_ICON}
        WhatsApp
      </a>
    </>
  )
}

function TrustAvatars() {
  return (
    <>
      <div className="flex -space-x-2">
        {['CG', 'CM', 'DG', 'AR', 'LP'].map((init, i) => (
          <div
            key={i}
            className="w-7 h-7 rounded-full bg-surface border-2 border-bg flex items-center justify-center text-xs font-bold text-tx-2"
          >
            {init}
          </div>
        ))}
      </div>
      <div>
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <svg key={i} viewBox="0 0 12 12" fill="currentColor" className="w-3 h-3 text-yellow-400">
              <path d="M6 1l1.5 3 3.5.5-2.5 2.5.5 3.5L6 9 3 10.5l.5-3.5L1 4.5 4.5 4z" />
            </svg>
          ))}
        </div>
        <p className="text-xs text-tx-3 mt-0.5">+500 negocios automatizados</p>
      </div>
    </>
  )
}
