import { Check, Zap, MessageCircle, Star, Rocket, Gem, Shield, CreditCard } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { PLANS, LIFETIME_PLAN } from '@/lib/constants'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'

const PLAN_ICONS: Record<string, LucideIcon> = {
  starter: MessageCircle,
  pro: Star,
  ultimate: Rocket,
}

export function Pricing() {
  return (
    <section id="precios" className="py-24 lg:py-32 bg-bg-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="section-label mb-4">Planes y precios</span>
          <h2 className="text-3xl lg:text-5xl font-black text-tx-1 mt-4 tracking-tight">
            Elige el plan ideal para
            <br />
            <span className="gradient-text">automatizar tu WhatsApp</span>
          </h2>
          <p className="text-tx-2 mt-4 text-lg max-w-2xl mx-auto">
            Sin contratos forzosos. Cancela cuando quieras.
          </p>
        </ScrollReveal>

        {/* 3-column grid: Starter | PRO | Ultimate */}
        <div className="grid lg:grid-cols-3 gap-6 lg:gap-4 items-start">
          {PLANS.map((plan, i) => {
            const Icon = PLAN_ICONS[plan.id] ?? Star
            return (
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
                    <div
                      className={cn(
                        'w-12 h-12 rounded-xl flex items-center justify-center mb-4',
                        plan.featured
                          ? 'bg-brand-cyan/10 text-brand-cyan'
                          : 'bg-surface-2 text-tx-2'
                      )}
                    >
                      <Icon size={22} />
                    </div>

                    <h3
                      className={cn(
                        'text-xl font-black mb-1',
                        plan.featured ? 'text-brand-cyan' : 'text-tx-1'
                      )}
                    >
                      {plan.name}
                    </h3>
                    <p className="text-xs text-tx-3 mb-4">{plan.desc}</p>

                    <div className="space-y-1">
                      <div className="flex items-baseline gap-1">
                        <span className="text-tx-3 text-sm">$</span>
                        <span className="text-4xl font-black text-tx-1 tabular-nums">
                          {plan.setup.toLocaleString('es-MX')}
                        </span>
                        <span className="text-tx-3 text-sm">MXN</span>
                      </div>
                      <p className="text-xs text-tx-3">
                        Pago único de setup +{' '}
                        <span className="font-semibold text-tx-2">${plan.monthly} MXN/mes</span>
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
                    {plan.cta}
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
            )
          })}
        </div>

        {/* Lifetime — horizontal full-width card */}
        <ScrollReveal delay={0.4} className="mt-6">
          <div className="relative rounded-2xl border border-brand-purple/30 bg-surface shadow-glow-purple overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-r from-brand-purple/5 via-transparent to-brand-cyan/5 pointer-events-none" />
            <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-brand-purple/40 to-transparent" />

            <div className="relative p-8 flex flex-col lg:flex-row lg:items-center gap-8">
              {/* Left: icon + name + badge + desc */}
              <div className="lg:w-64 flex-shrink-0">
                <div className="w-12 h-12 rounded-xl bg-brand-purple/10 text-brand-purple flex items-center justify-center mb-3">
                  <Gem size={22} />
                </div>
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-xl font-black text-tx-1">{LIFETIME_PLAN.name}</h3>
                  <span className="px-2 py-0.5 rounded-full bg-brand-purple/20 text-brand-purple text-[10px] font-black uppercase tracking-wider">
                    {LIFETIME_PLAN.badge}
                  </span>
                </div>
                <p className="text-sm text-tx-3">{LIFETIME_PLAN.desc}</p>
              </div>

              {/* Center: features in 2 columns */}
              <div className="flex-1 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-2.5">
                {LIFETIME_PLAN.features.map((feature, j) => (
                  <div key={j} className="flex items-start gap-2">
                    <Check size={14} className="flex-shrink-0 mt-0.5 text-brand-purple" />
                    <span className="text-sm text-tx-2">{feature}</span>
                  </div>
                ))}
              </div>

              {/* Right: price + CTA */}
              <div className="lg:w-52 flex-shrink-0 flex flex-col items-start lg:items-end gap-3">
                <div className="lg:text-right">
                  <p className="text-3xl font-black text-tx-1">Consultar</p>
                  <p className="text-xs text-tx-3 mt-0.5">
                    Pago único personalizado
                    <br />
                    Sin mensualidades
                  </p>
                </div>
                <a
                  href={LIFETIME_PLAN.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center px-6 py-3 rounded-xl bg-brand-purple text-white text-sm font-bold transition-all duration-200 hover:bg-brand-purple-dim shadow-glow-purple cursor-pointer whitespace-nowrap w-full lg:w-auto"
                >
                  {LIFETIME_PLAN.cta}
                </a>
              </div>
            </div>
          </div>
        </ScrollReveal>

        {/* Trust markers */}
        <ScrollReveal delay={0.5}>
          <div className="flex flex-wrap justify-center items-center gap-4 sm:gap-8 mt-10 pt-8 border-t border-border">
            <span className="flex items-center gap-2 text-xs text-tx-3">
              <Shield size={14} className="text-brand-cyan" />
              Precios con IVA incluido
            </span>
            <span className="flex items-center gap-2 text-xs text-tx-3">
              <CreditCard size={14} className="text-brand-cyan" />
              Hasta 6 MSI con todas las tarjetas
            </span>
            <span className="flex items-center gap-2 text-xs text-tx-3">
              <MessageCircle size={14} className="text-brand-cyan" />
              Soporte por WhatsApp incluido
            </span>
            <span className="flex items-center gap-2 text-xs text-tx-3">
              <Zap size={14} className="text-brand-cyan" />
              Activación en menos de 24h
            </span>
          </div>
        </ScrollReveal>
      </div>
    </section>
  )
}
