'use client'
import React, { useRef, useEffect } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { Bot, Send, Users, BarChart2, MessageSquare, Zap, Bell } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

// ── Types ──────────────────────────────────────────────────────────────────────
type Scene = 'pipeline' | 'broadcast' | 'chat'
type ColIdx = 0 | 1 | 2 | 3

// ── Static data ───────────────────────────────────────────────────────────────
const COLS = ['Nuevo', 'Contactado', 'Propuesta', 'Cerrado'] as const
const COL_STYLE = [
  { text: 'text-brand-cyan',   bg: 'bg-brand-cyan/10',   border: 'border-brand-cyan/20'   },
  { text: 'text-brand-purple', bg: 'bg-brand-purple/10', border: 'border-brand-purple/20' },
  { text: 'text-yellow-400',   bg: 'bg-yellow-400/10',   border: 'border-yellow-400/20'   },
  { text: 'text-brand-green',  bg: 'bg-brand-green/10',  border: 'border-brand-green/20'  },
]
const CARDS = [
  { id: 'c1', name: 'María G.',   amount: '$8,500',  initCol: 0 as ColIdx },
  { id: 'c2', name: 'Roberto T.', amount: '$12,000', initCol: 0 as ColIdx },
  { id: 'c3', name: 'Karla M.',   amount: '$15,500', initCol: 1 as ColIdx },
  { id: 'c4', name: 'Luis H.',    amount: '$22,000', initCol: 2 as ColIdx },
]
const CHAT_MSGS = [
  { side: 'left',  text: 'Hola, me interesa el servicio. ¿Tienen disponibilidad?',       time: '10:42', isAI: false },
  { side: 'right', text: '¡Hola! Claro que sí. ¿Para cuántas personas lo necesitas?',   time: '10:42', isAI: true  },
  { side: 'left',  text: 'Para 3 personas, el próximo viernes si pueden.',                time: '10:43', isAI: false },
  { side: 'right', text: 'Perfecto, tenemos espacio el viernes 3pm. ¿Tu nombre?',        time: '10:43', isAI: true  },
  { side: 'left',  text: 'Ana Lucía Ramos',                                               time: '10:43', isAI: false },
  { side: 'right', text: '✅ Cita agendada, Ana Lucía — viernes 3pm. Recibirás recordatorio automático 🔔', time: '10:44', isAI: true },
]

// ── Scene label shown at top ───────────────────────────────────────────────────
const SCENE_LABELS: Record<Scene, string> = {
  pipeline:  'Pipeline de ventas en tiempo real',
  broadcast: 'Envío masivo de mensajes',
  chat:      'Asistente IA respondiendo',
}

// ── KanbanCard ─────────────────────────────────────────────────────────────────
function KanbanCard({ card, col, highlighted }: {
  card: typeof CARDS[0]
  col: ColIdx
  highlighted: boolean
}) {
  const s = COL_STYLE[col]
  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: -10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.92 }}
      transition={{ duration: 0.32 }}
      className={`bg-surface rounded-lg p-2 border transition-all duration-300 ${
        highlighted
          ? 'border-brand-cyan/70 shadow-[0_0_14px_rgba(34,211,238,0.22)]'
          : 'border-border/50'
      }`}
    >
      <div className="flex items-center gap-1.5 mb-1.5">
        <div className={`w-5 h-5 rounded-full flex items-center justify-center text-xs font-bold flex-shrink-0 ${s.bg} ${s.text}`}>
          {card.name[0]}
        </div>
        <span className="text-xs font-semibold text-tx-1 truncate">{card.name}</span>
      </div>
      <div className={`text-xs px-1.5 py-0.5 rounded mb-1 inline-block ${s.bg} ${s.text}`}>
        {col === 3 ? '✓ Ganado' : ['Lead', 'Contactado', 'En propuesta'][col]}
      </div>
      <div className="text-xs font-bold text-tx-1">{card.amount}</div>
    </motion.div>
  )
}

