import type { Metadata } from 'next'
import { cookies } from 'next/headers'

const metaCopy = {
  en: {
    title: 'Terms of Service | DARK_NESS SERVICES',
    description:
      "Terms and conditions for DARK_NESS SERVICES' services: plugin configuration, networks, Discord bots, Tebex stores, VPS, dedicated servers, and more.",
  },
  es: {
    title: 'Términos de Servicio | DARK_NESS SERVICES',
    description:
      'Términos y condiciones de los servicios de DARK_NESS SERVICES: configuración de plugins, networks, bots de Discord, tiendas Tebex, VPS, servidores dedicados y más.',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const cookieStore = await cookies()
  const locale = cookieStore.get('ds-locale')?.value === 'es' ? 'es' : 'en'
  const m = metaCopy[locale]

  return {
    title: m.title,
    description: m.description,
    alternates: {
      canonical: '/terminos',
    },
  }
}

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
  return children
}
