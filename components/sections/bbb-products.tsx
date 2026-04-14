"use client"

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState, useCallback, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import {
  Star,
  ShoppingBag,
  Eye,
  ExternalLink,
  X,
  ChevronRight,
  MessageSquare,
  FileText,
  Link2,
  Headphones,
  TrendingUp,
  Crown,
} from 'lucide-react'

// ─── Types ───────────────────────────────────────────────────────────────────

interface ProductSlot {
  title: string
  description: string
  icon: React.ElementType
  cta: string
  link: string
  badge?: string
}

interface Product {
  id: number
  name: string
  category: string
  price: string
  rating: number
  sales: number
  image: string
  topSeller: boolean
  description: string
  slots: ProductSlot[]
}

// ─── Data ────────────────────────────────────────────────────────────────────

const PRODUCTS: Product[] = [
  {
    id: 1,
    name: 'Ultimate Battle Pass',
    category: 'Configuracion Premium',
    price: '$15.99',
    rating: 5,
    sales: 847,
    image: 'linear-gradient(135deg, #1a0505 0%, #3d0a0a 50%, #8B0000 100%)',
    topSeller: true,
    description:
      'Sistema completo de Battle Pass con 100+ niveles, recompensas exclusivas, y misiones diarias/semanales.',
    slots: [
      { title: 'Vista Previa', description: 'Explora todas las caracteristicas del producto', icon: Eye, cta: 'Ver Demo', link: '#', badge: 'Video HD' },
      { title: 'Caracteristicas', description: '100+ niveles, misiones, rewards system', icon: FileText, cta: 'Ver Lista', link: '#' },
      { title: 'Enlace BBB', description: 'Comprar en BuiltByBit marketplace', icon: Link2, cta: 'Ir a BBB', link: '#' },
      { title: 'Soporte', description: 'Soporte prioritario via Discord', icon: Headphones, cta: 'Contactar', link: '#', badge: '24/7' },
    ],
  },
  {
    id: 2,
    name: 'DeluxeMenus Pack Pro',
    category: 'Menus Personalizados',
    price: '$8.99',
    rating: 5,
    sales: 1203,
    image: 'linear-gradient(135deg, #0a0a15 0%, #15152a 50%, #2a1a3a 100%)',
    topSeller: true,
    description: 'Pack de 25+ menus profesionales con animaciones, sounds, y diseños unicos.',
    slots: [
      { title: 'Vista Previa', description: 'Preview de todos los menus incluidos', icon: Eye, cta: 'Ver Demo', link: '#' },
      { title: 'Caracteristicas', description: '25+ menus, animaciones, sonidos', icon: FileText, cta: 'Ver Lista', link: '#' },
      { title: 'Enlace BBB', description: 'Comprar en marketplace', icon: Link2, cta: 'Ir a BBB', link: '#' },
      { title: 'Soporte', description: 'Ayuda con instalacion incluida', icon: Headphones, cta: 'Contactar', link: '#' },
    ],
  },
  {
    id: 3,
    name: 'RankUp System Elite',
    category: 'Sistema de Rangos',
    price: '$12.99',
    rating: 4.9,
    sales: 562,
    image: 'linear-gradient(135deg, #050a0a 0%, #0a1a1a 50%, #0d3030 100%)',
    topSeller: false,
    description: 'Sistema de progresion de rangos con 50+ niveles, prestiges, y recompensas.',
    slots: [
      { title: 'Vista Previa', description: 'Muestra del sistema completo', icon: Eye, cta: 'Ver Demo', link: '#' },
      { title: 'Caracteristicas', description: '50+ rangos, prestigios, rewards', icon: FileText, cta: 'Ver Lista', link: '#' },
      { title: 'Enlace BBB', description: 'Disponible en BBB', icon: Link2, cta: 'Ir a BBB', link: '#' },
      { title: 'Soporte', description: 'Soporte completo incluido', icon: Headphones, cta: 'Contactar', link: '#' },
    ],
  },
  {
    id: 4,
    name: 'Kit Master Bundle',
    category: 'Sistema de Kits',
    price: '$9.99',
    rating: 4.8,
    sales: 421,
    image: 'linear-gradient(135deg, #0a0508 0%, #1a0a10 50%, #3d1020 100%)',
    topSeller: false,
    description: 'Bundle completo de kits con GUI personalizada, cooldowns, y permisos.',
    slots: [
      { title: 'Vista Previa', description: 'Preview de kits y GUI', icon: Eye, cta: 'Ver Demo', link: '#' },
      { title: 'Caracteristicas', description: '30+ kits, GUI custom, permisos', icon: FileText, cta: 'Ver Lista', link: '#' },
      { title: 'Enlace BBB', description: 'Comprar ahora', icon: Link2, cta: 'Ir a BBB', link: '#' },
      { title: 'Soporte', description: 'Ayuda garantizada', icon: Headphones, cta: 'Contactar', link: '#' },
    ],
  },
  {
    id: 5,
    name: 'Discord Bot Premium',
    category: 'Bot de Discord',
    price: '$24.99',
    rating: 5,
    sales: 289,
    image: 'linear-gradient(135deg, #050510 0%, #0a0a20 50%, #1a1a4a 100%)',
    topSeller: true,
    description: 'Bot completo con tickets, economia, moderacion, y mas de 50 comandos.',
    slots: [
      { title: 'Vista Previa', description: 'Demo del bot en accion', icon: Eye, cta: 'Ver Demo', link: '#', badge: 'Live' },
      { title: 'Caracteristicas', description: '50+ comandos, economia, tickets', icon: FileText, cta: 'Ver Lista', link: '#' },
      { title: 'Enlace BBB', description: 'Obtener en marketplace', icon: Link2, cta: 'Ir a BBB', link: '#' },
      { title: 'Soporte', description: 'Hosting help + updates', icon: Headphones, cta: 'Contactar', link: '#', badge: 'Premium' },
    ],
  },
  {
    id: 6,
    name: 'Crate System Pro',
    category: 'Sistema de Cajas',
    price: '$11.99',
    rating: 4.9,
    sales: 678,
    image: 'linear-gradient(135deg, #0a0805 0%, #1a150a 50%, #3d2a0a 100%)',
    topSeller: false,
    description: 'Sistema de cajas con animaciones epicas, probabilidades, y keys.',
    slots: [
      { title: 'Vista Previa', description: 'Animaciones de apertura', icon: Eye, cta: 'Ver Demo', link: '#' },
      { title: 'Caracteristicas', description: '10+ tipos, animaciones, keys', icon: FileText, cta: 'Ver Lista', link: '#' },
      { title: 'Enlace BBB', description: 'Comprar en BBB', icon: Link2, cta: 'Ir a BBB', link: '#' },
      { title: 'Soporte', description: 'Setup incluido', icon: Headphones, cta: 'Contactar', link: '#' },
    ],
  },
]

