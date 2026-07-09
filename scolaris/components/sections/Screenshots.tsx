'use client'
import { useRef } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'

const SCREENS = [
  {
    src: '/ui-screens/ui-mobile-mockup.png',
    label: 'App Mobile',
    sub: 'Dashboard · Bonjour Amara',
    color: '#C4401A',
  },
  {
    src: '/ui-screens/ui-notes.png',
    label: 'Bulletins de notes',
    sub: 'Trimestre 1 · Moy. 15.4/20',
    color: '#0E7490',
  },
  {
    src: '/ambiance/ambiance-classe.png',
    label: 'Salle de classe',
    sub: 'Tableau numérique connecté',
    color: '#15803D',
  },
  {
    src: '/ambiance/ambiance-bureau.png',
    label: 'Administration',
    sub: 'Dashboard directeur live',
    color: '#D4A853',
  },
  {
    src: '/ambiance/ambiance-campus.png',
    label: 'Campus africain',
    sub: 'École numérique moderne',
    color: '#7C3AED',
  },
]

export default function Screenshots() {
  const trackRef = useRef<HTMLDivElement>(null)

  return (
    <section
      id="screenshots"
      className="py-24 overflow-hidden"
      style={{ background: 'var(--sco-bg2)', borderTop: '1px solid var(--sco-border)' }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 mb-12 flex items-end justify-between flex-wrap gap-6">
        <div>
          <p className="text-xs font-bold uppercase tracking-[3px] text-sco-primary mb-4">
            Aperçu du logiciel
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight">
            Beau, rapide,{' '}
            <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>fonctionnel</em>
          </h2>
        </div>
        <div className="flex items-center gap-2 text-sm font-medium" style={{ color: 'var(--sco-muted)' }}>
          <span>Faire défiler</span>
          <svg viewBox="0 0 24 24" className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2}>
            <polyline points="9 18 15 12 9 6" />
          </svg>
        </div>
      </div>

      {/* Scroll track */}
      <div
        ref={trackRef}
        className="flex gap-5 overflow-x-auto scroll-track cursor-grab active:cursor-grabbing pb-4"
        style={{ paddingLeft: 'max(1.5rem, calc((100vw - 1280px) / 2 + 1.5rem))', paddingRight: '1.5rem' }}
      >
        {SCREENS.map((s, i) => (
          <motion.div
            key={s.src}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.5 }}
            whileHover={{ y: -8, transition: { duration: 0.25 } }}
            className="relative flex-shrink-0 rounded-2xl overflow-hidden group"
            style={{
              width: 300,
              border: '1px solid var(--sco-border)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.3)',
            }}
          >
            <div style={{ height: 200 }}>
              <Image
                src={s.src}
                alt={s.label}
                width={300}
                height={200}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>

            {/* Overlay */}
            <div
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
              style={{ background: 'linear-gradient(to top, rgba(0,0,0,0.7) 0%, transparent 50%)' }}
            />

            {/* Caption */}
            <div
              className="px-4 py-4"
              style={{
                background: 'var(--sco-card)',
                borderTop: '1px solid var(--sco-border)',
              }}
            >
              <div className="flex items-center gap-2 mb-1">
                <div className="w-2 h-2 rounded-full flex-shrink-0" style={{ background: s.color }} />
                <span className="text-sm font-bold">{s.label}</span>
              </div>
              <span className="text-xs" style={{ color: 'var(--sco-muted)' }}>{s.sub}</span>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
