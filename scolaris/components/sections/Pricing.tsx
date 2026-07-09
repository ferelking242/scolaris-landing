'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { Check, Zap } from 'lucide-react'

type Plan = {
  id: string
  name: string
  emoji: string
  monthlyFCFA: number
  annualFCFA: number
  sub: string
  color: string
  bg: string
  featured: boolean
  features: string[]
  cta: string
  ctaHref: string
  limit: string
}

const PLANS: Plan[] = [
  {
    id: 'simple',
    name: 'Simple',
    emoji: '📘',
    monthlyFCFA: 14900,
    annualFCFA: 11900,
    sub: 'Petites écoles & associations',
    color: '#0E7490',
    bg: 'rgba(14,116,144,0.12)',
    featured: false,
    limit: 'Jusqu\'à 200 élèves',
    features: [
      'Tous les rôles inclus',
      'Gestion des notes & absences',
      'Bulletins PDF trimestriels',
      'Support WhatsApp',
      'Appel hors-ligne',
      'Export rapports basiques',
    ],
    cta: 'Démarrer — Simple',
    ctaHref: '#contact',
  },
  {
    id: 'pro',
    name: 'Pro',
    emoji: '⭐',
    monthlyFCFA: 29900,
    annualFCFA: 24900,
    sub: 'Écoles & lycées en croissance',
    color: '#C4401A',
    bg: 'rgba(196,64,26,0.12)',
    featured: true,
    limit: 'Jusqu\'à 800 élèves',
    features: [
      'Tout du plan Simple',
      'Gestion financière FCFA',
      'Multi-classe & multi-filière',
      'Statistiques avancées',
      'Export Excel & CSV',
      'Priorité support 24/7',
      'Personnalisation des bulletins',
      'API d\'intégration',
    ],
    cta: 'Démarrer — Pro ⭐',
    ctaHref: '#contact',
  },
  {
    id: 'elite',
    name: 'Élite',
    emoji: '🏛️',
    monthlyFCFA: 0,
    annualFCFA: 0,
    sub: 'Réseaux d\'écoles & universités',
    color: '#D4A853',
    bg: 'rgba(212,168,83,0.12)',
    featured: false,
    limit: 'Élèves illimités · Multi-campus',
    features: [
      'Tout du plan Pro',
      'Multi-campus centralisé',
      'Tableau de bord réseau',
      'SSO & Active Directory',
      'Déploiement on-premise',
      'Formation équipe incluse',
      'SLA 99.9% garanti',
      'Personnalisation complète',
    ],
    cta: 'Demander un devis',
    ctaHref: '#contact',
  },
]


