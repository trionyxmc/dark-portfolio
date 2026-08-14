"use client"

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'
import { Button } from '@/components/ui/button'
import { EmberParticles } from '@/components/ember-particles'
import { FloatingCubes } from '@/components/floating-cubes'
import { ArrowRight } from 'lucide-react'

export function HeroSection() {
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
              <span className="text-foreground">Creando</span>
              <br />
              <span className="text-primary text-glow">Experiencias</span>
              <br />
              <span className="text-foreground">Minecraft</span>
              <br />
              <span className="font-[var(--font-display)] text-xl sm:text-2xl lg:text-3xl text-muted-foreground tracking-wider">
                PREMIUM
              </span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
              className="text-lg sm:text-xl text-muted-foreground max-w-lg mx-auto lg:mx-0 mb-8 leading-relaxed"
            >
              Configuraciones elite de plugins, bots de Discord personalizados, y 
              soluciones profesionales de redes. Confiado por owners de todo el mundo.
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
                  Ver Proyectos
                  <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
              <Button
                asChild
                size="lg"
                variant="outline"
                className="border-primary/50 text-foreground hover:bg-primary/10 hover:border-primary text-base px-8 py-6"
              >
                <a href="#contact">Contratar</a>
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
                alt="Personaje DS"
                className="w-[280px] sm:w-[340px] lg:w-[420px] object-contain drop-shadow-[0_0_50px_rgba(139,0,0,0.7)]"
              />

              {/* Floating cubes around character */}
              <motion.div
                className="absolute -top-8 -right-12 w-8 h-8 border-2 border-primary/40 bg-primary/10"
                animate={{ y: [0, -10, 0], rotate: [0, 90, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
              />
              <motion.div
                className="absolute top-1/4 -left-16 w-6 h-6 border-2 border-primary/30 bg-primary/5"
                animate={{ y: [0, 15, 0], rotate: [0, -90, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
              />
              <motion.div
                className="absolute bottom-1/4 -right-14 w-5 h-5 border-2 border-primary/50 bg-primary/15"
                animate={{ y: [0, -8, 0], rotate: [0, 180, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 2 }}
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