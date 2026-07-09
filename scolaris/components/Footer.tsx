'use client'
import { motion } from 'framer-motion'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const COLS = [
  {
    title: 'Produit',
    items: [
      { label: 'Fonctionnalités', href: '#features' },
      { label: 'Rôles', href: '#roles' },
      { label: 'Tarifs', href: '#pricing' },
      { label: 'Télécharger', href: '#download' },
    ],
  },
  {
    title: 'Entreprise',
    items: [
      { label: 'À propos', href: '#contact' },
      { label: 'Contact', href: '#contact' },
      { label: 'Presse', href: '#contact' },
    ],
  },
  {
    title: 'Légal',
    items: [
      { label: 'Confidentialité', href: '#' },
      { label: 'Conditions d\'utilisation', href: '#' },
      { label: 'Cookies', href: '#' },
    ],
  },
]

const LANGS = ['Français', 'Lingala', 'Kikongo', 'English']

export default function Footer() {
  return (
    <footer className="pt-20 pb-10 px-5" style={{ borderTop: '1px solid var(--sco-border)' }}>
      <div className="max-w-7xl mx-auto">
        {/* Top */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-10 mb-16">
          {/* Brand */}
          <div className="col-span-2 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div
                className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
                style={{ background: 'linear-gradient(135deg,#C4401A,#D4A853)' }}
              >
                S
              </div>
              <span className="font-grotesk font-bold text-[19px] tracking-tight text-sco-text">
                Sco<span className="text-sco-primary">laris</span>
              </span>
            </div>
            <p className="text-sm text-sco-text2 leading-relaxed max-w-[220px]">
              La plateforme de gestion scolaire pensée pour l'Afrique centrale.
            </p>
          </div>

          {/* Nav cols */}
          {COLS.map(col => (
            <div key={col.title}>
              <h4 className="text-xs font-bold uppercase tracking-[2px] text-sco-muted mb-4">{col.title}</h4>
              <ul className="flex flex-col gap-2.5">
                {col.items.map(item => (
                  <li key={item.label}>
                    <a
                      href={item.href}
                      className="text-sm text-sco-text2 hover:text-sco-primary transition-colors duration-200"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Language badges */}
        <div
          className="flex flex-wrap gap-2 mb-8 pb-8"
          style={{ borderBottom: '1px solid var(--sco-border)' }}
        >
          {LANGS.map(l => (
            <span
              key={l}
              className="px-3 py-1 rounded-lg text-xs font-medium"
              style={{ background: 'var(--sco-bg2)', border: '1px solid var(--sco-border)', color: 'var(--sco-text2)' }}
            >
              {l}
            </span>
          ))}
        </div>

        {/* Bottom */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <p className="text-sm" style={{ color: 'var(--sco-muted)' }}>
            © 2025 Scolaris · Fait avec soin à Brazzaville, République du Congo
          </p>
          <div className="flex items-center gap-2">
            <span
              className="w-2 h-2 rounded-full"
              style={{ background: '#3DDC84', boxShadow: '0 0 8px rgba(61,220,132,0.5)', animation: 'pulse-dot 2s infinite' }}
            />
            <span className="text-xs font-medium" style={{ color: '#3DDC84' }}>Tous les services opérationnels</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