export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section
      id="pricing"
      className="py-24 px-6"
      style={{ background: 'var(--sco-bg2)', borderTop: '1px solid var(--sco-border)' }}
    >
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="text-xs font-bold uppercase tracking-[3px] text-sco-primary mb-4">
            Tarification simple
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Un prix juste,{' '}
            <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>transparent</em>
          </h2>
          <p className="text-sco-text2 text-lg max-w-xl mx-auto mb-8">
            Tarification en FCFA. L'école paie — pas les parents, pas les enseignants.
            Essai gratuit 30 jours, sans carte bancaire.
          </p>

          {/* Toggle */}
          <div className="inline-flex items-center gap-4 px-3 py-1.5 rounded-2xl" style={{ background: 'var(--sco-bg3)', border: '1px solid var(--sco-border)' }}>
            <button
              onClick={() => setAnnual(false)}
              className="px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200"
              style={{
                background: !annual ? 'var(--sco-card)' : 'transparent',
                color: !annual ? 'var(--sco-text)' : 'var(--sco-muted)',
                boxShadow: !annual ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
              }}
            >
              Mensuel
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="px-5 py-2 rounded-xl text-sm font-bold transition-all duration-200 flex items-center gap-2"
              style={{
                background: annual ? 'var(--sco-card)' : 'transparent',
                color: annual ? 'var(--sco-text)' : 'var(--sco-muted)',
                boxShadow: annual ? '0 2px 8px rgba(0,0,0,0.2)' : 'none',
              }}
            >
              Annuel
              <span
                className="text-[10px] font-black px-2 py-0.5 rounded-full"
                style={{ background: 'rgba(21,128,61,0.15)', color: '#15803D' }}
              >
                −20%
              </span>
            </button>
          </div>
        </div>

        {/* Plans */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-6 items-start">
          {PLANS.map((plan, i) => {
            const price = annual ? plan.annualFCFA : plan.monthlyFCFA

            return (
              <motion.div
                key={plan.id}
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.12, duration: 0.6, ease: [0.4, 0, 0.2, 1] }}
                className="relative rounded-3xl p-8 flex flex-col"
                style={{
                  background: plan.featured ? `linear-gradient(145deg, ${plan.bg}, var(--sco-card))` : 'var(--sco-card)',
                  border: plan.featured ? `2px solid ${plan.color}` : '1px solid var(--sco-border)',
                  boxShadow: plan.featured ? `0 30px 60px rgba(196,64,26,0.2)` : 'none',
                  transform: plan.featured ? 'scale(1.03)' : 'none',
                }}
              >
                {/* Featured badge */}
                {plan.featured && (
                  <div
                    className="absolute -top-4 left-1/2 -translate-x-1/2 flex items-center gap-1.5 px-5 py-1.5 rounded-full text-xs font-black uppercase tracking-wider text-white"
                    style={{ background: plan.color, boxShadow: `0 4px 15px ${plan.color}66` }}
                  >
                    <Zap size={12} />
                    Le plus populaire
                  </div>
                )}

                {/* Plan emoji + name */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className="w-12 h-12 rounded-xl flex items-center justify-center text-2xl"
                    style={{ background: plan.bg }}
                  >
                    {plan.emoji}
                  </div>
                  <div>
                    <div className="text-lg font-bold">{plan.name}</div>
                    <div className="text-xs" style={{ color: 'var(--sco-muted)' }}>{plan.sub}</div>
                  </div>
                </div>

                {/* Price */}
                <div className="mb-2">
                  {plan.monthlyFCFA === 0 ? (
                    <div className="text-4xl font-extrabold font-grotesk">Sur devis</div>
                  ) : (
                    <div className="flex items-start gap-1">
                      <span className="text-sm font-bold mt-3" style={{ color: 'var(--sco-muted)' }}>FCFA</span>
                      <AnimatePresence mode="wait">
                        <motion.span
                          key={annual ? 'a' : 'm'}
                          initial={{ opacity: 0, y: 8 }}
                          animate={{ opacity: 1, y: 0 }}
                          exit={{ opacity: 0, y: -8 }}
                          transition={{ duration: 0.2 }}
                          className="text-5xl font-extrabold font-grotesk"
                          style={{ color: plan.color }}
                        >
                          {price.toLocaleString('fr-FR')}
                        </motion.span>
                      </AnimatePresence>
                      <span className="text-sm self-end mb-1.5" style={{ color: 'var(--sco-muted)' }}>/mois</span>
                    </div>
                  )}
                </div>

                <div
                  className="text-xs font-semibold mb-7 px-3 py-1.5 rounded-lg w-fit"
                  style={{ background: plan.bg, color: plan.color }}
                >
                  {plan.limit}
                </div>

                {/* Separator */}
                <div className="mb-6" style={{ borderTop: '1px solid var(--sco-border)' }} />

                {/* Features */}
                <ul className="flex flex-col gap-3 mb-8 flex-1">
                  {plan.features.map(f => (
                    <li key={f} className="flex items-start gap-3 text-sm">
                      <Check
                        size={15}
                        className="flex-shrink-0 mt-0.5"
                        style={{ color: plan.color }}
                      />
                      {f}
                    </li>
                  ))}
                </ul>

                <a
                  href={plan.ctaHref}
                  className="flex items-center justify-center gap-2 w-full py-3.5 rounded-2xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
                  style={
                    plan.featured
                      ? { background: plan.color, color: '#fff', boxShadow: `0 8px 25px ${plan.color}55` }
                      : { background: plan.bg, color: plan.color, border: `1px solid ${plan.color}40` }
                  }
                >
                  {plan.cta}
                </a>
              </motion.div>
            )
          })}
        </div>

        {/* Free trial mention */}
        <p className="text-center text-sm mt-10" style={{ color: 'var(--sco-muted)' }}>
          🎁 Essai gratuit 30 jours · Sans carte bancaire · Annulez à tout moment
        </p>
      </div>
    </section>
  )
}
