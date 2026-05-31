import { CalendarCheck } from 'lucide-react'
import { LINKS } from '@/lib/constants'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function FinalCTA() {
  return (
    <section
      id="contacto"
      className="relative py-24 lg:py-36 bg-bg-3 overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[400px] rounded-full bg-brand-cyan/6 blur-[100px]" />
        <div className="absolute top-1/2 left-1/3 -translate-y-1/2 w-[400px] h-[300px] rounded-full bg-brand-purple/6 blur-[80px]" />
      </div>

      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <ScrollReveal>
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-cyan/8 border border-brand-cyan/20 mb-8">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-cyan animate-pulse-dot" />
            <span className="text-brand-cyan text-xs font-bold uppercase tracking-widest">
              Empieza hoy mismo
            </span>
          </div>

          <h2 className="text-4xl lg:text-6xl font-black text-tx-1 leading-tight tracking-tight mb-6">
            Convierte WhatsApp en
            <br />
            <span className="gradient-text">tu mejor vendedor</span>
          </h2>

          <p className="text-lg text-tx-2 max-w-2xl mx-auto mb-10 leading-relaxed">
            Agenda una demo de 15 minutos y descubre cómo Frace Solutions puede automatizar
            tu atención, seguimiento y cierre de ventas. Sin complicaciones técnicas.
          </p>
        </ScrollReveal>

        <ScrollReveal delay={0.2}>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={LINKS.calendly}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-cyan text-bg text-base font-black hover:bg-brand-cyan-dim transition-colors shadow-glow-cyan cursor-pointer"
            >
              <CalendarCheck size={18} />
              Agendar demo de 15 min
            </a>
            <a
              href={LINKS.whatsapp}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-wa text-white text-base font-black hover:opacity-90 transition-opacity cursor-pointer"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5" aria-hidden="true">
                <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.890-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" />
              </svg>
              Hablar por WhatsApp
            </a>
          </div>

          <p className="mt-6 text-xs text-tx-3">
            Sin compromisos · Activación en 24h · Soporte incluido
          </p>
        </ScrollReveal>
      </div>
    </section>
  )
}
