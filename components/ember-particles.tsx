"use client"

import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'

interface Particle {
  id: number
  x: number
  delay: number
  duration: number
  size: number
  opacity: number
}

export function EmberParticles({ count = 30 }: { count?: number }) {
  const [particles, setParticles] = useState<Particle[]>([])

  useEffect(() => {
    const newParticles: Particle[] = Array.from({ length: count }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 10,
      duration: 8 + Math.random() * 12,
      size: 2 + Math.random() * 4,
      opacity: 0.3 + Math.random() * 0.5,
    }))
    setParticles(newParticles)
  }, [count])

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((particle) => (
        <motion.div
          key={particle.id}
          className="absolute rounded-full"
          style={{
            left: `${particle.x}%`,
            bottom: '-20px',
            width: particle.size,
            height: particle.size,
            background: `radial-gradient(circle, rgba(255, 100, 50, ${particle.opacity}) 0%, rgba(139, 0, 0, ${particle.opacity * 0.5}) 50%, transparent 70%)`,
            boxShadow: `0 0 ${particle.size * 2}px rgba(255, 100, 50, ${particle.opacity * 0.5})`,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(particle.id) * 50],
            opacity: [0, particle.opacity, particle.opacity, 0],
          }}
          transition={{
            duration: particle.duration,
            delay: particle.delay,
            repeat: Infinity,
            ease: 'linear',
          }}
        />
      ))}
    </div>
  )
}
