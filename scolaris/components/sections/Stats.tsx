'use client'
import { useRef, useEffect, useState } from 'react'
import { useInView } from 'framer-motion'

const STATS = [
  { val: 6,    suffix: '',   label: 'Rôles distincts',     gradient: 'linear-gradient(135deg,#C4401A,#D4A853)' },
  { val: 4,    suffix: '',   label: 'Langues supportées',  gradient: 'linear-gradient(135deg,#0E7490,#67E8F9)' },
  { val: 6,    suffix: '',   label: 'Plateformes',         gradient: 'linear-gradient(135deg,#C4401A,#D4A853)' },
  { val: 100,  suffix: '%',  label: 'Hors-ligne capable',  gradient: 'linear-gradient(135deg,#0E7490,#67E8F9)' },
]

function Counter({ to, suffix, active }: { to: number; suffix: string; active: boolean }) {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    const duration = 1800
    const start = performance.now()
    let raf: number
    const step = (ts: number) => {
      const p = Math.min((ts - start) / duration, 1)
      const ease = 1 - Math.pow(1 - p, 3)
      setCount(Math.floor(ease * to))
      if (p < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [active, to])

  return <>{count}{suffix}</>
}

export default function Stats() {
  const ref   = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <div
      ref={ref}
      className="py-20 px-6"
      style={{ borderTop: '1px solid var(--sco-border)', borderBottom: '1px solid var(--sco-border)' }}
    >
      <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-10 text-center">
        {STATS.map((s, i) => (
          <div key={s.label} className="flex flex-col items-center">
            <div
              className="text-5xl md:text-6xl font-extrabold font-grotesk tracking-tight leading-none mb-2"
              style={{
                background: s.gradient,
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
              }}
            >
              <Counter to={s.val} suffix={s.suffix} active={inView} />
            </div>
            <div className="text-sm font-medium mb-3" style={{ color: 'var(--sco-text2)' }}>{s.label}</div>
            <div
              className="w-8 h-[2px] rounded-full"
              style={{ background: i % 2 === 0 ? '#C4401A' : '#0E7490' }}
            />
          </div>
        ))}
      </div>
    </div>
  )
}
