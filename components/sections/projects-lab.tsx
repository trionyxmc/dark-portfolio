"use client"

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useLanguage } from '@/components/language-provider'

interface Project {
  id: number
  name: string
  type: string
  result: string
  technologies: string[]
  description: string
  num: string
  ph: string
  images: string[]
}

// Campos compartidos entre idiomas (id, num, ph, imagenes) — el nombre del
// proyecto es un nombre propio (server real) y se mantiene igual en los
// dos idiomas.
const shared = [
  { id: 1, num: '01', name: 'ChillMon Tebex', ph: 'I', images: ['/1.png', '/2.png', '/3.png', '/4.png', '/5.png'] },
  { id: 2, num: '02', name: 'SoulCraft', ph: 'II', images: ['/6.png', '/7.png', '/8.png', '/9.png', '/10.png'] },
  { id: 3, num: '03', name: 'EclipseCraft', ph: 'III', images: ['/11.png', '/12.png', '/13.png', '/14.png', '/15.png', '/16.png'] },
  { id: 4, num: '04', name: 'Pixel Of God', ph: 'IV', images: ['/17.png', '/18.png', '/19.png', '/20.png', '/21.png', '/22.png', '/23.png', '/24.png', '/25.png'] },
  { id: 5, num: '05', name: 'Reinos Oscuros', ph: 'V', images: ['/26.png', '/27.png', '/28.png', '/29.png', '/30.png', '/31.png'] },
  { id: 6, num: '06', name: 'Tierra arcana', ph: 'VI', images: ['/32.png', '/33.png', '/34.png', '/35.png', '/36.png'] },
  { id: 7, num: '07', name: 'Maholand', ph: 'VII', images: ['/37.png', '/38.png', '/39.png', '/40.png', '/41.png', '/42.png'] },
  { id: 8, num: '08', name: 'StoryWars Network', ph: 'VIII', images: ['/43.png', '/44.png', '/45.png', '/46.png', '/47.png'] },
  { id: 9, num: '09', name: 'Zyntam Network', ph: 'IX', images: ['/48.png', '/49.png', '/50.png', '/51.png', '/52.png'] },
]

