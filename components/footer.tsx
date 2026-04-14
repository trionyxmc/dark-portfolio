"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import {
  Heart,
  ArrowUp,
  Github,
  MessageSquare,
  Mail,
  ShoppingBag,
} from 'lucide-react'

const socialLinks = [
  {
    name: 'Discord',
    icon: MessageSquare,
    href: '#',
    hoverClass: 'hover:text-[#5865F2] hover:border-[#5865F2]/40 hover:bg-[#5865F2]/10',
  },
  {
    name: 'GitHub',
    icon: Github,
    href: '#',
    hoverClass: 'hover:text-white hover:border-white/30 hover:bg-white/5',
  },
  {
    name: 'BuiltByBit',
    icon: ShoppingBag,
    href: '#',
    hoverClass: 'hover:text-primary hover:border-primary/40 hover:bg-primary/10',
  },
  {
    name: 'Email',
    icon: Mail,
    href: 'mailto:contact@darknessservices.com',
    hoverClass: 'hover:text-primary hover:border-primary/40 hover:bg-primary/10',
  },
]

const footerLinks = [
  { name: 'Servicios',     href: '#services' },
  { name: 'Productos BBB', href: '#bbb-products' },
  { name: 'Laboratorio',   href: '#lab' },
  { name: 'Contacto',      href: '#contact' },
]

export function Footer() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const scrollToTop = () => window.scrollTo({ top: 0, behavior: 'smooth' })

  return (
    <footer ref={ref} className="relative overflow-hidden border-t border-white/[0.06]">

      {/* Glow line top */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[400px] h-32 bg-[radial-gradient(ellipse,rgba(139,0,0,0.08)_0%,transparent_70%)]" />

      {/* Ambient side glows */}
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[radial-gradient(ellipse,rgba(139,0,0,0.05)_0%,transparent_70%)] pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-64 h-64 bg-[radial-gradient(ellipse,rgba(139,0,0,0.05)_0%,transparent_70%)] pointer-events-none" />

      {/* Subtle grid texture */}
      <div
        className="absolute inset-0 opacity-[0.015] pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
          backgroundSize: '60px 60px',
        }}
      />

      <div className="relative z-10 container mx-auto px-6 py-16">
        <div className="flex flex-col items-center">

          {/* ── Scroll to top ── */}
          <motion.button
            onClick={scrollToTop}
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            whileHover={{ scale: 1.1, y: -3 }}
            whileTap={{ scale: 0.95 }}
            className="relative w-11 h-11 rounded-full border border-primary/30 bg-primary/10 flex items-center justify-center mb-10 hover:bg-primary/20 hover:border-primary/60 transition-all duration-300 group"
          >
            {/* Pulse ring */}
            <motion.div
              className="absolute inset-0 rounded-full border border-primary/20"
              animate={{ scale: [1, 1.7, 1], opacity: [0.5, 0, 0.5] }}
              transition={{ duration: 2.5, repeat: Infinity }}
            />
            <ArrowUp className="w-4 h-4 text-primary relative z-10 group-hover:-translate-y-0.5 transition-transform" />
          </motion.button>

          {/* ── Logo + Brand ── */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.15, duration: 0.6 }}
            className="flex items-center gap-3.5 mb-4"
          >
            {/* Logo image con glow */}
            <div className="relative">
              <motion.div
                animate={{ opacity: [0.3, 0.7, 0.3] }}
                transition={{ duration: 3, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-primary/30 blur-lg scale-150 pointer-events-none"
              />
              <div className="relative w-11 h-11 rounded-full overflow-hidden border border-primary/40 shadow-[0_0_20px_rgba(139,0,0,0.35)]">
                <Image
                  src="/preview.webp"
                  alt="DarknessServices logo"
                  fill
                  className="object-cover"
                  priority
                />
              </div>
            </div>

            <span className="text-xl font-bold text-foreground tracking-tight">
              DARK_NESS SERVICES
            </span>
          </motion.div>

          {/* Tagline */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.25 }}
            className="text-sm text-muted-foreground/70 mb-9 max-w-xs text-center leading-relaxed"
          >
            Configuraciones premium para servidores de minecraft y discord
          </motion.p>

          {/* ── Divider ── */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={isInView ? { scaleX: 1 } : {}}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-white/10 to-transparent mb-9"
          />

          {/* ── Nav links ── */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.35 }}
            className="flex flex-wrap justify-center gap-x-7 gap-y-3 mb-9"
          >
            {footerLinks.map((link, i) => (
              <motion.a
                key={link.name}
                href={link.href}
                initial={{ opacity: 0, y: 8 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: 0.35 + i * 0.07 }}
                className="relative text-sm text-muted-foreground hover:text-foreground transition-colors duration-200 group"
              >
                {link.name}
                {/* Underline animado */}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-primary group-hover:w-full transition-all duration-300" />
              </motion.a>
            ))}
          </motion.nav>

          {/* ── Social icons ── */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.45 }}
            className="flex items-center gap-3 mb-10"
          >
            {socialLinks.map((link, i) => {
              const Icon = link.icon
              return (
                <motion.a
                  key={link.name}
                  href={link.href}
                  aria-label={link.name}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={isInView ? { opacity: 1, scale: 1 } : {}}
                  transition={{ delay: 0.45 + i * 0.07 }}
                  whileHover={{ scale: 1.12, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  className={`w-10 h-10 rounded-xl border border-white/[0.08] bg-white/[0.03] flex items-center justify-center text-muted-foreground transition-all duration-200 ${link.hoverClass}`}
                >
                  <Icon className="w-4 h-4" />
                </motion.a>
              )
            })}
          </motion.div>

          {/* ── Divider bottom ── */}
          <div className="w-full max-w-sm h-px bg-gradient-to-r from-transparent via-white/[0.07] to-transparent mb-8" />

          {/* ── Copyright ── */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.6 }}
            className="flex flex-col items-center gap-2"
          >
            <p className="text-sm text-muted-foreground/70 flex items-center gap-1.5">
              Hecho con{' '}
              <motion.span
                animate={{ scale: [1, 1.35, 1] }}
                transition={{ duration: 1.5, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-flex"
              >
                <Heart className="w-3.5 h-3.5 text-primary fill-primary" />
              </motion.span>
              {' '}por{' '}
              <span className="text-muted-foreground font-medium">DARK_NESS SERVICES</span>
            </p>
            <p className="text-xs text-muted-foreground/40">
              &copy; {new Date().getFullYear()} Todos los derechos reservados.
            </p>
          </motion.div>

        </div>
      </div>

      {/* Bottom glow line */}
      <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
    </footer>
  )
}