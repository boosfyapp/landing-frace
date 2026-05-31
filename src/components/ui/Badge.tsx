import { cn } from '@/lib/utils'

interface BadgeProps {
  children: React.ReactNode
  className?: string
  variant?: 'cyan' | 'purple' | 'green' | 'wa'
}

const variants = {
  cyan: 'bg-brand-cyan/10 text-brand-cyan border-brand-cyan/20',
  purple: 'bg-brand-purple/10 text-brand-purple border-brand-purple/20',
  green: 'bg-brand-green/10 text-brand-green border-brand-green/20',
  wa: 'bg-brand-wa/10 text-brand-wa border-brand-wa/20',
}

export function Badge({ children, className, variant = 'cyan' }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold border',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
