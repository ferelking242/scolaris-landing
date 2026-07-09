'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Check } from 'lucide-react'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const PLANS = [
  {
    name: 'Starter',
    monthlyPrice: 25000,
    annualPrice: 20000,
    color: '#0E7490',
    bg: 'rgba(14,116,144,0.08)',
    limit: 'Jusqu\'à 200 élèves',
    features: [
      'Gestion des élèves & enseignants',
      'Notes & bulletins trimestriels',
      'Présences & absences',
      'Application mobile Android',
      'Support par messagerie',
    ],
    cta: 'Démarrer gratuitement',
    ctaHref: '#contact',
    featured: false,
  },
  {
    name: 'École',
    monthlyPrice: 65000,
    annualPrice: 52000,
    color: '#C4401A',
    bg: 'rgba(196,64,26,0.1)',
    limit: 'Jusqu\'à 1 000 élèves',
    features: [
      'Tout du plan Starter',
      'Gestion financière FCFA complète',
      'Messagerie interne temps réel',
      'Emplois du temps automatiques',
      'Bibliothèque numérique',
      'Rapports avancés & exports PDF',
      'Support prioritaire',
    ],
    cta: 'Choisir ce plan',
    ctaHref: '#contact',
    featured: true,
  },
  {
    name: 'Institution',
    monthlyPrice: 150000,
    annualPrice: 120000,
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)',
    limit: 'Élèves illimités',
    features: [
      'Tout du plan École',
      'Multi-établissements',
      'API & intégrations personnalisées',
      'Tableau de bord direction de district',
      'Formation sur site',
      'SLA 99,9 % garanti',
      'Gestionnaire de compte dédié',
    ],
    cta: 'Contacter l\'équipe',
    ctaHref: '#contact',
    featured: false,
  },
]

export default function Pricing() {
  const [annual, setAnnual] = useState(false)
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="pricing" className="py-24 px-5">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-sco-primary mb-4">
            Tarification en FCFA
          </p>
          <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-6">
            Des tarifs pensés pour{' '}
            <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>l'Afrique</em>
          </h2>

          {/* Toggle */}
          <div className="inline-flex items-center gap-3 p-1 rounded-xl" style={{ background: 'var(--sco-bg2)', border: '1px solid var(--sco-border2)' }}>
            <button
              onClick={() => setAnnual(false)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200"
              style={!annual ? { background: '#C4401A', color: '#fff' } : { color: 'var(--sco-text2)' }}
            >
              Mensuel
            </button>
            <button
              onClick={() => setAnnual(true)}
              className="px-4 py-2 rounded-lg text-sm font-semibold transition-all duration-200 flex items-center gap-2"
              style={annual ? { background: '#C4401A', color: '#fff' } : { color: 'var(--sco-text2)' }}
            >
              Annuel
              <span
                className="text-[10px] px-1.5 py-0.5 rounded font-bold"
                style={{ background: annual ? 'rgba(255,255,255,0.2)' : 'rgba(196,64,26,0.15)', color: annual ? '#fff' : '#C4401A' }}
              >
                −20 %
              </span>
            </button>
          </div>
        </motion.div>

        {/* Cards */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 28 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.55, ease: EASE }}
              className="rounded-2xl p-7 flex flex-col gap-5 relative"
              style={{
                background: plan.featured ? 'var(--sco-bg2)' : 'var(--sco-bg2)',
                border: plan.featured ? `2px solid ${plan.color}` : '1px solid var(--sco-border2)',
                boxShadow: plan.featured ? `0 0 40px ${plan.color}20` : 'none',
              }}
            >
              {plan.featured && (
                <div
                  className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider text-white whitespace-nowrap"
                  style={{ background: plan.color }}
                >
                  Le plus populaire
                </div>
              )}

              <div>
                <div className="font-bold text-sco-text text-lg mb-1">{plan.name}</div>
                <div
                  className="text-[11px] font-semibold px-2.5 py-1 rounded-lg w-fit"
                  style={{ background: plan.bg, color: plan.color }}
                >
                  {plan.limit}
                </div>
              </div>

              <div className="flex items-end gap-1">
                <span className="text-4xl font-extrabold text-sco-text">
                  {(annual ? plan.annualPrice : plan.monthlyPrice).toLocaleString('fr-FR')}
                </span>
                <span className="text-sco-muted text-sm mb-1">FCFA / mois</span>
              </div>

              <div style={{ borderTop: '1px solid var(--sco-border)' }} />

              <ul className="flex flex-col gap-2.5 flex-1">
                {plan.features.map(f => (
                  <li key={f} className="flex items-start gap-2.5 text-sm text-sco-text2">
                    <Check size={14} className="flex-shrink-0 mt-0.5" style={{ color: plan.color }} />
                    {f}
                  </li>
                ))}
              </ul>

              <a
                href={plan.ctaHref}
                className="flex items-center justify-center py-3 rounded-xl text-sm font-bold transition-all duration-200 hover:-translate-y-0.5"
                style={
                  plan.featured
                    ? { background: plan.color, color: '#fff', boxShadow: `0 6px 20px ${plan.color}44` }
                    : { background: plan.bg, color: plan.color, border: `1px solid ${plan.color}35` }
                }
              >
                {plan.cta}
              </a>
            </motion.div>
          ))}
        </div>

        <p className="text-center text-sm mt-8" style={{ color: 'var(--sco-muted)' }}>
          Essai gratuit 30 jours · Sans carte bancaire · Annulation à tout moment
        </p>
      </div>
    </section>
  )
}
