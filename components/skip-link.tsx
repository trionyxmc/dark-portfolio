"use client"

import { useLanguage } from '@/components/language-provider'

const copy = {
  en: 'Skip to content',
  es: 'Saltar al contenido',
}

// Invisible hasta que recibe foco (Tab desde el principio de la pagina).
// Le permite a alguien navegando por teclado saltarse el navbar completo
// en vez de tabular por los 5 links + selector de idioma + boton en
// cada carga de pagina.
export function SkipLink() {
  const { locale } = useLanguage()

  return (
    <a
      href="#main-content"
      className="fixed top-2 left-2 z-[200] -translate-y-20 focus:translate-y-0 bg-primary text-primary-foreground px-4 py-2.5 rounded-md text-sm font-medium transition-transform duration-150"
    >
      {copy[locale]}
    </a>
  )
}
