"use client"

import { createContext, useCallback, useContext, useMemo, useState } from 'react'

export type Locale = 'en' | 'es'

const COOKIE_NAME = 'ds-locale'

interface LanguageContextValue {
  locale: Locale
  setLocale: (locale: Locale) => void
  toggleLocale: () => void
}

const LanguageContext = createContext<LanguageContextValue | null>(null)

// El locale inicial viene del servidor (leido de la cookie en layout.tsx),
// asi el primer render del cliente ya coincide con el HTML que mando el
// servidor y no hay parpadeo de idioma ni mismatch de hidratacion.
export function LanguageProvider({
  initialLocale,
  children,
}: {
  initialLocale: Locale
  children: React.ReactNode
}) {
  const [locale, setLocaleState] = useState<Locale>(initialLocale)

  const setLocale = useCallback((next: Locale) => {
    setLocaleState(next)
    if (typeof document !== 'undefined') {
      document.cookie = `${COOKIE_NAME}=${next}; path=/; max-age=31536000; samesite=lax`
      document.documentElement.lang = next
    }
  }, [])

  const toggleLocale = useCallback(() => {
    setLocale(locale === 'en' ? 'es' : 'en')
  }, [locale, setLocale])

  const value = useMemo(() => ({ locale, setLocale, toggleLocale }), [locale, setLocale, toggleLocale])

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}

export function useLanguage() {
  const ctx = useContext(LanguageContext)
  if (!ctx) {
    throw new Error('useLanguage debe usarse dentro de <LanguageProvider>')
  }
  return ctx
}
