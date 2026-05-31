import { XCircle, CheckCircle } from 'lucide-react'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const BEFORE = [
  'Pierdes leads mientras atiendes a un cliente',
  'Respondes WhatsApp manualmente 3+ horas/día',
  'Los prospectos se enfrían porque tardas en responder',
  'No tienes visibilidad de tu embudo de ventas',
  'Los seguimientos se olvidan y los clientes no regresan',
]

const AFTER = [
  'La IA responde al instante, las 24 horas del día',
  'Tu equipo atiende desde un CRM organizado',
  'Agenda citas automáticamente mientras duermes',
  'Pipeline Kanban con cada prospecto visible',
  'Recordatorios automáticos que reactivan clientes',
]

export function ProblemSolution() {
  return (
    <section id="problema" className="py-24 lg:py-32 bg-bg-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="section-label mb-4">La transformación</span>
          <h2 className="text-3xl lg:text-5xl font-black text-tx-1 mt-4 tracking-tight leading-tight">
            De caos a control
            <br />
            <span className="gradient-text">en menos de 24 horas</span>
          </h2>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-6 lg:gap-8">
          <ScrollReveal delay={0.1} direction="left">
            <div className="glass-card p-8 border-red-500/15 hover:border-red-500/25">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-red-500/10 flex items-center justify-center">
                  <XCircle size={18} className="text-red-400" />
                </div>
                <h3 className="text-lg font-bold text-tx-1">Sin Frace Solutions</h3>
              </div>
              <ul className="space-y-4">
                {BEFORE.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <XCircle size={16} className="text-red-400 flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-tx-2">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>

          <ScrollReveal delay={0.2} direction="right">
            <div className="glass-card p-8 border-brand-green/20 hover:border-brand-green/35">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-8 h-8 rounded-lg bg-brand-green/10 flex items-center justify-center">
                  <CheckCircle size={18} className="text-brand-green" />
                </div>
                <h3 className="text-lg font-bold text-tx-1">Con Frace Solutions</h3>
              </div>
              <ul className="space-y-4">
                {AFTER.map((item, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <CheckCircle size={16} className="text-brand-green flex-shrink-0 mt-0.5" />
                    <span className="text-sm text-tx-2">{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
