'use client'
import { useState, useEffect } from 'react'
import { useTheme } from 'next-themes'
import { motion, AnimatePresence } from 'framer-motion'
import Image from 'next/image'

const LINKS = [
  { href: '#roles',       label: 'Rôles' },
  { href: '#features',    label: 'Fonctionnalités' },
  { href: '#screenshots', label: 'Aperçu' },
  { href: '#download',    label: 'Télécharger' },
  { href: '#pricing',     label: 'Tarifs' },
  { href: '#contact',     label: 'Contact' },
]

const THEMES = ['dark', 'light', 'oled'] as const
const THEME_ICONS: Record<string, string> = { dark: '🌙', light: '☀️', oled: '✦' }

export default function Nav() {
  const [scrolled, setScrolled]     = useState(false)
  const [menuOpen, setMenuOpen]     = useState(false)
  const [mounted, setMounted]       = useState(false)
  const { theme, setTheme }         = useTheme()

  useEffect(() => { setMounted(true) }, [])

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 50)
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  function cycleTheme() {
    const idx = THEMES.indexOf((theme as typeof THEMES[number]) ?? 'dark')
    setTheme(THEMES[(idx + 1) % THEMES.length])
  }

  return (
    <>
      {/* Desktop Nav */}
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          background: 'var(--sco-nav)',
          backdropFilter: 'blur(20px) saturate(1.5)',
          WebkitBackdropFilter: 'blur(20px) saturate(1.5)',
          borderBottom: scrolled ? '1px solid var(--sco-border)' : '1px solid transparent',
        }}
      >
        <div className="max-w-7xl mx-auto px-6 flex items-center gap-8 h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2.5 flex-shrink-0">
            <Image
              src="/generated/logo.png"
              alt="Scolaris"
              width={32}
              height={32}
              className="rounded-lg"
            />
            <span className="font-grotesk font-bold text-[20px] tracking-tight">
              <span className="text-sco-text">Sco</span>
              <span className="text-sco-primary">laris</span>
            </span>
          </a>

          {/* Desktop links */}
          <ul className="hidden md:flex items-center gap-7 ml-auto list-none">
            {LINKS.map(l => (
              <li key={l.href}>
                <a
                  href={l.href}
                  className="text-sm font-medium text-sco-text2 hover:text-sco-text transition-colors duration-200"
                >
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          {/* Right controls */}
          <div className="flex items-center gap-3 ml-4 md:ml-0">
            {/* Theme toggle */}
            {mounted && (
              <button
                onClick={cycleTheme}
                className="w-9 h-9 rounded-full flex items-center justify-center text-base transition-all duration-200 hover:scale-110"
                style={{ background: 'var(--sco-bg2)', border: '1px solid var(--sco-border2)' }}
                title={`Thème: ${theme}`}
              >
                {THEME_ICONS[theme ?? 'dark']}
              </button>
            )}

            {/* CTA */}
            <a
              href="#contact"
              className="hidden md:flex items-center gap-2 px-5 py-2 rounded-xl bg-sco-primary text-white text-sm font-bold hover:bg-[#d94e28] transition-all duration-200 hover:-translate-y-px"
              style={{ boxShadow: '0 4px 20px rgba(196,64,26,0.3)' }}
            >
              Essai gratuit
            </a>

            {/* Hamburger */}
            <button
              className="flex md:hidden flex-col gap-[5px] w-9 h-9 items-center justify-center rounded-lg"
              style={{ background: 'var(--sco-bg2)', border: '1px solid var(--sco-border)' }}
              onClick={() => setMenuOpen(v => !v)}
              aria-label="Menu"
            >
              <span
                className="block w-[18px] h-[2px] rounded transition-all duration-200"
                style={{
                  background: 'var(--sco-text)',
                  transform: menuOpen ? 'rotate(45deg) translate(5px,5px)' : 'none',
                }}
              />
              <span
                className="block w-[18px] h-[2px] rounded transition-all duration-200"
                style={{
                  background: 'var(--sco-text)',
                  opacity: menuOpen ? 0 : 1,
                }}
              />
              <span
                className="block w-[18px] h-[2px] rounded transition-all duration-200"
                style={{
                  background: 'var(--sco-text)',
                  transform: menuOpen ? 'rotate(-45deg) translate(5px,-5px)' : 'none',
                }}
              />
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, x: '100%' }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: '100%' }}
            transition={{ duration: 0.3, ease: [0.4, 0, 0.2, 1] }}
            className="fixed inset-0 z-40 flex flex-col pt-20 pb-10 px-8"
            style={{ background: 'var(--sco-bg)' }}
          >
            <nav className="flex flex-col gap-1">
              {LINKS.map((l, i) => (
                <motion.a
                  key={l.href}
                  href={l.href}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.06 }}
                  onClick={() => setMenuOpen(false)}
                  className="text-2xl font-bold py-4 border-b text-sco-text hover:text-sco-primary transition-colors"
                  style={{ borderColor: 'var(--sco-border)' }}
                >
                  {l.label}
                </motion.a>
              ))}
            </nav>
            <a
              href="#contact"
              onClick={() => setMenuOpen(false)}
              className="mt-10 text-center py-4 rounded-2xl bg-sco-primary text-white text-lg font-bold"
            >
              Essai gratuit 🚀
            </a>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Progress bar */}
      <ProgressBar />
    </>
  )
}

function ProgressBar() {
  const [progress, setProgress] = useState(0)
  useEffect(() => {
    const onScroll = () => {
      const doc = document.documentElement
      setProgress((doc.scrollTop / (doc.scrollHeight - doc.clientHeight)) * 100)
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])
  return (
    <div
      className="fixed top-0 left-0 h-[2px] z-[60] transition-all duration-100"
      style={{
        width: `${progress}%`,
        background: 'linear-gradient(90deg, #C4401A, #D4A853)',
      }}
    />
  )
}
