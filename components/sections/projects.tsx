"use client"

import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef, useState } from 'react'
import { Button } from '@/components/ui/button'
import {
  X,
  ExternalLink,
  Folder,
  Tag,
} from 'lucide-react'

const projects = [
  {
    id: 1,
    title: 'Premium RankUp System',
    category: 'Plugin Config',
    image: '/projects/rankup.jpg',
    description: 'A complete rankup system with custom GUIs, missions, and automated rewards.',
    technologies: ['DeluxeMenus', 'PlaceholderAPI', 'YAML'],
    results: '50+ server purchases',
    featured: true,
  },
  {
    id: 2,
    title: 'Survival Network',
    category: 'Network',
    image: '/projects/network.jpg',
    description: 'Full Minecraft network with lobby, auth, survival, and skyblock servers.',
    technologies: ['Velocity', 'LuckPerms', 'MySQL'],
    results: '2000+ concurrent players',
    featured: true,
  },
  {
    id: 3,
    title: 'Community Discord Bot',
    category: 'Discord Bot',
    image: '/projects/discord.jpg',
    description: 'Feature-rich bot with tickets, economy, levels, and custom commands.',
    technologies: ['Discord.js', 'Node.js', 'MongoDB'],
    results: '10,000+ users',
    featured: false,
  },
  {
    id: 4,
    title: 'Premium Tebex Store',
    category: 'Web/Tebex',
    image: '/projects/tebex.jpg',
    description: 'Custom Tebex theme with optimized checkout flow and mobile design.',
    technologies: ['HTML', 'CSS', 'JavaScript'],
    results: '40% conversion increase',
    featured: false,
  },
  {
    id: 5,
    title: 'BattlePass Configuration',
    category: 'Plugin Config',
    image: '/projects/battlepass.jpg',
    description: 'Complete battle pass setup with 100 tiers, missions, and seasonal themes.',
    technologies: ['BattlePass', 'DeluxeMenus', 'YAML'],
    results: 'Top seller on BuiltByBit',
    featured: true,
  },
  {
    id: 6,
    title: 'Moderation Suite Bot',
    category: 'Discord Bot',
    image: '/projects/modbot.jpg',
    description: 'Advanced moderation bot with auto-mod, logging, and punishment systems.',
    technologies: ['Discord.js', 'PostgreSQL', 'Redis'],
    results: '50+ servers protected',
    featured: false,
  },
]

