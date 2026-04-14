"use client"

import { useEffect, useRef, useState } from 'react'

const categories = [
  {
    id: 1,
    title: 'Minecraft',
    sub: 'Config & Sistemas',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-[var(--crimson)]">
        <path d="M12 2L2 7l10 5 10-5-10-5z"/>
        <path d="M2 17l10 5 10-5"/>
        <path d="M2 12l10 5 10-5"/>
      </svg>
    ),
    skills: [
      { name: 'Configuración de Plugins', level: 100 },
      { name: 'Menús y Sistemas',         level: 85  },
      { name: 'Personalización de configs', level: 70 },
      { name: 'Fixeo de bugs',            level: 65  },
      { name: 'Creación de sistemas únicos', level: 90 },
      { name: 'Geyser / Conexiones',      level: 87  },
    ],
  },
  {
    id: 2,
    title: 'Discord Developer',
    sub: 'Bots & Automatizaciones',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-[var(--crimson)]">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
      </svg>
    ),
    skills: [
      { name: 'Sistemas avanzados',   level: 95 },
      { name: 'Sistema de tickets',   level: 90 },
      { name: 'Automatizaciones',     level: 50 },
      { name: 'Moderación',           level: 85 },
      { name: 'Minijuegos / sistemas', level: 70 },
      { name: 'Discord.js',           level: 65 },
    ],
  },
  {
    id: 3,
    title: 'Tebex / Web',
    sub: 'Tiendas & Frontend',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-[var(--crimson)]">
        <circle cx="12" cy="12" r="10"/>
        <path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>
      </svg>
    ),
    skills: [
      { name: 'Traducciones',             level: 100 },
      { name: 'Edición Visual',           level: 50  },
      { name: 'CSS Personalizado',        level: 65  },
      { name: 'Configuración de Tienda',  level: 95  },
      { name: 'Optimización Visual',      level: 70  },
      { name: 'Personalización de theme', level: 80  },
    ],
  },
  {
    id: 4,
    title: 'Infraestructura',
    sub: 'Redes & Producción',
    icon: (
      <svg viewBox="0 0 24 24" fill="none" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className="w-[18px] h-[18px] stroke-[var(--crimson)]">
        <rect x="2" y="2" width="20" height="8" rx="2"/>
        <rect x="2" y="14" width="20" height="8" rx="2"/>
        <line x1="6" y1="6" x2="6.01" y2="6"/>
        <line x1="6" y1="18" x2="6.01" y2="18"/>
      </svg>
    ),
    skills: [
      { name: 'Dominio a IP',             level: 95 },
      { name: 'Ajustes de Red',           level: 88 },
      { name: 'Producción',               level: 90 },
      { name: 'Despliegues Básicos',      level: 85 },
      { name: 'Configuración Funcional',  level: 92 },
    ],
  },
]

/* ─── Single animated skill bar ─── */
function SkillBar({
  name,
  level,
  index,
  active,
}: {
  name: string
  level: number
  index: number
  active: boolean
}) {
  const [width, setWidth] = useState(0)
  const [showPct, setShowPct] = useState(false)

  useEffect(() => {
    if (!active) return
    const t1 = setTimeout(() => setWidth(level),   index * 80 + 100)
    const t2 = setTimeout(() => setShowPct(true),  index * 80 + 700)
    return () => { clearTimeout(t1); clearTimeout(t2) }
  }, [active, level, index])

  return (
    <div className="group">
      <div className="flex items-baseline justify-between mb-2">
        <span
          style={{ fontSize: 13, fontWeight: 400, color: 'rgba(240,237,232,0.7)', letterSpacing: '0.01em', transition: 'color 0.2s', fontFamily: 'var(--dm)' }}
          className="group-hover:text-[var(--text)]"
        >
          {name}
        </span>
        <span
          style={{
            fontFamily: 'var(--syne)',
            fontSize: 12,
            fontWeight: 700,
            color: 'var(--crimson)',
            letterSpacing: '0.04em',
            opacity: showPct ? 1 : 0,
            transition: 'opacity 0.3s',
          }}
        >
          {level}%
        </span>
      </div>

      {/* Track */}
      <div style={{ height: 3, borderRadius: 100, background: 'rgba(255,255,255,0.06)', position: 'relative' }}>
        {/* Bar */}
        <div
          style={{
            height: '100%',
            borderRadius: 100,
            background: 'var(--crimson)',
            width: `${width}%`,
            transition: 'width 1.1s cubic-bezier(0.16, 1, 0.3, 1)',
            position: 'relative',
          }}
        >
          {/* Dot glow at tip */}
          <div
            style={{
              position: 'absolute',
              right: -1,
              top: '50%',
              transform: 'translateY(-50%)',
              width: 7,
              height: 7,
              borderRadius: '50%',
              background: 'var(--crimson)',
              boxShadow: '0 0 10px 2px rgba(200,16,46,0.7)',
              opacity: width > 0 ? 1 : 0,
              transition: 'opacity 0.3s 0.8s',
            }}
          />
        </div>
      </div>
    </div>
  )
}