// ── Main component ─────────────────────────────────────────────────────────────
export function BoosifyMockup() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const started    = useRef(false)
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null)
  const inView = useInView(wrapperRef, { once: true, margin: '0px 0px -100px 0px' })

  // ── State ──────────────────────────────────────────────────────────────────
  const [scene, setScene]               = React.useState<Scene>('pipeline')
  const [activeNav, setActiveNav]       = React.useState<Scene>('pipeline')
  const [positions, setPositions]       = React.useState<Record<string, ColIdx>>(
    Object.fromEntries(CARDS.map(c => [c.id, c.initCol])) as Record<string, ColIdx>
  )
  const [highlighted, setHighlighted]   = React.useState<string | null>(null)
  const [broadcastPct, setBroadcastPct] = React.useState(0)
  const [broadcastDone, setBroadcastDone] = React.useState(false)
  const [chatCount, setChatCount]       = React.useState(0)
  const [showTyping, setShowTyping]     = React.useState(false)
  const [notification, setNotification] = React.useState<string | null>(null)

  // ── Move a card between columns ────────────────────────────────────────────
  const moveCard = (id: string, to: ColIdx) => {
    setHighlighted(id)
    const t1 = setTimeout(() => {
      setPositions(p => ({ ...p, [id]: to }))
      setHighlighted(null)
      // Pop a notification when a card is closed
      if (to === 3) {
        setNotification('🎉 ¡Trato cerrado! +$22,000 MXN')
        setTimeout(() => setNotification(null), 2500)
      }
    }, 900)
    return t1
  }

  // ── Animation timeline ─────────────────────────────────────────────────────
  useEffect(() => {
    if (!inView || started.current) return
    started.current = true

    const timers: ReturnType<typeof setTimeout>[] = []
    const t = (ms: number, fn: () => void) => { const id = setTimeout(fn, ms); timers.push(id); return id }

    // Scene 1 — Pipeline (0–7s)
    t(700,  () => moveCard('c1', 1))   // Nuevo → Contactado
    t(2800, () => moveCard('c3', 2))   // Contactado → Propuesta
    t(4800, () => moveCard('c4', 3))   // Propuesta → Cerrado

    // Scene 2 — Broadcast (7.2s)
    t(7200, () => {
      setScene('broadcast')
      setActiveNav('broadcast')
      // Animate progress via interval
      let pct = 0
      intervalRef.current = setInterval(() => {
        pct += 1
        setBroadcastPct(pct)
        if (pct >= 100) {
          clearInterval(intervalRef.current!)
          intervalRef.current = null
        }
      }, 27)
    })
    t(10000, () => setBroadcastDone(true))

    // Scene 3 — Chat IA (12s)
    t(12000, () => { setScene('chat'); setActiveNav('chat') })

    // Chat messages timed sequence
    const chatBase = 12000
    const chatDelays = [400, 1600, 2800, 4000, 5000, 6200]
    CHAT_MSGS.forEach((msg, i) => {
      if (msg.isAI) {
        t(chatBase + chatDelays[i],       () => setShowTyping(true))
        t(chatBase + chatDelays[i] + 800, () => { setShowTyping(false); setChatCount(i + 1) })
      } else {
        t(chatBase + chatDelays[i], () => setChatCount(i + 1))
      }
    })

    return () => {
      timers.forEach(clearTimeout)
      if (intervalRef.current) clearInterval(intervalRef.current)
    }
  }, [inView])

  const cardsInCol = (col: ColIdx) => CARDS.filter(c => positions[c.id] === col)

  return (
    <section id="crm" className="py-24 lg:py-32 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="section-label mb-4">CRM Boosfy incluido</span>
          <h2 className="text-3xl lg:text-5xl font-black text-tx-1 mt-4 tracking-tight leading-tight">
            Todo tu negocio en
            <br />
            <span className="gradient-text">una sola pantalla</span>
          </h2>
          <p className="text-tx-2 mt-4 text-lg max-w-2xl mx-auto">
            Boosfy es el CRM para WhatsApp incluido en todos tus planes. Pipeline, envíos masivos
            y asistente IA desde un solo lugar.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div
            ref={wrapperRef}
            className="rounded-2xl border border-border/60 overflow-hidden bg-bg-2 shadow-[0_32px_80px_rgba(0,0,0,0.6)] select-none"
            style={{ pointerEvents: 'none' }}
          >
            {/* Browser chrome */}
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/60 bg-surface/50">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/70" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
                <div className="w-3 h-3 rounded-full bg-green-500/70" />
              </div>
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-bg text-xs text-tx-3">
                  <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse-dot" />
                  app.boosfy.com
                </div>
              </div>
              {/* Scene label */}
              <AnimatePresence mode="wait">
                <motion.span
                  key={scene}
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: 4 }}
                  transition={{ duration: 0.2 }}
                  className="text-xs text-brand-cyan font-semibold hidden sm:block"
                >
                  {SCENE_LABELS[scene]}
                </motion.span>
              </AnimatePresence>
            </div>

            {/* App shell */}
            <div className="flex" style={{ height: '420px' }}>

              {/* Sidebar */}
              <div className="w-12 lg:w-14 bg-bg border-r border-border/60 flex flex-col items-center py-4 gap-3 flex-shrink-0">
                {([
                  { id: 'pipeline',  Icon: BarChart2    },
                  { id: 'broadcast', Icon: Send          },
                  { id: 'chat',      Icon: MessageSquare },
                  { id: 'users',     Icon: Users         },
                ] as { id: Scene | 'users'; Icon: React.ComponentType<{ size?: number; className?: string }> }[]).map(({ id, Icon }) => (
                  <div
                    key={id}
                    className={`w-7 h-7 lg:w-8 lg:h-8 rounded-lg flex items-center justify-center transition-colors duration-300 ${
                      activeNav === id ? 'bg-brand-cyan/20 text-brand-cyan' : 'text-tx-3'
                    }`}
                  >
                    <Icon size={15} />
                  </div>
                ))}
              </div>

              {/* Main panel */}
              <div className="flex-1 overflow-hidden relative">

                {/* Notification toast */}
                <AnimatePresence>
                  {notification && (
                    <motion.div
                      initial={{ opacity: 0, y: -16, x: '-50%' }}
                      animate={{ opacity: 1, y: 8,   x: '-50%' }}
                      exit={{ opacity: 0, y: -16,    x: '-50%' }}
                      transition={{ duration: 0.3 }}
                      className="absolute top-0 left-1/2 z-10 bg-brand-green/90 text-bg text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2"
                    >
                      <Bell size={11} />
                      {notification}
                    </motion.div>
                  )}
                </AnimatePresence>

                <AnimatePresence mode="wait">

                  {/* ── Scene 1: Pipeline ── */}
                  {scene === 'pipeline' && (
                    <motion.div
                      key="pipeline"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 flex flex-col"
                    >
                      <div className="px-4 py-2.5 border-b border-border/60 flex items-center justify-between flex-shrink-0">
                        <h4 className="text-xs font-bold text-tx-1">Pipeline de Ventas</h4>
                        <div className="flex items-center gap-1.5 text-xs text-tx-3">
                          <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                          {CARDS.length} leads activos
                        </div>
                      </div>

                      <div className="flex gap-2 p-3 flex-1 overflow-hidden">
                        {([0, 1, 2, 3] as ColIdx[]).map(col => {
                          const s = COL_STYLE[col]
                          const cards = cardsInCol(col)
                          return (
                            <div key={col} className="flex-1 min-w-0 flex flex-col">
                              <div className={`flex items-center gap-1 mb-2 px-2 py-1 rounded-md ${s.bg} border ${s.border} flex-shrink-0`}>
                                <span className={`text-xs font-bold ${s.text} truncate`}>{COLS[col]}</span>
                                <span className={`text-xs ${s.text} opacity-70 flex-shrink-0`}>{cards.length}</span>
                              </div>
                              <div className="space-y-1.5 flex-1">
                                <AnimatePresence>
                                  {cards.map(card => (
                                    <KanbanCard
                                      key={card.id}
                                      card={card}
                                      col={col}
                                      highlighted={highlighted === card.id}
                                    />
                                  ))}
                                </AnimatePresence>
                              </div>
                            </div>
                          )
                        })}
                      </div>
                    </motion.div>
                  )}

                  {/* ── Scene 2: Broadcast ── */}
                  {scene === 'broadcast' && (
                    <motion.div
                      key="broadcast"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 flex flex-col p-4 gap-3"
                    >
                      <div className="flex items-center justify-between">
                        <h4 className="text-xs font-bold text-tx-1">Envío Masivo</h4>
                        <div className={`text-xs px-2.5 py-1 rounded-full font-bold transition-colors duration-500 ${
                          broadcastDone ? 'bg-brand-green/15 text-brand-green' : 'bg-brand-cyan/15 text-brand-cyan'
                        }`}>
                          {broadcastDone ? '✓ Completado' : '⟳ Enviando...'}
                        </div>
                      </div>

                      {/* Campaign card */}
                      <div className="glass rounded-xl p-4 border border-border/60">
                        <div className="flex items-center gap-3 mb-4">
                          <div className="w-9 h-9 rounded-xl bg-brand-purple/20 flex items-center justify-center flex-shrink-0">
                            <Send size={15} className="text-brand-purple" />
                          </div>
                          <div>
                            <p className="text-xs font-bold text-tx-1">Promoción Junio 2026</p>
                            <p className="text-xs text-tx-3">847 contactos · WhatsApp Business</p>
                          </div>
                        </div>

                        {/* Progress */}
                        <div className="mb-3">
                          <div className="flex justify-between text-xs mb-1.5">
                            <span className="text-tx-3">Progreso de envío</span>
                            <span className="font-bold text-brand-cyan tabular-nums">{broadcastPct}%</span>
                          </div>
                          <div className="h-2 bg-surface-2 rounded-full overflow-hidden">
                            <motion.div
                              className="h-full rounded-full bg-gradient-to-r from-brand-purple to-brand-cyan"
                              style={{ width: `${broadcastPct}%` }}
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between text-xs">
                          <span className="text-tx-3">Mensajes enviados</span>
                          <span className="font-black text-tx-1 tabular-nums">
                            {Math.round(broadcastPct * 8.47)}{' '}
                            <span className="text-tx-3 font-normal">/ 847</span>
                          </span>
                        </div>
                      </div>

                      {/* Stats */}
                      <AnimatePresence>
                        {broadcastDone && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.4 }}
                            className="grid grid-cols-3 gap-2"
                          >
                            {[
                              { label: 'Entregados', value: '847', color: 'text-brand-cyan',   bg: 'bg-brand-cyan/8'   },
                              { label: 'Abiertos',   value: '412', color: 'text-brand-purple', bg: 'bg-brand-purple/8' },
                              { label: 'Respuestas', value: '156', color: 'text-brand-green',  bg: 'bg-brand-green/8'  },
                            ].map((stat, i) => (
                              <motion.div
                                key={stat.label}
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: i * 0.1, duration: 0.3 }}
                                className={`${stat.bg} rounded-xl p-3 text-center border border-border/40`}
                              >
                                <p className={`text-base font-black ${stat.color} tabular-nums`}>{stat.value}</p>
                                <p className="text-xs text-tx-3 mt-0.5">{stat.label}</p>
                              </motion.div>
                            ))}
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </motion.div>
                  )}

                  {/* ── Scene 3: Chat IA ── */}
                  {scene === 'chat' && (
                    <motion.div
                      key="chat"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.25 }}
                      className="absolute inset-0 flex flex-col"
                    >
                      {/* Chat header */}
                      <div className="px-4 py-2.5 border-b border-border/60 flex items-center gap-3 flex-shrink-0">
                        <div className="w-7 h-7 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan text-xs font-bold flex-shrink-0">
                          A
                        </div>
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-tx-1">Ana Lucía Ramos</p>
                          <div className="flex items-center gap-1">
                            <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                            <p className="text-xs text-tx-3">En línea</p>
                          </div>
                        </div>
                        <div className="flex items-center gap-1.5 text-xs bg-brand-cyan/12 text-brand-cyan px-2.5 py-1 rounded-full font-bold flex-shrink-0">
                          <Bot size={10} />
                          IA activa
                        </div>
                      </div>

                      {/* Messages */}
                      <div className="flex-1 p-3 space-y-2 overflow-hidden">
                        {CHAT_MSGS.slice(0, chatCount).map((msg, i) => (
                          <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.25 }}
                            className={`flex ${msg.side === 'right' ? 'justify-end' : 'justify-start'}`}
                          >
                            <div
                              className={`max-w-[80%] rounded-2xl px-3 py-2 ${
                                msg.side === 'right'
                                  ? 'bg-brand-cyan/15 rounded-tr-sm'
                                  : 'bg-surface rounded-tl-sm'
                              }`}
                            >
                              {msg.isAI && (
                                <div className="flex items-center gap-1 mb-1">
                                  <Bot size={9} className="text-brand-cyan" />
                                  <span className="text-brand-cyan" style={{ fontSize: '8px', fontWeight: 800 }}>IA</span>
                                </div>
                              )}
                              <p className="text-xs text-tx-1 leading-relaxed">{msg.text}</p>
                              <p className="text-right text-tx-3 mt-0.5" style={{ fontSize: '8px' }}>{msg.time}</p>
                            </div>
                          </motion.div>
                        ))}

                        {/* Typing indicator */}
                        <AnimatePresence>
                          {showTyping && (
                            <motion.div
                              initial={{ opacity: 0, y: 8 }}
                              animate={{ opacity: 1, y: 0 }}
                              exit={{ opacity: 0 }}
                              transition={{ duration: 0.2 }}
                              className="flex justify-end"
                            >
                              <div className="bg-brand-cyan/15 rounded-2xl rounded-tr-sm px-3 py-2">
                                <div className="flex items-center gap-1 mb-1">
                                  <Bot size={9} className="text-brand-cyan" />
                                  <span className="text-brand-cyan" style={{ fontSize: '8px', fontWeight: 800 }}>IA</span>
                                </div>
                                <div className="flex gap-1 items-center" style={{ height: '12px' }}>
                                  {[0, 1, 2].map(i => (
                                    <span
                                      key={i}
                                      className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse-dot"
                                      style={{ animationDelay: `${i * 0.25}s` }}
                                    />
                                  ))}
                                </div>
                              </div>
                            </motion.div>
                          )}
                        </AnimatePresence>
                      </div>

                      {/* Input bar (decorative) */}
                      <div className="px-3 py-2 border-t border-border/60 bg-surface/40 flex-shrink-0">
                        <div className="flex items-center gap-2 bg-bg rounded-xl px-3 py-2">
                          <span className="text-xs text-tx-3 flex-1">Respuesta automática activa...</span>
                          <div className="flex gap-1">
                            {[0, 1, 2].map(i => (
                              <span
                                key={i}
                                className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse-dot"
                                style={{ animationDelay: `${i * 0.3}s` }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  )}

                </AnimatePresence>
              </div>
            </div>

            {/* Status bar with scene indicator dots */}
            <div className="px-5 py-2 border-t border-border/60 bg-surface/30 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1.5">
                  <Zap size={10} className="text-brand-cyan" />
                  <span className="text-xs text-brand-cyan font-semibold">IA activa</span>
                </div>
                <AnimatePresence mode="wait">
                  <motion.span
                    key={scene}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="text-xs text-tx-3 hidden sm:block"
                  >
                    {scene === 'pipeline'  && '3 tarjetas en movimiento'}
                    {scene === 'broadcast' && `${Math.round(broadcastPct * 8.47)} mensajes enviados`}
                    {scene === 'chat'      && 'Agendando cita automáticamente'}
                  </motion.span>
                </AnimatePresence>
              </div>
              <div className="flex gap-1.5 items-center">
                {(['pipeline', 'broadcast', 'chat'] as Scene[]).map(s => (
                  <div
                    key={s}
                    className={`h-1.5 rounded-full transition-all duration-500 ${
                      scene === s ? 'bg-brand-cyan w-5' : 'bg-border w-1.5'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
