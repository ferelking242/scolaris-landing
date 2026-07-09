'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import { Moon, Sun, Sparkles, Menu, X } from 'lucide-react'

const LINKS = [
  { href: '#roles',       label: 'Rôles' },
  { href: '#features',    label: 'Fonctionnalités' },
  { href: '#screenshots', label: 'Aperçu' },
  { href: '#download',    label: 'Télécharger' },
  { href: '#pricing',     label: 'Tarifs' },
  { href: '#contact',     label: 'Contact' },
]

export default function Nav() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [mounted, setMounted]   = useState(false)
  const { theme, setTheme }     = useTheme()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 40)
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])

  // Lock body scroll when menu open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [menuOpen])

  function cycleTheme() {
    const order = ['dark', 'light', 'oled']
    const idx = order.indexOf(theme ?? 'dark')
    setTheme(order[(idx + 1) % order.length])
  }

  const ThemeIcon = () => {
    if (!mounted) return <div className="w-4 h-4" />
    if (theme === 'light') return <Sun size={16} />
    if (theme === 'oled') return <Sparkles size={16} />
    return <Moon size={16} />
  }

  return (
    <>
      {/* Progress bar */}
      <ProgressBar />

      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: scrolled ? 'var(--sco-nav)' : 'transparent',
          backdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(20px) saturate(1.4)' : 'none',
          borderBottom: scrolled ? '1px solid var(--sco-border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-5 md:px-8 flex items-center h-16 gap-6">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2 flex-shrink-0 select-none">
            <div
              className="w-8 h-8 rounded-lg flex items-center justify-center font-bold text-white text-sm"
              style={{ background: 'linear-gradient(135deg, #C4401A, #D4A853)' }}
            >
              S
            </div>
            <span className="font-grotesk font-bold text-[19px] tracking-tight text-sco-text">
              Sco<span className="text-sco-primary">laris</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-6 ml-auto list-none m-0 p-0">
            {LINKS.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-[13px] font-medium text-sco-text2 hover:text-sco-text transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right */}
          <div className="flex items-center gap-2 ml-auto md:ml-4">
            {mounted && (
              <button
                onClick={cycleTheme}
                className="w-8 h-8 rounded-lg flex items-center justify-center text-sco-text2 hover:text-sco-text transition-all duration-200 hover:scale-105"
                style={{ background: 'var(--sco-bg2)', border: '1px solid var(--sco-border2)' }}
                aria-label="Changer de thème"
              >
                <ThemeIcon />
              </button>
            )}

            <a
              href="#contact"
              className="hidden md:flex items-center px-4 py-2 rounded-xl bg-sco-primary text-white text-[13px] font-bold hover:brightness-110 transition-all duration-200 hover:-translate-y-px"
              style={{ boxShadow: '0 4px 16px rgba(196,64,26,0.25)' }}
            >
              Essai gratuit
            </a>

            <button
              className="flex md:hidden items-center justify-center w-9 h-9 rounded-lg transition-colors duration-200"
              style={{ background: 'var(--sco-bg2)', border: '1px solid var(--sco-border)' }}
              onClick={() => setMenuOpen(v => !v)}
              aria-label={menuOpen ? 'Fermer le menu' : 'Ouvrir le menu'}
            >
              {menuOpen ? <X size={18} className="text-sco-text" /> : <Menu size={18} className="text-sco-text" />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile full-screen menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.22, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 flex flex-col"
            style={{ background: 'var(--sco-bg)', paddingTop: '4rem' }}
          >
            <div className="flex flex-col flex-1 px-6 py-8">
              <nav className="flex flex-col">
                {LINKS.map((l, i) => (
                  <motion.a
                    key={l.href}
                    href={l.href}
                    initial={{ opacity: 0, x: -16 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: i * 0.05 + 0.05 }}
                    onClick={() => setMenuOpen(false)}
                    className="text-[22px] font-bold py-4 text-sco-text hover:text-sco-primary transition-colors"
                    style={{ borderBottom: '1px solid var(--sco-border)' }}
                  >
                    {l.label}
                  </motion.a>
                ))}
              </nav>

              <motion.a
                href="#contact"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35 }}
                onClick={() => setMenuOpen(false)}
                className="mt-auto text-center py-4 rounded-2xl bg-sco-primary text-white text-base font-bold"
                style={{ boxShadow: '0 8px 24px rgba(196,64,26,0.3)' }}
              >
                Essai gratuit — 30 jours
              </motion.a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

function ProgressBar() {
  const [pct, setPct] = useState(0)
  useEffect(() => {
    const fn = () => {
      const d = document.documentElement
      setPct((d.scrollTop / (d.scrollHeight - d.clientHeight)) * 100)
    }
    window.addEventListener('scroll', fn, { passive: true })
    return () => window.removeEventListener('scroll', fn)
  }, [])
  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[60] transition-[width] duration-75"
      style={{ width: `${pct}%`, background: 'linear-gradient(90deg,#C4401A,#D4A853)' }}
    />
  )
}
