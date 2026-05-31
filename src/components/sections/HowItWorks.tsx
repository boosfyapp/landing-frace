'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import { CalendarCheck } from 'lucide-react'
import { STEPS, LINKS } from '@/lib/constants'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

export function HowItWorks() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 0.8', 'end 0.4'],
  })
  const lineHeight = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])

  return (
    <section id="proceso" className="py-24 lg:py-32 bg-bg" ref={sectionRef}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="section-label mb-4">Implementación rápida</span>
          <h2 className="text-3xl lg:text-5xl font-black text-tx-1 mt-4 tracking-tight">
            Listo en menos de
            <br />
            <span className="gradient-text">24 horas</span>
          </h2>
          <p className="text-tx-2 mt-4 text-lg max-w-xl mx-auto">
            Sin conocimientos técnicos. Nuestro equipo se encarga de todo el proceso de activación.
          </p>
        </ScrollReveal>

        <div className="relative">
          <div className="absolute left-6 top-0 bottom-0 w-0.5 bg-border overflow-hidden hidden md:block">
            <motion.div
              style={{ height: lineHeight }}
              className="absolute top-0 left-0 w-full bg-gradient-to-b from-brand-cyan to-brand-purple"
            />
          </div>

          <div className="space-y-8">
            {STEPS.map((step, i) => (
              <ScrollReveal key={i} delay={i * 0.1}>
                <div className="flex gap-6 md:pl-16 relative">
                  <div className="absolute left-0 top-0 hidden md:flex">
                    <div className="w-12 h-12 rounded-full bg-bg border-2 border-border flex items-center justify-center relative z-10">
                      <span className="text-xs font-black gradient-text">{step.n}</span>
                    </div>
                  </div>
                  <div className="flex-1 glass-card p-6">
                    <div className="flex items-start gap-4">
                      <div className="md:hidden w-10 h-10 rounded-full bg-brand-cyan/10 flex items-center justify-center flex-shrink-0">
                        <span className="text-xs font-black text-brand-cyan">{step.n}</span>
                      </div>
                      <div>
                        <h3 className="font-bold text-tx-1 mb-1">{step.title}</h3>
                        <p className="text-sm text-tx-2 leading-relaxed">{step.desc}</p>
                      </div>
                    </div>
                  </div>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </div>

        <ScrollReveal delay={0.6} className="text-center mt-12">
          <a
            href={LINKS.calendly}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-brand-cyan text-bg font-black text-base hover:bg-brand-cyan-dim transition-colors shadow-glow-cyan cursor-pointer"
          >
            <CalendarCheck size={18} />
            Comenzar el proceso ahora
          </a>
        </ScrollReveal>
      </div>
    </section>
  )
}
