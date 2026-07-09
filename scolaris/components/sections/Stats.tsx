'use client'
import { useRef, useEffect, useState } from 'react'
import { motion, useInView } from 'framer-motion'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const STATS = [
  { value: 1200, suffix: '+', label: 'Écoles actives', color: '#C4401A' },
  { value: 48000, suffix: '+', label: 'Élèves gérés', color: '#0E7490' },
  { value: 6, suffix: '', label: "Pays d'Afrique centrale", color: '#D4A853' },
  { value: 99.8, suffix: '%', label: 'Disponibilité SLA', color: '#15803D', decimal: true },
]

function useCounter(target: number, active: boolean, decimal = false) {
  const [val, setVal] = useState(0)
  useEffect(() => {
    if (!active) return
    const duration = 1600
    const start = performance.now()
    function step(now: number) {
      const t = Math.min((now - start) / duration, 1)
      const ease = 1 - Math.pow(1 - t, 3)
      setVal(parseFloat((ease * target).toFixed(decimal ? 1 : 0)))
      if (t < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [active, target, decimal])
  return val
}

function StatItem({ value, suffix, label, color, decimal, delay }: typeof STATS[0] & { delay: number }) {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })
  const count = useCounter(value, inView, decimal)

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay, duration: 0.55, ease: EASE }}
      className="flex flex-col items-center text-center gap-2"
    >
      <div
        className="text-4xl md:text-5xl font-extrabold tabular-nums"
        style={{ color }}
      >
        {decimal ? count.toFixed(1) : Math.round(count).toLocaleString('fr-FR')}{suffix}
      </div>
      <div className="text-sm text-sco-text2 font-medium">{label}</div>
    </motion.div>
  )
}

export default function Stats() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="py-24 px-5">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-sco-primary mb-4">
            Scolaris en chiffres
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
            Une adoption qui{' '}
            <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>parle d'elle-même</em>
          </h2>
        </motion.div>

        <div
          ref={ref}
          className="rounded-2xl p-8 md:p-12 grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-6"
          style={{ background: 'var(--sco-bg2)', border: '1px solid var(--sco-border2)' }}
        >
          {STATS.map((s, i) => (
            <StatItem key={s.label} {...s} delay={i * 0.1} />
          ))}
        </div>
      </div>
    </section>
  )
}
