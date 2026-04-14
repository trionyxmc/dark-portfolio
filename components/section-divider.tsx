"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'

export function SectionDivider() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  return (
    <div ref={ref} className="relative h-px w-full max-w-4xl mx-auto px-6">
      <motion.div
        initial={{ scaleX: 0 }}
        animate={isInView ? { scaleX: 1 } : {}}
        transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
        className="h-px w-full bg-gradient-to-r from-transparent via-primary/40 to-transparent"
      />
    </div>
  )
}
