'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Send, MessageCircle, Mail, Github, Check } from 'lucide-react'

export default function Contact() {
  const [form, setForm] = useState({ name: '', school: '', email: '', tel: '', message: '' })
  const [sent, setSent] = useState(false)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')

  function handle(e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
  }

  async function submit(e: React.FormEvent) {
    e.preventDefault()
    setSending(true)
    setError('')
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      })
      const json = await res.json()
      if (!res.ok || !json.success) throw new Error(json.message ?? 'Erreur serveur')
      setSent(true)
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Une erreur est survenue. Réessayez.')
    } finally {
      setSending(false)
    }
  }

  return (
    <section id="contact" className="py-24 px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
        {/* Left: Info */}
        <div>
          <p className="text-xs font-bold uppercase tracking-[3px] text-sco-primary mb-5">
            Commencez maintenant
          </p>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-5">
            Parlons de{' '}
            <em className="font-serif text-sco-primary" style={{ fontStyle: 'italic' }}>votre école</em>
          </h2>
          <p className="text-sco-text2 text-base leading-relaxed mb-12">
            Répondez au formulaire ou contactez-nous directement. Notre équipe vous rappelle sous 24h pour une démo personnalisée.
          </p>

          {/* Contact methods */}
          <div className="flex flex-col gap-5">
            {[
              {
                icon: MessageCircle,
                label: 'WhatsApp',
                value: '+243 XXX XXX XXX',
                href: 'https://wa.me/243000000000',
                color: '#25D366',
                bg: 'rgba(37,211,102,0.1)',
              },
              {
                icon: Mail,
                label: 'Email',
                value: 'contact@scolaris.africa',
                href: 'mailto:contact@scolaris.africa',
                color: '#C4401A',
                bg: 'rgba(196,64,26,0.1)',
              },
              {
                icon: Github,
                label: 'GitHub',
                value: 'ferelking242/scolaris',
                href: 'https://github.com/ferelking242/scolaris',
                color: 'var(--sco-text)',
                bg: 'var(--sco-bg2)',
              },
            ].map(c => {
              const Icon = c.icon
              return (
                <a
                  key={c.label}
                  href={c.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-4 p-4 rounded-2xl transition-all duration-200 hover:-translate-y-0.5 group"
                  style={{ background: 'var(--sco-card)', border: '1px solid var(--sco-border)' }}
                >
                  <div
                    className="w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0"
                    style={{ background: c.bg }}
                  >
                    <Icon size={20} style={{ color: c.color }} />
                  </div>
                  <div>
                    <div className="text-xs font-bold uppercase tracking-wide" style={{ color: 'var(--sco-muted)' }}>{c.label}</div>
                    <div className="text-sm font-semibold group-hover:text-sco-primary transition-colors">{c.value}</div>
                  </div>
                </a>
              )
            })}
          </div>
        </div>

        {/* Right: Form */}
        <div
          className="rounded-3xl p-8 md:p-10"
          style={{
            background: 'var(--sco-card)',
            border: '1px solid var(--sco-border)',
            boxShadow: '0 20px 60px rgba(0,0,0,0.2)',
          }}
        >
          {sent ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex flex-col items-center justify-center text-center py-16 gap-4"
            >
              <div
                className="w-20 h-20 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(21,128,61,0.15)' }}
              >
                <Check size={40} style={{ color: '#15803D' }} />
              </div>
              <h4 className="text-2xl font-bold">Message envoyé !</h4>
              <p style={{ color: 'var(--sco-text2)' }}>Notre équipe vous répondra sous 24 heures.</p>
              <button
                onClick={() => { setSent(false); setForm({ name: '', school: '', email: '', tel: '', message: '' }) }}
                className="mt-4 px-6 py-2.5 rounded-xl text-sm font-bold"
                style={{ background: 'var(--sco-bg2)', color: 'var(--sco-text)' }}
              >
                Envoyer un autre message
              </button>
            </motion.div>
          ) : (
            <form onSubmit={submit} className="flex flex-col gap-5">
              <h3 className="text-xl font-bold mb-2">Demande de démo ou d'essai</h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field name="name" label="Votre nom" placeholder="Amara Diallo" value={form.name} onChange={handle} required />
                <Field name="school" label="Nom de l'école" placeholder="Lycée de la Paix" value={form.school} onChange={handle} required />
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <Field name="email" type="email" label="Email" placeholder="contact@ecole.cd" value={form.email} onChange={handle} required />
                <Field name="tel" type="tel" label="WhatsApp / Téléphone" placeholder="+243 XXX XXX" value={form.tel} onChange={handle} />
              </div>
              <TextArea name="message" label="Message (optionnel)" placeholder="Décrivez votre établissement, le nombre d'élèves, vos besoins..." value={form.message} onChange={handle} />

              {error && (
                <div
                  className="px-4 py-3 rounded-xl text-sm font-medium"
                  style={{ background: 'rgba(196,64,26,0.12)', color: '#C4401A', border: '1px solid rgba(196,64,26,0.3)' }}
                >
                  ⚠ {error}
                </div>
              )}

              <button
                type="submit"
                disabled={sending}
                className="flex items-center justify-center gap-2 w-full py-4 rounded-2xl text-base font-bold text-white transition-all duration-200 hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
                style={{ background: 'linear-gradient(135deg, #C4401A, #D4A853)', boxShadow: '0 8px 25px rgba(196,64,26,0.35)' }}
              >
                {sending ? (
                  <svg className="animate-spin w-5 h-5" viewBox="0 0 24 24" fill="none">
                    <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeOpacity="0.3" />
                    <path d="M12 2a10 10 0 0110 10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
                  </svg>
                ) : (
                  <Send size={18} />
                )}
                {sending ? 'Envoi en cours…' : 'Envoyer la demande'}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  )
}

function Field({ name, label, placeholder, value, onChange, type = 'text', required = false }: {
  name: string; label: string; placeholder: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  type?: string; required?: boolean
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold" style={{ color: 'var(--sco-text2)' }}>{label}{required && ' *'}</span>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        required={required}
        className="px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 focus:ring-2"
        style={{
          background: 'var(--sco-bg2)',
          border: '1px solid var(--sco-border2)',
          color: 'var(--sco-text)',
        }}
      />
    </label>
  )
}

function TextArea({ name, label, placeholder, value, onChange }: {
  name: string; label: string; placeholder: string; value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void
}) {
  return (
    <label className="flex flex-col gap-1.5">
      <span className="text-xs font-bold" style={{ color: 'var(--sco-text2)' }}>{label}</span>
      <textarea
        name={name}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        rows={4}
        className="px-4 py-3 rounded-xl text-sm outline-none transition-all duration-200 resize-none"
        style={{
          background: 'var(--sco-bg2)',
          border: '1px solid var(--sco-border2)',
          color: 'var(--sco-text)',
        }}
      />
    </label>
  )
}
