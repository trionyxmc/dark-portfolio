"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import {
  Settings,
  Server,
  Bot,
  ShoppingBag,
  Palette,
  Package,
  HeartHandshake
} from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const expertiseCardsData = {
  en: [
    { icon: Settings, title: 'Plugin Configuration', description: 'Expert-level configs for DeluxeMenus, BattlePass, RankUp, and more.', gradient: 'from-primary/20 to-primary/5' },
    { icon: Server, title: 'Minecraft Networks', description: 'Full infrastructure with BungeeCord, Velocity, and cross-server sync.', gradient: 'from-primary/15 to-primary/5' },
    { icon: Bot, title: 'Discord Bots', description: 'Custom bots with tickets, moderation, economy, and advanced embeds.', gradient: 'from-primary/20 to-primary/5' },
    { icon: ShoppingBag, title: 'Tebex Stores', description: 'Stores where visitors know exactly what to buy in 5 seconds.', gradient: 'from-primary/15 to-primary/5' },
    { icon: Palette, title: 'UI/UX Systems', description: 'Beautiful, intuitive interfaces that improve the player experience.', gradient: 'from-primary/20 to-primary/5' },
    { icon: Package, title: 'Marketplace Products', description: 'Configs and resources trusted by thousands of server owners.', gradient: 'from-primary/15 to-primary/5' },
  ],
  es: [
    { icon: Settings, title: 'Configuracion de Plugins', description: 'Configuraciones de nivel experto para DeluxeMenus, BattlePass, RankUp, y mas.', gradient: 'from-primary/20 to-primary/5' },
    { icon: Server, title: 'Networks de Minecraft', description: 'Infraestructura completa con BungeeCord, Velocity, y sincronizacion entre servidores.', gradient: 'from-primary/15 to-primary/5' },
    { icon: Bot, title: 'Bots de Discord', description: 'Bots personalizados con tickets, moderacion, economia, y embeds avanzados.', gradient: 'from-primary/20 to-primary/5' },
    { icon: ShoppingBag, title: 'Tiendas Tebex', description: 'Tiendas donde el visitante entiende que comprar en 5 segundos.', gradient: 'from-primary/15 to-primary/5' },
    { icon: Palette, title: 'Sistemas UI/UX', description: 'Interfaces hermosas e intuitivas que mejoran la experiencia del jugador.', gradient: 'from-primary/20 to-primary/5' },
    { icon: Package, title: 'Productos Marketplace', description: 'Configs y recursos confiados por miles de owners de servidores.', gradient: 'from-primary/15 to-primary/5' },
  ],
}

const sectionCopy = {
  en: {
    badge: 'About Me & Experience',
    h2a: 'What I ',
    h2b: 'Specialize In',
    subtitle:
      'Six years deep in Minecraft and Discord code. Configs other people call impossible, networks that hold thousands of players without blinking, and one rule I never break: if it isn\'t perfect, I redo it.',
  },
  es: {
    badge: 'Sobre Mi & Experiencia',
    h2a: 'En Que Me ',
    h2b: 'Especializo',
    subtitle:
      'Seis años metido en el código de Minecraft y Discord. Configs que otros dan por imposibles, networks que aguantan miles de jugadores sin parpadear, y una regla que nunca rompo: si no queda perfecto, lo repito.',
  },
}

function TiltCard({ children, className }: { children: React.ReactNode; className?: string }) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const centerX = rect.width / 2
    const centerY = rect.height / 2
    const rotateX = (y - centerY) / 20
    const rotateY = (centerX - x) / 20

    cardRef.current.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`
  }

  const handleMouseLeave = () => {
    if (!cardRef.current) return
    cardRef.current.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)'
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`transition-transform duration-200 ease-out ${className}`}
      style={{ transformStyle: 'preserve-3d' }}
    >
      {children}
    </div>
  )
}

export function AboutSection() {
  const { locale } = useLanguage()
  const expertiseCards = expertiseCardsData[locale]
  const s = sectionCopy[locale]
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="about" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background accents */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(139,0,0,0.1)_0%,transparent_60%)]" />
      
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
            <HeartHandshake className="w-4 h-4" />
            {s.badge}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {s.h2a}<span className="text-primary text-glow">{s.h2b}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {s.subtitle}
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {expertiseCards.map((card, index) => {
            const Icon = card.icon
            const isLarge = index === 0 || index === 3
            
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className={isLarge ? 'md:col-span-2 lg:col-span-1' : ''}
              >
                <TiltCard>
                  <div className={`glass-card rounded-2xl p-8 h-full glow-border hover:border-primary/40 transition-all duration-300 bg-gradient-to-br ${card.gradient}`}>
                    <motion.div
                      whileHover={{ scale: 1.1, rotate: 5 }}
                      className="inline-flex items-center justify-center w-14 h-14 rounded-xl bg-primary/20 border border-primary/40 mb-6 glow-crimson-sm"
                    >
                      <Icon className="w-6 h-6 text-primary" />
                    </motion.div>
                    <h3 className="text-xl font-semibold text-foreground mb-3">{card.title}</h3>
                    <p className="text-muted-foreground leading-relaxed">{card.description}</p>
                  </div>
                </TiltCard>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
