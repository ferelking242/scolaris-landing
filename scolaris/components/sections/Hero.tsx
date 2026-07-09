'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { Zap, Monitor } from 'lucide-react'

/* ── particle config ── */
type Particle = { x:number; y:number; vx:number; vy:number; r:number; alpha:number; color:string }
const COLORS = ['#C4401A','#0E7490','#D4A853','#C4401A']

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const FADE_UP = {
  hidden:  { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.15, duration: 0.7, ease: EASE },
  }),
}

/* ── Dashboard mock bars ── */
const MONTHS = ['Jan','Fév','Mar','Avr','Mai','Jun']
const BARS   = [55, 72, 48, 85, 68, 92]

export default function Hero() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')!
    let animId: number
    let W = 0, H = 0
    const particles: Particle[] = []

    function mkP(): Particle {
      return {
        x: Math.random() * W,
        y: H + Math.random() * 60,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -(Math.random() * 0.8 + 0.3),
        r: Math.random() * 2 + 0.4,
        alpha: Math.random() * 0.5 + 0.1,
        color: COLORS[Math.floor(Math.random() * COLORS.length)],
      }
    }

    function resize() {
      if (!canvas) return
      W = canvas.width  = canvas.offsetWidth
      H = canvas.height = canvas.offsetHeight
    }

    function init() {
      resize()
      for (let i = 0; i < 70; i++) {
        const p = mkP()
        p.y = Math.random() * H
        particles.push(p)
      }
    }

    function tick() {
      ctx.clearRect(0, 0, W, H)
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i]
        p.x += p.vx; p.y += p.vy
        if (p.y < -10) particles[i] = mkP()
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        const hex = Math.floor(p.alpha * 255).toString(16).padStart(2, '0')
        ctx.fillStyle = p.color + hex
        ctx.fill()
      }
      animId = requestAnimationFrame(tick)
    }

    init(); tick()
    window.addEventListener('resize', resize, { passive: true })
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-20 pb-16 px-6">
      {/* Background image */}
      <div
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{ backgroundImage: "url('/generated/hero-bg.jpg')" }}
      />

      {/* Gradient overlay bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 80% 50% at 50% 100%, var(--sco-bg) 0%, transparent 70%)' }}
      />

      {/* Particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl">
        {/* Badge */}
        <motion.div
          custom={0} variants={FADE_UP} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest mb-8"
          style={{
            background: 'rgba(196,64,26,0.12)',
            border: '1px solid rgba(196,64,26,0.3)',
            color: '#C4401A',
          }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sco-primary animate-pulse-dot" />
          🌍 Plateforme scolaire africaine · SaaS
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1} variants={FADE_UP} initial="hidden" animate="visible"
          className="text-5xl md:text-7xl lg:text-8xl font-extrabold tracking-tight leading-[1.05] mb-5"
        >
          Gérez votre école.
          <br />
          <em className="font-serif text-sco-primary not-italic" style={{ fontStyle: 'italic' }}>
            Partout en Afrique.
          </em>
        </motion.h1>

        {/* Subheadline */}
        <motion.p
          custom={2} variants={FADE_UP} initial="hidden" animate="visible"
          className="text-lg md:text-xl text-sco-text2 max-w-2xl mx-auto leading-relaxed mb-10"
        >
          Un seul logiciel pour <strong className="text-sco-text">6 rôles</strong>,
          du CP au Doctorat. Fonctionne en{' '}
          <strong className="text-sco-text">4 langues</strong>,
          même <strong className="text-sco-text">hors connexion</strong>.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3} variants={FADE_UP} initial="hidden" animate="visible"
          className="flex flex-wrap gap-4 justify-center"
        >
          <a
            href="#contact"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-sco-primary text-white text-base font-bold transition-all duration-200 hover:-translate-y-1 hover:bg-[#d94e28]"
            style={{ boxShadow: '0 8px 30px rgba(196,64,26,0.4)' }}
          >
            <Zap size={18} />
            Démarrer gratuitement
          </a>
          <a
            href="#screenshots"
            className="flex items-center gap-2 px-8 py-4 rounded-2xl text-base font-semibold transition-all duration-200 hover:-translate-y-1"
            style={{
              background: 'var(--sco-bg2)',
              border: '1px solid var(--sco-border2)',
              color: 'var(--sco-text)',
            }}
          >
            <Monitor size={18} />
            Voir le logiciel
          </a>
        </motion.div>
      </div>

      {/* Dashboard mockup */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.9, duration: 0.9, ease: [0.4, 0, 0.2, 1] }}
        className="relative z-10 mt-16 w-full max-w-3xl"
      >
        <div
          className="rounded-2xl overflow-hidden"
          style={{
            background: 'var(--sco-card)',
            border: '1px solid var(--sco-border2)',
            boxShadow: '0 40px 80px rgba(0,0,0,0.5), 0 0 0 1px var(--sco-border)',
          }}
        >
          {/* Title bar */}
          <div
            className="flex items-center gap-2 px-4 py-3"
            style={{ background: 'var(--sco-bg3)', borderBottom: '1px solid var(--sco-border)' }}
          >
            <span className="w-3 h-3 rounded-full bg-[#FF5F57]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#28C840]" />
            <div
              className="ml-4 flex-1 rounded text-xs font-grotesk px-3 py-1"
              style={{ background: 'var(--sco-bg2)', color: 'var(--sco-muted)' }}
            >
              app.scolaris.africa · Tableau de bord — Administrateur
            </div>
          </div>

          {/* Body */}
          <div className="flex" style={{ height: 280 }}>
            {/* Sidebar */}
            <div
              className="w-40 flex-shrink-0 p-4 flex flex-col gap-1"
              style={{ background: 'var(--sco-bg3)', borderRight: '1px solid var(--sco-border)' }}
            >
              <div className="text-sm font-bold text-sco-primary font-grotesk mb-3">⬡ Scolaris</div>
              {[
                { icon: '▦', label: 'Dashboard', active: true },
                { icon: '👥', label: 'Élèves', active: false },
                { icon: '📅', label: 'Planning', active: false },
                { icon: '📊', label: 'Rapports', active: false },
                { icon: '⚙️', label: 'Paramètres', active: false },
              ].map(item => (
                <div
                  key={item.label}
                  className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs font-medium transition-colors"
                  style={{
                    background: item.active ? 'rgba(196,64,26,0.12)' : 'transparent',
                    color: item.active ? '#C4401A' : 'var(--sco-muted)',
                    borderRight: item.active ? '2px solid #C4401A' : '2px solid transparent',
                  }}
                >
                  <span>{item.icon}</span> {item.label}
                </div>
              ))}
            </div>

            {/* Main */}
            <div className="flex-1 p-5 overflow-hidden">
              <p className="text-xs mb-4" style={{ color: 'var(--sco-text2)' }}>
                Bienvenue, <strong style={{ color: 'var(--sco-text)' }}>M. Administrateur</strong> — Année 2024–2025
              </p>

              {/* Stat cards */}
              <div className="grid grid-cols-3 gap-3 mb-5">
                {[
                  { val: '1 248', label: 'Élèves', color: '#C4401A' },
                  { val: '94.2%', label: 'Présence', color: '#0E7490' },
                  { val: '78',    label: 'Enseignants', color: '#15803D' },
                ].map(c => (
                  <div
                    key={c.label}
                    className="rounded-xl p-3"
                    style={{ background: 'var(--sco-bg3)', border: '1px solid var(--sco-border)' }}
                  >
                    <div className="text-xl font-bold font-grotesk" style={{ color: c.color }}>{c.val}</div>
                    <div className="text-[10px] mt-0.5" style={{ color: 'var(--sco-muted)' }}>{c.label}</div>
                  </div>
                ))}
              </div>

              {/* Bar chart */}
              <div
                className="rounded-xl p-3"
                style={{ background: 'var(--sco-bg3)', border: '1px solid var(--sco-border)' }}
              >
                <div className="text-[10px] font-semibold mb-3" style={{ color: 'var(--sco-text2)' }}>
                  Inscriptions — 6 derniers mois
                </div>
                <div className="flex items-end gap-2" style={{ height: 70 }}>
                  {BARS.map((h, i) => (
                    <div key={i} className="flex-1 flex flex-col items-center gap-1">
                      <div
                        className="w-full rounded-sm origin-bottom animate-bar-grow"
                        style={{
                          height: `${h}%`,
                          background: i % 2 === 0 ? 'rgba(196,64,26,0.5)' : 'rgba(14,116,144,0.5)',
                          animationDelay: `${i * 0.1 + 1}s`,
                        }}
                      />
                      <span className="text-[8px]" style={{ color: 'var(--sco-muted)' }}>{MONTHS[i]}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Glow */}
        <div
          className="absolute -inset-4 -z-10 rounded-3xl blur-2xl opacity-30"
          style={{ background: 'radial-gradient(ellipse, #C4401A 0%, #0E7490 60%, transparent 80%)' }}
        />
      </motion.div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
        style={{ color: 'var(--sco-muted)' }}
      >
        <span className="text-[10px] uppercase tracking-[3px]">Défiler</span>
        <svg viewBox="0 0 24 24" className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth={2}>
          <polyline points="6 9 12 15 18 9" />
        </svg>
      </motion.div>
    </section>
  )
}
