"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Settings,
  Server,
  Bot,
  Link2,
  ShoppingCart,
  LayoutPanelTop,
  Monitor,
  Building2,
  Languages,
  Puzzle,
  ArrowRight,
  Check,
  Sparkles,
  Info,
} from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const icons = [Settings, Server, Bot, ShoppingCart, Link2, LayoutPanelTop, Monitor, Building2, Languages, Puzzle]
const gradients = [
  'from-primary/30 via-primary/10 to-transparent',
  'from-primary/40 via-primary/15 to-transparent',
  'from-primary/30 via-primary/10 to-transparent',
  'from-primary/30 via-primary/10 to-transparent',
  'from-primary/30 via-primary/10 to-transparent',
  'from-primary/30 via-primary/10 to-transparent',
  'from-primary/30 via-primary/10 to-transparent',
  'from-primary/30 via-primary/10 to-transparent',
  'from-primary/30 via-primary/10 to-transparent',
  'from-primary/30 via-primary/10 to-transparent',
]
const featured = [false, true, false, false, false, false, false, false, false, false]
const prices = ['$5', '$50', '$15', '$30', '$5', '$20', '$35', '$20', '$5', '$5']

const servicesData = {
  en: [
    { title: '⚙️ Configuration', description: 'Custom setups built around your server\'s vision and needs.',
      features: ['Custom menus and GUIs', 'Quest systems', 'Battle Pass configs', 'RankUp ladders', 'Reward systems', 'Kit configuration'] },
    { title: '📡 Network Setup', description: 'Networks that handle player spikes without anything going down.',
      features: ['Lobby servers', 'Auth systems', 'Proxy configuration', 'BungeeCord/Velocity', 'Geyser integration', 'Cross-server sync'] },
    { title: '🤖 Bot Development', description: 'Custom bots packed with powerful features for your community.',
      features: ['Ticket systems', 'Economy modules', 'Moderation tools', 'Giveaway systems', 'Auto-moderation', 'Advanced embeds'] },
    { title: '🛒 Tebex Stores', description: "Stores that don't feel like a template — built to sell.",
      features: ['Tebex customization', 'Custom CSS/HTML', 'UX improvements', 'Conversion optimization', 'Mobile responsive', 'Brand integration'] },
    { title: '🌐 Domain to IP', description: 'Your domain pointed correctly the first time, no weird workarounds.',
      features: ['DNS configuration', 'Secure configuration', 'Fast deployment', 'SSL certificates', 'Subdomain routing', 'CDN integration'] },
    { title: '🦕 Pterodactyl', description: 'Full installation and setup of the Pterodactyl panel to manage your servers.',
      features: ['Panel installation', 'Node configuration', 'Custom eggs', 'SSL and custom domain', 'User management', 'Optimized Wings'] },
    { title: '🖥️ VPS Setup', description: 'VPS installation and optimization, ready for production.',
      features: ['Security hardening', 'Java/Docker installation', 'Firewall configuration', 'Performance optimization', 'Automatic backups', 'Secure SSH access'] },
    { title: '🏢 Dedicated Servers', description: 'Dedicated servers ready for production, no surprises later.',
      features: ['OS installation', 'Network configuration', 'Disk partitioning', '24/7 monitoring', 'Resource optimization', 'Advanced security'] },
    { title: '🌍 Translation', description: 'Full translation of your server, store, or bot into multiple languages.',
      features: ['Plugin translation', 'Tebex store localization', 'Discord bot translation', 'Dynamic multi-language support', 'Text proofreading', 'Cultural adaptation'] },
    { title: '➕ Bot Add-ons', description: 'Extra modules and extensions to power up your Discord bot.',
      features: ['Custom commands', 'API integrations', 'Leveling systems', 'Music modules', 'Custom automations', 'Ongoing support'] },
  ],
  es: [
    { title: '⚙️ Configuraciones', description: 'Setups personalizados adaptados a tu vision de servidor y necesidades.',
      features: ['Menus y GUIs personalizados', 'Sistemas de misiones', 'Configs de Battle Pass', 'Escaleras de RankUp', 'Sistemas de rewards', 'Configuracion de kits'] },
    { title: '📡 Creacion de Networks', description: 'Networks que aguantan picos de jugadores sin que nada se caiga.',
      features: ['Servidores lobby', 'Sistemas de auth', 'Configuracion de proxy', 'BungeeCord/Velocity', 'Integracion Geyser', 'Sync entre servidores'] },
    { title: '🤖 Desarrollo de Bots', description: 'Bots personalizados con funciones poderosas para tu comunidad.',
      features: ['Sistemas de tickets', 'Modulos de economia', 'Herramientas de mod', 'Sistemas de sorteos', 'Auto moderacion', 'Embeds avanzados'] },
    { title: '🛒 Tiendas Tebex', description: 'Tiendas que no se sienten como plantilla — pensadas para vender.',
      features: ['Personalizacion Tebex', 'CSS/HTML personalizado', 'Mejoras de UX', 'Optimizacion conversion', 'Responsive movil', 'Integracion de marca'] },
    { title: '🌐 Dominio a IP', description: 'Tu dominio apuntando bien a la primera, sin vueltas raras.',
      features: ['Configuracion DNS', 'Configuracion segura', 'Despliegue rapido', 'Certificados SSL', 'Routing subdominios', 'Integracion CDN'] },
    { title: '🦕 Pterodactyl', description: 'Instalacion y configuracion completa del panel Pterodactyl para gestionar tus servidores.',
      features: ['Instalacion de panel', 'Configuracion de nodos', 'Eggs personalizados', 'SSL y dominio propio', 'Gestion de usuarios', 'Wings optimizado'] },
    { title: '🖥️ Instalacion de VPS', description: 'Instalacion y optimizacion de tu VPS lista para produccion.',
      features: ['Endurecimiento de seguridad', 'Instalacion Java/Docker', 'Configuracion de firewall', 'Optimizacion de rendimiento', 'Backups automaticos', 'Acceso SSH seguro'] },
    { title: '🏢 Servidores Dedicados', description: 'Servidores dedicados listos para produccion, sin sustos despues.',
      features: ['Instalacion de SO', 'Configuracion de red', 'Particionado de discos', 'Monitoreo 24/7', 'Optimizacion de recursos', 'Seguridad avanzada'] },
    { title: '🌍 Traduccion', description: 'Traduccion completa de tu servidor, tienda o bot a multiples idiomas.',
      features: ['Traduccion de plugins', 'Localizacion de tienda Tebex', 'Traduccion de bots Discord', 'Multi idioma dinamico', 'Correccion de textos', 'Adaptacion cultural'] },
    { title: '➕ Complementos de Bots', description: 'Modulos y extensiones adicionales para potenciar tu bot de Discord.',
      features: ['Comandos personalizados', 'Integraciones API', 'Sistemas de niveles', 'Modulos de musica', 'Automatizaciones personalizadas', 'Soporte continuo'] },
  ],
}

