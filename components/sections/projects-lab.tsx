"use client"

import { useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'

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

const projects: Project[] = [
  {
    id: 1,
    num: '01',
    name: 'ChillMon Tebex',
    type: 'Tienda tebex completa',
    result: 'creacion de paquetes, edicion de theme y mas',
    technologies: ['HTML/CSS', 'Tebex API', 'Diseño UX'],
    description:
      'Este proyecto consistió en la reconstrucción premium completa de la tienda oficial de ChillMon en Tebex Toda la experiencia de compra fue rediseñada desde cero para lograr una apariencia más limpia moderna y llamativa manteniendo una navegación fluida una estructura profesional y una mejor visibilidad de productos enfocada en aumentar conversiones',
    ph: 'I',
    images: [
      "/1.png",
      '/2.png',
      '/3.png',
      '/4.png',
      '/5.png',
    ],
  },
  {
    id: 2,
    num: '02',
    name: 'SoulCraft',
    type: 'Tienda tebex completa',
    result: 'creacion de paquetes, edicion de theme y mas',
    technologies: ['HTML/CSS', 'Tebex API', 'Diseño UX'],
    description:
      'Este proyecto consistió en la renovación completa de una tienda Tebex se trabajó cuidadosamente cada aspecto para ofrecer una experiencia de compra moderna, limpia e intuitiva, combinando un diseño atractivo con una navegación fluida y fácil de usar',
    ph: 'II',
    images: [
      "/6.png",
      '/7.png',
      '/8.png',
      '/9.png',
      '/10.png',
    ],
  },
  {
    id: 3,
    num: '03',
    name: 'EclipseCraft',
    type: 'Tienda tebex completa',
    result: 'creacion de paquetes, edicion de theme y mas',
    technologies: ['HTML/CSS', 'Tebex API', 'Diseño UX'],
    description:
      'Este proyecto se enfocó en la renovación integral de una tienda Tebex, redefiniendo por completo su identidad visual y estructura de navegación Cada elemento fue optimizado cuidadosamente para crear una experiencia moderna, limpia y altamente intuitiva, mejorando tanto la estética general como la facilidad de uso para potenciar la interacción y conversión de los usuarios.',
    ph: 'III',
    images: [
      "/11.png",
      '/12.png',
      '/13.png',
      '/14.png',
      '/15.png',
      '/16.png',
    ],
  },
  {
    id: 4,
    num: '04',
    name: 'Pixel Of God',
    type: 'Creacion de tebex y pixelmon al completo',
    result: 'creacion de configuraciones, traducciones, creaciones y mas',
    technologies: ['Tebex', 'Yml', 'Json', ],
    description:
      'Este proyecto abarcó el desarrollo completo de un ecosistema premium para servidor Minecraft y Discord, integrando sistemas esenciales de jugabilidad, economía, progresión, personalización y presencia web en una solución totalmente unificada. Se implementaron menús principales, kits, warps, rangos, parkour, rewards, crates, economía conectada con Vault y Pokédolares, además de sistemas avanzados como subastas, RTP, protecciones, tab y scoreboard personalizados para ofrecer una experiencia inmersiva y profesional A nivel de comunidad, también se desarrolló un bot de Discord con tickets, sugerencias, bienvenidas y comandos personalizados, acompañado de una tienda Tebex con CSS completamente optimizado, paquetes configurados y una estructura visual pensada para maximizar conversión, retención y presencia de marca.',
    ph: 'IV',
    images: [
      "/17.png",
      '/18.png',
      '/19.png',
      '/20.png',
      '/21.png',
      '/22.png',
      '/23.png',
      '/24.png',
      '/25.png',
    ],
  },
  {
    id: 5,
    num: '05',
    name: 'Reinos Oscuros',
    type: 'Creacion de survival semi custom y edicion discord',
    result: 'creacion de configuraciones, traducciones, creaciones y mas',
    technologies: ['DeluxeMenus', 'Essentials', 'YAML'],
    description:
      'Esta vez un cliente solicito un servidor survival modificado + edicion de su discord y un bot personalizado con sistemas avanzados, un spawn completamente custom, npcs funcionales y una configuracion optimizada al maximo para una experiencia unica',
    ph: 'V',
    images: [
      "/26.png",
      '/27.png',
      '/28.png',
      '/29.png',
      '/30.png',
      '/31.png',
    ],
  },
  {
    id: 6,
    num: '06',
    name: 'Tierra arcana',
    type: 'Creacion de servidor de mods',
    result: 'Menus custom, traducciones, spawn custom y mas',
    technologies: ['RankUp', 'Menus custom', 'ModPack Custom'],
    description:
      'Esta vez se desarrolló un servidor survival con mods, sistemas avanzados, spawn totalmente custom, NPCs funcionales y una optimización enfocada en ofrecer una experiencia fluida, inmersiva y única.',
    ph: 'VI',
    images: [
      "/32.png",
      '/33.png',
      '/34.png',
      '/35.png',
      '/36.png',
    ],
  },
]

function isValidImage(url: string): boolean {
  if (!url) return false
  if (url.includes('tu-imagen')) return false
  return true
}

// ─── Card ────────────────────────────────────────────────────────────────────

function ProjectCard({
  project,
  onSelect,
}: {
  project: Project
  onSelect: (p: Project) => void
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
          Ver proyecto
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
}: {
  project: Project
  onClose: () => void
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
            Cerrar ✕
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
                  Stack técnico
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
                    Quiero algo similar
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
        <div
          className="absolute inset-0 opacity-[0.03] pointer-events-none"
          style={{
            backgroundImage:
              'linear-gradient(rgba(192,57,43,1) 1px, transparent 1px), linear-gradient(90deg, rgba(192,57,43,1) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }}
        />

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
                Portfolio · Lab
              </span>
            </div>
            <h2
              className="text-[clamp(44px,8vw,80px)] text-[#f0ece4] leading-[.92] tracking-[.02em] mb-3"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              LAB DE<br />
              <span className="text-primary">PROYECTOS</span>
            </h2>
            <p className="text-[12px] text-[#666] font-light leading-[1.7] max-w-[280px]">
              Haz clic en un proyecto para ver la galería completa.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[3px]">
            {projects.map((p) => (
              <ProjectCard key={p.id} project={p} onSelect={setSelected} />
            ))}
          </div>
        </div>

        <AnimatePresence>
          {selected && (
            <ProjectModal project={selected} onClose={() => setSelected(null)} />
          )}
        </AnimatePresence>
      </section>
    </>
  )
}