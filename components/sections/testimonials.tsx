"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'
import { Pause, Play } from 'lucide-react'
import { allTestimonials, type Testimonial } from '@/lib/testimonials-data'
import { useLanguage } from '@/components/language-provider'
import { useReducedMotion } from '@/hooks/use-reduced-motion'

const sectionCopy = {
  en: {
    eyebrow: 'Verified Reviews',
    h2pre: 'What My ',
    h2word: 'Clients',
    h2post: ' Say',
    subtitle: 'Over 360 servers configured. Real results, real clients.',
    stats: [['360+', 'Happy clients'], ['4.98', 'Average rating'], ['99%', 'Would recommend']] as const,
    trustPill: 'Join hundreds of servers',
    pause: 'Pause scrolling reviews',
    resume: 'Resume scrolling reviews',
  },
  es: {
    eyebrow: 'Testimonios Verificados',
    h2pre: 'Lo que dicen mis ',
    h2word: 'clientes',
    h2post: '',
    subtitle: 'Más de 360 servidores configurados. Resultados reales, clientes reales.',
    stats: [['360+', 'Clientes felices'], ['4.98', 'Rating promedio'], ['99%', 'Recomendarían']] as const,
    trustPill: 'Únete a cientos de servers',
    pause: 'Pausar reseñas en movimiento',
    resume: 'Reanudar reseñas en movimiento',
  },
}

// 2 filas para el marquee
const row1 = allTestimonials.slice(0, 18)
const row2 = allTestimonials.slice(18, 35)

// Varios servicios que renderizan skins de Minecraft a partir de un username.
// Si el primero esta bloqueado en la red del visitante (adblock, DNS
// filtrado, antivirus), probamos con el siguiente antes de rendirnos y
// mostrar solo las iniciales.
const SKIN_APIS = [
  (u: string, size: number) => `https://mc-heads.net/avatar/${encodeURIComponent(u)}/${size}`,
  (u: string, size: number) => `https://minotar.net/avatar/${encodeURIComponent(u)}/${size}`,
]

// Busca la primera letra o numero "normal" (ASCII) dentro de una palabra,
// normalizando primero con NFKD: esto convierte variantes decorativas de
// Unicode (negrita matematica, superindices, etc. — comunes en nicks de
// Discord) de vuelta a su letra base. Ej: '𝐕' -> 'V', 'ⁿ' -> 'n'.
function firstAsciiChar(word: string): string | null {
  for (const ch of Array.from(word.normalize('NFKD'))) {
    if (/[A-Za-z0-9]/.test(ch)) return ch.toUpperCase()
  }
  return null
}

function getInitials(label: string) {
  const words = label.trim().split(/\s+/).filter(Boolean)
  const wordInitials = words.map(firstAsciiChar).filter((c): c is string => Boolean(c))
  if (wordInitials.length > 0) return wordInitials.slice(0, 2).join('')

  // Si ninguna palabra tenia una letra/numero ASCII (nick 100% simbolos o
  // en otro alfabeto), usamos la primera letra de cualquier idioma en vez
  // de mostrar puros simbolos decorativos.
  const anyLetters = Array.from(label).filter((c) => /[\p{L}\p{N}]/u.test(c))
  if (anyLetters.length > 0) return anyLetters.slice(0, 2).join('').toUpperCase()

  return '?'
}

function MinecraftAvatar({ username, fallback, size = 36 }: {
  username: string
  fallback: string
  size?: number
}) {
  const [loaded, setLoaded] = useState(false)
  const [sourceIndex, setSourceIndex] = useState(0)
  const exhausted = sourceIndex >= SKIN_APIS.length

  // Si el username cambia (ej. tras editar los datos y un hot-reload) pero
  // React reutiliza la misma instancia del componente, sin esto el estado
  // de carga/error queda pegado al username anterior y el avatar se rompe.
  useEffect(() => {
    setLoaded(false)
    setSourceIndex(0)
  }, [username])

  return (
    <div style={{
      width: size, height: size, borderRadius: '50%',
      border: '2px solid rgba(200,16,46,0.2)',
      overflow: 'hidden', background: '#1a1a22',
      display: 'flex', alignItems: 'center', justifyContent: 'center',
      position: 'relative', flexShrink: 0,
    }}>
      {(!loaded || exhausted) && (
        <span style={{
          fontSize: size * 0.3, fontWeight: 700,
          color: '#C8102E', position: 'absolute',
          fontFamily: 'system-ui, sans-serif',
          letterSpacing: '-0.02em',
        }}>
          {fallback}
        </span>
      )}
      {!exhausted && (
        <img
          src={SKIN_APIS[sourceIndex](username, size * 2)}
          alt={username}
          loading="lazy"
          decoding="async"
          onLoad={() => setLoaded(true)}
          onError={() => {
            setLoaded(false)
            setSourceIndex((i) => i + 1)
          }}
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
  const { locale } = useLanguage()
  const ini = getInitials(t.label)
  const text = locale === 'en' ? t.textEn : t.text
  const role = locale === 'en' ? t.roleEn : t.role

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
        fontSize: 15,
        color: 'rgba(240,237,232,0.85)',
        lineHeight: 1.65,
        marginBottom: 16,
        fontFamily: 'system-ui, -apple-system, sans-serif',
        fontStyle: 'italic',
        fontWeight: 400,
      }}>
        &ldquo;{text}&rdquo;
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
            fontSize: 14,
            fontWeight: 600,
            color: '#f0ede8',
            lineHeight: 1.2,
            fontFamily: 'system-ui, -apple-system, sans-serif',
            letterSpacing: '-0.01em',
          }}>
            {t.label}
          </div>
          <div style={{
            fontSize: 13,
            color: 'rgba(240,237,232,0.65)',
            marginTop: 2,
            fontFamily: 'system-ui, -apple-system, sans-serif',
          }}>
            {role} @ <span style={{ color: '#C8102E' }}>{t.server}</span>
          </div>
        </div>
      </div>
    </div>
  )
}

