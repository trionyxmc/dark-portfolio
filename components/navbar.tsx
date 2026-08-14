"use client"

import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Menu, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { LanguageToggle } from '@/components/language-toggle'
import { useLanguage } from '@/components/language-provider'

const copy = {
  en: {
    links: [
      { href: '#about', label: 'About' },
      { href: '#services', label: 'Services' },
      { href: '#lab', label: 'Lab' },
      { href: '#testimonials', label: 'Reviews' },
      { href: '#contact', label: 'Contact' },
    ],
    cta: 'Hire Me',
    openMenu: 'Open menu',
  },
  es: {
    links: [
      { href: '#about', label: 'Sobre Mi' },
      { href: '#services', label: 'Servicios' },
      { href: '#lab', label: 'Laboratorio' },
      { href: '#testimonials', label: 'Testimonios' },
      { href: '#contact', label: 'Contacto' },
    ],
    cta: 'Contratar',
    openMenu: 'Abrir menú',
  },
}

export function Navbar() {
  const { locale } = useLanguage()
  const c = copy[locale]
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [activeHref, setActiveHref] = useState('')

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Resalta en el menu la seccion que el visitante esta viendo, asi siempre
  // sabe donde esta dentro de la pagina de una sola vista sin tener que
  // adivinar a partir del scroll.
  useEffect(() => {
    const sections = c.links
      .map((link) => document.querySelector(link.href))
      .filter((el): el is Element => Boolean(el))

    if (sections.length === 0) return

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) {
          setActiveHref(`#${visible.target.id}`)
        }
      },
      { rootMargin: '-45% 0px -45% 0px', threshold: [0, 0.25, 0.5, 0.75, 1] }
    )

    sections.forEach((el) => observer.observe(el))
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [locale])

  return (
    <>
      <motion.header
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'glass py-3'
            : 'bg-transparent py-5'
        }`}
      >
        <nav className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <motion.a
            href="#"
            className="flex items-center gap-3 group"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="w-10 h-10 rounded-lg overflow-hidden glow-crimson-sm border border-primary/30">
              <img
                src="/preview.webp"
                alt="DS"
                className="w-full h-full object-cover object-top"
              />
            </div>
            <span className="font-semibold text-lg text-foreground hidden sm:block group-hover:text-primary transition-colors">
              DARK_NESS SERVICES
            </span>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-1">
            {c.links.map((link, index) => {
              const isActive = activeHref === link.href
              return (
                <motion.a
                  key={link.href}
                  href={link.href}
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  aria-current={isActive ? 'true' : undefined}
                  className={`relative px-4 py-2 text-sm transition-colors group ${
                    isActive ? 'text-foreground' : 'text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {link.label}
                  <span
                    className={`absolute bottom-0 left-1/2 -translate-x-1/2 h-0.5 bg-primary transition-all duration-300 ${
                      isActive ? 'w-1/2' : 'w-0 group-hover:w-1/2'
                    }`}
                  />
                </motion.a>
              )
            })}
          </div>

          {/* CTA Button + Language toggle */}
          <div className="hidden md:flex items-center gap-4">
            <LanguageToggle />
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.5, duration: 0.5 }}
            >
              <Button
                asChild
                className="bg-primary hover:bg-primary/90 text-primary-foreground glow-crimson-sm hover:glow-crimson transition-all duration-300"
              >
                <a href="#contact">{c.cta}</a>
              </Button>
            </motion.div>
          </div>

          {/* Mobile: language toggle + menu button */}
          <div className="flex items-center gap-3 md:hidden">
            <LanguageToggle />
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2 text-foreground"
              aria-label={c.openMenu}
            >
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </nav>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-40 md:hidden"
          >
            <div className="absolute inset-0 bg-background/95 backdrop-blur-xl" />
            <nav className="relative pt-24 px-6 flex flex-col gap-4">
              {c.links.map((link, index) => {
                const isActive = activeHref === link.href
                return (
                  <motion.a
                    key={link.href}
                    href={link.href}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: index * 0.1 }}
                    onClick={() => setIsMobileMenuOpen(false)}
                    aria-current={isActive ? 'true' : undefined}
                    className={`text-2xl font-semibold transition-colors py-3 border-b border-border/50 ${
                      isActive ? 'text-primary' : 'text-foreground hover:text-primary'
                    }`}
                  >
                    {link.label}
                  </motion.a>
                )
              })}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="pt-4"
              >
                <Button
                  asChild
                  className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-crimson"
                  size="lg"
                >
                  <a href="#contact" onClick={() => setIsMobileMenuOpen(false)}>
                    {c.cta}
                  </a>
                </Button>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
