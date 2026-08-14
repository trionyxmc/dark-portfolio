"use client"

import { useEffect, useRef, useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import { useLanguage } from '@/components/language-provider'
import { buildProjects, type Project } from '@/lib/projects-data'

const sectionCopy = {
  en: {
    eyebrow: 'Portfolio · Lab',
    line1: 'PROJECT',
    line2: 'LAB',
    subtitle: 'Click a project to see the full gallery.',
    viewProject: 'View project',
    close: 'Close',
    techStack: 'Tech stack',
    wantSimilar: 'I want something like this',
    prevImage: 'Previous image',
    nextImage: 'Next image',
    thumbnail: (i: number) => `View image ${i + 1}`,
  },
  es: {
    eyebrow: 'Portfolio · Lab',
    line1: 'LAB DE',
    line2: 'PROYECTOS',
    subtitle: 'Haz clic en un proyecto para ver la galería completa.',
    viewProject: 'Ver proyecto',
    close: 'Cerrar',
    techStack: 'Stack técnico',
    wantSimilar: 'Quiero algo similar',
    prevImage: 'Imagen anterior',
    nextImage: 'Imagen siguiente',
    thumbnail: (i: number) => `Ver imagen ${i + 1}`,
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
  index,
  onSelect,
  viewProjectLabel,
}: {
  project: Project
  index: number
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
      transition={{ duration: 0.5, delay: index * 0.07 }}
      onClick={() => onSelect(project)}
      className="group cursor-pointer bg-[#1a1a1a] border border-[#2a2a2a] hover:border-primary/60 transition-all duration-300 hover:-translate-y-1"
    >
      {/* Media — más alto y sin grayscale */}
      <div className="relative w-full h-[220px] overflow-hidden bg-[#202020]">
        {showImage ? (
          <Image
            src={project.images[0]}
            alt={project.name}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            onError={() => setImgError(true)}
            className="object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div className="w-full h-full flex flex-col items-center justify-center gap-2">
            <span
              className="text-[56px] text-[#2d2d2d] leading-none"
              style={{ fontFamily: "'Bebas Neue', sans-serif" }}
            >
              {project.num}
            </span>
            <span className="font-mono text-[12px] text-[#404040] uppercase tracking-[.12em] text-center px-3">
              {project.name}
            </span>
          </div>
        )}

        {/* Overlay degradado sutil al hover */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

        {/* Badge tipo en esquina */}
        <div className="absolute top-3 left-3 bg-black/70 border border-[#333] px-2.5 py-1">
          <span className="font-mono text-[12px] text-primary uppercase tracking-[.12em]">
            {project.type}
          </span>
        </div>
      </div>

      {/* Body */}
      <div className="px-4 py-3">
        <div className="flex items-center justify-between mb-1.5">
          <span className="font-mono text-[12px] text-[#888] tracking-[.06em]">
            {project.result}
          </span>
        </div>
        <h3
          className="text-[22px] text-[#f0ece4] leading-none tracking-[.04em] mb-2 m-0"
          style={{ fontFamily: "'Bebas Neue', sans-serif" }}
        >
          {project.name}
        </h3>
        <div className="flex flex-wrap gap-1.5">
          {project.technologies.map((t) => (
            <span
              key={t}
              className="border border-[#333] text-[#888] font-mono text-[12px] px-2 py-0.5 tracking-[.04em]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between px-4 py-2.5 border-t border-[#242424]">
        <span className="font-mono text-[14px] text-[#777] group-hover:text-primary uppercase tracking-[.1em] transition-colors duration-200">
          {viewProjectLabel}
        </span>
        <span className="text-[#666] group-hover:text-primary group-hover:translate-x-1 transition-all duration-200">
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
  prevImageLabel,
  nextImageLabel,
  thumbnailLabel,
}: {
  project: Project
  onClose: () => void
  closeLabel: string
  techStackLabel: string
  wantSimilarLabel: string
  prevImageLabel: string
  nextImageLabel: string
  thumbnailLabel: (i: number) => string
}) {
  const [imgIdx, setImgIdx] = useState(0)
  const [thumbErrors, setThumbErrors] = useState<Record<number, boolean>>({})
  const dialogRef = useRef<HTMLDivElement>(null)
  const titleId = `project-modal-title-${project.id}`

  const nav = (dir: number) => {
    setImgIdx((prev) => (prev + dir + project.images.length) % project.images.length)
  }

  const handleThumbError = (i: number) => {
    setThumbErrors((prev) => ({ ...prev, [i]: true }))
  }

  // Accesibilidad del dialogo: foco inicial adentro, Tab/Shift+Tab
  // atrapados dentro del modal, Escape cierra, y el foco vuelve a lo que
  // estaba enfocado antes de abrir (normalmente la tarjeta que se clickeo).
  useEffect(() => {
    const previouslyFocused = document.activeElement as HTMLElement | null
    const getFocusable = () =>
      Array.from(
        dialogRef.current?.querySelectorAll<HTMLElement>(
          'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
        ) ?? []
      )

    getFocusable()[0]?.focus()

    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === 'Escape') {
        onClose()
        return
      }
      if (e.key === 'Tab') {
        const items = getFocusable()
        if (items.length === 0) return
        const first = items[0]
        const last = items[items.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }

    document.addEventListener('keydown', handleKeyDown)
    return () => {
      document.removeEventListener('keydown', handleKeyDown)
      previouslyFocused?.focus()
    }
  }, [onClose])

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/92 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        ref={dialogRef}
        role="dialog"
        aria-modal="true"
        aria-labelledby={titleId}
        initial={{ scale: 0.93, y: 20, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.93, y: 20, opacity: 0 }}
        transition={{ type: 'spring', damping: 28, stiffness: 320 }}
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-[1200px] h-[90vh] bg-[#141414] border border-[#2a2a2a] overflow-hidden flex flex-col"
      >
        {/* Top bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#2a2a2a] flex-shrink-0">
          <span className="font-mono text-[12px] text-[#777] uppercase tracking-[.2em]">
            — {project.name}
          </span>
          <button
            onClick={onClose}
            aria-label={closeLabel}
            className="font-mono text-[13px] text-[#aaa] border border-[#333] px-4 py-1.5 uppercase tracking-[.1em] hover:border-primary hover:text-primary transition-all duration-200"
          >
            {closeLabel} ✕
          </button>
        </div>

        {/* Layout */}
        <div className="flex flex-col md:flex-row flex-1 min-h-0">

          {/* Gallery — 65% */}
          <div className="flex-[0_0_65%] flex flex-col border-b md:border-b-0 md:border-r border-[#2a2a2a] min-h-0">
            {/* Main image */}
            <div className="relative flex-1 bg-[#1a1a1a] min-h-0">
              {isValidImage(project.images[imgIdx]) ? (
                <Image
                  src={project.images[imgIdx]}
                  alt={`${project.name} — ${imgIdx + 1}/${project.images.length}`}
                  fill
                  sizes="(max-width: 768px) 100vw, 780px"
                  className="object-contain"
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
              <span className="absolute top-2.5 right-2.5 font-mono text-[12px] text-white/60 bg-black/70 px-2.5 py-1 tracking-[.1em]">
                {imgIdx + 1} / {project.images.length}
              </span>

              {/* Nav arrows */}
              <button
                onClick={() => nav(-1)}
                aria-label={prevImageLabel}
                className="absolute left-2.5 top-1/2 -translate-y-1/2 w-9 h-9 bg-[#111] border border-[#333] text-[#777] hover:border-primary hover:text-primary flex items-center justify-center text-lg transition-all duration-200"
              >
                ‹
              </button>
              <button
                onClick={() => nav(1)}
                aria-label={nextImageLabel}
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
                  aria-label={thumbnailLabel(i)}
                  aria-current={i === imgIdx ? 'true' : undefined}
                  className={`relative overflow-hidden h-16 transition-all duration-200 ${
                    i === imgIdx ? 'ring-[2px] ring-primary' : 'opacity-50 hover:opacity-100'
                  }`}
                >
                  {isValidImage(img) && !thumbErrors[i] ? (
                    <Image
                      src={img}
                      alt=""
                      fill
                      sizes="160px"
                      onError={() => handleThumbError(i)}
                      className="object-cover"
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
                  <span className="font-mono text-[12px] text-primary uppercase tracking-[.18em]">
                    {project.type}
                  </span>
                </div>

                <h2
                  id={titleId}
                  className="text-[44px] text-[#f0ece4] leading-[.9] tracking-[.03em] mb-3 m-0"
                  style={{ fontFamily: "'Bebas Neue', sans-serif" }}
                >
                  {project.name}
                </h2>

                <div className="inline-block border border-primary px-3 py-1 mb-4 mt-3">
                  <span className="font-mono text-[12px] text-primary uppercase tracking-[.1em]">
                    {project.result}
                  </span>
                </div>

                <p className="text-[15px] text-[#aaa] leading-[1.75] font-light">
                  {project.description}
                </p>
              </div>

              <div>
                <div className="font-mono text-[12px] text-[#777] uppercase tracking-[.2em] mb-2">
                  {techStackLabel}
                </div>
                <div className="flex flex-wrap gap-1.5 mb-6">
                  {project.technologies.map((t) => (
                    <span
                      key={t}
                      className="border border-[#333] text-[#888] font-mono text-[12px] px-2.5 py-1 tracking-[.06em] hover:border-primary hover:text-primary transition-all duration-200"
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
        <div className="absolute bottom-0 right-0 w-[500px] h-[400px] bg-[radial-gradient(ellipse,rgba(192,57,43,0.08)_0%,transparent_70%)] pointer-events-none" />

        <div className="relative z-10 container mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55 }}
            className="mb-12"
          >
            <div className="flex items-center gap-3 mb-3">
              <div className="h-px w-8 bg-primary" />
              <span className="font-mono text-[12px] text-primary uppercase tracking-[.2em]">
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
            <p className="text-[13px] text-[#888] font-light leading-[1.7] max-w-[280px]">
              {s.subtitle}
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-[3px]">
            {projects.map((p, i) => (
              <ProjectCard key={p.id} project={p} index={i} onSelect={setSelected} viewProjectLabel={s.viewProject} />
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
              prevImageLabel={s.prevImage}
              nextImageLabel={s.nextImage}
              thumbnailLabel={s.thumbnail}
            />
          )}
        </AnimatePresence>
      </section>
    </>
  )
}
