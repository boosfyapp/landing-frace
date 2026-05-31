'use client'
import { cn } from '@/lib/utils'
import { motion } from 'framer-motion'
import type { ComponentPropsWithoutRef } from 'react'

type Variant = 'primary' | 'whatsapp' | 'ghost' | 'outline'
type Size = 'sm' | 'md' | 'lg'

interface ButtonProps extends ComponentPropsWithoutRef<'a'> {
  variant?: Variant
  size?: Size
}

const sizes: Record<Size, string> = {
  sm: 'px-4 py-2.5 text-sm',
  md: 'px-6 py-3 text-sm',
  lg: 'px-8 py-4 text-base',
}

const variants: Record<Variant, string> = {
  primary:
    'bg-brand-cyan text-bg font-bold hover:bg-brand-cyan-dim active:scale-95 shadow-glow-cyan',
  whatsapp:
    'bg-brand-wa text-white font-bold hover:opacity-90 active:scale-95',
  ghost:
    'bg-transparent text-tx-2 border border-border hover:text-tx-1 hover:bg-surface',
  outline:
    'bg-transparent text-brand-cyan border border-brand-cyan/35 hover:bg-brand-cyan/10',
}

export function Button({
  variant = 'primary',
  size = 'md',
  className,
  children,
  href,
  ...props
}: ButtonProps) {
  const base =
    'inline-flex items-center justify-center gap-2 rounded-xl whitespace-nowrap transition-all duration-200 cursor-pointer select-none'

  return (
    <motion.a
      href={href}
      whileHover={{ y: -1 }}
      whileTap={{ scale: 0.97 }}
      className={cn(base, sizes[size], variants[variant], className)}
      target="_blank"
      rel="noopener noreferrer"
      {...(props as object)}
    >
      {children}
    </motion.a>
  )
}
