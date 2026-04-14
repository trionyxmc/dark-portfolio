"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import { Button } from '@/components/ui/button'
import {
  MessageSquare,
  ShoppingBag,
  ArrowRight,
  Sparkles,
  Zap,
  Clock,
  Shield,
} from 'lucide-react'

export function FinalCTASection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section ref={sectionRef} className="relative py-24 lg:py-40 overflow-hidden">
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-nether/40 to-background" />

      {/* Central glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px]">
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          className="w-full h-full bg-[radial-gradient(circle,rgba(139,0,0,0.3)_0%,transparent_60%)]"
        />
      </div>

      {/* Animated spotlight */}
      <motion.div
        animate={{ x: ['-20%', '20%', '-20%'], y: ['-10%', '10%', '-10%'] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        className="absolute top-0 left-1/4 w-96 h-96 bg-[radial-gradient(ellipse,rgba(139,0,0,0.15)_0%,transparent_50%)]"
      />

      {/* Floating cubes */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-8 h-8 border border-primary/30 bg-primary/5 rounded-lg"
            style={{ left: `${10 + i * 15}%`, top: `${20 + (i % 3) * 25}%` }}
            animate={{ y: [0, -30, 0], rotate: [0, 90, 180], opacity: [0.3, 0.6, 0.3] }}
            transition={{ duration: 5 + i, repeat: Infinity, delay: i * 0.5, ease: 'easeInOut' }}
          />
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="max-w-4xl mx-auto text-center"
        >
          {/* ── Avatar con preview.webp ── */}
          <motion.div
            initial={{ opacity: 0, scale: 0.7 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.6, type: 'spring', stiffness: 200 }}
            className="flex justify-center mb-8"
          >
            <div className="relative">
              {/* Outer pulse ring */}
              <motion.div
                animate={{ scale: [1, 1.35, 1], opacity: [0.5, 0, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-primary/30"
              />
              {/* Inner glow ring */}
              <motion.div
                animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
                transition={{ duration: 3, repeat: Infinity, delay: 0.4 }}
                className="absolute inset-0 rounded-full bg-primary/20 blur-md"
              />
              {/* Image */}
              <div className="relative w-20 h-20 rounded-full overflow-hidden border-2 border-primary/50 ring-4 ring-primary/10 ring-offset-4 ring-offset-background shadow-[0_0_40px_rgba(139,0,0,0.4)]">
                <Image
                  src="/preview.webp"
                  alt="DarknessServices"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>
          </motion.div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.2 }}
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary/20 border border-primary/40 text-primary mb-8 glow-crimson-sm"
          >
            <Sparkles className="w-4 h-4" />
            <span className="font-medium">Plazas Limitadas Este Mes</span>
            <Sparkles className="w-4 h-4" />
          </motion.div>

          {/* Main headline */}
          <motion.h2
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-3xl sm:text-4xl lg:text-5xl xl:text-6xl font-bold text-foreground mb-6 leading-tight"
          >
            <span className="text-balance">
              ¿LISTO PARA LLEVAR TU SERVIDOR{' '}
              <span className="text-primary text-glow">AL SIGUIENTE NIVEL</span>?
            </span>
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-lg sm:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed"
          >
            Unete a los cientos de servidores que ya confiaron en mi trabajo.
            Configuraciones premium que transforman tu comunidad.
          </motion.p>

          {/* Trust indicators — mejorados con glass card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.5 }}
            className="flex flex-wrap justify-center gap-4 mb-12"
          >
            {[
              { icon: Zap,    label: 'Entrega Rápida' },
              { icon: Clock,  label: 'Soporte 24/7' },
              { icon: Shield, label: 'Garantía de Satisfacción' },
            ].map(({ icon: Icon, label }, i) => (
              <motion.div
                key={label}
                initial={{ opacity: 0, y: 10 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.5 + i * 0.08 }}
                className="flex items-center gap-2.5 px-4 py-2.5 rounded-xl border border-white/[0.07] bg-white/[0.03] backdrop-blur-sm text-muted-foreground hover:border-primary/20 hover:text-foreground transition-all duration-200"
              >
                <div className="w-7 h-7 rounded-lg bg-primary/15 flex items-center justify-center shrink-0">
                  <Icon className="w-3.5 h-3.5 text-primary" />
                </div>
                <span className="text-sm font-medium">{label}</span>
              </motion.div>
            ))}
          </motion.div>

          {/* CTA Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="flex flex-col sm:flex-row gap-4 justify-center"
          >
            {/* Discord */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="relative bg-[#5865F2] hover:bg-[#4752C4] text-white h-14 px-8 text-lg group overflow-hidden"
              >
                <a href="#">
                  <motion.span
                    className="absolute inset-0 rounded-md"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(88,101,242,0.4)',
                        '0 0 0 15px rgba(88,101,242,0)',
                        '0 0 0 0 rgba(88,101,242,0)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity }}
                  />
                  <MessageSquare className="w-5 h-5 mr-2" />
                  Contactar por Discord
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>

            {/* BuiltByBit */}
            <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
              <Button
                asChild
                size="lg"
                className="relative bg-primary hover:bg-primary/90 text-primary-foreground h-14 px-8 text-lg glow-crimson group overflow-hidden"
              >
                <a href="#">
                  <motion.span
                    className="absolute inset-0 rounded-md"
                    animate={{
                      boxShadow: [
                        '0 0 0 0 rgba(139,0,0,0.4)',
                        '0 0 0 15px rgba(139,0,0,0)',
                        '0 0 0 0 rgba(139,0,0,0)',
                      ],
                    }}
                    transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
                  />
                  <ShoppingBag className="w-5 h-5 mr-2" />
                  Ver en BuiltByBit
                  <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </a>
              </Button>
            </motion.div>
          </motion.div>

          {/* Scarcity text */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.8 }}
            className="mt-8 text-sm text-muted-foreground"
          >
            Solo acepto{' '}
            <span className="text-primary font-medium">100 proyectos nuevos</span>{' '}
            cada mes para garantizar la maxima calidad.
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}