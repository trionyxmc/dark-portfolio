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
  ShoppingBag,
  Sparkles,
  CheckCircle2,
} from 'lucide-react'
import { useLanguage } from '@/components/language-provider'

const CONTACT_EMAIL = 'darknessservices00@gmail.com'

const socialLinksData = {
  en: [
    { name: 'Discord', icon: MessageSquare, href: 'https://discord.gg/RDfAFqhZye', color: 'hover:bg-[#5865F2]/20 hover:border-[#5865F2]/50 hover:text-[#5865F2]', description: 'Fast response' },
    { name: 'BuiltByBit', icon: ShoppingBag, href: 'https://builtbybit.com/resources/jobs-config-menu-en-es.94516/', color: 'hover:bg-primary/20 hover:border-primary/50 hover:text-primary', description: 'View marketplace' },
    { name: 'Email', icon: Mail, href: `mailto:${CONTACT_EMAIL}`, color: 'hover:bg-primary/20 hover:border-primary/50 hover:text-primary', description: 'Professional inquiries' },
  ],
  es: [
    { name: 'Discord', icon: MessageSquare, href: 'https://discord.gg/RDfAFqhZye', color: 'hover:bg-[#5865F2]/20 hover:border-[#5865F2]/50 hover:text-[#5865F2]', description: 'Respuesta rapida' },
    { name: 'BuiltByBit', icon: ShoppingBag, href: 'https://builtbybit.com/resources/jobs-config-menu-en-es.94516/', color: 'hover:bg-primary/20 hover:border-primary/50 hover:text-primary', description: 'Ver marketplace' },
    { name: 'Email', icon: Mail, href: `mailto:${CONTACT_EMAIL}`, color: 'hover:bg-primary/20 hover:border-primary/50 hover:text-primary', description: 'Consultas profesionales' },
  ],
}

const serviceOptionsData = {
  en: ['Configuration', 'Network Setup', 'Bot Development', 'Tebex Stores', 'Domain to IP', 'Pterodactyl', 'VPS Setup', 'Dedicated Server Setup', 'Translation', 'Bot Add-ons'],
  es: ['Configuraciones', 'Creacion de Networks', 'Desarrollo de Bots', 'Tiendas Tebex', 'Dominio a IP', 'Pterodactyl', 'Instalacion de VPS', 'Instalacion de Dedicados', 'Traduccion', 'Complementos de Bots'],
}
const serviceEmojis = ['⚙️', '📡', '🤖', '🛒', '🌐', '🦕', '🖥️', '🏢', '🌍', '➕']

const copy = {
  en: {
    badge: "Let's Work Together",
    h2pre: "Let's Build Your ",
    h2word: 'Next Server',
    h2post: '?',
    subtitle: "Tell me what you have in mind and within 24 hours I'll tell you exactly how we'll do it and what it costs.",
    doneTitle: 'All Set!',
    doneBody: "Your email client just opened with the message ready to send. I'll reply within 24 hours.",
    sendAnother: 'Send Another Message',
    nameLabel: 'Name',
    namePlaceholder: 'Your name',
    discordLabel: 'Discord',
    discordPlaceholder: 'username',
    emailLabel: 'Email',
    serviceLabel: 'Service You Need',
    servicePlaceholder: 'Select a service',
    other: 'Other',
    detailsLabel: 'Project Details',
    detailsPlaceholder: 'Tell me about your project...',
    sending: 'Sending...',
    send: 'Send Message',
    guaranteeTitle: 'Zero Cookie-Cutter Configs',
    guaranteeBody: "I look at your server, understand what you actually need, and build something made for you — not a template I've already sold to ten other people.",
    pills: ['Fast Delivery', '24/7 Support', 'Revisions Included'],
    mailSubject: (name: string, service: string) => `New inquiry from ${name} — ${service}`,
    mailBody: (name: string, discord: string, email: string, service: string, message: string) =>
      `Name: ${name}\nDiscord: ${discord}\nEmail: ${email}\nService of interest: ${service}\n\nProject details:\n${message}`,
  },
  es: {
    badge: 'Trabajemos Juntos',
    h2pre: '¿Armamos Tu ',
    h2word: 'Proximo Servidor',
    h2post: '?',
    subtitle: 'Cuéntame qué tienes en mente y en menos de 24 horas te digo exactamente cómo lo hacemos y cuánto sale.',
    doneTitle: '¡Listo!',
    doneBody: 'Se abrio tu cliente de correo con el mensaje listo para enviar. Te respondere en menos de 24 horas.',
    sendAnother: 'Enviar Otro Mensaje',
    nameLabel: 'Nombre',
    namePlaceholder: 'Tu nombre',
    discordLabel: 'Discord',
    discordPlaceholder: 'usuario',
    emailLabel: 'Email',
    serviceLabel: 'Servicio de Interes',
    servicePlaceholder: 'Selecciona un servicio',
    other: 'Otro',
    detailsLabel: 'Detalles del Proyecto',
    detailsPlaceholder: 'Cuéntame sobre tu proyecto...',
    sending: 'Enviando...',
    send: 'Enviar Mensaje',
    guaranteeTitle: 'Cero Configs de Manual',
    guaranteeBody: 'Reviso tu servidor, entiendo qué necesitas, y armo algo pensado para ti — no una plantilla que ya le vendí a otros diez.',
    pills: ['Entrega Rapida', 'Soporte 24/7', 'Revisiones Incluidas'],
    mailSubject: (name: string, service: string) => `Nueva consulta de ${name} — ${service}`,
    mailBody: (name: string, discord: string, email: string, service: string, message: string) =>
      `Nombre: ${name}\nDiscord: ${discord}\nEmail: ${email}\nServicio de interes: ${service}\n\nDetalles del proyecto:\n${message}`,
  },
}

