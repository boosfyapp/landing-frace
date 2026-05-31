'use client'
import { useState, useMemo } from 'react'
import { CalendarCheck, TrendingUp, Clock, DollarSign } from 'lucide-react'
import { LINKS } from '@/lib/constants'
import { ScrollReveal } from '@/components/ui/ScrollReveal'
import { AnimatedNumber } from '@/components/ui/AnimatedNumber'
import { formatMXN } from '@/lib/utils'

interface SliderProps {
  label: string
  value: number
  min: number
  max: number
  step: number
  display: string
  onChange: (v: number) => void
}

function Slider({ label, value, min, max, step, display, onChange }: SliderProps) {
  return (
    <div className="space-y-3">
      <div className="flex justify-between items-baseline">
        <label className="text-xs font-semibold text-tx-2 uppercase tracking-wider">{label}</label>
        <span className="text-brand-cyan font-bold text-lg tabular-nums">{display}</span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        aria-label={label}
      />
      <div className="flex justify-between text-xs text-tx-3">
        <span>{min}</span>
        <span>{max}</span>
      </div>
    </div>
  )
}

export function ROICalculator() {
  const [leadsPerDay, setLeadsPerDay] = useState(20)
  const [avgTicket, setAvgTicket] = useState(5000)
  const [closeRate, setCloseRate] = useState(8)
  const [hoursOnWA, setHoursOnWA] = useState(3)

  const results = useMemo(() => {
    const days = 26
    const currentClose = closeRate / 100
    const boostedClose = Math.min(closeRate * 3.1, 60) / 100
    const current = leadsPerDay * days * currentClose * avgTicket
    const boosted = leadsPerDay * days * boostedClose * avgTicket
    const diff = boosted - current
    const hoursSaved = hoursOnWA * days * 0.85
    const proSetup = 7479
    const monthsToROI = diff > 0 ? Math.ceil(proSetup / diff) : 0
    return {
      current: Math.round(current),
      boosted: Math.round(boosted),
      diff: Math.round(diff),
      hoursSaved: Math.round(hoursSaved),
      boostedRate: Math.round(Math.min(closeRate * 3.1, 60) * 10) / 10,
      monthsToROI,
    }
  }, [leadsPerDay, avgTicket, closeRate, hoursOnWA])

  return (
    <section id="calculadora" className="py-24 lg:py-32 bg-bg-2">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="section-label mb-4">Calculadora ROI</span>
          <h2 className="text-3xl lg:text-5xl font-black text-tx-1 mt-4 tracking-tight">
            ¿Cuánto dinero estás
            <br />
            <span className="gradient-text">dejando ir cada mes?</span>
          </h2>
          <p className="text-tx-2 mt-4 text-lg max-w-2xl mx-auto">
            Ajusta los valores según tu negocio y ve el impacto real que Frace Solutions puede generar.
          </p>
        </ScrollReveal>

        <div className="grid lg:grid-cols-2 gap-8">
          <ScrollReveal direction="left">
            <div className="glass-card p-8 space-y-8">
              <h3 className="font-bold text-tx-1 text-lg mb-6">Tu situación actual</h3>
              <Slider
                label="Leads / contactos por día"
                value={leadsPerDay}
                min={5}
                max={200}
                step={1}
                display={`${leadsPerDay}`}
                onChange={setLeadsPerDay}
              />
              <Slider
                label="Valor promedio por cliente"
                value={avgTicket}
                min={500}
                max={100000}
                step={500}
                display={`$${avgTicket.toLocaleString('es-MX')} MXN`}
                onChange={setAvgTicket}
              />
              <Slider
                label="Tasa de cierre actual"
                value={closeRate}
                min={1}
                max={40}
                step={0.5}
                display={`${closeRate}%`}
                onChange={setCloseRate}
              />
              <Slider
                label="Horas en WhatsApp / día"
                value={hoursOnWA}
                min={0.5}
                max={8}
                step={0.5}
                display={`${hoursOnWA}h`}
                onChange={setHoursOnWA}
              />
            </div>
          </ScrollReveal>

          <ScrollReveal direction="right">
            <div className="space-y-4 h-full flex flex-col justify-center">
              <div className="grid grid-cols-2 gap-4">
                <div className="glass-card p-5 border-red-500/15">
                  <div className="flex items-center gap-2 mb-3">
                    <DollarSign size={14} className="text-red-400" />
                    <span className="text-xs font-semibold text-tx-3 uppercase tracking-wider">Sin Frace</span>
                  </div>
                  <div className="text-2xl font-black text-tx-1 tabular-nums">
                    <AnimatedNumber key={results.current} target={results.current} />
                  </div>
                  <p className="text-xs text-tx-3 mt-1">MXN / mes · cierre {closeRate}%</p>
                </div>

                <div className="glass-card p-5 border-brand-green/20">
                  <div className="flex items-center gap-2 mb-3">
                    <TrendingUp size={14} className="text-brand-green" />
                    <span className="text-xs font-semibold text-tx-3 uppercase tracking-wider">Con Frace</span>
                  </div>
                  <div className="text-2xl font-black text-brand-green tabular-nums">
                    <AnimatedNumber key={results.boosted} target={results.boosted} />
                  </div>
                  <p className="text-xs text-tx-3 mt-1">MXN / mes · cierre {results.boostedRate}%</p>
                </div>
              </div>

              <div className="glass-card p-6 border-brand-cyan/25 shadow-glow-cyan">
                <div className="text-center mb-4">
                  <p className="text-xs text-tx-3 uppercase tracking-wider mb-1">Ganancia extra estimada</p>
                  <div className="text-4xl font-black gradient-text tabular-nums">
                    +<AnimatedNumber key={results.diff} target={results.diff} />
                    <span className="text-lg"> MXN/mes</span>
                  </div>
                </div>
                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border/60">
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <Clock size={12} className="text-brand-cyan" />
                      <span className="text-xs text-tx-3">Horas recuperadas</span>
                    </div>
                    <div className="font-black text-tx-1">
                      <AnimatedNumber key={results.hoursSaved} target={results.hoursSaved} suffix="h/mes" />
                    </div>
                  </div>
                  <div className="text-center">
                    <div className="flex items-center justify-center gap-1 mb-1">
                      <TrendingUp size={12} className="text-brand-green" />
                      <span className="text-xs text-tx-3">ROI en</span>
                    </div>
                    <div className="font-black text-tx-1">
                      {results.monthsToROI <= 1 ? '1 mes' : `${results.monthsToROI} meses`}
                    </div>
                  </div>
                </div>
              </div>

              <a
                href={LINKS.calendly}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center gap-2 w-full py-4 rounded-xl bg-brand-cyan text-bg font-black text-sm hover:bg-brand-cyan-dim transition-colors shadow-glow-cyan cursor-pointer"
              >
                <CalendarCheck size={16} />
                Quiero estos resultados — Agendar demo
              </a>

              <p className="text-center text-xs text-tx-3">
                * Estimaciones basadas en promedios de clientes activos. Los resultados individuales pueden variar.
              </p>
            </div>
          </ScrollReveal>
        </div>
      </div>
    </section>
  )
}
