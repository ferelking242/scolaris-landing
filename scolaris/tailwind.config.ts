import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: ['class'],
  content: [
    './app/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'sco-bg':       'var(--sco-bg)',
        'sco-bg2':      'var(--sco-bg2)',
        'sco-bg3':      'var(--sco-bg3)',
        'sco-card':     'var(--sco-card)',
        'sco-border':   'var(--sco-border)',
        'sco-border2':  'var(--sco-border2)',
        'sco-text':     'var(--sco-text)',
        'sco-text2':    'var(--sco-text2)',
        'sco-muted':    'var(--sco-muted)',
        'sco-primary':  '#C4401A',
        'sco-teal':     '#0E7490',
        'sco-gold':     '#D4A853',
        'sco-green':    '#15803D',
        'sco-purple':   '#7C3AED',
      },
      fontFamily: {
        sans:    ['var(--font-jakarta)', 'system-ui', 'sans-serif'],
        serif:   ['var(--font-fraunces)', 'Georgia', 'serif'],
        grotesk: ['var(--font-grotesk)', 'monospace'],
      },
      animation: {
        'pulse-dot':  'pulse-dot 2s infinite',
        'bar-grow':   'bar-grow 1.2s ease both',
        'wa-pop':     'wa-pop 0.5s 2s both',
        'bounce-y':   'bounce-y 2.5s infinite',
        'float':      'float 6s ease-in-out infinite',
      },
      keyframes: {
        'pulse-dot': {
          '0%,100%': { opacity: '1', transform: 'scale(1)' },
          '50%':     { opacity: '0.4', transform: 'scale(0.6)' },
        },
        'bar-grow': {
          from: { transform: 'scaleY(0)', opacity: '0' },
          to:   { transform: 'scaleY(1)', opacity: '1' },
        },
        'wa-pop': {
          from: { transform: 'scale(0)', opacity: '0' },
          to:   { transform: 'scale(1)', opacity: '1' },
        },
        'bounce-y': {
          '0%,100%': { transform: 'translateY(0)' },
          '50%':     { transform: 'translateY(8px)' },
        },
        'float': {
          '0%,100%': { transform: 'translateY(0px)' },
          '50%':     { transform: 'translateY(-12px)' },
        },
      },
    },
  },
  plugins: [],
}

export default config
