'use client'
import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef } from 'react'
import { Calendar, BarChart3, CheckSquare, MessageSquare, DollarSign, BookOpen } from 'lucide-react'

const FEATURES = [
  {
    icon: Calendar,
    color: '#C4401A',
    bg: 'rgba(196,64,26,0.12)',
    title: 'Emplois du temps',
    desc: 'Génération automatique des plannings, gestion des salles, détection de conflits. Export PDF d\'un clic.',
    tag: 'Admin · Enseignant · Élève',
    tagColor: '#C4401A',
    tagBg: 'rgba(196,64,26,0.1)',
  },
  {
    icon: BarChart3,
    color: '#0E7490',
    bg: 'rgba(14,116,144,0.12)',
    title: 'Notes & Bulletins',
    desc: 'Saisie des notes par matière, calcul automatique des moyennes, bulletins trimestriels signés numériquement.',
    tag: 'Tous les rôles',
    tagColor: '#0E7490',
    tagBg: 'rgba(14,116,144,0.1)',
  },
  {
    icon: CheckSquare,
    color: '#15803D',
    bg: 'rgba(21,128,61,0.12)',
    title: 'Présences & Absences',
    desc: 'Appel numérique hors-ligne, synchronisation automatique à la reconnexion. Alertes parents en temps réel.',
    tag: '📶 Offline-first',
    tagColor: '#15803D',
    tagBg: 'rgba(21,128,61,0.1)',
  },
  {
    icon: MessageSquare,
    color: '#D4A853',
    bg: 'rgba(212,168,83,0.12)',
    title: 'Messagerie interne',
    desc: 'Communication directe entre tous les acteurs : parents ↔ enseignants ↔ administration. Notifications push.',
    tag: '⚡ Temps réel',
    tagColor: '#D4A853',
    tagBg: 'rgba(212,168,83,0.1)',
  },
  {
    icon: DollarSign,
    color: '#7C3AED',
    bg: 'rgba(124,58,237,0.1)',
    title: 'Gestion financière',
    desc: 'Suivi des frais de scolarité en FCFA, reçus numériques, rapports de caisse mensuels et annuels.',
    tag: 'Finance · Admin',
    tagColor: '#7C3AED',
    tagBg: 'rgba(124,58,237,0.1)',
  },
  {
    icon: BookOpen,
    color: '#0E7490',
    bg: 'rgba(14,116,144,0.12)',
    title: 'Bibliothèque numérique',
    desc: 'Catalogue de ressources pédagogiques partagées, accessible hors-ligne. Du CP au Doctorat.',
    tag: 'Tous niveaux',
    tagColor: '#0E7490',
    tagBg: 'rgba(14,116,144,0.1)',
  },
]

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const cardVariant = {
  hidden: { opacity: 0, y: 28 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.1, duration: 0.6, ease: EASE },
  }),
}

export default function Features() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="features" className="py-24 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-16">
          <p className="text-xs font-bold uppercase tracking-[3px] text-sco-primary mb-4">
            Ce que Scolaris fait pour vous
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
            Toutes les{' '}
            <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>fonctionnalités</em>
            <br />dont une école a besoin
          </h2>
          <p className="text-sco-text2 text-lg max-w-xl mx-auto">
            Du premier jour d'inscription jusqu'au diplôme — tout est géré, tracé, archivé.
          </p>
        </div>

        {/* Grid */}
        <div ref={ref} className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {FEATURES.map((f, i) => {
            const Icon = f.icon
            return (
              <motion.div
                key={f.title}
                custom={i}
                variants={cardVariant}
                initial="hidden"
                animate={inView ? 'visible' : 'hidden'}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
                className="relative p-8 rounded-3xl group cursor-default overflow-hidden"
                style={{
                  background: 'var(--sco-card)',
                  border: '1px solid var(--sco-border)',
                }}
              >
                {/* Hover overlay */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{ background: `linear-gradient(135deg, ${f.bg} 0%, transparent 60%)` }}
                />

                <div
                  className="w-13 h-13 rounded-2xl flex items-center justify-center mb-6"
                  style={{ background: f.bg, width: 52, height: 52 }}
                >
                  <Icon size={24} style={{ color: f.color }} />
                </div>

                <h4 className="text-lg font-bold mb-3">{f.title}</h4>
                <p className="text-sm leading-relaxed mb-5" style={{ color: 'var(--sco-text2)' }}>
                  {f.desc}
                </p>
                <span
                  className="inline-block px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-wide"
                  style={{ background: f.tagBg, color: f.tagColor }}
                >
                  {f.tag}
                </span>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
