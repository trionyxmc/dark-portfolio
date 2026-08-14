import type { Metadata, Viewport } from 'next'
import { Inter, JetBrains_Mono, Press_Start_2P } from 'next/font/google'
import { cookies } from 'next/headers'
import { Analytics } from '@vercel/analytics/next'
import { siteUrl } from '@/lib/site'
import { allTestimonials } from '@/lib/testimonials-data'
import { LanguageProvider } from '@/components/language-provider'
import type { Locale } from '@/components/language-provider'
import { SkipLink } from '@/components/skip-link'
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

// Lee el idioma elegido de una cookie (seteada por el toggle EN/ES) para
// que tanto la metadata como el primer render del cliente arranquen ya
// en el idioma correcto -- sin esto habria un parpadeo EN -> ES en cada
// carga para quien eligio español.
async function getLocale(): Promise<Locale> {
  const cookieStore = await cookies()
  return cookieStore.get('ds-locale')?.value === 'es' ? 'es' : 'en'
}

const metaCopy: Record<Locale, { title: string; description: string; keywords: string[]; ogLocale: string }> = {
  en: {
    title: 'DARK_NESS SERVICES | Custom Minecraft & Discord Development',
    description:
      'Custom Minecraft and Discord development. Advanced plugin configs, custom bots, Tebex stores and professional server infrastructure.',
    keywords: ['Minecraft', 'Plugin Configuration', 'Discord Bots', 'Tebex', 'Minecraft Network Setup', 'Server Configuration'],
    ogLocale: 'en_US',
  },
  es: {
    title: 'DARK_NESS SERVICES | Desarrollo Minecraft & Discord',
    description:
      'Desarrollo a medida para Minecraft y Discord. Configuraciones avanzadas, bots personalizados, tiendas Tebex y soluciones de infraestructura profesionales.',
    keywords: ['Minecraft', 'Configuracion de Plugins', 'Bots de Discord', 'Tebex', 'Networks de Servidores', 'Configuracion de Servidores'],
    ogLocale: 'es_ES',
  },
}

export async function generateMetadata(): Promise<Metadata> {
  const locale = await getLocale()
  const m = metaCopy[locale]

  return {
    metadataBase: new URL(siteUrl),
    title: m.title,
    description: m.description,
    keywords: m.keywords,
    authors: [{ name: 'DARK_NESS SERVICES' }],
    icons: {
      icon: [
        { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
        { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
      ],
      apple: '/apple-icon.png',
    },
    openGraph: {
      title: m.title,
      description: m.description,
      type: 'website',
      locale: m.ogLocale,
      url: siteUrl,
      images: [{ url: '/preview.webp' }],
    },
    twitter: {
      card: 'summary_large_image',
      title: m.title,
      description: m.description,
      images: ['/preview.webp'],
    },
    alternates: {
      canonical: '/',
    },
  }
}

// Schema.org JSON-LD: describe el negocio y los testimonios reales que ya
// se muestran en la pagina, para habilitar rich snippets (estrellas) en
// resultados de busqueda de Google.
function buildJsonLd(locale: Locale) {
  const m = metaCopy[locale]
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name: 'DARK_NESS SERVICES',
    serviceType:
      locale === 'en'
        ? 'Minecraft server development, Discord bot development and Tebex store design'
        : 'Desarrollo y configuracion de servidores Minecraft, bots de Discord y tiendas Tebex',
    description: m.description,
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
      reviewBody: locale === 'en' ? t.textEn : t.text,
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const locale = await getLocale()

  return (
    <html
      lang={locale}
      data-scroll-behavior="smooth"
      className={`${inter.variable} ${jetbrainsMono.variable} ${pressStart.variable} bg-background`}
    >
      <head>
        <script
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(buildJsonLd(locale)).replace(/</g, '\\u003c'),
          }}
        />
      </head>
      <body className="font-sans antialiased overflow-x-hidden">
        <LanguageProvider initialLocale={locale}>
          <SkipLink />
          {children}
        </LanguageProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
