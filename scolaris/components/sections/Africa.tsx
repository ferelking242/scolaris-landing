'use client'
import { useRef } from 'react'
import { motion, useInView, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const COUNTRIES = [
  { name: 'Congo-Brazzaville', flag: '🇨🇬', active: true },
  { name: 'Cameroun', flag: '🇨🇲', active: true },
  { name: 'Gabon', flag: '🇬🇦', active: true },
  { name: 'RCA', flag: '🇨🇫', active: true },
  { name: 'Tchad', flag: '🇹🇩', active: false },
  { name: 'Guinée Éq.', flag: '🇬🇶', active: false },
]

export default function Africa() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [30, -30])

  return (
    <section className="py-24 px-5 overflow-hidden">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-20 items-center">
          {/* Map */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -30 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, ease: EASE }}
            className="relative"
          >
            <motion.div style={{ y }} className="relative aspect-square max-w-sm mx-auto">
              <Image
                src="/generated/africa-map.png"
                alt="Afrique centrale — déploiement Scolaris"
                fill
                className="object-contain"
              />
              {/* Glow */}
              <div
                className="absolute inset-0 -z-10 blur-3xl opacity-20 rounded-full"
                style={{ background: 'radial-gradient(circle,#C4401A,#D4A853)' }}
              />
            </motion.div>
          </motion.div>

          {/* Content */}
          <div>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.15, duration: 0.6, ease: EASE }}
            >
              <p className="text-[11px] font-bold uppercase tracking-[3px] text-sco-primary mb-4">
                Déploiement régional
              </p>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
                Pensé pour{' '}
                <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>l'Afrique centrale</em>
              </h2>
              <p className="text-sco-text2 text-base leading-relaxed mb-8">
                Scolaris est né à Brazzaville. Conçu pour fonctionner avec des connexions instables,
                en français, lingala, kikongo et anglais. Les tarifs sont en FCFA.
                L'infrastructure est hébergée localement.
              </p>

              {/* Countries */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {COUNTRIES.map((c, i) => (
                  <motion.div
                    key={c.name}
                    initial={{ opacity: 0, y: 12 }}
                    animate={inView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.25 + i * 0.07, duration: 0.45, ease: EASE }}
                    className="flex items-center gap-2 px-3 py-2.5 rounded-xl text-sm font-medium"
                    style={{
                      background: c.active ? 'rgba(196,64,26,0.08)' : 'var(--sco-bg2)',
                      border: `1px solid ${c.active ? 'rgba(196,64,26,0.25)' : 'var(--sco-border)'}`,
                      color: c.active ? '#C4401A' : 'var(--sco-muted)',
                    }}
                  >
                    <span>{c.flag}</span>
                    <span className="truncate">{c.name}</span>
                    {!c.active && <span className="text-[10px] ml-auto opacity-60">Bientôt</span>}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  )
}
