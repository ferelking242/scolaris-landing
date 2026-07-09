const ITEMS = [
  { icon: '🏫', label: 'Primaire → Doctorat', bg: 'rgba(196,64,26,0.12)' },
  { icon: '📶', label: '100% Hors-ligne',     bg: 'rgba(14,116,144,0.12)' },
  { icon: '🌍', label: '4 langues africaines', bg: 'rgba(212,168,83,0.12)' },
  { icon: '📱', label: 'Web · Android · iOS', bg: 'rgba(21,128,61,0.12)' },
  { icon: '🔐', label: 'Données sécurisées',  bg: 'rgba(124,58,237,0.1)' },
  { icon: '💰', label: 'Paiement en FCFA',    bg: 'rgba(196,64,26,0.12)' },
]

export default function TrustBar() {
  return (
    <div
      className="py-5 px-6"
      style={{ borderTop: '1px solid var(--sco-border)', borderBottom: '1px solid var(--sco-border)', background: 'var(--sco-bg2)' }}
    >
      <div className="max-w-5xl mx-auto flex flex-wrap items-center justify-center gap-6">
        {ITEMS.map(item => (
          <div key={item.label} className="flex items-center gap-2.5 text-sm font-medium" style={{ color: 'var(--sco-text2)' }}>
            <div className="w-8 h-8 rounded-lg flex items-center justify-center text-base flex-shrink-0" style={{ background: item.bg }}>
              {item.icon}
            </div>
            {item.label}
          </div>
        ))}
      </div>
    </div>
  )
}
