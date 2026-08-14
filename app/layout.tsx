import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Press_Start_2P } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter',
  display: 'swap',
})

const jetbrainsMono = JetBrains_Mono({ 
  subsets: ["latin"],
  variable: '--font-jetbrains',
  display: 'swap',
})

const pressStart = Press_Start_2P({ 
  weight: "400",
  subsets: ["latin"],
  variable: '--font-display',
  display: 'swap',
})

// Usa NEXT_PUBLIC_SITE_URL si se define (cuando tengas dominio propio),
// si no cae en la URL que Vercel asigna automaticamente al deploy,
// y en desarrollo local usa localhost.
const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: 'DARK_NESS SERVICES | Desarrollo Minecraft & Discord Premium',
  description: 'Servicios premium de desarrollo para Minecraft y Discord. Configuraciones avanzadas, bots personalizados, tiendas Tebex y soluciones web profesionales.',
  keywords: ['Minecraft', 'Configuracion de Plugins', 'Bots de Discord', 'Tebex', 'Redes de Servidores', 'Servicios Premium'],
  authors: [{ name: 'DARK_NESS SERVICES' }],
  icons: {
    icon: [
      {
        url: '/icon-light-32x32.png',
        media: '(prefers-color-scheme: light)',
      },
      {
        url: '/icon-dark-32x32.png',
        media: '(prefers-color-scheme: dark)',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'DARK_NESS SERVICES | Desarrollo Minecraft & Discord Premium',
    description: 'Servicios premium de desarrollo para Minecraft y Discord. Configuraciones avanzadas, bots personalizados, tiendas Tebex y soluciones web profesionales.',
    type: 'website',
    locale: 'es_ES',
    images: [{ url: '/preview.webp' }],
  },
}

export const viewport: Viewport = {
  themeColor: '#8B0000',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="es"
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} ${pressStart.variable} bg-background`}
    >
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
