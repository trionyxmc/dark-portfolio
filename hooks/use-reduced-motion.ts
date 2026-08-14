"use client"

import { useEffect, useState } from 'react'

// El useReducedMotion() de framer-motion resuelve la preferencia real ya
// en el primer render del cliente, que no coincide con el servidor (que
// siempre asume "sin preferencia") y rompe la hidratacion. Este hook
// arranca en `false` tanto en servidor como en el primer render del
// cliente (para que coincidan exacto) y recien despues de montar
// (useEffect, solo corre en el cliente) lee la preferencia real del
// sistema operativo -- mismo patron que ya se uso para LoadingScreen.
export function useReducedMotion(): boolean {
  const [reduced, setReduced] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReduced(mq.matches)
    const handleChange = (e: MediaQueryListEvent) => setReduced(e.matches)
    mq.addEventListener('change', handleChange)
    return () => mq.removeEventListener('change', handleChange)
  }, [])

  return reduced
}
