"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { allTestimonials } from '@/lib/testimonials-data'

// 2 filas para el marquee
const row1 = allTestimonials.slice(0, 18)
const row2 = allTestimonials.slice(18, 35)

const SKIN_API = 'https://mc-heads.net/avatar'

function getInitials(label: string) {
  // Usamos Array.from para no cortar caracteres Unicode (emojis, símbolos)
  // a la mitad, lo cual causaba un mismatch de hidratacion servidor/cliente.
  const words = label.trim().split(/\s+/).filter(Boolean)
  const chars = words.map(w => Array.from(w)[0]).filter((c): c is string => Boolean(c))
  return chars.slice(0, 2).join('')
}

function MinecraftAvatar({ username, fallback, size = 36 }: {
  username: string
  fallback: string
  size?: number
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

  // Si el username cambia (ej. tras editar los datos y un hot-reload) pero
  // React reutiliza la misma instancia del componente, sin esto el estado
  // de carga/error queda pegado al username anterior y el avatar se rompe.
  useEffect(() => {
    setLoaded(false)
    setError(false)
  }, [username])

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: '2px solid rgba(200,16,46,0.2)',
      overflow: 'hidden', background: '#1a1a22',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', flexShrink: 0,
    }}>
      {(!loaded || error) && (
        <span style={{
          fontSize: size * 0.3, fontWeight: 700,
          color: '#C8102E', position: 'absolute',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '-0.02em',
        }}>
          {fallback}
        </span>
      )}
      {!error && (
        <img
          src={`${SKIN_API}/${encodeURIComponent(username)}/${size * 2}`}
          alt={username}
          onLoad={() => setLoaded(true)}
          onError={() => setError(true)}
          style={{
            width: '100%', height: '100%',
            objectFit: 'cover', imageRendering: 'pixelated',
            position: 'absolute', inset: 0,
            opacity: loaded ? 1 : 0, transition: 'opacity 0.4s',
          }}
        />
      )}
    </div>
  )
}

function Stars() {
  return (
    <div style={{ display: 'flex', gap: 2 }}>
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} width="11" height="11" viewBox="0 0 24 24" fill="#f59e0b">
          <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
        </svg>
      ))}
    </div>
  )
}

