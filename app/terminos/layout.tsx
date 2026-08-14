import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Términos de Servicio | DARK_NESS SERVICES',
  description:
    'Términos y condiciones de los servicios de DARK_NESS SERVICES: configuración de plugins, networks, bots de Discord, tiendas Tebex, VPS, servidores dedicados y más.',
}

export default function TerminosLayout({ children }: { children: React.ReactNode }) {
  return children
}
