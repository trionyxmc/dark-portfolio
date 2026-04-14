"use client"

import { useRef, useState } from 'react'
import { motion, useInView } from 'framer-motion'

interface Testimonial {
  id: number
  label: string
  role: string
  server: string
  mcUsername: string
  text: string
}

const allTestimonials: Testimonial[] = [
  { id:  1, label:'ヽHoney﹒.',    role:'Owner',    server:'ChillMon',    mcUsername:'elvse',           text:'Muy buen trabajo, rápido y eficaz, además de precios accesibles @Dark gracias por el trabajo hecho' },
  { id:  2, label:'ⁿᵏ𝐕𝐚𝐥𝐞𝐧 ⚝.',       role:'Owner',    server:'EnigmaWorld',      mcUsername:'valen',            text:'Exelente servicio, muy atento siempre, le compre una config de playerkits le hable y me la cambio sin problemas, hoy le compre el servidor survival porque me parecio exelente y muy amable siempre, totalmente recomendado ' },
  { id:  3, label:'jotkeiz.',     role:'Owner',    server:'EclipseCraf',   mcUsername:'cztt',      text:'Excelente trabajo en el servidor de Minecraft y la tienda Tebex Fue muy paciente durante todo el proceso, trabajó de manera rápida y eficiente, y siempre estuvo dispuesto a ayudar ante cualquier duda' },
  { id:  4, label:'Enziuu',     role:'Owner',  server:'Astralis MC',   mcUsername:'TheeSadness',           text:'Excelente trabajo el que me realizó,  le pedí una tienda tebex completa y me la hizo tal y como se la pedí,  le doy un 10/10 ,es muy paciente la verdad y dedicado a su trabajo' },
  { id:  5, label:'★彡 TITAN 彡★',     role:'Owner',    server:'Beetlejuice',   mcUsername:'titan',     text:'Excelente servicio que hizo a mi tienda tebex no sería la primera ni la última vez que voy a contratar sus excelentes servicios' },
  { id:  6, label:'JLuis_',     role:'Owner',      server:'MineLatin',    mcUsername:'trustgod',       text:'Un excelente servicio. La atención al cliente, la disponibilidad y el tiempo de entrega superaron mis expectativas. Solo tenía ideas muy vagas para mi servidor y pensé que sería difícil que las entendiera, pero su trabajo me sorprendió. Si tienen la oportunidad, no duden en contratar sus servicios' },
  { id:  7, label:'Lears_One',   role:'Owner',    server:'Pixel Of God', mcUsername:'Lears1',          text:'El trabajo y la atencion de @Dark un 10/10  muy buen servicio y  trabajo, estoy esperando tener muchas mas oportunidades de trabajar con usted , es todo lo que se  solicita en una persona con el conocimiento y la capacidad de completar todas las tareas 100%' },
  { id:  8, label:'LeoMendoza',     role:'Owner', server:'Tierra arcana',      mcUsername:'VANTE423',      text:'La experiencia con @DARK_NESS fue excelente, la atencion a lo que uno requiere y le solicita, es muy buena, el tiempo igual es muy bueno, te resuelve todas tus dudas , si tienes algun problema de igual manera te resuelve y te ayuda hasta que termina el trabajo ' },
  { id:  9, label:'Pirzi.',      role:'Owner',    server:'ArgWorld',    mcUsername:'suniy', text:'Sinceramente si es buen servicio, mucha ayuda y mas que yo no se hacer nada xd te re agradezco @Dark ' },
  { id: 10, label:'SrBos',     role:'Owner',    server:'NexusMC',    mcUsername:'srbos',        text:'Muy buen servicio de @Dark le pedi configuracion de dungeons y minas customs y fue bastante atento a los detalles solicitados, servicio eficiente y sin complicaciones 10/10' },
  { id: 11, label:'YisusCm23.',    role:'Owner',  server:'SkyCraft',   mcUsername:'latyr',      text:'Uffff gracias por el servicio Bro @Dark la verdad muy amable, paciente, la verdad 10/10 Le pedí una configuración completa de mi servidor a como es mi gusto y fue mejor de lo que esperaba. La verdad no me arrepiento de haber pedido sus servicios 🙏🏻' },
  { id: 12, label:'alesinho912',    role:'Owner',    server:'KittyCraft',    mcUsername:'Unsense',  text:'Mi experiencia con el servicio de @Dark fue muy buena! le compré un servidor completo me ayudó a configurar y modificar paso a paso las cosas a mi gusto, estuvo a. disposición cada instante. El resultado supero todas mis expectativas, todo quedó de 10... Estoy seguro que voy a seguir necesitando de sus servicios! Super recomendado' },
  { id: 13, label:'xFrosedYT⚡',  role:'Owner',    server:'LuxorMC',  mcUsername:'angeIicide_',          text:'Compre el Servicio de tebex, no fue nada caro, la tienda quedo increíble, es un genio @Dark, super recomendado si tienen pensado comprar su servicio de tebex, o cualquier otro servicio o configuración. 10/10' },
  { id: 14, label:'Shinji21',    role:'Owner',    server:'GalaxyCraft',      mcUsername:'shinji92',      text:'Mi experiencia con este servicio fue excelente. @Dark  se encargó de crear y configurar mi servidor de Minecraft de manera muy profesional, cuidando cada detalle para que todo quedara funcionando correctamente desde el inicio. El tiempo de espera fue exactamente el estimado, Durante el proceso siempre hubo buena comunicación, resolviendo mis dudas de forma clara y rápida. El resultado final superó mis expectativas: un servidor estable, bien optimizado y listo para disfrutar sin complicaciones.' },
  { id: 15, label:'TorreRock',    role:'Owner',    server:'MagisCraft',  mcUsername:'Lord_Wifies',          text:'Compre un servidor completo a @Dark  y todo perfecto configuración traducción de todos los plugins y un servicio la verdad de 10 me gustó mucho su trato y todo ' },
  { id: 16, label:'SirExhon❤🇲🇽🔥', role:'Owner',      server:'ImperialCraft',     mcUsername:'faytall_',            text:'Compre un Servidor con @Dark la configuracion es una perfeccion total, y la verdad fue en tiempo muy corto al realizar la compra la entrega fue casi inmediata y me sorprendió la calidad, sin duda quedo satisfecho con el producto que se me entrego, supero mis espectativas. Seguire adquiriendo sus servicios y productos por la profecionalidad y puntualidad del servicio.' },
  { id: 17, label:'! Strovo', role:'Owner',    server:'hytalebox',    mcUsername:'strovo',        text:'Mande hacer las traducciones a @Dark de varios plugin, y la verdad fue en tiempo récord (eran complejas) y me sorprendió la calidad y el tiempo de entrega de todo, estoy seguro que estaré haciendo mas negocios ya que este tipo de trabajos es lo que he estado buscado, gente que  cumpla su palabra y que sea bueno en lo que hace.' },
  { id: 18, label:'DinoBossYT',     role:'Owner', server:'IronMC',       mcUsername:'n7vx_',         text:'Hola, como siempre intento ser sincero por más que a veces eso pueda ser un dolor para los configurados. En esta ocasión quiero reconocer a @DEMON, quien se comportó como un verdadero profesional. Su trabajo de traducción fue impecable: ordenado, limpio y perfectamente adaptado. Lo más destacable fue su capacidad de resolver los desafíos adicionales que le propuse, los cuales no eran sencillos, y aun así los completó en un tiempo corto y con una calidad sobresaliente. Recomiendo plenamente su servicio; demuestra compromiso, responsabilidad y un nivel de dedicación difícil de encontrar' },
  { id: 19, label:'𝐒𝐨𝐲𝐒𝐞𝐛𝐚𝐬𝐃𝐌𝐂.',     role:'Owner', server:'AtlasMC',       mcUsername:'Flowtives',         text:'He pedido un servidor y de manera instantánea, efectivamente se compromete y super chévere la profesionalidad de @Dark 10/10 el trabajo. Se los recomiendo ' },
  { id: 20, label:'Azkelaf',     role:'Owner', server:'LatinoCraft',       mcUsername:'Sunstreak',         text:'Una vez más he solicitado sus servicios y como siempre sigue siendo un persona profesional y dedicada a su oficio, sin duda alguna lo tendré como mi configurador de cabecera.' },
  { id: 21, label:'LEØ_404.',     role:'Owner', server:'EtheniumMC',       mcUsername:'aprenda',         text:'He solicitado varios servicios con ciertas especificaciones y me ha entregado trabajos 10/10 realmente un trabajo elegante, profesional totalmente entregado a su trabajo. Totalmente recomiendo sus servicios ' },
  { id: 22, label:'Dionisio',     role:'Owner', server:'Kweeverse',       mcUsername:'redbullclown',         text:'Configuracion rapida, eficaz, profesional y estetica. Trato personalizado segun las necesidades del cliente y buenos precios. Lo volveria a contratar' },
  
]

// Solo 2 filas: 9 cards cada una
const row1 = allTestimonials.slice(0, 9)
const row2 = allTestimonials.slice(9, 22)

const SKIN_API = 'https://mc-heads.net/avatar'

function getInitials(label: string) {
  return label.split(' ').map(w => w[0]).join('').slice(0, 2)
}

function MinecraftAvatar({ username, fallback, size = 36 }: {
  username: string
  fallback: string
  size?: number
}) {
  const [loaded, setLoaded] = useState(false)
  const [error, setError] = useState(false)

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