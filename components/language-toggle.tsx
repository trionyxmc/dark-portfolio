"use client"

import { useLanguage } from '@/components/language-provider'

// Pildora EN/ES: muestra los dos idiomas siempre visibles y resalta el
// activo, asi el visitante ve de entrada que hay otro idioma disponible
// en vez de tener que descubrir un boton generico de "idioma".
export function LanguageToggle({ className = '' }: { className?: string }) {
  const { locale, setLocale } = useLanguage()

  return (
    <div
      className={`inline-flex items-center rounded-full border border-border/50 bg-secondary/30 p-0.5 text-xs font-semibold ${className}`}
      role="group"
      aria-label="Language / Idioma"
    >
      <button
        type="button"
        onClick={() => setLocale('en')}
        aria-pressed={locale === 'en'}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          locale === 'en' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        EN
      </button>
      <button
        type="button"
        onClick={() => setLocale('es')}
        aria-pressed={locale === 'es'}
        className={`px-2.5 py-1 rounded-full transition-colors ${
          locale === 'es' ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground'
        }`}
      >
        ES
      </button>
    </div>
  )
}
