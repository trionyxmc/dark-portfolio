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

export const metadata: Metadata = {
  title: 'DarknessServices | Premium Minecraft Creator',
  description: 'Elite Minecraft services, plugin configurations, Discord bots, and premium network creation. 5+ years of experience crafting exceptional gaming experiences.',
  generator: 'v0.app',
  keywords: ['Minecraft', 'Plugin Configuration', 'Discord Bots', 'Tebex', 'Server Networks', 'Premium Services'],
  authors: [{ name: 'DarknessServices' }],
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
      {
        url: '/icon.svg',
        type: 'image/svg+xml',
      },
    ],
    apple: '/apple-icon.png',
  },
  openGraph: {
    title: 'DARK_NESS SERVICES | Desarrollo Minecraft & Discord Premium',
    description: 'Servicios premium de desarrollo para Minecraft y Discord. Configuraciones avanzadas, bots personalizados, tiendas Tebex y soluciones web profesionales.',
    type: 'website',
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
    <html lang="en" className={`${inter.variable} ${jetbrainsMono.variable} ${pressStart.variable} bg-background`}>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
