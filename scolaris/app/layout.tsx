import type { Metadata } from 'next'
import { Fraunces, Plus_Jakarta_Sans, Space_Grotesk } from 'next/font/google'
import { Providers } from './providers'
import './globals.css'

const fraunces = Fraunces({
  subsets: ['latin'],
  variable: '--font-fraunces',
  weight: ['400', '600', '700', '800'],
  style: ['normal', 'italic'],
})

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  weight: ['400', '500', '600', '700', '800'],
})

const grotesk = Space_Grotesk({
  subsets: ['latin'],
  variable: '--font-grotesk',
  weight: ['400', '500', '600', '700'],
})

export const metadata: Metadata = {
  title: 'Scolaris — Plateforme de gestion scolaire africaine',
  description:
    'Scolaris est la plateforme SaaS de gestion scolaire conçue pour l\'Afrique. 6 rôles, 4 langues, offline-ready, du CP au Doctorat. Disponible sur Web, Android, iOS, Windows.',
  keywords: 'gestion scolaire, Africa, Congo, SaaS, école, logiciel scolaire, Flutter',
  openGraph: {
    title: 'Scolaris — Gérez votre école. Partout en Afrique.',
    description: 'Plateforme SaaS de gestion scolaire africaine. 6 rôles, 4 langues, offline-ready.',
    type: 'website',
    locale: 'fr_FR',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Scolaris — Gérez votre école. Partout en Afrique.',
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html
      lang="fr"
      suppressHydrationWarning
      className={`${fraunces.variable} ${jakarta.variable} ${grotesk.variable}`}
    >
      <body>
        <Providers>{children}</Providers>
      </body>
    </html>
  )
}
