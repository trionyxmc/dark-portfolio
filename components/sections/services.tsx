"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import {
  Settings,
  Server,
  Bot,
  Globe,
  Link2,
  ArrowRight,
  Check,
  Sparkles,
} from 'lucide-react'

const services = [
  {
    icon: Settings,
    title: 'Configuracion de Plugins',
    description: 'Setups personalizados adaptados a tu vision de servidor y necesidades.',
    features: [
      'Menus & GUIs custom',
      'Sistemas de misiones',
      'Configs de Battle Pass',
      'Escaleras de RankUp',
      'Sistemas de rewards',
      'Configuracion de kits',
    ],
    price: 'Desde $5',
    gradient: 'from-primary/30 via-primary/10 to-transparent',
    featured: false,
  },
  {
    icon: Server,
    title: 'Creacion de Networks',
    description: 'Networks de servidores profesionales construidas para escalar.',
    features: [
      'Servidores lobby',
      'Sistemas de auth',
      'Setup de proxy',
      'BungeeCord/Velocity',
      'Integracion Geyser',
      'Sync entre servidores',
    ],
    price: 'Desde $7',
    gradient: 'from-primary/40 via-primary/15 to-transparent',
    featured: true,
  },
  {
    icon: Bot,
    title: 'Desarrollo de Bots Discord',
    description: 'Bots personalizados con funciones poderosas para tu comunidad.',
    features: [
      'Sistemas de tickets',
      'Modulos de economia',
      'Herramientas de mod',
      'Sistemas de sorteos',
      'Auto moderacion',
      'Embeds avanzados',
    ],
    price: 'Desde $10',
    gradient: 'from-primary/30 via-primary/10 to-transparent',
    featured: false,
  },
  {
    icon: Globe,
    title: 'Web / Servicios Tebex',
    description: 'Disenos de tiendas premium optimizados para conversiones.',
    features: [
      'Personalizacion Tebex',
      'CSS/HTML custom',
      'Mejoras de UX',
      'Optimizacion conversion',
      'Responsive movil',
      'Integracion de marca',
    ],
    price: 'Desde $15',
    gradient: 'from-primary/30 via-primary/10 to-transparent',
    featured: false,
  },
  {
    icon: Link2,
    title: 'Setup Dominio a IP',
    description: 'Servicios profesionales de configuracion DNS y dominios.',
    features: [
      'Configuracion DNS',
      'Setup seguro',
      'Despliegue rapido',
      'Certificados SSL',
      'Routing subdominios',
      'Integracion CDN',
    ],
    price: 'Desde $10',
    gradient: 'from-primary/30 via-primary/10 to-transparent',
    featured: false,
  },
]

function ServiceCard({ service, index, isInView }: { 
  service: typeof services[0]
  index: number
  isInView: boolean 
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
            Mas Popular
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
          <div className="flex items-center justify-between flex-wrap gap-4">
            <div className="px-4 py-2 rounded-full bg-primary/20 border border-primary/40 glow-crimson-sm">
              <span className="text-primary font-semibold">{service.price}</span>
            </div>
            <Button
              asChild
              className="group/btn bg-primary hover:bg-primary/90 text-primary-foreground"
            >
              <a href="#contact">
                Comenzar
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
            Servicios Premium
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Lo Que <span className="text-primary text-glow">Ofrezco</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Servicios profesionales disenados para elevar tu servidor de Minecraft 
            y tu comunidad al siguiente nivel.
          </p>
        </motion.div>

        {/* Services grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {services.map((service, index) => (
            <ServiceCard
              key={service.title}
              service={service}
              index={index}
              isInView={isInView}
            />
          ))}
        </div>
      </div>
    </section>
  )
}