const projectsCopy = {
  en: [
    { type: 'Complete Tebex store', result: 'package creation, theme editing, and more', technologies: ['HTML/CSS', 'Tebex API', 'UX Design'],
      description: "This project involved a full rebuild of ChillMon's official Tebex store. The entire purchase experience was redesigned from scratch for a cleaner, more modern, more eye-catching look — while keeping smooth navigation, a professional structure, and better product visibility focused on increasing conversions." },
    { type: 'Complete Tebex store', result: 'package creation, theme editing, and more', technologies: ['HTML/CSS', 'Tebex API', 'UX Design'],
      description: 'This project involved a complete overhaul of a Tebex store. Every aspect was carefully reworked to deliver a modern, clean, intuitive shopping experience, combining an appealing design with smooth, easy-to-use navigation.' },
    { type: 'Complete Tebex store', result: 'package creation, theme editing, and more', technologies: ['HTML/CSS', 'Tebex API', 'UX Design'],
      description: 'This project focused on a full overhaul of a Tebex store, completely redefining its visual identity and navigation structure. Every element was carefully optimized to create a modern, clean, highly intuitive experience — improving both the overall look and ease of use to boost engagement and conversion.' },
    { type: 'Full Tebex and Pixelmon build', result: 'config creation, translations, custom builds, and more', technologies: ['Tebex', 'Yml', 'Json'],
      description: "This project covered the full development of a complete ecosystem for a Minecraft and Discord server, integrating core systems for gameplay, economy, progression, customization, and web presence into one unified solution. I built main menus, kits, warps, ranks, parkour, rewards, crates, an economy connected to Vault and Pokédolares, plus advanced systems like auctions, RTP, protections, and a custom tab/scoreboard for an immersive, professional experience. On the community side, I also built a Discord bot with tickets, suggestions, welcomes, and custom commands, along with a fully CSS-optimized Tebex store, configured packages, and a visual structure built to maximize conversion, retention, and brand presence." },
    { type: 'Semi-custom survival build and Discord editing', result: 'config creation, translations, custom builds, and more', technologies: ['DeluxeMenus', 'Essentials', 'YAML'],
      description: 'This time a client asked for a modified survival server plus a Discord redesign and a custom bot with advanced systems, a fully custom spawn, working NPCs, and a setup optimized to the max for a one-of-a-kind experience.' },
    { type: 'Modded server build', result: 'custom menus, translations, custom spawn, and more', technologies: ['RankUp', 'Custom Menus', 'Custom ModPack'],
      description: 'This time I built a modded survival server with advanced systems, a fully custom spawn, working NPCs, and optimization focused on a smooth, immersive, one-of-a-kind experience.' },
    { type: 'Redesign & Build', result: 'package creation, theme editing, and more', technologies: [] as string[],
      description: "I designed and customized Maholand's Tebex store, building a modern interface tailored to the server's look and feel. I organized products like temporary ranks and commands, added detailed info for every product, a shopping cart, currency selector, and user login. I also added sections covering automatic delivery, secure payments, payment methods, support, and purchase policies — resulting in a store that's clear, appealing, and easy to use." },
    { type: 'UI + UX + Eggs', result: 'From-scratch installation + theme', technologies: [] as string[],
      description: "I handled the full installation and setup of the Pterodactyl panel for StoryWars, implementing the security measures needed for a stable, protected environment. I also completely redesigned the interface with a modern, unique look tailored to the project's identity. On top of that, I configured the node and its connection to the VPS, and organized the different servers within the panel to make management easier." },
    { type: '2+ Custom Dungeons', result: 'Custom Mobs + Custom Bosses', technologies: [] as string[],
      description: 'I built and configured 2 fully custom dungeons, featuring more than 40 different mobs, 4+ mini-bosses, and 2+ main bosses. Every enemy has optimized, custom skills for more dynamic and challenging fights. Mobs were also tailored to each dungeon region, creating a more varied, immersive progression that fits the theme of each zone.' },
  ],
  es: [
    { type: 'Tienda tebex completa', result: 'creacion de paquetes, edicion de theme y mas', technologies: ['HTML/CSS', 'Tebex API', 'Diseño UX'],
      description: 'Este proyecto consistió en la reconstrucción completa de la tienda oficial de ChillMon en Tebex Toda la experiencia de compra fue rediseñada desde cero para lograr una apariencia más limpia moderna y llamativa manteniendo una navegación fluida una estructura profesional y una mejor visibilidad de productos enfocada en aumentar conversiones' },
    { type: 'Tienda tebex completa', result: 'creacion de paquetes, edicion de theme y mas', technologies: ['HTML/CSS', 'Tebex API', 'Diseño UX'],
      description: 'Este proyecto consistió en la renovación completa de una tienda Tebex se trabajó cuidadosamente cada aspecto para ofrecer una experiencia de compra moderna, limpia e intuitiva, combinando un diseño atractivo con una navegación fluida y fácil de usar' },
    { type: 'Tienda tebex completa', result: 'creacion de paquetes, edicion de theme y mas', technologies: ['HTML/CSS', 'Tebex API', 'Diseño UX'],
      description: 'Este proyecto se enfocó en la renovación integral de una tienda Tebex, redefiniendo por completo su identidad visual y estructura de navegación Cada elemento fue optimizado cuidadosamente para crear una experiencia moderna, limpia y altamente intuitiva, mejorando tanto la estética general como la facilidad de uso para potenciar la interacción y conversión de los usuarios.' },
    { type: 'Creacion de tebex y pixelmon al completo', result: 'creacion de configuraciones, traducciones, creaciones y mas', technologies: ['Tebex', 'Yml', 'Json'],
      description: 'Este proyecto abarcó el desarrollo completo de un ecosistema para servidor Minecraft y Discord, integrando sistemas esenciales de jugabilidad, economía, progresión, personalización y presencia web en una solución totalmente unificada. Se implementaron menús principales, kits, warps, rangos, parkour, rewards, crates, economía conectada con Vault y Pokédolares, además de sistemas avanzados como subastas, RTP, protecciones, tab y scoreboard personalizados para ofrecer una experiencia inmersiva y profesional A nivel de comunidad, también se desarrolló un bot de Discord con tickets, sugerencias, bienvenidas y comandos personalizados, acompañado de una tienda Tebex con CSS completamente optimizado, paquetes configurados y una estructura visual pensada para maximizar conversión, retención y presencia de marca.' },
    { type: 'Creacion de survival semi custom y edicion discord', result: 'creacion de configuraciones, traducciones, creaciones y mas', technologies: ['DeluxeMenus', 'Essentials', 'YAML'],
      description: 'Esta vez un cliente solicito un servidor survival modificado + edicion de su discord y un bot personalizado con sistemas avanzados, un spawn completamente custom, npcs funcionales y una configuracion optimizada al maximo para una experiencia unica' },
    { type: 'Creacion de servidor de mods', result: 'Menus custom, traducciones, spawn custom y mas', technologies: ['RankUp', 'Menus custom', 'ModPack Custom'],
      description: 'Esta vez se desarrolló un servidor survival con mods, sistemas avanzados, spawn totalmente custom, NPCs funcionales y una optimización enfocada en ofrecer una experiencia fluida, inmersiva y única.' },
    { type: 'Renovacion mas creacion', result: 'creacion de paquetes, edicion de theme y mas', technologies: [] as string[],
      description: 'Diseñé y personalicé la tienda Tebex de Maholand, creando una interfaz moderna y adaptada a la estética del servidor. Organicé productos como rangos temporales y comandos, añadí información detallada de cada producto, carrito de compra, selector de moneda y acceso de usuario. También incorporé secciones sobre entrega automática, pagos seguros, métodos de pago, soporte y políticas de compra, logrando una tienda clara, atractiva y fácil de usar' },
    { type: 'Ui + UX + Eggs', result: 'Instalacion de cero + theme', technologies: [] as string[],
      description: 'Realicé la instalación y configuración completa del panel Pterodactyl para Storywars, implementando las medidas de seguridad necesarias para garantizar un entorno estable y protegido. También rediseñé completamente la interfaz con un estilo moderno, único y llamativo, adaptado a la identidad del proyecto. Además, configuré el nodo y su conexión con la VPS, y realicé la creación y organización de los distintos servidores dentro del panel para facilitar su administración' },
    { type: '+2 dungeons personalizadas', result: 'Custom Mobs + Custom Bosses', technologies: [] as string[],
      description: 'Desarrollé y configuré 2 dungeons completamente personalizadas, incorporando más de 40 mobs variados, más de 4 minibosses y más de 2 bosses principales. Cada enemigo cuenta con skills optimizadas y customizadas para ofrecer combates más dinámicos y desafiantes. Además, los mobs fueron adaptados según cada región de las dungeons, logrando una progresión más variada, inmersiva y acorde con la ambientación de cada zona' },
  ],
}

