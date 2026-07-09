'use client'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

type Role = {
  id: string
  tab: string
  name: string
  sub: string
  color: string
  dimBg: string
  badge: string
  desc: string
  features: string[]
  stats: { v: string; l: string }[]
  img: string
}

const ROLES: Role[] = [
  {
    id: 'admin',
    tab: '👔 Directeur',
    name: 'Directeur',
    sub: 'Administration · Gestion globale',
    color: '#C4401A',
    dimBg: 'rgba(196,64,26,0.12)',
    badge: '👔 Direction',
    desc: 'Vue panoramique sur toute l\'école. Budget, effectifs, inscriptions, rapports — tout depuis un seul tableau de bord, accessible sur tous vos appareils.',
    features: ['Tableau de bord global', 'Gestion des inscriptions', 'Rapports financiers FCFA', 'Configuration multi-rôles', 'Statistiques en temps réel', 'Export PDF & archives'],
    stats: [{ v: '24', l: 'Modules' }, { v: '∞', l: 'Rapports' }],
    img: '/portraits/portrait-admin.png',
  },
  {
    id: 'enseignant',
    tab: '📚 Enseignant',
    name: 'Enseignant',
    sub: 'Pédagogie · Suivi des élèves',
    color: '#0E7490',
    dimBg: 'rgba(14,116,144,0.12)',
    badge: '📚 Pédagogie',
    desc: 'L\'appel numérique, le carnet de notes, les devoirs — tout ce dont un enseignant a besoin, même hors connexion. Sync auto au retour du réseau.',
    features: ['Appel numérique offline', 'Carnet de notes intelligent', 'Devoirs & corrections', 'Messagerie parents', 'Emploi du temps', 'Stats de progression'],
    stats: [{ v: '6', l: 'Appels/jour' }, { v: '200+', l: 'Élèves' }],
    img: '/portraits/portrait-enseignant.png',
  },
  {
    id: 'parent',
    tab: '👨‍👩‍👧 Parent',
    name: 'Parent',
    sub: 'Suivi scolaire · Communication',
    color: '#15803D',
    dimBg: 'rgba(21,128,61,0.12)',
    badge: '👨‍👩‍👧 Famille',
    desc: 'Alertes absence instantanées, bulletins numériques, notes en temps réel, messages directs avec les enseignants — l\'école dans votre poche.',
    features: ['Alertes absences en live', 'Bulletins trimestriels PDF', 'Notes par matière', 'Messagerie enseignants', 'Calendrier scolaire', 'Paiements mobile'],
    stats: [{ v: 'Live', l: 'Alertes' }, { v: '3/an', l: 'Bulletins' }],
    img: '/portraits/portrait-parent.png',
  },
  {
    id: 'eleve',
    tab: '🎓 Élève',
    name: 'Élève',
    sub: 'Apprentissage · Du CP au Doctorat',
    color: '#7C3AED',
    dimBg: 'rgba(124,58,237,0.1)',
    badge: '🎓 Apprenant',
    desc: 'Emploi du temps, notes, devoirs, bibliothèque — adapté à chaque niveau de scolarité, de la maternelle jusqu\'au PhD, avec mode hors-ligne natif.',
    features: ['Emploi du temps interactif', 'Notes & moyennes', 'Devoirs à rendre', 'Bibliothèque numérique', 'Messagerie interne', 'Mode hors-ligne complet'],
    stats: [{ v: 'CP→PhD', l: 'Niveaux' }, { v: '12+', l: 'Matières' }],
    img: '/portraits/portrait-eleve.png',
  },
]

export default function Roles() {
  const [activeId, setActiveId] = useState('admin')
  const role = ROLES.find(r => r.id === activeId)!

  return (
    <section
      id="roles"
      className="py-24 overflow-hidden"
      style={{ background: 'var(--sco-bg2)', borderTop: '1px solid var(--sco-border)', borderBottom: '1px solid var(--sco-border)' }}
    >
      {/* Header */}
      <div className="max-w-7xl mx-auto px-6 text-center mb-12">
        <p className="text-xs font-bold uppercase tracking-[3px] text-sco-primary mb-4">
          Choisissez votre profil
        </p>
        <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
          Un logiciel pensé pour{' '}
          <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>chaque acteur</em>
        </h2>
        <p className="text-sco-text2 text-lg max-w-xl mx-auto">
          6 rôles distincts, chacun avec son propre tableau de bord et ses permissions adaptées.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex justify-center gap-3 flex-wrap px-6 mb-14">
        {ROLES.map(r => (
          <button
            key={r.id}
            onClick={() => setActiveId(r.id)}
            className="relative px-5 py-2.5 rounded-full text-sm font-semibold transition-all duration-200"
            style={{
              background: activeId === r.id ? r.color : 'var(--sco-bg3)',
              color: activeId === r.id ? '#fff' : 'var(--sco-text2)',
              border: activeId === r.id ? `1px solid ${r.color}` : '1px solid var(--sco-border)',
              boxShadow: activeId === r.id ? `0 4px 20px ${r.color}55` : 'none',
            }}
          >
            {r.tab}
          </button>
        ))}
      </div>

      {/* Stage */}
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-12 min-h-[480px]">
        {/* Portrait */}
        <div className="lg:w-[400px] flex-shrink-0 relative flex justify-center">
          {/* Ground glow */}
          <div
            className="absolute bottom-0 left-1/2 -translate-x-1/2 w-64 h-16 -z-10 blur-3xl rounded-full"
            style={{ background: role.color + '55' }}
          />

          <AnimatePresence mode="wait">
            <motion.div
              key={activeId}
              initial={{ opacity: 0, scale: 0.92, y: 16 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: -16 }}
              transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
              className="relative"
            >
              <Image
                src={role.img}
                alt={role.name}
                width={360}
                height={440}
                className="rounded-3xl object-cover object-top"
                style={{
                  maxHeight: 420,
                  boxShadow: `0 30px 70px rgba(0,0,0,0.5), 0 0 0 1px var(--sco-border2)`,
                }}
                priority
              />
              {/* Role badge on portrait */}
              <div
                className="absolute bottom-4 left-4 px-3 py-1.5 rounded-xl text-xs font-bold"
                style={{ background: role.dimBg, color: role.color, border: `1px solid ${role.color}40`, backdropFilter: 'blur(10px)' }}
              >
                {role.badge}
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Info panel */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeId}
            initial={{ opacity: 0, x: 24 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -16 }}
            transition={{ duration: 0.4, ease: [0.4, 0, 0.2, 1] }}
            className="flex-1 max-w-xl"
          >
            <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-2">
              {role.name}
            </h3>
            <p className="text-sm font-medium mb-6" style={{ color: 'var(--sco-text2)' }}>
              {role.sub}
            </p>
            <p className="text-base leading-relaxed mb-8" style={{ color: 'var(--sco-text2)' }}>
              {role.desc}
            </p>

            <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-10">
              {role.features.map(f => (
                <li key={f} className="flex items-center gap-3 text-sm font-medium">
                  <span
                    className="w-5 h-5 rounded-full flex items-center justify-center flex-shrink-0 text-[10px] font-black"
                    style={{ background: role.dimBg, color: role.color }}
                  >
                    ✓
                  </span>
                  {f}
                </li>
              ))}
            </ul>

            <div className="flex gap-10">
              {role.stats.map(s => (
                <div key={s.l}>
                  <div className="text-3xl font-extrabold font-grotesk" style={{ color: role.color }}>
                    {s.v}
                  </div>
                  <div className="text-xs mt-1" style={{ color: 'var(--sco-muted)' }}>{s.l}</div>
                </div>
              ))}
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  )
}