const sectionCopy = {
  en: {
    badge: 'Custom-Built, Not Mass-Produced',
    h2a: 'What I ',
    h2b: 'Offer',
    subtitle:
      "I've delivered every service on this list dozens of times — I know exactly where others usually mess up, and how to avoid that on yours.",
    bannerPre: 'These services are custom-built. If you\'re after something ready-made and easy to install, ',
    bannerLink: 'check out my BuiltByBit store',
    priceFrom: 'From ',
    mostPopular: 'Most Popular',
    cta: 'Get a Quote',
  },
  es: {
    badge: 'Hecho A Medida, No En Serie',
    h2a: 'Lo Que ',
    h2b: 'Ofrezco',
    subtitle:
      'Cada servicio de esta lista lo entregué decenas de veces — se exactamente donde suelen fallar los demas, y como evitarlo en el tuyo.',
    bannerPre: 'Estos servicios son a medida. Si buscas algo ya armado y listo para instalar, ',
    bannerLink: 'mira mi tienda en BuiltByBit',
    priceFrom: 'Desde ',
    mostPopular: 'Mas Popular',
    cta: 'Cotizar este servicio',
  },
}

function buildServices(locale: 'en' | 'es') {
  return servicesData[locale].map((s, i) => ({
    ...s,
    icon: icons[i],
    gradient: gradients[i],
    featured: featured[i],
    price: `${sectionCopy[locale].priceFrom}${prices[i]}`,
  }))
}

