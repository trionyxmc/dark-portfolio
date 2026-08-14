/** @type {import('next').NextConfig} */
const nextConfig = {
  // La optimizacion de imagenes de Next.js (conversion automatica a WebP/AVIF,
  // tamanos responsive, lazy loading) funciona nativa en Vercel sin config
  // extra. Estaba desactivada (unoptimized: true), por eso las 36 capturas
  // de proyectos se servian como PNG sin comprimir.
  images: {},
}

export default nextConfig
