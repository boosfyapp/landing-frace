'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  MessageSquare,
  LayoutDashboard,
  Bot,
  QrCode,
  Send,
  CalendarCheck,
  RefreshCw,
  Bell,
  Webhook,
  type LucideIcon,
} from 'lucide-react'
import { FEATURES } from '@/lib/constants'
import { ScrollReveal } from '@/components/ui/ScrollReveal'

const ICON_MAP: Record<string, LucideIcon> = {
  MessageSquare,
  LayoutDashboard,
  Bot,
  QrCode,
  Send,
  CalendarCheck,
  RefreshCw,
  Bell,
  Webhook,
}

const COLOR_MAP = {
  cyan: {
    bg: 'bg-brand-cyan/10',
    icon: 'text-brand-cyan',
    glow: 'rgba(34,211,238,0.25)',
  },
  purple: {
    bg: 'bg-brand-purple/10',
    icon: 'text-brand-purple',
    glow: 'rgba(168,85,247,0.25)',
  },
  green: {
    bg: 'bg-brand-green/10',
    icon: 'text-brand-green',
    glow: 'rgba(16,185,129,0.25)',
  },
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.07 } },
}

const itemVariants = {
  hidden: { opacity: 0, y: 24, scale: 0.97 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: { duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] },
  },
}

export function Features() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px 0px' })

  return (
    <section id="funciones" className="py-24 lg:py-32 bg-bg-2 overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <ScrollReveal className="text-center mb-16">
          <span className="section-label mb-4">Todo incluido</span>
          <h2 className="text-3xl lg:text-5xl font-black text-tx-1 mt-4 tracking-tight leading-tight">
            Un solo sistema.
            <br />
            <span className="gradient-text">Todo lo que necesitas.</span>
          </h2>
          <p className="text-tx-2 mt-4 text-lg max-w-2xl mx-auto">
            Boosfy reúne todas las herramientas que tu negocio necesita para automatizar, vender y crecer.
          </p>
        </ScrollReveal>

        <motion.div
          ref={ref}
          variants={containerVariants}
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5"
        >
          {FEATURES.map((feature, i) => {
            const Icon = ICON_MAP[feature.icon]
            const colors = COLOR_MAP[feature.color as keyof typeof COLOR_MAP]

            return (
              <motion.div key={i} variants={itemVariants}>
                <motion.div
                  whileHover={{ y: -4, scale: 1.015 }}
                  transition={{ type: 'spring', stiffness: 400, damping: 20 }}
                  className="glass-card p-7 h-full cursor-default"
                >
                  <motion.div
                    whileHover={{ boxShadow: `0 0 28px ${colors.glow}` }}
                    className={`w-11 h-11 rounded-xl ${colors.bg} flex items-center justify-center mb-5 transition-shadow`}
                  >
                    {Icon && <Icon size={20} className={colors.icon} />}
                  </motion.div>
                  <h3 className="font-bold text-tx-1 mb-2">{feature.title}</h3>
                  <p className="text-sm text-tx-2 leading-relaxed">{feature.desc}</p>
                </motion.div>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </section>
  )
}
