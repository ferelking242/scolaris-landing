'use client'
import { useEffect, useRef } from 'react'
import { motion } from 'framer-motion'
import { ArrowDown } from 'lucide-react'

type Particle = { x:number; y:number; vx:number; vy:number; r:number; alpha:number; color:string }
const COLORS = ['#C4401A','#D4A853','#0E7490']
const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

const FADE = {
  hidden:  { opacity: 0, y: 24 },
  visible: (i: number) => ({
    opacity: 1, y: 0,
    transition: { delay: i * 0.14, duration: 0.65, ease: EASE },
  }),
}

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
        vx: (Math.random() - 0.5) * 0.4,
        vy: -(Math.random() * 0.7 + 0.2),
        r: Math.random() * 1.8 + 0.3,
        alpha: Math.random() * 0.45 + 0.08,
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
      for (let i = 0; i < 60; i++) {
        const p = mkP(); p.y = Math.random() * H; particles.push(p)
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
        ctx.fillStyle = p.color + Math.floor(p.alpha * 255).toString(16).padStart(2, '0')
        ctx.fill()
      }
      animId = requestAnimationFrame(tick)
    }

    init(); tick()
    window.addEventListener('resize', resize, { passive: true })
    return () => { cancelAnimationFrame(animId); window.removeEventListener('resize', resize) }
  }, [])

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden pt-16 pb-12 px-5">
      {/* bg image */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/generated/hero-bg.jpg')", opacity: 0.12 }}
      />
      {/* radial fade bottom */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{ background: 'radial-gradient(ellipse 90% 55% at 50% 105%, var(--sco-bg) 0%, transparent 65%)' }}
      />
      {/* particles */}
      <canvas ref={canvasRef} className="absolute inset-0 w-full h-full pointer-events-none" />

      {/* Content */}
      <div className="relative z-10 text-center w-full max-w-5xl mx-auto">
        {/* Badge */}
        <motion.div
          custom={0} variants={FADE} initial="hidden" animate="visible"
          className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-[11px] font-bold uppercase tracking-widest mb-8"
          style={{ background: 'rgba(196,64,26,0.1)', border: '1px solid rgba(196,64,26,0.25)', color: '#C4401A' }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-sco-primary animate-pulse-dot" />
          Plateforme scolaire · Congo-Brazzaville
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1} variants={FADE} initial="hidden" animate="visible"
          className="text-[clamp(2.4rem,7vw,5.5rem)] font-extrabold tracking-tight leading-[1.06] mb-5"
        >
          Gérez votre école.
          <br />
          <em
            className="font-serif"
            style={{ fontStyle: 'italic', background: 'linear-gradient(135deg,#C4401A,#D4A853)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
          >
            Partout en Afrique.
          </em>
        </motion.h1>

        {/* Sub */}
        <motion.p
          custom={2} variants={FADE} initial="hidden" animate="visible"
          className="text-[clamp(1rem,2.5vw,1.2rem)] text-sco-text2 max-w-xl mx-auto mb-10 leading-relaxed"
        >
          La première solution SaaS de gestion scolaire pensée pour l'Afrique centrale.
          Six rôles, quatre langues, mode hors-ligne natif.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={3} variants={FADE} initial="hidden" animate="visible"
          className="flex flex-col sm:flex-row items-center justify-center gap-3"
        >
          <a
            href="#contact"
            className="px-7 py-3.5 rounded-2xl bg-sco-primary text-white font-bold text-[15px] hover:brightness-110 transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto text-center"
            style={{ boxShadow: '0 8px 28px rgba(196,64,26,0.35)' }}
          >
            Démarrer gratuitement
          </a>
          <a
            href="#screenshots"
            className="px-7 py-3.5 rounded-2xl font-semibold text-[15px] text-sco-text hover:text-white transition-all duration-200 hover:-translate-y-0.5 w-full sm:w-auto text-center"
            style={{ background: 'var(--sco-bg2)', border: '1px solid var(--sco-border2)' }}
          >
            Voir l'application
          </a>
        </motion.div>

        {/* Dashboard card */}
        <motion.div
          custom={4} variants={FADE} initial="hidden" animate="visible"
          className="relative mt-16 mx-auto max-w-2xl"
        >
          <div
            className="rounded-2xl overflow-hidden p-4 md:p-6"
            style={{
              background: 'var(--sco-bg2)',
              border: '1px solid var(--sco-border2)',
              boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
            }}
          >
            {/* Window chrome */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-3 h-3 rounded-full bg-[#FF5F57]" />
              <div className="w-3 h-3 rounded-full bg-[#FEBC2E]" />
              <div className="w-3 h-3 rounded-full bg-[#28C840]" />
              <div
                className="flex-1 h-6 rounded-md ml-2 text-[11px] flex items-center px-2"
                style={{ background: 'var(--sco-bg3)', color: 'var(--sco-muted)' }}
              >
                app.scolaris.cd — Tableau de bord
              </div>
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-3 gap-3 mb-4">
              {[
                { label: 'Élèves inscrits', value: '1 248', color: '#C4401A' },
                { label: 'Présences aujourd\'hui', value: '94 %', color: '#15803D' },
                { label: 'Frais collectés', value: '4,2M FCFA', color: '#0E7490' },
              ].map(s => (
                <div
                  key={s.label}
                  className="rounded-xl p-3 flex flex-col gap-1"
                  style={{ background: 'var(--sco-bg3)', border: '1px solid var(--sco-border)' }}
                >
                  <span className="text-[10px] font-medium" style={{ color: 'var(--sco-muted)' }}>{s.label}</span>
                  <span className="text-base md:text-xl font-extrabold" style={{ color: s.color }}>{s.value}</span>
                </div>
              ))}
            </div>

            {/* Bar chart */}
            <div
              className="rounded-xl p-3 md:p-4"
              style={{ background: 'var(--sco-bg3)', border: '1px solid var(--sco-border)' }}
            >
              <div className="text-[10px] font-semibold mb-3" style={{ color: 'var(--sco-text2)' }}>
                Inscriptions — 6 derniers mois
              </div>
              <div className="flex items-end gap-1.5 md:gap-2" style={{ height: 64 }}>
                {BARS.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-1">
                    <div
                      className="w-full rounded-sm origin-bottom animate-bar-grow"
                      style={{
                        height: `${h}%`,
                        background: i % 2 === 0 ? 'rgba(196,64,26,0.55)' : 'rgba(14,116,144,0.45)',
                        animationDelay: `${i * 0.1 + 0.8}s`,
                      }}
                    />
                    <span className="text-[8px] md:text-[9px]" style={{ color: 'var(--sco-muted)' }}>{MONTHS[i]}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Glow */}
          <div
            className="absolute -inset-6 -z-10 rounded-3xl blur-3xl opacity-25"
            style={{ background: 'radial-gradient(ellipse,#C4401A 0%,#0E7490 60%,transparent 80%)' }}
          />
        </motion.div>
      </div>

      {/* Scroll hint */}
      <motion.div
        animate={{ y: [0, 8, 0] }}
        transition={{ repeat: Infinity, duration: 2.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 z-10"
        style={{ color: 'var(--sco-muted)' }}
      >
        <span className="text-[10px] uppercase tracking-[3px]">Défiler</span>
        <ArrowDown size={16} />
      </motion.div>
    </section>
  )
}
