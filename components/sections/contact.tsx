"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import {
  Send,
  MessageSquare,
  Mail,
  Github,
  ShoppingBag,
  Sparkles,
  ArrowRight,
  CheckCircle2,
} from 'lucide-react'

const socialLinks = [
  {
    name: 'Discord',
    icon: MessageSquare,
    href: 'https://discord.gg/RDfAFqhZye',
    color: 'hover:bg-[#5865F2]/20 hover:border-[#5865F2]/50 hover:text-[#5865F2]',
    description: 'Respuesta rapida',
  },
  {
    name: 'BuiltByBit',
    icon: ShoppingBag,
    href: 'https://builtbybit.com/resources/jobs-config-menu-en-es.94516/',
    color: 'hover:bg-primary/20 hover:border-primary/50 hover:text-primary',
    description: 'Ver marketplace',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:contact@darknessservices00@gmail.com',
    color: 'hover:bg-primary/20 hover:border-primary/50 hover:text-primary',
    description: 'Consultas profesionales',
  },
]

export function ContactSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1500))
    setIsSubmitting(false)
    setIsSubmitted(true)
  }

  return (
    <section id="contact" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-nether/20 to-background" />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full max-w-3xl bg-[radial-gradient(ellipse_at_center,rgba(139,0,0,0.15)_0%,transparent_60%)]" />

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
            Trabajemos Juntos
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Listo Para <span className="text-primary text-glow">Elevar</span> Tu Servidor?
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Contactame para servicios premium de Minecraft. 
            Creemos algo excepcional juntos.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 max-w-5xl mx-auto">
          {/* Contact form */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.2, duration: 0.6 }}
          >
            <div className="glass-card rounded-3xl p-8 lg:p-10 glow-border">
              {isSubmitted ? (
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center justify-center py-12 text-center"
                >
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center mb-6 glow-crimson">
                    <CheckCircle2 className="w-10 h-10 text-primary" />
                  </div>
                  <h3 className="text-2xl font-bold text-foreground mb-2">Mensaje Enviado!</h3>
                  <p className="text-muted-foreground mb-6">
                    Te respondere en menos de 24 horas.
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-primary/50 hover:bg-primary/10"
                  >
                    Enviar Otro Mensaje
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Nombre
                      </label>
                      <Input
                        required
                        placeholder="Tu nombre"
                        className="bg-secondary/30 border-border/50 focus:border-primary/50 h-12"
                      />
                    </div>
                    <div>
                      <label className="text-sm font-medium text-foreground mb-2 block">
                        Discord
                      </label>
                      <Input
                        required
                        placeholder="usuario"
                        className="bg-secondary/30 border-border/50 focus:border-primary/50 h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Email
                    </label>
                    <Input
                      type="email"
                      required
                      placeholder="tu@email.com"
                      className="bg-secondary/30 border-border/50 focus:border-primary/50 h-12"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Servicio de Interes
                    </label>
                    <select
                      required
                      className="w-full h-12 px-4 rounded-md bg-secondary/30 border border-border/50 focus:border-primary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="">Selecciona un servicio</option>
                      <option value="plugin">Configuracion de Plugins</option>
                      <option value="network">Creacion de Red</option>
                      <option value="discord">Bot de Discord</option>
                      <option value="tebex">Tebex / Servicios Web</option>
                      <option value="domain">Setup de Dominio</option>
                      <option value="other">Otro</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground mb-2 block">
                      Detalles del Proyecto
                    </label>
                    <Textarea
                      required
                      rows={4}
                      placeholder="Cuentame sobre tu proyecto..."
                      className="bg-secondary/30 border-border/50 focus:border-primary/50 resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full h-12 bg-primary hover:bg-primary/90 text-primary-foreground glow-crimson group text-base"
                  >
                    {isSubmitting ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                          className="w-5 h-5 border-2 border-primary-foreground/30 border-t-primary-foreground rounded-full"
                        />
                        Enviando...
                      </>
                    ) : (
                      <>
                        Enviar Mensaje
                        <Send className="ml-2 w-4 h-4 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      </>
                    )}
                  </Button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Social links & info */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="flex flex-col gap-6"
          >
            {/* Quick contact cards */}
            <div className="grid grid-cols-2 gap-4">
              {socialLinks.map((link, index) => {
                const Icon = link.icon
                return (
                  <motion.a
                    key={link.name}
                    href={link.href}
                    initial={{ opacity: 0, y: 20 }}
                    animate={isInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className={`glass-card rounded-2xl p-6 glow-border transition-all duration-300 group ${link.color}`}
                  >
                    <Icon className="w-6 h-6 text-muted-foreground mb-3 group-hover:scale-110 transition-transform" />
                    <div className="font-medium text-foreground mb-1">{link.name}</div>
                    <div className="text-xs text-muted-foreground">{link.description}</div>
                  </motion.a>
                )
              })}
            </div>

            {/* CTA card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.8 }}
              className="flex-1 glass-card rounded-3xl p-8 glow-crimson flex flex-col justify-center"
            >
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-primary/20 border border-primary/40 mb-6 glow-crimson-sm">
                  <Sparkles className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold text-foreground mb-3">
                  Calidad Premium Garantizada
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  Cada proyecto recibe mi atencion completa y experiencia. 
                  No solo entrego—supero expectativas.
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-sm">
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Entrega Rapida
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Soporte 24/7
                  </span>
                  <span className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                    Revisiones Incluidas
                  </span>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Final CTA */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="text-center mt-20"
        >
          <p className="text-muted-foreground mb-4">
            Prefieres explorar? Revisa mis productos en el marketplace.
          </p>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary/50 hover:bg-primary/10 hover:border-primary group"
          >
            <a href="#">
              Visitar Tienda BBB
              <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
          </Button>
        </motion.div>
      </div>
    </section>
  )
}