function buildProjects(locale: 'en' | 'es'): Project[] {
  return shared.map((s, i) => {
    const c = projectsCopy[locale][i]
    return {
      id: s.id,
      num: s.num,
      ph: s.ph,
      images: s.images,
      name: s.name || (c as { name?: string }).name || '',
      type: c.type,
      result: c.result,
      technologies: c.technologies,
      description: c.description,
    }
  })
}

const sectionCopy = {
  en: {
    eyebrow: 'Portfolio · Lab',
    line1: 'PROJECT',
    line2: 'LAB',
    subtitle: 'Click a project to see the full gallery.',
    viewProject: 'View project',
    close: 'Close ✕',
    techStack: 'Tech stack',
    wantSimilar: 'I want something like this',
  },
  es: {
    eyebrow: 'Portfolio · Lab',
    line1: 'LAB DE',
    line2: 'PROYECTOS',
    subtitle: 'Haz clic en un proyecto para ver la galería completa.',
    viewProject: 'Ver proyecto',
    close: 'Cerrar ✕',
    techStack: 'Stack técnico',
    wantSimilar: 'Quiero algo similar',
  },
}

function isValidImage(url: string): boolean {
  if (!url) return false
  if (url.includes('tu-imagen')) return false
  return true
}

// ─── Card ────────────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onSelect,
  viewProjectLabel,
}: {
  project: Project
  onSelect: (p: Project) => void
  viewProjectLabel: string
}) {
  const [imgError, setImgError] = useState(false)
  const showImage = isValidImage(project.images[0]) && !imgError

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: project.id * 0.07 }}
      onClick={() => onSelect(project)}
      className="group cursor-pointer bg-[#1a1a1a] border border-[#2a2a2a] hover:border-primary/60 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Media — más alto y sin grayscale */}
      <div className="relative w-full h-[220px] overflow-hidden bg-[#202020]">
        {showImage ? (
          <img
            src={project.images[0]}
            alt={project.name}
            loading="lazy"
            decoding="async"
            onError={() => setImgError(true)}
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <span
              className="text-[56px] text-[#2d2d2d] leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {project.num}
            </span>
            <span className="font-mono text-[9px] text-[#404040] uppercase tracking-[.12em] text-center px-3">
              {project.name}
            </span>
          </div>
        )}

        {/* Overlay degradado sutil al hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge tipo en esquina */}
        <div className="absolute top-3 left-3 bg-black/70 border border-[#333] px-2 py-1">
          <span className="font-mono text-[8px] text-primary uppercase tracking-[.12em]">
            {project.type}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[9px] text-[#666] tracking-[.06em]">
            {project.result}
          </span>
        </div>
        <div
          className="text-[22px] text-[#f0ece4] leading-none tracking-[.04em] mb-2"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {project.name}
        </div>
        <div className="flex flex-wrap gap-1">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="border border-[#333] text-[#666] font-mono text-[9px] px-[7px] py-[2px] tracking-[.04em]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#242424]">
        <span className="font-mono text-[9px] text-[#555] group-hover:text-primary uppercase tracking-[.12em] transition-colors duration-200">
          {viewProjectLabel}
        </span>
        <span className="text-[#444] group-hover:text-primary group-hover:translate-x-1 transition-all duration-200">
          →
        </span>
      </div>
    </motion.div>
  )
}