function MarqueeRow({ testimonials, direction = 'left', duration = 65, paused }: {
  testimonials: Testimonial[]
  direction?: 'left' | 'right'
  duration?: number
  paused: boolean
}) {
  const doubled = [...testimonials, ...testimonials]

  return (
    <div
      className="overflow-hidden py-1"
      style={{
        maskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to right, transparent 0%, black 6%, black 94%, transparent 100%)',
      }}
    >
      {/* Animacion via CSS (@keyframes marquee-scroll-* en globals.css),
          pausada/reanudada mediante data-paused controlado por React (no
          por :hover) para que el boton de pausa y prefers-reduced-motion
          funcionen de forma predecible. */}
      <div
        className="marquee-track flex gap-3.5 w-max"
        data-direction={direction}
        data-paused={paused}
        style={{ animationDuration: `${duration}s` }}
      >
        {doubled.map((t, i) => (
          <TestimonialCard key={`${t.id}-${i}`} t={t} />
        ))}
      </div>
    </div>
  )
}

export function TestimonialsSection() {
  const { locale } = useLanguage()
  const s = sectionCopy[locale]
  const ref = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })
  const shouldReduceMotion = useReducedMotion()

  // El marquee arranca pausado si el sistema pide "reducir movimiento",
  // pero el visitante puede reanudarlo a mano con el boton: no le sacamos
  // el control, solo respetamos su preferencia como punto de partida.
  const [paused, setPaused] = useState(false)
  const [userToggled, setUserToggled] = useState(false)
  useEffect(() => {
    if (!userToggled && shouldReduceMotion) setPaused(true)
  }, [shouldReduceMotion, userToggled])

  const togglePaused = () => {
    setUserToggled(true)
    setPaused((p) => !p)
  }

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
        position: 'relative',
      }}
    >
      {/* Glow ambiental: antes esta seccion era negro solido plano, sin
          ningun degradado como el resto de las secciones del sitio. */}
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 800px 420px at 15% 0%, rgba(200,16,46,0.10) 0%, transparent 65%)',
        }}
      />
      <div
        aria-hidden
        style={{
          position: 'absolute', inset: 0, pointerEvents: 'none',
          background: 'radial-gradient(ellipse 700px 400px at 85% 100%, rgba(200,16,46,0.07) 0%, transparent 65%)',
        }}
      />

      {/* ── Header ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.05 }}
        className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-8 px-5 sm:px-8 lg:px-12 mb-10 lg:mb-11"
      >
        {/* Izquierda: badge + título + sub */}
        <div>
          <div style={{
            display: 'inline-flex', alignItems: 'center', gap: 8,
            fontSize: 12, fontWeight: 600, letterSpacing: '0.16em',
            textTransform: 'uppercase', color: '#C8102E', marginBottom: 14,
          }}>
            <span style={{ display: 'inline-block', width: 18, height: 2, background: '#C8102E', borderRadius: 2 }} />
            {s.eyebrow}
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
            {s.h2pre}
            <span style={{ color: '#C8102E' }}>{s.h2word}</span>
            {s.h2post}
          </h2>

          <p style={{
            fontSize: 14,
            color: 'rgba(240,237,232,0.65)',
            fontWeight: 400,
            lineHeight: 1.6,
          }}>
            {s.subtitle}
          </p>
        </div>

        {/* Derecha: stats + trust pill + control de pausa */}
        <div className="flex flex-wrap items-center gap-6 sm:gap-8 flex-shrink-0">

          {/* Stats */}
          {s.stats.map(([num, lbl], i) => (
            <div key={lbl} style={{ display: 'flex', alignItems: 'center', gap: 24 }}>
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
                  fontSize: 12,
                  color: 'rgba(240,237,232,0.65)',
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
            <span style={{ fontSize: 13, color: 'rgba(240,237,232,0.65)', whiteSpace: 'nowrap' }}>
              {s.trustPill}
            </span>
          </div>

          {/* Pausar/reanudar el marquee — control explicito, no depende de hover */}
          <button
            type="button"
            onClick={togglePaused}
            aria-pressed={paused}
            aria-label={paused ? s.resume : s.pause}
            title={paused ? s.resume : s.pause}
            style={{
              width: 36, height: 36, borderRadius: '50%', flexShrink: 0,
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              background: '#111115', border: '1px solid rgba(255,255,255,0.1)',
              color: '#f0ede8', cursor: 'pointer',
            }}
          >
            {paused ? <Play size={14} style={{ marginLeft: 1 }} /> : <Pause size={14} />}
          </button>

        </div>
      </motion.div>

      {/* ── 2 filas marquee ── */}
      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.55, delay: 0.15 }}
        style={{ display: 'flex', flexDirection: 'column', gap: 14, position: 'relative', zIndex: 1 }}
      >
        <MarqueeRow testimonials={row1} direction="left"  duration={65} paused={paused} />
        <MarqueeRow testimonials={row2} direction="right" duration={80} paused={paused} />
      </motion.div>
    </section>
  )
}
