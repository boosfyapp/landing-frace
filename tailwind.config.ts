import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      colors: {
        bg: {
          DEFAULT: '#050C16',
          2: '#080F1C',
          3: '#0C1526',
        },
        surface: {
          DEFAULT: '#101E30',
          2: '#152638',
        },
        border: {
          DEFAULT: '#1B3250',
          2: '#224160',
        },
        brand: {
          cyan: '#22D3EE',
          'cyan-dim': '#0EA5C9',
          purple: '#A855F7',
          'purple-dim': '#7C3AED',
          green: '#10B981',
          'green-dim': '#059669',
          wa: '#25D366',
        },
        tx: {
          1: '#EDF4FF',
          2: '#8BA5C2',
          3: '#4B6A88',
        },
      },
      backgroundImage: {
        'gradient-brand': 'linear-gradient(135deg, #A855F7 0%, #22D3EE 100%)',
        'gradient-cyan-green': 'linear-gradient(135deg, #22D3EE 0%, #10B981 100%)',
        'hero-radial': `radial-gradient(ellipse 70% 55% at 60% 30%, rgba(168,85,247,0.12) 0%, transparent 65%), radial-gradient(ellipse 50% 40% at 20% 80%, rgba(34,211,238,0.08) 0%, transparent 55%)`,
      },
      keyframes: {
        'pulse-dot': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.3' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-8px)' },
        },
        'glow-pulse': {
          '0%, 100%': { boxShadow: '0 0 20px rgba(34,211,238,0.12)' },
          '50%': { boxShadow: '0 0 40px rgba(34,211,238,0.28)' },
        },
      },
      animation: {
        'pulse-dot': 'pulse-dot 2s ease-in-out infinite',
        float: 'float 4s ease-in-out infinite',
        'glow-pulse': 'glow-pulse 3s ease-in-out infinite',
      },
      boxShadow: {
        'glow-cyan': '0 0 32px rgba(34,211,238,0.14), 0 1px 0 rgba(34,211,238,0.08) inset',
        'glow-purple': '0 0 32px rgba(168,85,247,0.14), 0 1px 0 rgba(168,85,247,0.08) inset',
        'glow-green': '0 0 32px rgba(16,185,129,0.14), 0 1px 0 rgba(16,185,129,0.08) inset',
        'card-hover': '0 8px 40px rgba(0,0,0,0.45)',
      },
      screens: {
        xs: '480px',
      },
    },
  },
  plugins: [],
}

export default config
