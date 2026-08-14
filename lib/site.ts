// URL publica del sitio, usada para metadata, sitemap, robots.txt y schema.
// Prioridad: NEXT_PUBLIC_SITE_URL (cuando tengas dominio propio) > URL de Vercel
// (asignada automaticamente al deploy) > localhost en desarrollo.
export const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL ||
  (process.env.VERCEL_URL ? `https://${process.env.VERCEL_URL}` : 'http://localhost:3000')
