"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { allTestimonials } from '@/lib/testimonials-data'
import { getInitials, MinecraftAvatar } from '@/components/sections/testimonials'

// Prueba social corta y temprana en el recorrido, antes de que el visitante
// llegue al carrusel completo de testimonios (que aparece mas abajo).
const featuredIds = [22, 10, 25]
const featured = featuredIds
  .map((id) => allTestimonials.find((t) => t.id === id))
  .filter((t): t is (typeof allTestimonials)[number] => Boolean(t))

export function SocialProofStrip() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  return (
    <section className="relative py-6 lg:py-10 overflow-hidden">
      <div ref={ref} className="relative z-10 container mx-auto px-6">
        <div className="grid sm:grid-cols-3 gap-4 max-w-4xl mx-auto">
          {featured.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 16 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: i * 0.1, duration: 0.5 }}
              className="glass-card rounded-2xl p-5 border border-white/[0.06]"
            >
              <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3 mb-4">
                &ldquo;{t.text}&rdquo;
              </p>
              <div className="flex items-center gap-2.5">
                <MinecraftAvatar username={t.mcUsername} fallback={getInitials(t.label)} size={28} />
                <div className="min-w-0">
                  <div className="text-xs font-semibold text-foreground truncate">{t.label}</div>
                  <div className="text-[11px] text-muted-foreground truncate">
                    {t.role} · {t.server}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
