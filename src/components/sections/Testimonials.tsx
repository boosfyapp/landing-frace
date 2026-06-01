'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { TESTIMONIALS } from '@/lib/constants'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { cn } from '@/lib/utils'

const COLOR_MAP = {
  cyan: 'bg-brand-cyan/15 text-brand-cyan border-brand-cyan/20',
  purple: 'bg-brand-purple/15 text-brand-purple border-brand-purple/20',
  green: 'bg-brand-green/15 text-brand-green border-brand-green/20',
}

export function Testimonials() {
  const [active, setActive] = useState(0)
  const [direction, setDirection] = useState(1)

  const navigate = (dir: number) => {
    setDirection(dir)
    setActive((prev) => (prev + dir + TESTIMONIALS.length) % TESTIMONIALS.length)
  }

  const t = TESTIMONIALS[active]

  return (
    <section id="testimonios" className="py-24 lg:py-32 bg-bg overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="section-label mb-4">Clientes reales</span>
          <h2 className="text-3xl lg:text-5xl font-black text-tx-1 mt-4 tracking-tight">
            Lo que dicen
            <br />
            <span className="gradient-text">nuestros clientes</span>
          </h2>
        </ScrollReveal>

        <div className="hidden lg:grid lg:grid-cols-3 gap-6">
          {TESTIMONIALS.map((testimonial, i) => (
            <ScrollReveal key={i} delay={i * 0.12}>
              <div className="glass-card p-8 h-full flex flex-col">
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="flex-1 text-tx-2 text-sm leading-relaxed mb-6">
                  &ldquo;{testimonial.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border',
                      COLOR_MAP[testimonial.color as keyof typeof COLOR_MAP]
                    )}
                  >
                    {testimonial.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-tx-1">{testimonial.name}</p>
                    <p className="text-xs text-tx-3">
                      {testimonial.role} · {testimonial.company}
                    </p>
                  </div>
                </div>
              </div>
            </ScrollReveal>
          ))}
        </div>

        <div className="lg:hidden">
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={active}
                custom={direction}
                variants={{
                  enter: (dir: number) => ({ x: dir > 0 ? 280 : -280, opacity: 0 }),
                  center: { x: 0, opacity: 1 },
                  exit: (dir: number) => ({ x: dir < 0 ? 280 : -280, opacity: 0 }),
                }}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.3, ease: 'easeInOut' }}
                className="glass-card p-8"
              >
                <div className="flex gap-0.5 mb-5">
                  {Array.from({ length: 5 }).map((_, j) => (
                    <Star key={j} size={14} className="text-yellow-400 fill-yellow-400" />
                  ))}
                </div>
                <blockquote className="text-tx-2 text-sm leading-relaxed mb-6">
                  &ldquo;{t.text}&rdquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div
                    className={cn(
                      'w-10 h-10 rounded-full flex items-center justify-center text-sm font-black border',
                      COLOR_MAP[t.color as keyof typeof COLOR_MAP]
                    )}
                  >
                    {t.avatar}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-tx-1">{t.name}</p>
                    <p className="text-xs text-tx-3">
                      {t.role} · {t.company}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="flex items-center justify-center gap-4 mt-6">
            <button
              onClick={() => navigate(-1)}
              className="p-2 rounded-full glass border border-border hover:border-brand-cyan/40 transition-colors cursor-pointer"
              aria-label="Anterior testimonio"
            >
              <ChevronLeft size={18} className="text-tx-2" />
            </button>
            <div className="flex gap-2">
              {TESTIMONIALS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > active ? 1 : -1)
                    setActive(i)
                  }}
                  className={cn(
                    'w-2 h-2 rounded-full transition-all cursor-pointer',
                    i === active ? 'bg-brand-cyan w-6' : 'bg-border'
                  )}
                  aria-label={`Ir al testimonio ${i + 1}`}
                />
              ))}
            </div>
            <button
              onClick={() => navigate(1)}
              className="p-2 rounded-full glass border border-border hover:border-brand-cyan/40 transition-colors cursor-pointer"
              aria-label="Siguiente testimonio"
            >
              <ChevronRight size={18} className="text-tx-2" />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
