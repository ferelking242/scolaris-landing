'use client'
import { useState, useRef } from 'react'
import { motion, useInView } from 'framer-motion'
import { Send, CheckCircle } from 'lucide-react'

const EASE = [0.4, 0, 0.2, 1] as [number, number, number, number]

export default function Contact() {
  const ref = useRef(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })

  const [form, setForm] = useState({ name: '', email: '', school: '', message: '' })
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle')
  const [errorMsg, setErrorMsg] = useState('')

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setStatus('loading')
    setErrorMsg('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      if (!res.ok) throw new Error('Erreur serveur')
      setStatus('success')
    } catch {
      setStatus('error')
      setErrorMsg('Une erreur est survenue. Veuillez réessayer ou nous contacter directement.')
    }
  }

  return (
    <section id="contact" className="py-24 px-5">
      <div className="max-w-5xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 md:gap-16 items-start">
          {/* Left */}
          <motion.div
            ref={ref}
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.65, ease: EASE }}
          >
            <p className="text-[11px] font-bold uppercase tracking-[3px] text-sco-primary mb-4">
              Démarrer maintenant
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-5">
              Essayez Scolaris{' '}
              <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>gratuitement</em>
            </h2>
            <p className="text-sco-text2 text-base leading-relaxed mb-8">
              30 jours d'essai complet, sans carte bancaire. Notre équipe basée à Brazzaville
              vous accompagne pour la configuration de votre établissement.
            </p>

            <div className="flex flex-col gap-4">
              {[
                { label: 'Configuration guidée', sub: 'On s\'occupe de tout le paramétrage initial' },
                { label: 'Formation incluse', sub: 'Vos équipes formées en moins de 2 heures' },
                { label: 'Support en lingala & français', sub: 'Une équipe locale disponible 6j/7' },
              ].map(item => (
                <div key={item.label} className="flex items-start gap-3">
                  <div
                    className="w-1.5 h-1.5 rounded-full mt-2 flex-shrink-0"
                    style={{ background: '#C4401A' }}
                  />
                  <div>
                    <div className="text-sm font-semibold text-sco-text">{item.label}</div>
                    <div className="text-sm text-sco-text2">{item.sub}</div>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>

          {/* Form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.65, ease: EASE }}
          >
            {status === 'success' ? (
              <div
                className="rounded-2xl p-10 flex flex-col items-center text-center gap-4"
                style={{ background: 'var(--sco-bg2)', border: '1px solid rgba(21,128,61,0.3)' }}
              >
                <CheckCircle size={40} style={{ color: '#15803D' }} />
                <h3 className="text-xl font-bold text-sco-text">Message envoyé</h3>
                <p className="text-sco-text2 text-sm">
                  Notre équipe vous contactera dans les 24 heures ouvrables.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-2xl p-6 md:p-8 flex flex-col gap-4"
                style={{ background: 'var(--sco-bg2)', border: '1px solid var(--sco-border2)' }}
              >
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-sco-text2">Nom complet</label>
                    <input
                      required
                      value={form.name}
                      onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                      placeholder="Jean Mbemba"
                      className="px-3 py-2.5 rounded-xl text-sm text-sco-text outline-none transition-all duration-200 placeholder:text-sco-muted col-span-1"
                      style={{ background: 'var(--sco-bg3)', border: '1px solid var(--sco-border2)' }}
                    />
                  </div>
                  <div className="flex flex-col gap-1.5">
                    <label className="text-xs font-semibold text-sco-text2">Email</label>
                    <input
                      required
                      type="email"
                      value={form.email}
                      onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                      placeholder="jean@ecole.cg"
                      className="px-3 py-2.5 rounded-xl text-sm text-sco-text outline-none transition-all duration-200 placeholder:text-sco-muted"
                      style={{ background: 'var(--sco-bg3)', border: '1px solid var(--sco-border2)' }}
                    />
                  </div>
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-sco-text2">Nom de l'établissement</label>
                  <input
                    required
                    value={form.school}
                    onChange={e => setForm(f => ({ ...f, school: e.target.value }))}
                    placeholder="Collège de la Corniche, Brazzaville"
                    className="px-3 py-2.5 rounded-xl text-sm text-sco-text outline-none transition-all duration-200 placeholder:text-sco-muted"
                    style={{ background: 'var(--sco-bg3)', border: '1px solid var(--sco-border2)' }}
                  />
                </div>

                <div className="flex flex-col gap-1.5">
                  <label className="text-xs font-semibold text-sco-text2">Message (optionnel)</label>
                  <textarea
                    rows={3}
                    value={form.message}
                    onChange={e => setForm(f => ({ ...f, message: e.target.value }))}
                    placeholder="Parlez-nous de votre établissement…"
                    className="px-3 py-2.5 rounded-xl text-sm text-sco-text outline-none transition-all duration-200 placeholder:text-sco-muted resize-none"
                    style={{ background: 'var(--sco-bg3)', border: '1px solid var(--sco-border2)' }}
                  />
                </div>

                {errorMsg && (
                  <p className="text-xs text-red-400">{errorMsg}</p>
                )}

                <button
                  type="submit"
                  disabled={status === 'loading'}
                  className="flex items-center justify-center gap-2 py-3.5 rounded-xl bg-sco-primary text-white text-sm font-bold hover:brightness-110 transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-60 disabled:cursor-not-allowed"
                  style={{ boxShadow: '0 6px 20px rgba(196,64,26,0.3)' }}
                >
                  {status === 'loading' ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  ) : (
                    <Send size={15} />
                  )}
                  {status === 'loading' ? 'Envoi…' : 'Envoyer ma demande'}
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