export function ContactSection() {
  const { locale } = useLanguage()
  const c = copy[locale]
  const socialLinks = socialLinksData[locale]
  const serviceOptions = serviceOptionsData[locale]
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const data = new FormData(e.currentTarget)
    const name = data.get('name') as string
    const discord = data.get('discord') as string
    const email = data.get('email') as string
    const service = data.get('service') as string
    const message = data.get('message') as string

    const subject = c.mailSubject(name, service)
    const body = c.mailBody(name, discord, email, service, message)

    const mailtoUrl = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`

    // Simula el pequeno delay de envio y abre el cliente de correo
    // del usuario con el mensaje pre-cargado hacia CONTACT_EMAIL.
    await new Promise((resolve) => setTimeout(resolve, 600))
    window.location.href = mailtoUrl

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
            {c.badge}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {c.h2pre}<span className="text-primary text-glow">{c.h2word}</span>{c.h2post}
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {c.subtitle}
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
                  <h3 className="text-2xl font-bold text-foreground mb-2">{c.doneTitle}</h3>
                  <p className="text-muted-foreground mb-6">
                    {c.doneBody}
                  </p>
                  <Button
                    onClick={() => setIsSubmitted(false)}
                    variant="outline"
                    className="border-primary/50 hover:bg-primary/10"
                  >
                    {c.sendAnother}
                  </Button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid sm:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="cf-name" className="text-sm font-medium text-foreground mb-2 block">
                        {c.nameLabel}
                      </label>
                      <Input
                        id="cf-name"
                        name="name"
                        autoComplete="name"
                        required
                        placeholder={c.namePlaceholder}
                        className="bg-secondary/30 border-border focus:border-primary/50 h-12"
                      />
                    </div>
                    <div>
                      <label htmlFor="cf-discord" className="text-sm font-medium text-foreground mb-2 block">
                        {c.discordLabel}
                      </label>
                      <Input
                        id="cf-discord"
                        name="discord"
                        autoComplete="off"
                        required
                        placeholder={c.discordPlaceholder}
                        className="bg-secondary/30 border-border focus:border-primary/50 h-12"
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="cf-email" className="text-sm font-medium text-foreground mb-2 block">
                      {c.emailLabel}
                    </label>
                    <Input
                      id="cf-email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      placeholder="you@email.com"
                      className="bg-secondary/30 border-border focus:border-primary/50 h-12"
                    />
                  </div>
                  <div>
                    <label htmlFor="cf-service" className="text-sm font-medium text-foreground mb-2 block">
                      {c.serviceLabel}
                    </label>
                    <select
                      id="cf-service"
                      name="service"
                      required
                      defaultValue=""
                      className="w-full h-12 px-4 rounded-md bg-secondary/30 border border-border focus:border-primary/50 text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20"
                    >
                      <option value="" disabled>{c.servicePlaceholder}</option>
                      {serviceOptions.map((label, i) => (
                        <option key={label} value={label}>{serviceEmojis[i]} {label}</option>
                      ))}
                      <option value="other">{c.other}</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="cf-message" className="text-sm font-medium text-foreground mb-2 block">
                      {c.detailsLabel}
                    </label>
                    <Textarea
                      id="cf-message"
                      name="message"
                      required
                      rows={4}
                      placeholder={c.detailsPlaceholder}
                      className="bg-secondary/30 border-border focus:border-primary/50 resize-none"
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
                        {c.sending}
                      </>
                    ) : (
                      <>
                        {c.send}
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
                  {c.guaranteeTitle}
                </h3>
                <p className="text-muted-foreground mb-6 leading-relaxed">
                  {c.guaranteeBody}
                </p>
                <div className="flex flex-wrap justify-center gap-3 text-sm">
                  {c.pills.map((pill) => (
                    <span key={pill} className="px-3 py-1.5 rounded-full bg-primary/10 text-primary border border-primary/30">
                      {pill}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}
