"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { EmberParticles } from '@/components/ember-particles'
import { FloatingCubes } from '@/components/floating-cubes'
import { ArrowRight } from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const copy = {
  en: {
    line1: 'I Build',
    line2: 'Servers',
    line3: 'That Impress',
    tier: 'TRUST + HARD WORK',
    subtitle:
      "Plugins that feel custom-built, bots your community actually uses every day, and networks that don't crash mid-event. No copy-pasted configs.",
    viewProjects: 'View Projects',
    hire: 'Contact Me',
    alt: 'DS character',
  },
  es: {
    line1: 'Construyo',
    line2: 'Servidores',
    line3: 'Que Impresionan',
    tier: 'CONFIANZA + TRABAJO',
    subtitle:
      'Plugins que se sienten hechos a medida, bots que tu comunidad usa todos los días, y networks que no se caen a mitad de un evento. Nada de configs copiadas.',
    viewProjects: 'Ver Proyectos',
    hire: 'Contratar',
    alt: 'Personaje DS',
  },
}

export function HeroSection() {
  const { locale } = useLanguage()
  const c = copy[locale]
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end start'],
  })

  const y = useTransform(scrollYProgress, [0, 1], [0, 200])
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0])

  return (
    <section
      ref={containerRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-background to-nether/30" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(139,0,0,0.15)_0%,transparent_70%)]" />
      
      {/* Volumetric fog effect */}
      <motion.div
        className="absolute inset-0"
        style={{ y }}
        animate={{
          background: [
            'radial-gradient(ellipse at 30% 50%, rgba(139, 0, 0, 0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 70% 50%, rgba(139, 0, 0, 0.1) 0%, transparent 50%)',
            'radial-gradient(ellipse at 30% 50%, rgba(139, 0, 0, 0.1) 0%, transparent 50%)',
          ],
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Ember particles */}
      <EmberParticles count={40} />

      {/* Floating cubes */}
      <FloatingCubes />

      {/* Main content */}
      <motion.div style={{ opacity }} className="relative z-10 container mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          {/* Left side - Content */}
          <div className="text-center lg:text-left order-2 lg:order-1">
            {/* Main headline */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold leading-tight mb-6"
            >
              <span className="text-foreground">{c.line1}</span>
              <br />
              <span className="text-primary text-glow">{c.line2}</span>
              <br />
              <span className="text-foreground">{c.line3}</span>
              <br />
              <span className="font-[var(--font-display)] text-xl sm:text-2xl lg:text-3xl text-muted-foreground tracking-wider">
                {c.tier}
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              {c.subtitle}
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
            >
              <Button
                asChild
                size="lg"
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-crimson hover:glow-crimson group text-base px-8 py-6"
              >
                <a href="#lab">
                  {c.viewProjects}
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary text-base px-8 py-6"
              >
                <a href="#contact">{c.hire}</a>
              </Button>
            </motion.div>
          </div>

          {/* Right side - Character */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.3, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative order-1 lg:order-2 flex justify-center"
          >
            {/* Glow background */}
            <div className="absolute inset-0 flex items-center justify-center">
              <motion.div
                className="w-[300px] h-[300px] sm:w-[400px] sm:h-[400px] lg:w-[500px] lg:h-[500px] rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(139, 0, 0, 0.3) 0%, rgba(139, 0, 0, 0.1) 40%, transparent 70%)',
                }}
                animate={{
                  scale: [1, 1.1, 1],
                  opacity: [0.5, 0.8, 0.5],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              />
            </div>

            {/* Character PNG */}
            <motion.div
              className="relative z-10"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
            >
              <img
                src="/preview.webp"
                alt={c.alt}
                className="w-[280px] sm:w-[340px] lg:w-[420px] object-contain drop-shadow-[0_0_50px_rgba(139,0,0,0.7)]"
              />

              {/* Particulas de energia flotando alrededor del personaje,
                  con el mismo brillo radial que el resto de la imagen */}
              <motion.div
                className="absolute -top-8 -right-12 w-8 h-8"
                style={{
                  background: 'radial-gradient(circle, rgba(200,16,46,0.9) 0%, rgba(139,0,0,0.4) 55%, transparent 75%)',
                  boxShadow: '0 0 24px 6px rgba(200,16,46,0.55)',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                }}
                animate={{ y: [0, -10, 0], rotate: [0, 90, 0], opacity: [0.6, 1, 0.6], scale: [0.9, 1.05, 0.9] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-1/4 -left-16 w-4 h-4 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(139,92,246,0.9) 0%, rgba(88,28,135,0.4) 55%, transparent 75%)',
                  boxShadow: '0 0 18px 5px rgba(139,92,246,0.5)',
                }}
                animate={{ y: [0, 15, 0], x: [0, -6, 0], opacity: [0.4, 0.9, 0.4], scale: [0.8, 1.1, 0.8] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
              <motion.div
                className="absolute bottom-1/4 -right-14 w-5 h-5"
                style={{
                  background: 'radial-gradient(circle, rgba(200,16,46,0.9) 0%, rgba(139,0,0,0.4) 55%, transparent 75%)',
                  boxShadow: '0 0 20px 5px rgba(200,16,46,0.5)',
                  clipPath: 'polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)',
                }}
                animate={{ y: [0, -8, 0], rotate: [0, 180, 0], opacity: [0.5, 1, 0.5], scale: [0.85, 1, 0.85] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
              />
              <motion.div
                className="absolute top-8 -left-8 w-2.5 h-2.5 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(139,92,246,0.5) 60%, transparent 80%)',
                  boxShadow: '0 0 12px 3px rgba(139,92,246,0.6)',
                }}
                animate={{ y: [0, -12, 0], opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
                transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
              />
              <motion.div
                className="absolute bottom-10 right-2 w-2 h-2 rounded-full"
                style={{
                  background: 'radial-gradient(circle, rgba(255,255,255,0.9) 0%, rgba(200,16,46,0.5) 60%, transparent 80%)',
                  boxShadow: '0 0 10px 3px rgba(200,16,46,0.6)',
                }}
                animate={{ y: [0, -10, 0], opacity: [0, 1, 0], scale: [0.6, 1, 0.6] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: 1.8 }}
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
          className="w-6 h-10 rounded-full border-2 border-muted-foreground/30 flex items-start justify-center p-2"
        >
          <motion.div
            animate={{ y: [0, 12, 0], opacity: [1, 0.5, 1] }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-1 h-2 bg-primary rounded-full"
          />
        </motion.div>
      </motion.div>
    </section>
  )
}