type ServiceItem = ReturnType<typeof buildServices>[number]

function ServiceCard({ service, index, isInView, ctaLabel, mostPopularLabel }: {
  service: ServiceItem
  index: number
  isInView: boolean
  ctaLabel: string
  mostPopularLabel: string
}) {
  const cardRef = useRef<HTMLDivElement>(null)
  const Icon = service.icon

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.6 }}
      className="relative"
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        className="relative h-full rounded-3xl overflow-hidden glass-card glow-border hover:border-primary/50 transition-all duration-500 group p-8"
        style={{
          background: `linear-gradient(135deg, ${service.gradient})`,
        }}
      >
        {/* Spotlight effect */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(139, 0, 0, 0.15), transparent 40%)',
          }}
        />

        {/* Featured badge */}
        {service.featured && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.5 }}
            className="absolute top-6 right-6 flex items-center gap-2 px-4 py-2 rounded-full bg-primary/20 border border-primary/50 text-primary text-sm glow-crimson-sm"
          >
            <Sparkles className="w-4 h-4" />
            {mostPopularLabel}
          </motion.div>
        )}

        {/* Content */}
        <div className="relative z-10">
          <motion.div
            whileHover={{ scale: 1.1, rotate: 5 }}
            transition={{ duration: 0.3 }}
            className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-primary/20 border border-primary/40 glow-crimson-sm mb-6"
          >
            <Icon className="w-6 h-6 text-primary" />
          </motion.div>

          <h3 className="text-xl font-bold text-foreground mb-3">
            {service.title}
          </h3>

          <p className="text-muted-foreground mb-6 leading-relaxed">
            {service.description}
          </p>

          {/* Features */}
          <ul className="space-y-3 mb-8">
            {service.features.map((feature) => (
              <li key={feature} className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="w-5 h-5 rounded-full bg-primary/20 flex items-center justify-center flex-shrink-0">
                  <Check className="w-3 h-3 text-primary" />
                </div>
                {feature}
              </li>
            ))}
          </ul>

          {/* Price and CTA */}
          <div className="flex flex-col gap-4">
            <div className="self-start px-4 py-2 rounded-full bg-primary/20 border border-primary/40 glow-crimson-sm">
              <span className="text-primary font-semibold">{service.price}</span>
            </div>
            <Button
              asChild
              className="w-full group/btn bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a href="#contact">
                {ctaLabel}
                <ArrowRight className="ml-2 w-4 h-4 group-hover/btn:translate-x-1 transition-transform" />
              </a>
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function ServicesSection() {
  const { locale } = useLanguage()
  const services = buildServices(locale)
  const s = sectionCopy[locale]
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="services" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-nether/20 to-background" />
      <div className="absolute top-1/2 left-0 w-1/3 h-1/2 bg-[radial-gradient(ellipse_at_left,rgba(139,0,0,0.1)_0%,transparent_60%)]" />

      <div ref={sectionRef} className="relative z-10 container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm mb-6"
          >
            <Sparkles className="w-4 h-4" />
            {s.badge}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {s.h2a}<span className="text-primary text-glow">{s.h2b}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {s.subtitle}
          </p>

          {/* Aclaracion: trabajo a medida vs productos ya hechos en BBB */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex flex-wrap items-center justify-center gap-2 mt-6 px-4 py-2.5 rounded-full bg-secondary/30 border border-border/50 text-sm text-muted-foreground max-w-full"
          >
            <Info className="w-4 h-4 text-primary flex-shrink-0" />
            <span>
              {s.bannerPre}
              <a
                href="https://builtbybit.com/creators/dark_ness.420596/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary hover:underline underline-offset-4 font-medium"
              >
                {s.bannerLink}
              </a>
              .
            </span>
          </motion.div>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isInView={isInView}
              ctaLabel={s.cta}
              mostPopularLabel={s.mostPopular}
            />
          ))}
        </div>
      </div>
    </section>
  )
}
