'use client'
import { useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Calendar, BarChart3, CheckSquare, MessageSquare, DollarSign, BookOpen } from 'lucide-react'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const FEATURES = [
  {
    icon: Calendar,
    color: '#C4401A',
    bg: 'rgba(196,64,26,0.1)',
    title: 'Emplois du temps',
    desc: 'Génération automatique des plannings, gestion des salles, détection de conflits. Export PDF en un clic.',
    tag: 'Admin · Enseignant · Élève',
    span: 'lg:col-span-2',
    large: true,
  },
  {
    icon: BarChart3,
    color: '#0E7490',
    bg: 'rgba(14,116,144,0.1)',
    title: 'Notes & Bulletins',
    desc: 'Saisie des notes par matière, calcul automatique des moyennes, bulletins trimestriels signés numériquement.',
    tag: 'Tous les rôles',
    span: 'lg:col-span-1',
    large: false,
  },
  {
    icon: CheckSquare,
    color: '#15803D',
    bg: 'rgba(21,128,61,0.1)',
    title: 'Présences & Absences',
    desc: 'Appel numérique hors-ligne, synchronisation automatique à la reconnexion. Alertes parents en temps réel.',
    tag: 'Offline-first',
    span: 'lg:col-span-1',
    large: false,
  },
  {
    icon: MessageSquare,
    color: '#D4A853',
    bg: 'rgba(212,168,83,0.1)',
    title: 'Messagerie interne',
    desc: 'Communication directe entre tous les acteurs : parents, enseignants, administration. Notifications push.',
    tag: 'Temps réel',
    span: 'lg:col-span-1',
    large: false,
  },
  {
    icon: DollarSign,
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.08)',
    title: 'Gestion financière',
    desc: 'Suivi des frais de scolarité en FCFA, reçus numériques, rapports de caisse mensuels et annuels. Conforme aux normes comptables locales.',
    tag: 'Finance · Admin',
    span: 'lg:col-span-2',
    large: true,
  },
  {
    icon: BookOpen,
    color: '#0E7490',
    bg: 'rgba(14,116,144,0.1)',
    title: 'Bibliothèque numérique',
    desc: 'Catalogue de ressources pédagogiques partagées, accessible hors-ligne. Du CP au Doctorat.',
    tag: 'Tous niveaux',
    span: 'lg:col-span-1',
    large: false,
  },
]

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" className="py-24 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-80px' }}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-sco-primary mb-4">
            Ce que Scolaris fait pour vous
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Toutes les{' '}
            <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>fonctionnalités</em>
            <br />dont une école a besoin
          </h2>
          <p className="text-sco-text2 text-base md:text-lg max-w-xl mx-auto">
            Du premier jour d'inscription jusqu'au diplôme — tout est géré, tracé, archivé.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                initial={{ opacity: 0, y: 24 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.08, duration: 0.55, ease: EASE }}
                whileHover={{ y: -4, transition: { duration: 0.18 } }}
                className={`rounded-2xl p-6 md:p-7 flex flex-col gap-4 ${f.span}`}
                style={{ background: 'var(--sco-bg2)', border: '1px solid var(--sco-border2)' }}
              >
                {/* Icon */}
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center flex-shrink-0"
                  style={{ background: f.bg }}
                >
                  <Icon size={20} style={{ color: f.color }} />
                </div>

                {/* Text */}
                <div className="flex flex-col gap-2 flex-1">
                  <h3 className={`font-bold text-sco-text ${f.large ? 'text-xl' : 'text-base'}`}>{f.title}</h3>
                  <p className="text-sco-text2 text-sm leading-relaxed">{f.desc}</p>
                </div>

                {/* Tag */}
                <div
                  className="inline-flex items-center px-2.5 py-1 rounded-lg text-[11px] font-semibold w-fit"
                  style={{ background: f.bg, color: f.color }}
                >
                  {f.tag}
                </div>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
