'use client'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Monitor, Smartphone, Globe } from 'lucide-react'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const PLATFORMS = [
  {
    icon: Smartphone,
    label: 'Android',
    sub: 'Android 8+',
    color: '#3DDC84',
    bg: 'rgba(61,220,132,0.08)',
    href: '#contact',
    cta: 'Télécharger l\'APK',
  },
  {
    icon: Globe,
    label: 'Web',
    sub: 'Tous navigateurs',
    color: '#0E7490',
    bg: 'rgba(14,116,144,0.1)',
    href: '#contact',
    cta: 'Ouvrir l\'app',
  },
  {
    icon: Monitor,
    label: 'Windows',
    sub: 'Windows 10/11',
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)',
    href: '#contact',
    cta: 'Télécharger',
  },
  {
    icon: Smartphone,
    label: 'iOS',
    sub: 'Bientôt disponible',
    color: '#A8A098',
    bg: 'rgba(168,160,152,0.06)',
    href: '#contact',
    cta: 'Liste d\'attente',
    soon: true,
  },
]

export default function Download() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="download" className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-sco-primary mb-4">
            Disponible sur toutes les plateformes
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-4">
            Votre école dans{' '}
            <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>votre poche</em>
          </h2>
          <p className="text-sco-text2 text-base max-w-md mx-auto">
            Scolaris fonctionne sur mobile, tablette, ordinateur et navigateur — même sans connexion.
          </p>
        </motion.div>

        <div ref={ref} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {PLATFORMS.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.09, duration: 0.5, ease: EASE }}
                className="rounded-2xl p-6 flex flex-col gap-5"
                style={{
                  background: 'var(--sco-bg2)',
                  border: '1px solid var(--sco-border2)',
                  opacity: p.soon ? 0.65 : 1,
                }}
              >
                <div
                  className="w-11 h-11 rounded-xl flex items-center justify-center"
                  style={{ background: p.bg }}
                >
                  <Icon size={22} style={{ color: p.color }} />
                </div>
                <div>
                  <div className="font-bold text-sco-text mb-0.5">{p.label}</div>
                  <div className="text-xs text-sco-muted">{p.sub}</div>
                </div>
                <a
                  href={p.href}
                  className="mt-auto text-center py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
                  style={
                    p.soon
                      ? { background: 'var(--sco-bg3)', color: 'var(--sco-muted)', border: '1px solid var(--sco-border)', cursor: 'default' }
                      : { background: p.bg, color: p.color, border: `1px solid ${p.color}30` }
                  }
                >
                  {p.cta}
                </a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
