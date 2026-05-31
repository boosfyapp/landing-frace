import { ScrollReveal } from '@/components/ui/ScrollReveal'

const pipeline = [
  {
    label: 'Nuevo',
    color: 'text-brand-cyan',
    bg: 'bg-brand-cyan/10',
    border: 'border-brand-cyan/20',
    cards: [
      { name: 'María G.', tag: 'Lead frío', amount: '$3,500' },
      { name: 'Roberto T.', tag: 'Interesado', amount: '$8,000' },
    ],
  },
  {
    label: 'Contactado',
    color: 'text-brand-purple',
    bg: 'bg-brand-purple/10',
    border: 'border-brand-purple/20',
    cards: [
      { name: 'Karla M.', tag: 'Demo agendada', amount: '$12,500' },
      { name: 'Luis H.', tag: 'Seguimiento', amount: '$5,200' },
    ],
  },
  {
    label: 'Propuesta',
    color: 'text-yellow-400',
    bg: 'bg-yellow-400/10',
    border: 'border-yellow-400/20',
    cards: [
      { name: 'Ana R.', tag: 'Revisando', amount: '$18,000' },
    ],
  },
  {
    label: 'Cerrado',
    color: 'text-brand-green',
    bg: 'bg-brand-green/10',
    border: 'border-brand-green/20',
    cards: [
      { name: 'Pedro L.', tag: '¡Ganado!', amount: '$22,000' },
      { name: 'Diana F.', tag: '¡Ganado!', amount: '$9,800' },
    ],
  },
]

const conversation = [
  { side: 'left', text: 'Hola, quiero información sobre sus servicios', time: '10:31' },
  { side: 'right', text: '¡Hola! Con gusto. Somos una clínica dental. ¿Qué servicio te interesa?', time: '10:31', isAI: true },
  { side: 'left', text: 'Una limpieza dental. ¿Tienen disponibilidad esta semana?', time: '10:32' },
  { side: 'right', text: '¡Claro! Tenemos el jueves 10am y el viernes 3pm. ¿Cuál prefieres?', time: '10:32', isAI: true },
]

export function BoosifyMockup() {
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
            Boosfy es el CRM para WhatsApp que incluimos en todos los planes. Organiza prospectos, chats y ventas desde un solo lugar.
          </p>
        </ScrollReveal>

        <ScrollReveal>
          <div className="rounded-2xl border border-border/60 overflow-hidden bg-bg-2 shadow-[0_32px_80px_rgba(0,0,0,0.6)]">
            <div className="flex items-center gap-2 px-5 py-3 border-b border-border/60 bg-surface/50">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <div className="flex-1 flex justify-center">
                <div className="flex items-center gap-2 px-3 py-1 rounded-md bg-bg text-xs text-tx-3">
                  <div className="w-2 h-2 rounded-full bg-brand-green animate-pulse-dot" />
                  app.boosfy.com
                </div>
              </div>
            </div>

            <div className="flex h-[480px] lg:h-[520px]">
              <div className="w-12 lg:w-14 bg-bg border-r border-border/60 flex flex-col items-center py-4 gap-3">
                {['M', 'C', 'K', 'S'].map((l, i) => (
                  <div
                    key={i}
                    className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs font-bold transition-colors cursor-pointer ${i === 2 ? 'bg-brand-cyan/20 text-brand-cyan' : 'text-tx-3 hover:text-tx-2 hover:bg-surface'}`}
                  >
                    {l}
                  </div>
                ))}
              </div>

              <div className="flex-1 overflow-hidden">
                <div className="flex items-center justify-between px-4 py-3 border-b border-border/60">
                  <h4 className="text-xs font-bold text-tx-1">Pipeline de Ventas</h4>
                  <div className="flex items-center gap-1.5 text-xs text-tx-3">
                    <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                    7 leads activos
                  </div>
                </div>

                <div className="flex gap-3 p-3 overflow-x-auto h-full pb-6">
                  {pipeline.map((col, i) => (
                    <div key={i} className="flex-shrink-0 w-36 lg:w-44">
                      <div className={`flex items-center gap-1.5 mb-2 px-2 py-1 rounded-md ${col.bg} border ${col.border}`}>
                        <span className={`text-xs font-bold ${col.color}`}>{col.label}</span>
                        <span className={`text-xs ${col.color} opacity-70`}>{col.cards.length}</span>
                      </div>
                      <div className="space-y-2">
                        {col.cards.map((card, j) => (
                          <div key={j} className="bg-surface border border-border/60 rounded-lg p-2.5 cursor-pointer hover:border-brand-cyan/30 transition-colors">
                            <div className="flex items-center gap-1.5 mb-1.5">
                              <div className="w-5 h-5 rounded-full bg-brand-cyan/20 flex items-center justify-center text-brand-cyan text-xs font-bold">
                                {card.name[0]}
                              </div>
                              <span className="text-xs font-semibold text-tx-1 truncate">{card.name}</span>
                            </div>
                            <div className={`inline-block text-xs px-1.5 py-0.5 rounded ${col.bg} ${col.color} mb-1`}>
                              {card.tag}
                            </div>
                            <div className="text-xs font-bold text-tx-1">{card.amount}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="hidden lg:flex w-56 border-l border-border/60 flex-col">
                <div className="px-3 py-3 border-b border-border/60">
                  <div className="flex items-center gap-2">
                    <div className="w-6 h-6 rounded-full bg-brand-green/20 flex items-center justify-center text-brand-green text-xs font-bold">
                      A
                    </div>
                    <div>
                      <p className="text-xs font-semibold text-tx-1">Ana Rivera</p>
                      <div className="flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-brand-green" />
                        <p className="text-xs text-tx-3">En línea</p>
                      </div>
                    </div>
                    <div className="ml-auto">
                      <span className="text-xs bg-brand-cyan/15 text-brand-cyan px-1.5 py-0.5 rounded-full font-bold">IA</span>
                    </div>
                  </div>
                </div>

                <div className="flex-1 overflow-y-auto p-3 space-y-3">
                  {conversation.map((msg, i) => (
                    <div key={i} className={`flex ${msg.side === 'right' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-[85%] rounded-xl px-3 py-2 ${msg.side === 'right' ? 'bg-brand-cyan/15 text-tx-1' : 'bg-surface text-tx-2'}`}>
                        {msg.isAI && (
                          <div className="flex items-center gap-1 mb-1">
                            <span className="text-brand-cyan" style={{ fontSize: '8px', fontWeight: 800, letterSpacing: '0.1em', textTransform: 'uppercase' }}>IA</span>
                          </div>
                        )}
                        <p style={{ fontSize: '10px' }} className="leading-relaxed">{msg.text}</p>
                        <p style={{ fontSize: '8px' }} className="text-tx-3 mt-1 text-right">{msg.time}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="p-2 border-t border-border/60">
                  <div className="flex items-center gap-2 bg-surface rounded-lg px-3 py-2">
                    <span className="text-xs text-tx-3 flex-1">Escribe un mensaje...</span>
                    <div className="w-5 h-5 rounded-full bg-brand-cyan/20 flex items-center justify-center">
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" className="w-3 h-3 text-brand-cyan">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
