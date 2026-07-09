'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform, useInView } from 'framer-motion'
import Image from 'next/image'

const LIST = [
  {
    icon: '📶', color: '#C4401A', bg: 'rgba(196,64,26,0.12)',
    title: 'Hors-ligne d\'abord',
    desc: 'Appel, saisie de notes, messagerie — tout fonctionne sans internet. Synchronisation automatique à la reconnexion.',
  },
  {
    icon: '🌍', color: '#0E7490', bg: 'rgba(14,116,144,0.12)',
    title: '4 langues nativement',
    desc: 'Français, Anglais, Swahili, Lingala. Chaque utilisateur choisit sa langue dans les paramètres.',
  },
  {
    icon: '💰', color: '#15803D', bg: 'rgba(21,128,61,0.12)',
    title: 'Paiement en FCFA',
    desc: 'Tarification et facturation en Francs CFA. Plans adaptés aux budgets des établissements congolais.',
  },
  {
    icon: '📱', color: '#D4A853', bg: 'rgba(212,168,83,0.12)',
    title: 'Mobile-first',
    desc: 'Application Android et iOS optimisée pour les smartphones. L\'école dans chaque poche.',
  },
]

export default function Africa() {
  const ref = useRef(null)
  const imgRef = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const { scrollYProgress } = useScroll({ target: imgRef, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [-30, 30])

  return (
    <section className="py-24 px-6" id="africa">
      <div ref={ref} className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
        {/* Visual */}
        <motion.div
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
          className="relative order-last lg:order-first"
          ref={imgRef}
        >
          <motion.div style={{ y }} className="relative">
            <div
              className="rounded-3xl overflow-hidden aspect-square"
              style={{ border: '1px solid var(--sco-border)' }}
            >
              <Image
                src="/generated/africa-map.png"
                alt="Afrique centrale — Scolaris"
                width={520}
                height={520}
                className="w-full h-full object-cover"
              />
            </div>
          </motion.div>

          {/* Floating badge */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5, duration: 0.6 }}
            className="absolute -bottom-5 -right-5 flex items-center gap-3 px-5 py-3 rounded-2xl"
            style={{
              background: 'var(--sco-card)',
              border: '1px solid var(--sco-border2)',
              boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
            }}
          >
            <div
              className="w-10 h-10 rounded-xl flex items-center justify-center text-lg"
              style={{ background: 'rgba(14,116,144,0.12)' }}
            >
              📶
            </div>
            <div>
              <div className="text-base font-bold" style={{ color: '#0E7490' }}>Offline Ready</div>
              <div className="text-xs" style={{ color: 'var(--sco-muted)' }}>Sync automatique</div>
            </div>
          </motion.div>
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.4, 0, 0.2, 1] }}
        >
          <p className="text-xs font-bold uppercase tracking-[3px] text-sco-primary mb-5">
            Conçu pour l'Afrique
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            La réalité africaine au{' '}
            <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>cœur du design</em>
          </h2>
          <p className="text-sco-text2 text-base leading-relaxed mb-10">
            Scolaris n'est pas un logiciel occidental adapté. Il a été pensé, conçu et testé pour les réalités des écoles d'Afrique centrale — connectivité fragile, diversité linguistique, paiements en FCFA.
          </p>

          <ul className="flex flex-col gap-6">
            {LIST.map((item, i) => (
              <motion.li
                key={item.title}
                initial={{ opacity: 0, x: 20 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
                className="flex gap-4"
              >
                <div
                  className="w-10 h-10 rounded-xl flex items-center justify-center text-lg flex-shrink-0 mt-0.5"
                  style={{ background: item.bg }}
                >
                  {item.icon}
                </div>
                <div>
                  <h5 className="font-bold text-base mb-1">{item.title}</h5>
                  <p className="text-sm leading-relaxed" style={{ color: 'var(--sco-text2)' }}>{item.desc}</p>
                </div>
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
    </section>
  )
}
