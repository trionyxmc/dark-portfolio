"use client"

import { motion, useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { Calendar, Star, Zap, Settings, Trophy, ShieldCheck } from 'lucide-react'

const stats = [
  {
    icon: Calendar,
    value: 6,
    suffix: '+',
    label: 'Años de Experiencia',
  },
  {
    icon: Star,
    value: 100,
    suffix: '+',
    label: 'Configs Premium',
  },
  {
    icon: Zap,
    value: 50,
    suffix: '+',
    label: 'Bots de Discord',
  },
  {
    icon: Settings,
    value: 30,
    suffix: '+',
    label: 'Networks de Servidores',
  },
  {
    icon: Trophy,
    value: 360,
    suffix: '+',
    label: 'Clientes Felices',
  },
  {
    icon: ShieldCheck,
    value: 99,
    suffix: '%',
    label: 'Satisfaccion',
  },
]

function AnimatedCounter({ value, suffix }: { value: number; suffix: string }) {
  const [count, setCount] = useState(0)
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true })

  useEffect(() => {
    if (isInView) {
      const duration = 2000
      const steps = 60
      const stepValue = value / steps
      let current = 0

      const timer = setInterval(() => {
        current += stepValue
        if (current >= value) {
          setCount(value)
          clearInterval(timer)
        } else {
          setCount(Math.floor(current))
        }
      }, duration / steps)

      return () => clearInterval(timer)
    }
  }, [isInView, value])

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  )
}

export function TrustBar() {
  const containerRef = useRef(null)
  const isInView = useInView(containerRef, { once: true, margin: '-100px' })

  return (
    <section className="relative py-16 lg:py-20 overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-nether/20 via-background to-background" />
      
      <div ref={containerRef} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8 }}
          className="glass-card rounded-3xl p-8 lg:p-10 glow-border"
        >
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 lg:gap-4">
            {stats.map((stat, index) => {
              const Icon = stat.icon
              return (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="text-center group"
                >
                  <motion.div
                    whileHover={{ scale: 1.1 }}
                    className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 border border-primary/30 mb-4 group-hover:bg-primary/20 group-hover:border-primary/50 transition-all glow-crimson-sm"
                  >
                    <Icon className="w-5 h-5 text-primary" />
                  </motion.div>
                  <div className="text-2xl lg:text-3xl font-bold text-foreground mb-1">
                    <AnimatedCounter value={stat.value} suffix={stat.suffix} />
                  </div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              )
            })}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
