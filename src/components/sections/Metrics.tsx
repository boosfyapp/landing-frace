import { METRICS } from '@/lib/constants'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function Metrics() {
  return (
    <section className="py-24 lg:py-32 bg-bg relative overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-brand-cyan/4 blur-[120px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="section-label mb-4">Resultados reales</span>
          <h2 className="text-3xl lg:text-5xl font-black text-tx-1 mt-4 tracking-tight">
            Los números hablan
          </h2>
          <p className="text-tx-2 mt-4 text-lg max-w-2xl mx-auto">
            Datos promedio de nuestros más de 500 clientes activos en México.
          </p>
        </ScrollReveal>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {METRICS.map((metric, i) => (
            <ScrollReveal key={i} delay={i * 0.1}>
              <div className="glass-card p-6 lg:p-8 text-center hover:border-brand-cyan/20">
                <div className="text-4xl lg:text-6xl font-black mb-2 gradient-text tabular-nums">
                  <AnimatedNumber
                    target={metric.value}
                    suffix={metric.suffix}
                    duration={2000}
                  />
                </div>
                <div className="text-sm lg:text-base font-semibold text-tx-1 mb-1">
                  {metric.label}
                </div>
                <div className="text-xs text-tx-3">{metric.desc}</div>
              </div>
            </ScrollReveal>
          ))}
        </div>
      </div>
    </section>
  )
}
