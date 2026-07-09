'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import Image from 'next/image'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const SCREENS = [
  { src: '/ui-screens/ui-notes.png',         label: 'Carnet de notes', color: '#C4401A' },
  { src: '/ui-screens/ui-mobile-mockup.png',  label: 'Vue mobile',      color: '#0E7490' },
  { src: '/ambiance/ambiance-classe.png',     label: 'En classe',       color: '#15803D' },
  { src: '/ambiance/ambiance-campus.png',     label: 'Campus',          color: '#D4A853' },
  { src: '/ambiance/ambiance-bureau.png',     label: 'Administration',  color: '#7C3AED' },
]

export default function Screenshots() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="screenshots" className="py-24 overflow-hidden">
      <div className="max-w-7xl mx-auto px-5">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-sco-primary mb-4">
            Aperçu de l'application
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Une interface{' '}
            <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>soignée</em>
          </h2>
          <p className="text-sco-text2 text-base max-w-md mx-auto">
            Conçue pour être utilisée par des non-techniciens, sur mobile comme sur desktop.
          </p>
        </motion.div>
      </div>

      {/* Horizontal scroll track */}
      <div ref={ref} className="px-5 md:px-8">
        <div className="flex gap-4 overflow-x-auto scroll-track pb-4" style={{ scrollSnapType: 'x mandatory' }}>
          {SCREENS.map((s, i) => (
            <motion.div
              key={s.src}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55, ease: EASE }}
              className="flex-shrink-0 rounded-2xl overflow-hidden"
              style={{
                width: 'clamp(240px, 30vw, 340px)',
                scrollSnapAlign: 'start',
                border: '1px solid var(--sco-border2)',
                background: 'var(--sco-bg2)',
              }}
            >
              <div className="relative aspect-[4/3] w-full">
                <Image
                  src={s.src}
                  alt={s.label}
                  fill
                  className="object-cover"
                  sizes="340px"
                />
              </div>
              <div className="px-4 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full" style={{ background: s.color }} />
                <span className="text-sm font-semibold text-sco-text">{s.label}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
