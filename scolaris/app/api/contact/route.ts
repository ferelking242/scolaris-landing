import { NextRequest, NextResponse } from 'next/server'

export const runtime = 'nodejs'

type ContactPayload = {
  name: string
  school: string
  email: string
  tel?: string
  message?: string
}

function validatePayload(body: unknown): ContactPayload {
  if (!body || typeof body !== 'object') throw new Error('Corps de requête invalide')
  const b = body as Record<string, unknown>
  if (!b.name || typeof b.name !== 'string') throw new Error('Nom requis')
  if (!b.school || typeof b.school !== 'string') throw new Error('École requise')
  if (!b.email || typeof b.email !== 'string') throw new Error('Email requis')
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email)) throw new Error('Email invalide')
  return {
    name:    b.name.trim().slice(0, 100),
    school:  b.school.trim().slice(0, 100),
    email:   b.email.trim().toLowerCase().slice(0, 200),
    tel:     typeof b.tel === 'string' ? b.tel.trim().slice(0, 30) : undefined,
    message: typeof b.message === 'string' ? b.message.trim().slice(0, 2000) : undefined,
  }
}

export async function POST(req: NextRequest) {
  try {
    const raw = await req.json()
    const data = validatePayload(raw)

    // ── Log the lead (replace with email/CRM/WhatsApp integration) ─────────
    console.log('[Scolaris Contact]', {
      timestamp: new Date().toISOString(),
      ...data,
    })

    // ── Optional: forward to an email service (e.g. Resend, SendGrid) ──────
    // Uncomment and configure RESEND_API_KEY / SENDGRID_API_KEY as secrets
    //
    // await fetch('https://api.resend.com/emails', {
    //   method: 'POST',
    //   headers: {
    //     'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
    //     'Content-Type': 'application/json',
    //   },
    //   body: JSON.stringify({
    //     from: 'Scolaris <noreply@scolaris.africa>',
    //     to: 'contact@scolaris.africa',
    //     subject: `Nouvelle demande de ${data.name} — ${data.school}`,
    //     text: `Nom: ${data.name}\nÉcole: ${data.school}\nEmail: ${data.email}\nTél: ${data.tel}\n\n${data.message}`,
    //   }),
    // })

    // ── Optional: forward to WhatsApp via CallMeBot / Ultramsg ─────────────
    // const msg = encodeURIComponent(`📩 Nouvelle demande Scolaris\n👤 ${data.name}\n🏫 ${data.school}\n📧 ${data.email}`)
    // await fetch(`https://api.callmebot.com/whatsapp.php?phone=243000000000&text=${msg}&apikey=${process.env.WA_API_KEY}`)

    return NextResponse.json(
      { success: true, message: 'Demande reçue. Notre équipe vous contactera sous 24h.' },
      { status: 200 },
    )
  } catch (err) {
    const message = err instanceof Error ? err.message : 'Erreur serveur'
    return NextResponse.json({ success: false, message }, { status: 400 })
  }
}

// Block GET requests
export function GET() {
  return NextResponse.json({ error: 'Method not allowed' }, { status: 405 })
}
