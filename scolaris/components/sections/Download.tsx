'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Download as DlIcon, Globe, Monitor, Smartphone, Clock } from 'lucide-react'

const PLATFORMS = [
  {
    icon: Smartphone,
    label: 'Android',
    sub: 'v1.0 · ARM64 · 45 MB',
    cta: 'Télécharger l\'APK',
    href: 'https://github.com/ferelking242/scolaris/releases',
    color: '#3DDC84',
    bg: 'rgba(61,220,132,0.1)',
    available: true,
  },
  {
    icon: Globe,
    label: 'Web App',
    sub: 'Accès via navigateur',
    cta: 'Accéder',
    href: 'https://scolaris.africa',
    color: '#0E7490',
    bg: 'rgba(14,116,144,0.12)',
    available: true,
  },
  {
    icon: Monitor,
    label: 'Windows',
    sub: 'Windows 10/11 · 64-bit',
    cta: 'Télécharger .exe',
    href: 'https://github.com/ferelking242/scolaris/releases',
    color: '#0078D4',
    bg: 'rgba(0,120,212,0.1)',
    available: true,
  },
  {
    icon: Smartphone,
    label: 'iOS / macOS',
    sub: 'App Store — Bientôt',
    cta: 'Bientôt disponible',
    href: '#',
    color: '#6B7280',
    bg: 'rgba(107,114,128,0.1)',
    available: false,
  },
]

export default function Download() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section id="download" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[3px] text-sco-primary mb-4">
            Téléchargement gratuit
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Disponible sur{' '}
            <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>toutes les plateformes</em>
          </h2>
          <p className="text-sco-text2 text-lg max-w-xl mx-auto">
            Un compte Scolaris fonctionne sur tous vos appareils. Commencez sur Web, continuez sur mobile.
          </p>
        </div>

        <div
          ref={ref}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5"
        >
          {PLATFORMS.map((p, i) => {
            const Icon = p.icon
            return (
              <motion.div
                key={p.label}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="relative flex flex-col p-7 rounded-3xl"
                style={{
                  background: 'var(--sco-card)',
                  border: p.available ? `1px solid var(--sco-border)` : '1px dashed var(--sco-border)',
                  opacity: p.available ? 1 : 0.7,
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ background: p.bg }}
                >
                  <Icon size={28} style={{ color: p.color }} />
                </div>

                <h4 className="text-xl font-bold mb-1">{p.label}</h4>
                <p className="text-xs mb-6" style={{ color: 'var(--sco-muted)' }}>{p.sub}</p>

                <div className="mt-auto">
                  {p.available ? (
                    <a
                      href={p.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
                      style={{
                        background: p.bg,
                        color: p.color,
                        border: `1px solid ${p.color}30`,
                      }}
                    >
                      <DlIcon size={15} />
                      {p.cta}
                    </a>
                  ) : (
                    <div
                      className="flex items-center justify-center gap-2 w-full py-3 rounded-xl text-sm font-medium"
                      style={{ background: p.bg, color: p.color }}
                    >
                      <Clock size={15} />
                      {p.cta}
                    </div>
                  )}
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* GitHub badge */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="mt-10 flex items-center justify-center gap-4 flex-wrap"
        >
          <span className="text-sm" style={{ color: 'var(--sco-text2)' }}>Projet open source ·</span>
          <a
            href="https://github.com/ferelking242/scolaris"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 text-sm font-semibold hover:text-sco-primary transition-colors"
          >
            <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current">
              <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0112 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
            ferelking242/scolaris
          </a>
          <span
            className="px-3 py-1 rounded-full text-xs font-bold"
            style={{ background: 'rgba(61,220,132,0.12)', color: '#3DDC84' }}
          >
            Open Source ✓
          </span>
        </motion.div>
      </div>
    </section>
  )
}
