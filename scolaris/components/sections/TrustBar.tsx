'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'

const ITEMS = [
  { label: '1 200+', sub: 'écoles actives' },
  { label: '98 %',   sub: 'uptime garanti' },
  { label: '6',      sub: 'rôles distincts' },
  { label: '4',      sub: 'langues' },
  { label: '100 %',  sub: 'offline-ready' },
]

export default function TrustBar() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section ref={ref} className="py-14 px-5">
      <div className="max-w-6xl mx-auto">
        <div
          className="rounded-2xl px-6 py-8 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6"
          style={{ background: 'var(--sco-bg2)', border: '1px solid var(--sco-border2)' }}
        >
          {ITEMS.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.08, duration: 0.5, ease: [0.4,0,0.2,1] }}
              className="flex flex-col items-center text-center gap-1"
            >
              <span className="text-2xl md:text-3xl font-extrabold text-sco-text">{item.label}</span>
              <span className="text-xs text-sco-text2 font-medium">{item.sub}</span>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