// ─── Modal ───────────────────────────────────────────────────────────────────

function ProjectModal({
  project,
  onClose,
  closeLabel,
  techStackLabel,
  wantSimilarLabel,
}: {
  project: Project
  onClose: () => void
  closeLabel: string
  techStackLabel: string
  wantSimilarLabel: string
}) {
  const [imgIdx, setImgIdx] = useState(0)
  const [thumbErrors, setThumbErrors] = useState<Record<number, boolean>>({})

  const nav = (dir: number) => {
    setImgIdx((prev) => (prev + dir + project.images.length) % project.images.length)
  }

  const handleThumbError = (i: number) => {
    setThumbErrors((prev) => ({ ...prev, [i]: true }))
  }

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.93, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.93, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[1200px] h-[90vh] bg-[#141414] border border-[#2a2a2a] overflow-hidden flex flex-col"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2a2a] flex-shrink-0">
          <span className="font-mono text-[9px] text-[#555] uppercase tracking-[.2em]">
            — {project.name}
          </span>
          <button
            onClick={onClose}
            className="font-mono text-[9px] text-[#777] border border-[#333] px-4 py-1.5 uppercase tracking-[.1em] hover:border-primary hover:text-primary transition-all duration-200"
          >
            {closeLabel}
          </button>
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0">

          {/* Gallery — 65% */}
          <div className="flex-[0_0_65%] flex flex-col border-b md:border-b-0 md:border-r border-[#2a2a2a] min-h-0">
            {/* Main image */}
            <div className="relative flex-1 bg-[#1a1a1a] min-h-0">
              {isValidImage(project.images[imgIdx]) ? (
                <img
                  src={project.images[imgIdx]}
                  alt=""
                  className="w-full h-full object-contain"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center">
                  <span
                    className="text-[88px] text-[#2a2a2a] leading-none"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {project.ph}
                  </span>
                </div>
              )}

              {/* Counter */}
              <span className="absolute top-2.5 right-2.5 font-mono text-[9px] text-white/30 bg-black/70 px-2.5 py-1 tracking-[.1em]">
                {imgIdx + 1} / {project.images.length}
              </span>

              {/* Nav arrows */}
              <button
                onClick={() => nav(-1)}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#111] border border-[#333] text-[#777] hover:border-primary hover:text-primary flex items-center justify-center text-lg transition-all duration-200"
              >
                ‹
              </button>
              <button
                onClick={() => nav(1)}
                className="absolute right-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#111] border border-[#333] text-[#777] hover:border-primary hover:text-primary flex items-center justify-center text-lg transition-all duration-200"
              >
                ›
              </button>
            </div>

            {/* Thumbnails strip */}
            <div className="grid grid-cols-5 gap-0.5 p-0.5 bg-[#111] border-t border-[#2a2a2a] flex-shrink-0">
              {project.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setImgIdx(i)}
                  className={`relative overflow-hidden h-16 transition-all duration-200 ${
                    i === imgIdx ? 'ring-[2px] ring-primary' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  {isValidImage(img) && !thumbErrors[i] ? (
                    <img
                      src={img}
                      alt=""
                      onError={() => handleThumbError(i)}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#222]" />
                  )}
                  {i === imgIdx && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-primary" />
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Info — scrollable */}
          <div className="flex-1 flex flex-col overflow-y-auto">
            <div className="flex flex-col justify-between p-6 gap-5 h-full">
              <div>
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-px w-5 bg-primary flex-shrink-0" />
                  <span className="font-mono text-[9px] text-primary uppercase tracking-[.18em]">
                    {project.type}
                  </span>
                </div>

                <div
                  className="text-[44px] text-[#f0ece4] leading-[.9] tracking-[.03em] mb-3"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {project.name}
                </div>

                <div className="inline-block border border-primary px-3 py-1 mb-4">
                  <span className="font-mono text-[9px] text-primary uppercase tracking-[.1em]">
                    {project.result}
                  </span>
                </div>

                <p className="text-[13px] text-[#777] leading-[1.75] font-light">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="font-mono text-[8px] text-[#444] uppercase tracking-[.2em] mb-2">
                  {techStackLabel}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="border border-[#333] text-[#666] font-mono text-[9px] px-2.5 py-1 tracking-[.06em] hover:border-primary hover:text-primary transition-all duration-200"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <a
                  href="#contact"
                  className="flex items-center justify-between w-full px-5 py-3.5 bg-primary hover:bg-primary/85 transition-colors duration-200"
                >
                  <span
                    className="text-[18px] text-[#f0ece4] tracking-[.06em]"
                    style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                  >
                    {wantSimilarLabel}
                  </span>
                  <span className="font-mono text-[13px] text-white/60">→</span>
                </a>
              </div>
            </div>
          </div>
        </div>
      </motion.div>
    </motion.div>
  )
}

// ─── Section ─────────────────────────────────────────────────────────────────

export function ProjectsLabSection() {
  const { locale } = useLanguage()
  const projects = buildProjects(locale)
  const s = sectionCopy[locale]
  const sectionRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })
  const [selected, setSelected] = useState<Project | null>(null)

  return (
    <>
      <style>{`@import url('https://fonts.googleapis.com/css2?family=Bebas+Neue&display=swap');`}</style>

      <section
        ref={sectionRef}
        id="lab"
        className="relative py-24 lg:py-32 bg-[#0b0b0b] overflow-hidden"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[radial-gradient(ellipse,rgba(192,57,43,0.15)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary" />
              <span className="font-mono text-[10px] text-primary uppercase tracking-[.2em]">
                {s.eyebrow}
              </span>
            </div>
            <h2
              className="text-[clamp(44px,8vw,80px)] text-[#f0ece4] leading-[.92] tracking-[.02em] mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {s.line1}<br />
              <span className="text-primary">{s.line2}</span>
            </h2>
            <p className="text-[12px] text-[#666] font-light leading-[1.7] max-w-[280px]">
              {s.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[3px]">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onSelect={setSelected} viewProjectLabel={s.viewProject} />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <ProjectModal
              project={selected}
              onClose={() => setSelected(null)}
              closeLabel={s.close}
              techStackLabel={s.techStack}
              wantSimilarLabel={s.wantSimilar}
            />
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
