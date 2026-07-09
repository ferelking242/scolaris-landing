'use client'
import { useState, useRef } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import Image from 'next/image'

type Role = {
  id: string
  tab: string
  name: string
  sub: string
  color: string
  dimBg: string
  desc: string
  features: string[]
  stats: { v: string; l: string }[]
  img: string
}

const ROLES: Role[] = [
  {
    id: 'admin',
    tab: 'Directeur',
    name: 'Directeur',
    sub: 'Administration · Gestion globale',
    color: '#C4401A',
    dimBg: 'rgba(196,64,26,0.1)',
    desc: 'Vue panoramique sur toute l\'école. Budget, effectifs, inscriptions, rapports — tout depuis un seul tableau de bord, accessible sur tous vos appareils.',
    features: ['Tableau de bord global', 'Gestion des inscriptions', 'Rapports financiers FCFA', 'Configuration multi-rôles', 'Statistiques en temps réel', 'Export PDF & archives'],
    stats: [{ v: '24', l: 'Modules' }, { v: '∞', l: 'Rapports' }],
    img: '/portraits/portrait-admin.png',
  },
  {
    id: 'enseignant',
    tab: 'Enseignant',
    name: 'Enseignant',
    sub: 'Pédagogie · Suivi des élèves',
    color: '#0E7490',
    dimBg: 'rgba(14,116,144,0.1)',
    desc: 'L\'appel numérique, le carnet de notes, les devoirs — tout ce dont un enseignant a besoin, même hors connexion. Synchronisation automatique au retour du réseau.',
    features: ['Appel numérique offline', 'Carnet de notes intelligent', 'Devoirs & corrections', 'Messagerie parents', 'Emploi du temps', 'Statistiques de progression'],
    stats: [{ v: '6', l: 'Appels/jour' }, { v: '200+', l: 'Élèves' }],
    img: '/portraits/portrait-enseignant.png',
  },
  {
    id: 'parent',
    tab: 'Parent',
    name: 'Parent',
    sub: 'Suivi scolaire · Communication',
    color: '#15803D',
    dimBg: 'rgba(21,128,61,0.1)',
    desc: 'Alertes absence instantanées, bulletins numériques, notes en temps réel, messages directs avec les enseignants — l\'école dans votre poche.',
    features: ['Alertes absences instantanées', 'Bulletins trimestriels PDF', 'Notes par matière', 'Messagerie enseignants', 'Calendrier scolaire', 'Paiements mobile'],
    stats: [{ v: 'Live', l: 'Alertes' }, { v: '3/an', l: 'Bulletins' }],
    img: '/portraits/portrait-parent.png',
  },
  {
    id: 'eleve',
    tab: 'Élève',
    name: 'Élève',
    sub: 'Apprentissage · Du CP au Doctorat',
    color: '#7C3AED',
    dimBg: 'rgba(124,58,237,0.08)',
    desc: 'Emploi du temps, notes, devoirs, bibliothèque — adapté à chaque niveau de scolarité, de la maternelle jusqu\'au doctorat, avec mode hors-ligne natif.',
    features: ['Emploi du temps interactif', 'Notes & moyennes', 'Devoirs à rendre', 'Bibliothèque numérique', 'Messagerie interne', 'Mode hors-ligne complet'],
    stats: [{ v: 'CP→PhD', l: 'Niveaux' }, { v: '12+', l: 'Matières' }],
    img: '/portraits/portrait-eleve.png',
  },
]

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

export default function Roles() {
  const [activeId, setActiveId] = useState('admin')
  const role = ROLES.find(r => r.id === activeId)!
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  return (
    <section id="roles" className="py-24 px-5">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, ease: EASE }}
          className="text-center mb-12"
        >
          <p className="text-[11px] font-bold uppercase tracking-[3px] text-sco-primary mb-4">
            Choisissez votre profil
          </p>
          <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
            Un logiciel pensé pour{' '}
            <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>chaque acteur</em>
          </h2>
          <p className="text-sco-text2 text-base md:text-lg max-w-xl mx-auto">
            De la direction à l'élève, chacun dispose d'un espace taillé sur mesure.
          </p>
        </motion.div>

        {/* Tabs */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.15, duration: 0.55, ease: EASE }}
          className="flex flex-wrap justify-center gap-2 mb-10"
        >
          {ROLES.map(r => (
            <button
              key={r.id}
              onClick={() => setActiveId(r.id)}
              className="px-5 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200"
              style={
                activeId === r.id
                  ? { background: r.color, color: '#fff', boxShadow: `0 4px 18px ${r.color}44` }
                  : { background: 'var(--sco-bg2)', color: 'var(--sco-text2)', border: '1px solid var(--sco-border2)' }
              }
            >
              {r.tab}
            </button>
          ))}
        </motion.div>

        {/* Panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={role.id}
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.3, ease: EASE }}
            className="rounded-2xl overflow-hidden grid md:grid-cols-5 gap-0"
            style={{ background: 'var(--sco-bg2)', border: '1px solid var(--sco-border2)' }}
          >
            {/* Left: info */}
            <div className="md:col-span-3 p-7 md:p-10 flex flex-col gap-6">
              <div>
                <div
                  className="inline-block px-3 py-1 rounded-lg text-[11px] font-bold uppercase tracking-wider mb-4"
                  style={{ background: role.dimBg, color: role.color }}
                >
                  {role.name}
                </div>
                <p className="text-sco-text2 text-sm mb-1">{role.sub}</p>
                <p className="text-sco-text leading-relaxed">{role.desc}</p>
              </div>

              <div className="grid grid-cols-2 gap-3">
                {role.features.map(f => (
                  <div key={f} className="flex items-center gap-2 text-sm text-sco-text2">
                    <div className="w-1.5 h-1.5 rounded-full flex-shrink-0" style={{ background: role.color }} />
                    {f}
                  </div>
                ))}
              </div>

              <div className="flex gap-5 pt-2">
                {role.stats.map(s => (
                  <div key={s.l}>
                    <div className="text-2xl font-extrabold" style={{ color: role.color }}>{s.v}</div>
                    <div className="text-xs text-sco-muted">{s.l}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: portrait */}
            <div
              className="md:col-span-2 relative min-h-[260px] md:min-h-0 flex items-end overflow-hidden"
              style={{ background: role.dimBg }}
            >
              <Image
                src={role.img}
                alt={role.name}
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 40vw"
              />
              {/* Bottom gradient */}
              <div
                className="absolute inset-x-0 bottom-0 h-20 pointer-events-none"
                style={{ background: 'linear-gradient(to top, var(--sco-bg2) 0%, transparent 100%)' }}
              />
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
