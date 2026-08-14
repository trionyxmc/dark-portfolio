"use client"

import { motion, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'
import { useLanguage } from '@/components/language-provider'

const copy = {
  en: 'Loading experience...',
  es: 'Cargando experiencia...',
}

export function LoadingScreen() {
  const { locale } = useLanguage()
  // Arranca en `true` siempre (igual que en el servidor) para que el primer
  // render en el cliente coincida exacto con el HTML del servidor y no haya
  // mismatch de hidratacion. Recien despues de montar (useEffect, que solo
  // corre en el cliente) chequeamos sessionStorage para saber si hay que
  // ocultarla de una. Esto evita que la pantalla de carga se repita al
  // volver a "/" desde otra pagina, sin romper la hidratacion.
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (sessionStorage.getItem('ds-loaded') === '1') {
      setIsLoading(false)
      return
    }
    const timer = setTimeout(() => {
      sessionStorage.setItem('ds-loaded', '1')
      setIsLoading(false)
    }, 2000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <AnimatePresence>
      {isLoading && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.5, ease: 'easeInOut' }}
          className="fixed inset-0 z-[100] bg-background flex items-center justify-center"
        >
          <div className="flex flex-col items-center">
            {/* Animated logo */}
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5 }}
              className="relative"
            >
              <motion.div
                className="w-20 h-20 rounded-2xl overflow-hidden border border-primary/30"
                animate={{
                  boxShadow: [
                    '0 0 20px rgba(139, 0, 0, 0.3), 0 0 40px rgba(139, 0, 0, 0.1)',
                    '0 0 40px rgba(139, 0, 0, 0.5), 0 0 80px rgba(139, 0, 0, 0.2)',
                    '0 0 20px rgba(139, 0, 0, 0.3), 0 0 40px rgba(139, 0, 0, 0.1)',
                  ],
                }}
                transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src="/preview.webp"
                  alt="DS"
                  className="w-full h-full object-cover object-top"
                />
              </motion.div>
            </motion.div>

            {/* Loading bar */}
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 120, opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="h-1 rounded-full bg-secondary/50 mt-8 overflow-hidden"
            >
              <motion.div
                className="h-full bg-gradient-to-r from-primary to-accent"
                initial={{ x: '-100%' }}
                animate={{ x: '100%' }}
                transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
              />
            </motion.div>

            {/* Loading text */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="mt-4 text-sm text-muted-foreground"
            >
              {copy[locale]}
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}