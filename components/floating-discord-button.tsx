"use client"

import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { MessageSquare, X } from 'lucide-react'

const DISCORD_URL = 'https://discord.gg/RDfAFqhZye'

export function FloatingDiscordButton() {
  const [visible, setVisible] = useState(false)
  const [dismissed, setDismissed] = useState(false)

  useEffect(() => {
    // Aparece despues de bajar un poco, para no tapar el hero apenas carga.
    const onScroll = () => setVisible(window.scrollY > 400)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <AnimatePresence>
      {visible && !dismissed && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.8 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 20, scale: 0.8 }}
          transition={{ duration: 0.3 }}
          className="fixed bottom-5 right-5 z-50 flex items-center gap-2"
        >
          <button
            onClick={() => setDismissed(true)}
            aria-label="Ocultar"
            className="w-6 h-6 rounded-full bg-secondary/80 border border-border/50 flex items-center justify-center text-muted-foreground hover:text-foreground transition-colors flex-shrink-0"
          >
            <X className="w-3 h-3" />
          </button>
          <motion.a
            href={DISCORD_URL}
            target="_blank"
            rel="noopener noreferrer"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.96 }}
            className="relative flex items-center gap-3 pl-4 pr-5 h-14 rounded-full bg-[#5865F2] text-white shadow-[0_8px_30px_rgba(88,101,242,0.45)] hover:shadow-[0_8px_36px_rgba(88,101,242,0.6)] transition-shadow"
          >
            <motion.span
              className="absolute inset-0 rounded-full"
              animate={{
                boxShadow: [
                  '0 0 0 0 rgba(88,101,242,0.5)',
                  '0 0 0 12px rgba(88,101,242,0)',
                ],
              }}
              transition={{ duration: 2, repeat: Infinity }}
            />
            <MessageSquare className="w-5 h-5 relative z-10 flex-shrink-0" />
            <span className="relative z-10 text-sm font-semibold whitespace-nowrap">
              Hablemos por Discord
            </span>
          </motion.a>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
