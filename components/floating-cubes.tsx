"use client"

import { motion } from 'framer-motion'

interface Cube {
  id: number
  size: number
  x: number
  y: number
  delay: number
  duration: number
}

const cubes: Cube[] = [
  { id: 1, size: 40, x: 10, y: 20, delay: 0, duration: 8 },
  { id: 2, size: 25, x: 85, y: 15, delay: 1, duration: 10 },
  { id: 3, size: 35, x: 75, y: 60, delay: 2, duration: 9 },
  { id: 4, size: 20, x: 5, y: 70, delay: 0.5, duration: 11 },
  { id: 5, size: 30, x: 90, y: 80, delay: 1.5, duration: 7 },
  { id: 6, size: 15, x: 20, y: 85, delay: 3, duration: 12 },
]

export function FloatingCubes() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {cubes.map((cube) => (
        <motion.div
          key={cube.id}
          className="absolute"
          style={{
            left: `${cube.x}%`,
            top: `${cube.y}%`,
            width: cube.size,
            height: cube.size,
          }}
          initial={{ opacity: 0 }}
          animate={{
            opacity: [0.1, 0.3, 0.1],
            y: [0, -30, 0],
            rotateX: [0, 180, 360],
            rotateY: [0, 180, 360],
          }}
          transition={{
            duration: cube.duration,
            delay: cube.delay,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <div
            className="w-full h-full relative"
            style={{
              transformStyle: 'preserve-3d',
              transform: 'rotateX(45deg) rotateY(45deg)',
            }}
          >
            {/* Cube faces */}
            <div
              className="absolute inset-0 border border-primary/30 bg-gradient-to-br from-primary/10 to-transparent"
              style={{ transform: `translateZ(${cube.size / 2}px)` }}
            />
            <div
              className="absolute inset-0 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
              style={{ transform: `rotateY(90deg) translateZ(${cube.size / 2}px)` }}
            />
            <div
              className="absolute inset-0 border border-primary/20 bg-gradient-to-br from-primary/5 to-transparent"
              style={{ transform: `rotateX(90deg) translateZ(${cube.size / 2}px)` }}
            />
          </div>
        </motion.div>
      ))}
    </div>
  )
}