function TestimonialCard({ t }: { t: Testimonial }) {
  const ini = getInitials(t.label)

  return (
    <div
      style={{
        flexShrink: 0,
        width: 300,
        background: '#12121a',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: 14,
        padding: '20px 22px',
        transition: 'border-color 0.25s, transform 0.25s',
        cursor: 'default',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(200,16,46,0.3)'
        el.style.transform = 'translateY(-2px) scale(1.01)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(255,255,255,0.07)'
        el.style.transform = 'none'
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
        <svg width="18" height="18" viewBox="0 0 24 24" fill="rgba(200,16,46,0.22)">
          <path d="M14.017 21v-7.391c0-5.704 3.731-9.57 8.983-10.609l.995 2.151c-2.432.917-3.995 3.291-3.995 5.849h4v10h-9.983zm-14.017 0v-7.391c0-5.704 3.748-9.57 9-10.609l.996 2.151c-2.433.917-3.996 3.291-3.996 5.849h3.983v10h-9.983z" />
        </svg>
        <Stars />
      </div>

      <p style={{
        fontSize: 13,
        color: 'rgba(240,237,232,0.6)',
        lineHeight: 1.65,
        marginBottom: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontStyle: 'italic',
        fontWeight: 400,
      }}>
        &ldquo;{t.text}&rdquo;
      </p>

      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{ position: 'relative' }}>
          <MinecraftAvatar username={t.mcUsername} fallback={ini} size={36} />
          <div style={{
            position: 'absolute', bottom: 1, right: 1,
            width: 8, height: 8, borderRadius: '50%',
            background: '#22c55e', border: '2px solid #12121a',
          }} />
        </div>
        <div>
          <div style={{
            fontSize: 13,
            fontWeight: 600,
            color: '#f0ede8',
            lineHeight: 1.2,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.01em',
          }}>
            {t.label}
          </div>
          <div style={{
            fontSize: 11,
            color: 'rgba(240,237,232,0.38)',
            marginTop: 2,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            {t.role} @ <span style={{ color: '#C8102E' }}>{t.server}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ testimonials, direction = 'left', duration = 65 }: {
  testimonials: Testimonial[]
  direction?: 'left' | 'right'
  duration?: number
}) {
  const doubled = [...testimonials, ...testimonials]

  return (
    <div style={{
      overflow: 'hidden',
      padding: '4px 0',
      maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
    }}>
      <motion.div
        style={{ display: 'flex', gap: 14, width: 'max-content' }}
        animate={{ x: direction === 'left' ? ['0%', '-50%'] : ['-50%', '0%'] }}
        transition={{ duration, repeat: Infinity, ease: 'linear' }}
        whileHover={{ animationPlayState: 'paused' } as never}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </motion.div>
    </div>
  )
}

export function TestimonialsSection() {
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const badgePlayers = allTestimonials.slice(0, 5)

  return (
    <section
      id="testimonials"
      ref={ref}
      style={{
        background: '#0a0a0c',
        overflow: 'hidden',
        padding: '72px 0',
        fontFamily: 'system-ui, -apple-system, sans-serif',
      }}
    >
      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.05 }}
        style={{
          padding: '0 48px',
          marginBottom: 44,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: 32,
        }}
      >
        {/* Izquierda: badge + título + sub */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 11, fontWeight: 600, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#C8102E', marginBottom: 14,
          }}>
            <span style={{ display: 'inline-block', width: 18, height: 2, background: '#C8102E', borderRadius: 2 }} />
            Testimonios Verificados
          </div>

          <h2 style={{
            fontSize: 'clamp(26px, 3vw, 38px)',
            fontWeight: 700,
            lineHeight: 1.1,
            letterSpacing: '-0.025em',
            color: '#f0ede8',
            marginBottom: 10,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            Lo que dicen mis{' '}
            <span style={{ color: '#C8102E' }}>clientes</span>
          </h2>

          <p style={{
            fontSize: 14,
            color: 'rgba(240,237,232,0.40)',
            fontWeight: 400,
            lineHeight: 1.6,
          }}>
            Más de 360 servidores configurados. Resultados reales, clientes reales.
          </p>
        </div>

        {/* Derecha: stats + trust pill */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 32, flexShrink: 0 }}>

          {/* Stats */}
          {([
            ['360+', 'Clientes felices'],
            ['4.98', 'Rating promedio'],
            ['99%',  'Recomendarían'],
          ] as const).map(([num, lbl], i) => (
            <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 32 }}>
              {i > 0 && (
                <div style={{ width: 1, height: 36, background: 'rgba(255,255,255,0.08)' }} />
              )}
              <div style={{ textAlign: 'center' }}>
                <div style={{
                  fontSize: 28,
                  fontWeight: 700,
                  color: '#C8102E',
                  lineHeight: 1,
                  letterSpacing: '-0.02em',
                  fontFamily: 'system-ui, -apple-system, sans-serif',
                }}>
                  {num}
                </div>
                <div style={{
                  fontSize: 11,
                  color: 'rgba(240,237,232,0.35)',
                  letterSpacing: '0.03em',
                  marginTop: 4,
                }}>
                  {lbl}
                </div>
              </div>
            </div>
          ))}

          {/* Trust pill */}
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 9,
            padding: '7px 14px', borderRadius: 100,
            background: '#111115', border: '1px solid rgba(255,255,255,0.07)',
          }}>
            <div style={{ display: 'flex' }}>
              {badgePlayers.map((t, i) => (
                <div key={t.id} style={{ marginLeft: i === 0 ? 0 : -6, zIndex: badgePlayers.length - i }}>
                  <MinecraftAvatar username={t.mcUsername} fallback={getInitials(t.label)} size={22} />
                </div>
              ))}
            </div>
            <span style={{ fontSize: 12, color: 'rgba(240,237,232,0.40)', whiteSpace: 'nowrap' }}>
              Únete a cientos de servers
            </span>
          </div>

        </div>
      </motion.div>

      {/* ── 2 filas marquee ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.15 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 14 }}
      >
        <MarqueeRow testimonials={row1} direction="left"  duration={65} />
        <MarqueeRow testimonials={row2} direction="right" duration={80} />
      </motion.div>
    </section>
  )
}