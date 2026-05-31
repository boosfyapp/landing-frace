import { Check, Zap } from 'lucide-react'
import { PLANS } from '@/lib/constants'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'

export function Pricing() {
  return (
    <section id="precios" className="py-24 lg:py-32 bg-bg-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="section-label mb-4">Planes y precios</span>
          <h2 className="text-3xl lg:text-5xl font-black text-tx-1 mt-4 tracking-tight">
            Elige el plan
            <br />
            <span className="gradient-text">perfecto para ti</span>
          </h2>
          <p className="text-tx-2 mt-4 text-lg max-w-2xl mx-auto">
            Sin contratos forzosos. Sin costos ocultos. Actívate hoy.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-3 gap-6 lg:gap-4 items-start">
          {PLANS.map((plan, i) => (
            <ScrollReveal key={plan.id} delay={i * 0.1}>
              <div
                className={cn(
                  'relative rounded-2xl p-8 transition-all duration-300',
                  plan.featured
                    ? 'bg-surface border border-brand-cyan/30 shadow-glow-cyan lg:scale-[1.04] lg:-my-2'
                    : 'glass border border-border hover:border-border-2'
                )}
              >
                {plan.badge && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <span className="inline-flex items-center gap-1.5 px-4 py-1.5 rounded-full bg-brand-cyan text-bg text-xs font-black whitespace-nowrap">
                      <Zap size={11} />
                      {plan.badge}
                    </span>
                  </div>
                )}

                <div className="mb-6">
                  <h3
                    className={cn(
                      'text-xl font-black mb-4',
                      plan.featured ? 'text-brand-cyan' : 'text-tx-1'
                    )}
                  >
                    {plan.name}
                  </h3>

                  <div className="space-y-1">
                    <div className="flex items-baseline gap-1">
                      <span className="text-tx-3 text-sm">$</span>
                      <span className="text-4xl font-black text-tx-1 tabular-nums">
                        {plan.setup.toLocaleString('es-MX')}
                      </span>
                      <span className="text-tx-3 text-sm">MXN</span>
                    </div>
                    <p className="text-xs text-tx-3">
                      Pago único de setup
                      {!plan.noMonthly && (
                        <>
                          {' '}
                          +{' '}
                          <span className="font-semibold text-tx-2">
                            ${plan.monthly} MXN/mes
                          </span>
                        </>
                      )}
                      {plan.noMonthly && (
                        <span className="font-semibold text-brand-green ml-1">
                          · Sin mensualidades
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <a
                  href={plan.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={cn(
                    'block w-full text-center py-3 px-4 rounded-xl text-sm font-bold transition-all duration-200 mb-8 cursor-pointer',
                    plan.featured
                      ? 'bg-brand-cyan text-bg hover:bg-brand-cyan-dim shadow-glow-cyan'
                      : 'border border-border-2 text-tx-2 hover:border-brand-cyan/40 hover:text-tx-1 hover:bg-surface'
                  )}
                >
                  {plan.featured ? 'Comenzar ahora →' : 'Elegir plan →'}
                </a>

                <ul className="space-y-3">
                  {plan.features.map((feature, j) => (
                    <li key={j} className="flex items-start gap-3">
                      <Check
                        size={15}
                        className={cn(
                          'flex-shrink-0 mt-0.5',
                          plan.featured ? 'text-brand-cyan' : 'text-brand-green'
                        )}
                      />
                      <span className="text-sm text-tx-2">{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal delay={0.4}>
          <p className="text-center text-xs text-tx-3 mt-10">
            Precios + IVA (16%) · Soporte por WhatsApp incluido en todos los planes · Activación en menos de 24h
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