function ProjectCard({ project, index, isInView, onSelect }: {
  project: typeof projects[0]
  index: number
  isInView: boolean
  onSelect: () => void
}) {
  const cardRef = useRef<HTMLDivElement>(null)

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!cardRef.current) return
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top

    cardRef.current.style.setProperty('--mouse-x', `${x}px`)
    cardRef.current.style.setProperty('--mouse-y', `${y}px`)
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ delay: index * 0.1, duration: 0.5 }}
      className={project.featured ? 'md:col-span-2' : ''}
    >
      <div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onClick={onSelect}
        className="relative group cursor-pointer overflow-hidden rounded-2xl glass-card glow-border hover:border-primary/50 transition-all duration-500"
      >
        {/* Spotlight effect */}
        <div
          className="pointer-events-none absolute -inset-px opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-10"
          style={{
            background: 'radial-gradient(400px circle at var(--mouse-x) var(--mouse-y), rgba(139, 0, 0, 0.15), transparent 40%)',
          }}
        />

        {/* Image */}
        <div className={`relative overflow-hidden ${project.featured ? 'h-72' : 'h-56'}`}>
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-nether/50" />
          <div className="absolute inset-0 bg-gradient-to-t from-card via-transparent to-transparent" />
          
          {/* Category tag */}
          <div className="absolute top-4 left-4 z-20">
            <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-card/80 backdrop-blur-sm border border-primary/30 text-xs text-primary">
              <Tag className="w-3 h-3" />
              {project.category}
            </span>
          </div>

          {/* Hover overlay */}
          <motion.div
            initial={{ opacity: 0 }}
            whileHover={{ opacity: 1 }}
            className="absolute inset-0 bg-primary/20 flex items-center justify-center z-10"
          >
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              whileHover={{ scale: 1, opacity: 1 }}
              className="w-14 h-14 rounded-full bg-primary/90 flex items-center justify-center glow-crimson"
            >
              <ExternalLink className="w-6 h-6 text-primary-foreground" />
            </motion.div>
          </motion.div>
        </div>

        {/* Content */}
        <div className="p-6 relative z-10">
          <h3 className="text-lg font-semibold text-foreground mb-2 group-hover:text-primary transition-colors">
            {project.title}
          </h3>
          <p className="text-sm text-muted-foreground mb-4 line-clamp-2">
            {project.description}
          </p>
          
          {/* Technologies */}
          <div className="flex flex-wrap gap-2">
            {project.technologies.slice(0, 3).map((tech) => (
              <span
                key={tech}
                className="px-2 py-1 rounded-md bg-secondary/50 text-xs text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

function ProjectModal({ project, onClose }: {
  project: typeof projects[0]
  onClose: () => void
}) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-background/80 backdrop-blur-xl"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative w-full max-w-2xl glass-card rounded-3xl p-8 glow-crimson"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 rounded-full bg-secondary/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Header image */}
        <div className="relative h-48 rounded-2xl overflow-hidden mb-6">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/30 via-primary/10 to-nether/50" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Folder className="w-20 h-20 text-primary/50" />
          </div>
        </div>

        {/* Category */}
        <span className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-primary/10 border border-primary/30 text-sm text-primary mb-4">
          <Tag className="w-3 h-3" />
          {project.category}
        </span>

        {/* Title */}
        <h2 className="text-2xl font-bold text-foreground mb-4">{project.title}</h2>

        {/* Description */}
        <p className="text-muted-foreground mb-6 leading-relaxed">
          {project.description}
        </p>

        {/* Technologies */}
        <div className="mb-6">
          <h4 className="text-sm font-semibold text-foreground mb-3">Technologies Used</h4>
          <div className="flex flex-wrap gap-2">
            {project.technologies.map((tech) => (
              <span
                key={tech}
                className="px-3 py-1.5 rounded-full bg-secondary/50 text-sm text-muted-foreground"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>

        {/* Results */}
        <div className="p-4 rounded-xl bg-primary/10 border border-primary/30 mb-6">
          <div className="text-sm text-muted-foreground mb-1">Results</div>
          <div className="text-xl font-semibold text-primary">{project.results}</div>
        </div>

        {/* CTA */}
        <Button asChild className="w-full bg-primary hover:bg-primary/90 text-primary-foreground glow-crimson">
          <a href="#contact">Request Similar Project</a>
        </Button>
      </motion.div>
    </motion.div>
  )
}

export function ProjectsSection() {
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null)

  return (
    <section id="projects" className="relative py-24 lg:py-32 overflow-hidden">
      {/* Background */}
      <div className="absolute top-0 right-0 w-1/2 h-1/2 bg-[radial-gradient(ellipse_at_top_right,rgba(139,0,0,0.1)_0%,transparent_60%)]" />

      <div ref={sectionRef} className="relative z-10 container mx-auto px-6">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm mb-6"
          >
            <Folder className="w-4 h-4" />
            Featured Work
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            My <span className="text-primary text-glow">Projects</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            A showcase of premium Minecraft configurations, Discord bots, 
            and server solutions I&apos;ve delivered.
          </p>
        </motion.div>

        {/* Projects grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {projects.map((project, index) => (
            <ProjectCard
              key={project.id}
              project={project}
              index={index}
              isInView={isInView}
              onSelect={() => setSelectedProject(project)}
            />
          ))}
        </div>
      </div>

      {/* Modal */}
      <AnimatePresence>
        {selectedProject && (
          <ProjectModal
            project={selectedProject}
            onClose={() => setSelectedProject(null)}
          />
        )}
      </AnimatePresence>
    </section>
  )
}