/* ─── Card ─── */
function SkillCard({
  category,
  cardIndex,
  active,
}: {
  category: (typeof categories)[0]
  cardIndex: number
  active: boolean
}) {
  return (
    <div
      style={{
        background: 'var(--card)',
        border: '1px solid var(--card-border)',
        borderRadius: 16,
        padding: '28px 28px 32px',
        position: 'relative',
        overflow: 'hidden',
        transition: 'border-color 0.3s ease, transform 0.3s ease',
        opacity: 0,
        animation: `fadeUp 0.6s cubic-bezier(0.16,1,0.3,1) ${cardIndex * 0.1 + 0.05}s forwards`,
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'rgba(200,16,46,0.28)'
        el.style.transform = 'translateY(-2px)'
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLDivElement
        el.style.borderColor = 'var(--card-border)'
        el.style.transform = 'translateY(0)'
      }}
    >
      {/* Hover glow — handled via pseudo via inline hover above */}

      {/* Decorative index number */}
      <span
        style={{
          position: 'absolute',
          top: 20,
          right: 24,
          fontFamily: 'var(--syne)',
          fontSize: 48,
          fontWeight: 800,
          color: 'rgba(255,255,255,0.025)',
          lineHeight: 1,
          letterSpacing: '-0.04em',
          userSelect: 'none',
          pointerEvents: 'none',
        }}
      >
        {String(category.id).padStart(2, '0')}
      </span>

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 32 }}>
        <div
          style={{
            width: 40,
            height: 40,
            borderRadius: 10,
            background: 'rgba(200,16,46,0.18)',
            border: '1px solid rgba(200,16,46,0.3)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            flexShrink: 0,
          }}
        >
          {category.icon}
        </div>
        <div>
          <div style={{ fontFamily: 'var(--syne)', fontSize: 15, fontWeight: 700, color: 'var(--text)', lineHeight: 1.2 }}>
            {category.title}
          </div>
          <div style={{ fontSize: 11, color: 'rgba(240,237,232,0.38)', fontWeight: 400, letterSpacing: '0.05em', marginTop: 2 }}>
            {category.sub}
          </div>
        </div>
      </div>

      {/* Skills */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
        {category.skills.map((skill, i) => (
          <SkillBar key={skill.name} name={skill.name} level={skill.level} index={i} active={active} />
        ))}
      </div>
    </div>
  )
}

/* ─── Section ─── */
export function SkillsSection() {
  const sectionRef = useRef<HTMLDivElement>(null)
  const [active, setActive] = useState(false)

  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setActive(true); obs.disconnect() } },
      { threshold: 0.1 }
    )
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <>
      {/* CSS vars + keyframes injected once */}
      <style>{`
        :root {
          --crimson: #C8102E;
          --card: #111115;
          --card-border: rgba(255,255,255,0.07);
          --text: #f0ede8;
          --syne: 'Syne', sans-serif;
          --dm: 'DM Sans', sans-serif;
        }
        @import url('https://fonts.googleapis.com/css2?family=Syne:wght@700;800&family=DM+Sans:wght@300;400;500&display=swap');
        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(24px); }
          to   { opacity: 1; transform: translateY(0);    }
        }
        .skills-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
        }
        @media (max-width: 640px) {
          .skills-grid { grid-template-columns: 1fr; }
        }
      `}</style>

      <section
        id="skills"
        ref={sectionRef}
        style={{ background: '#0a0a0c', padding: '56px 32px 64px', fontFamily: 'var(--dm)' }}
      >
        <div style={{ maxWidth: 960, margin: '0 auto' }}>

          {/* Header */}
          <div style={{ animation: 'fadeUp 0.5s cubic-bezier(0.16,1,0.3,1) forwards', opacity: 0 }}>
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 8, fontSize: 11, fontWeight: 500, letterSpacing: '0.18em', textTransform: 'uppercase', color: 'var(--crimson)', marginBottom: 18 }}>
              <span style={{ display: 'inline-block', width: 18, height: 2, background: 'var(--crimson)', borderRadius: 2 }} />
              Habilidades Técnicas
            </div>
            <h2 style={{ fontFamily: 'var(--syne)', fontSize: 'clamp(32px, 5vw, 52px)', fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em', color: 'var(--text)', marginBottom: 10 }}>
              Mi <em style={{ fontStyle: 'normal', color: 'var(--crimson)' }}>Experiencia</em>
            </h2>
            <p style={{ fontSize: 14, color: 'rgba(240,237,232,0.38)', marginBottom: 52, fontWeight: 300, lineHeight: 1.6 }}>
              Años de trabajo en servidores Minecraft, desarrollo web, bots de Discord e infraestructura.
            </p>
          </div>

          {/* Grid */}
          <div className="skills-grid">
            {categories.map((cat, i) => (
              <SkillCard key={cat.id} category={cat} cardIndex={i} active={active} />
            ))}
          </div>

        </div>
      </section>
    </>
  )
}