// ─── Hook: 3D Tilt ───────────────────────────────────────────────────────────

function useTilt(intensity = 25) {
  const ref = useRef<HTMLDivElement>(null)

  const handleMouseMove = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      const el = ref.current
      if (!el) return
      const { left, top, width, height } = el.getBoundingClientRect()
      const x = e.clientX - left
      const y = e.clientY - top
      const rotateX = ((y - height / 2) / intensity).toFixed(2)
      const rotateY = ((width / 2 - x) / intensity).toFixed(2)
      el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02,1.02,1.02)`
      el.style.setProperty('--spotlight-x', `${x}px`)
      el.style.setProperty('--spotlight-y', `${y}px`)
    },
    [intensity]
  )

  const handleMouseLeave = useCallback(() => {
    const el = ref.current
    if (!el) return
    el.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1,1,1)'
  }, [])

  return { ref, handleMouseMove, handleMouseLeave }
}

// ─── StarRating ───────────────────────────────────────────────────────────────

function StarRating({ rating, size = 'sm' }: { rating: number; size?: 'sm' | 'xs' }) {
  const px = size === 'sm' ? 'w-4 h-4' : 'w-3.5 h-3.5'
  return (
    <div className="flex items-center gap-1" aria-label={`${rating} de 5 estrellas`}>
      {Array.from({ length: 5 }, (_, i) => (
        <Star
          key={i}
          className={`${px} ${i < Math.floor(rating) ? 'text-yellow-400 fill-yellow-400' : 'text-muted-foreground/40'}`}
        />
      ))}
      <span className="text-xs text-muted-foreground ml-1">({rating})</span>
    </div>
  )
}

// ─── ProductCard ──────────────────────────────────────────────────────────────

interface ProductCardProps {
  product: Product
  index: number
  isInView: boolean
  onSelect: (product: Product) => void
}

function ProductCard({ product, index, isInView, onSelect }: ProductCardProps) {
  const { ref, handleMouseMove, handleMouseLeave } = useTilt()

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault()
      onSelect(product)
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        ref={ref}
        role="button"
        tabIndex={0}
        aria-label={`Ver detalles de ${product.name}`}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onClick={() => onSelect(product)}
        onKeyDown={handleKeyDown}
        className="relative rounded-3xl overflow-hidden cursor-pointer group transition-transform duration-300 ease-out focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        style={{ transformStyle: 'preserve-3d' }}
      >
        {/* Spotlight */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10 rounded-3xl"
          style={{
            background:
              'radial-gradient(350px circle at var(--spotlight-x, 50%) var(--spotlight-y, 50%), rgba(139,0,0,0.2), transparent 40%)',
          }}
        />

        <div className="glass-card glow-border group-hover:border-primary/60 transition-all duration-300 p-6">
          {/* Banner */}
          <div
            className="relative h-44 rounded-2xl mb-5 overflow-hidden"
            style={{ background: product.image }}
          >
            {/* Shimmer on hover */}
            <div
              aria-hidden
              className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
              style={{
                background:
                  'linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.04) 50%, transparent 60%)',
                backgroundSize: '200% 100%',
                animation: 'shimmer 1.5s infinite',
              }}
            />

            {/* Top badges */}
            <div className="absolute top-3 left-3 flex gap-2 z-10">
              {product.topSeller && (
                <motion.div
                  initial={{ scale: 0, rotate: -12 }}
                  animate={isInView ? { scale: 1, rotate: 0 } : {}}
                  transition={{ delay: 0.25 + index * 0.08, type: 'spring', stiffness: 260 }}
                  className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary/90 text-primary-foreground text-xs font-semibold glow-crimson-sm"
                >
                  <Crown className="w-3 h-3" />
                  Top Seller
                </motion.div>
              )}
            </div>

            <div className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-full bg-black/55 backdrop-blur-sm text-white/80 text-xs">
              <TrendingUp className="w-3 h-3" />
              {product.sales.toLocaleString()} ventas
            </div>

            {/* Hover CTA overlay */}
            <div className="absolute inset-0 bg-black/55 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center z-20">
              <span className="flex items-center gap-2 px-5 py-2.5 rounded-full bg-primary text-primary-foreground text-sm font-medium glow-crimson translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                <Eye className="w-4 h-4" />
                Ver Detalles
              </span>
            </div>
          </div>

          {/* Category */}
          <p className="text-[11px] text-primary font-semibold uppercase tracking-widest mb-1.5">
            {product.category}
          </p>

          {/* Name */}
          <h3 className="text-base font-bold text-foreground mb-3 group-hover:text-primary transition-colors duration-200 leading-snug">
            {product.name}
          </h3>

          {/* Rating */}
          <div className="mb-4">
            <StarRating rating={product.rating} />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between gap-3">
            <div className="px-3.5 py-1.5 rounded-full bg-primary/15 border border-primary/35 glow-crimson-sm">
              <span className="text-primary font-bold text-sm">{product.price}</span>
            </div>

            {/* Stop propagation so click on "Comprar" doesn't also open the modal */}
            <Button
              size="sm"
              className="bg-primary hover:bg-primary/90 text-primary-foreground glow-crimson-sm text-xs"
              onClick={(e) => {
                e.stopPropagation()
                // Navigate to BBB link — replace '#' with product.slots[2].link
                window.open(product.slots[2].link, '_blank', 'noopener,noreferrer')
              }}
              aria-label={`Comprar ${product.name}`}
            >
              <ShoppingBag className="w-3.5 h-3.5 mr-1.5" />
              Comprar
            </Button>
          </div>
        </div>
      </div>
    </motion.div>
  )
}

// ─── ProductModal ─────────────────────────────────────────────────────────────

interface ProductModalProps {
  product: Product
  onClose: () => void
}

function ProductModal({ product, onClose }: ProductModalProps) {
  const [activeSlot, setActiveSlot] = useState(0)
  const closeRef = useRef<HTMLButtonElement>(null)

  // Trap focus & close on Escape
  useEffect(() => {
    closeRef.current?.focus()

    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handleKey)
    // Prevent body scroll while modal is open
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', handleKey)
      document.body.style.overflow = ''
    }
  }, [onClose])

  const activeSlotData = product.slots[activeSlot]
  const ActiveIcon = activeSlotData.icon

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6"
      role="dialog"
      aria-modal="true"
      aria-label={`Detalles de ${product.name}`}
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/80 backdrop-blur-xl" />

      {/* Modal panel */}
      <motion.div
        initial={{ scale: 0.93, opacity: 0, y: 24 }}
        animate={{ scale: 1, opacity: 1, y: 0 }}
        exit={{ scale: 0.93, opacity: 0, y: 24 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="relative w-full max-w-3xl max-h-[90dvh] overflow-y-auto rounded-3xl"
        style={{ scrollbarWidth: 'thin' }}
      >
        <div className="glass-card glow-crimson rounded-3xl overflow-hidden">
          {/* Hero banner */}
          <div
            className="relative h-52 p-8 flex items-end"
            style={{ background: product.image }}
          >
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent" />

            <button
              ref={closeRef}
              onClick={onClose}
              aria-label="Cerrar modal"
              className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="absolute top-4 left-4 flex gap-2 flex-wrap">
              {product.topSeller && (
                <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-primary text-primary-foreground text-xs font-semibold glow-crimson-sm">
                  <Crown className="w-3 h-3" />
                  Top Seller
                </span>
              )}
              <span className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-black/50 backdrop-blur-sm text-white/80 text-xs">
                <TrendingUp className="w-3 h-3" />
                {product.sales.toLocaleString()} ventas
              </span>
            </div>

            <div className="relative z-10">
              <p className="text-[11px] text-primary font-semibold uppercase tracking-widest mb-1.5">
                {product.category}
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-white mb-2 leading-tight">
                {product.name}
              </h2>
              <div className="flex flex-wrap items-center gap-3">
                <StarRating rating={product.rating} size="xs" />
                <span className="text-primary font-bold text-lg">{product.price}</span>
              </div>
            </div>
          </div>

          {/* Body */}
          <div className="p-6 sm:p-8">
            <p className="text-muted-foreground mb-8 leading-relaxed text-sm sm:text-base">
              {product.description}
            </p>

            {/* Slot tabs — keyboard navigable */}
            <div
              role="tablist"
              aria-label="Secciones del producto"
              className="flex gap-2 mb-6 overflow-x-auto pb-1 scrollbar-none"
            >
              {product.slots.map((slot, i) => {
                const TabIcon = slot.icon
                const isActive = activeSlot === i
                return (
                  <button
                    key={i}
                    role="tab"
                    aria-selected={isActive}
                    aria-controls={`slot-panel-${i}`}
                    id={`slot-tab-${i}`}
                    onClick={() => setActiveSlot(i)}
                    onKeyDown={(e) => {
                      if (e.key === 'ArrowRight') setActiveSlot((prev) => (prev + 1) % product.slots.length)
                      if (e.key === 'ArrowLeft') setActiveSlot((prev) => (prev - 1 + product.slots.length) % product.slots.length)
                    }}
                    className={`flex items-center gap-2 px-4 py-2.5 rounded-xl whitespace-nowrap text-sm transition-all duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary ${
                      isActive
                        ? 'bg-primary text-primary-foreground glow-crimson-sm font-medium'
                        : 'bg-secondary/50 text-muted-foreground hover:bg-secondary hover:text-foreground'
                    }`}
                  >
                    <TabIcon className="w-4 h-4 flex-shrink-0" />
                    {slot.title}
                    {slot.badge && (
                      <span
                        className={`text-[10px] px-1.5 py-0.5 rounded-full font-medium ${
                          isActive ? 'bg-white/20 text-white' : 'bg-primary/20 text-primary'
                        }`}
                      >
                        {slot.badge}
                      </span>
                    )}
                  </button>
                )
              })}
            </div>

            {/* Active slot panel */}
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={activeSlot}
                id={`slot-panel-${activeSlot}`}
                role="tabpanel"
                aria-labelledby={`slot-tab-${activeSlot}`}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.18, ease: 'easeOut' }}
                className="glass rounded-2xl p-5 sm:p-6 border border-border/50"
              >
                <div className="flex items-start gap-4">
                  <div
                    aria-hidden
                    className="w-12 h-12 sm:w-14 sm:h-14 rounded-xl bg-primary/15 border border-primary/35 flex items-center justify-center flex-shrink-0 glow-crimson-sm"
                  >
                    <ActiveIcon className="w-5 h-5 sm:w-6 sm:h-6 text-primary" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <h4 className="text-base font-semibold text-foreground">
                        {activeSlotData.title}
                      </h4>
                      {activeSlotData.badge && (
                        <span className="text-xs px-2 py-0.5 rounded-full bg-primary/20 text-primary font-medium">
                          {activeSlotData.badge}
                        </span>
                      )}
                    </div>
                    <p className="text-muted-foreground text-sm mb-4 leading-relaxed">
                      {activeSlotData.description}
                    </p>
                    <Button
                      asChild
                      size="sm"
                      className="bg-primary hover:bg-primary/90 text-primary-foreground glow-crimson-sm group"
                    >
                      <a
                        href={activeSlotData.link}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {activeSlotData.cta}
                        <ChevronRight className="w-4 h-4 ml-1 group-hover:translate-x-1 transition-transform duration-200" />
                      </a>
                    </Button>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Quick actions */}
            <div className="flex flex-col sm:flex-row gap-3 mt-8 pt-6 border-t border-border/50">
              <Button
                asChild
                className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground glow-crimson group h-11"
              >
                <a
                  href={product.slots[2]?.link ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <ShoppingBag className="w-4 h-4 mr-2" />
                  Comprar Ahora
                  <ExternalLink className="w-3.5 h-3.5 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
                </a>
              </Button>
              <Button
                asChild
                variant="outline"
                className="flex-1 border-primary/40 hover:bg-primary/10 hover:border-primary h-11"
              >
                <a
                  href={product.slots[3]?.link ?? '#'}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <MessageSquare className="w-4 h-4 mr-2" />
                  Contactar Soporte
                </a>
              </Button>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Section ──────────────────────────────────────────────────────────────────

export function BBBProductsSection() {
  const sectionRef = useRef<HTMLElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null)

  return (
    <section
      id="bbb-products"
      ref={sectionRef}
      className="relative py-24 lg:py-32 overflow-hidden"
      aria-label="Productos Premium BBB"
    >
      {/* Background layers */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-nether/20 to-background pointer-events-none" />
      <div className="absolute top-1/3 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_right,rgba(139,0,0,0.1)_0%,transparent_60%)] pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[radial-gradient(ellipse_at_left,rgba(139,0,0,0.06)_0%,transparent_60%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.1, duration: 0.4 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-xs font-semibold uppercase tracking-wider mb-6"
          >
            <ShoppingBag className="w-3.5 h-3.5" />
            Marketplace
          </motion.span>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4 leading-tight">
            PRODUCTOS PREMIUM{' '}
            <span className="text-primary text-glow">BBB</span>
          </h2>

          <p className="text-base sm:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Recursos exclusivos disponibles en BuiltByBit.{' '}
            Calidad premium respaldada por cientos de clientes satisfechos.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-7">
          {PRODUCTS.map((product, index) => (
            <ProductCard
              key={product.id}
              product={product}
              index={index}
              isInView={isInView}
              onSelect={setSelectedProduct}
            />
          ))}
        </div>

        {/* View all */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.4 }}
          className="text-center mt-12"
        >
          <Button
            asChild
            variant="outline"
            size="lg"
            className="border-primary/40 hover:bg-primary/10 hover:border-primary group"
          >
            <a href="#" target="_blank" rel="noopener noreferrer">
              Ver Todos los Productos
              <ExternalLink className="w-4 h-4 ml-2 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-200" />
            </a>
          </Button>
        </motion.div>
      </div>

      {/* Shimmer keyframe — add to global CSS if not already present */}
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        .scrollbar-none { scrollbar-width: none; }
        .scrollbar-none::-webkit-scrollbar { display: none; }
      `}</style>

      {/* Modal */}
      <AnimatePresence>
        {selectedProduct && (
          <ProductModal
            key={selectedProduct.id}
            product={selectedProduct}
            onClose={() => setSelectedProduct(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}