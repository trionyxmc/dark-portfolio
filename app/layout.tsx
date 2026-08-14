import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Press_Start_2P, Syne, DM_Sans, Bebas_Neue } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { siteUrl } from '@/lib/site'
import { allTestimonials } from '@/lib/testimonials-data'
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

// Usadas en las secciones de Skills y Lab de Proyectos. Antes se cargaban
// con un @import dentro de un <style> inyectado en runtime, lo que causaba
// un parpadeo de texto sin estilizar (FOUC) y una peticion de red extra
// cada vez que esas secciones montaban. Con next/font quedan optimizadas,
// auto-hosteadas y disponibles desde el primer render.
const syne = Syne({
  subsets: ['latin'],
  weight: ['700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300', '400', '500'],
  variable: '--font-dm-sans',
  display: 'swap',
})

const bebasNeue = Bebas_Neue({
  subsets: ['latin'],
  weight: '400',
  variable: '--font-bebas',
  display: 'swap',
})

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
    url: siteUrl,
    images: [{ url: '/preview.webp' }],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DARK_NESS SERVICES | Desarrollo Minecraft & Discord Premium',
    description: 'Servicios premium de desarrollo para Minecraft y Discord. Configuraciones avanzadas, bots personalizados, tiendas Tebex y soluciones web profesionales.',
    images: ['/preview.webp'],
  },
  alternates: {
    canonical: '/',
  },
}

// Schema.org JSON-LD: describe el negocio y los testimonios reales que ya
// se muestran en la pagina, para habilitar rich snippets (estrellas) en
// resultados de busqueda de Google.
function buildJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'DARK_NESS SERVICES',
    serviceType: 'Desarrollo y configuracion de servidores Minecraft, bots de Discord y tiendas Tebex',
    description:
      'Servicios premium de desarrollo para Minecraft y Discord. Configuraciones avanzadas, bots personalizados, tiendas Tebex y soluciones web profesionales.',
    provider: {
      '@type': 'Organization',
      name: 'DARK_NESS SERVICES',
      url: siteUrl,
      image: `${siteUrl}/preview.webp`,
    },
    areaServed: 'Worldwide',
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '5',
      bestRating: '5',
      reviewCount: String(allTestimonials.length),
    },
    review: allTestimonials.map((t) => ({
      '@type': 'Review',
      author: { '@type': 'Person', name: t.label },
      reviewBody: t.text,
      reviewRating: {
        '@type': 'Rating',
        ratingValue: '5',
        bestRating: '5',
      },
    })),
  }
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
      className={`${inter.variable} ${jetbrainsMono.variable} ${pressStart.variable} ${syne.variable} ${dmSans.variable} ${bebasNeue.variable} bg-background`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd()).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
