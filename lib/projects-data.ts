// Datos de los proyectos del Lab. Vive en un archivo plano (sin "use client"),
// mismo patron que lib/testimonials-data.ts, para poder importarse sin
// problemas tanto desde el componente cliente como -- si hiciera falta mas
// adelante -- desde un Server Component.

export interface Project {
  id: number
  name: string
  type: string
  result: string
  technologies: string[]
  description: string
  num: string
  ph: string
  images: string[]
}

// Orden pensado para exposicion: Pixel Of God (el proyecto mas completo,
// con mayor alcance tecnico) va en 2do lugar en vez de 4to, y las 3
// tiendas Tebex con descripcion parecida (ChillMon, SoulCraft, EclipseCraft)
// quedan intercaladas con otros tipos de proyecto en vez de consecutivas.
const shared = [
  { id: 1, num: '01', name: 'ChillMon Tebex', ph: 'I', images: ['/1.png', '/2.png', '/3.png', '/4.png', '/5.png'] },
  { id: 2, num: '02', name: 'Pixel Of God', ph: 'II', images: ['/17.png', '/18.png', '/19.png', '/20.png', '/21.png', '/22.png', '/23.png', '/24.png', '/25.png'] },
  { id: 3, num: '03', name: 'SoulCraft', ph: 'III', images: ['/6.png', '/7.png', '/8.png', '/9.png', '/10.png'] },
  { id: 4, num: '04', name: 'Reinos Oscuros', ph: 'IV', images: ['/26.png', '/27.png', '/28.png', '/29.png', '/30.png', '/31.png'] },
  { id: 5, num: '05', name: 'EclipseCraft', ph: 'V', images: ['/11.png', '/12.png', '/13.png', '/14.png', '/15.png', '/16.png'] },
  { id: 6, num: '06', name: 'Tierra arcana', ph: 'VI', images: ['/32.png', '/33.png', '/34.png', '/35.png', '/36.png'] },
  { id: 7, num: '07', name: 'Maholand', ph: 'VII', images: ['/37.png', '/38.png', '/39.png', '/40.png', '/41.png', '/42.png'] },
  { id: 8, num: '08', name: 'StoryWars Network', ph: 'VIII', images: ['/43.png', '/44.png', '/45.png', '/46.png', '/47.png'] },
  { id: 9, num: '09', name: 'Zyntam Network', ph: 'IX', images: ['/48.png', '/49.png', '/50.png', '/51.png', '/52.png'] },
]

// El copy sigue el mismo orden que `shared` de arriba (indice a indice).
const projectsCopy = {
  en: [
    { type: 'Complete Tebex store', result: 'package creation, theme editing, and more', technologies: ['HTML/CSS', 'Tebex API', 'UX Design'],
      description: "This project involved a full rebuild of ChillMon's official Tebex store. The entire purchase experience was redesigned from scratch for a cleaner, more modern, more eye-catching look — while keeping smooth navigation, a professional structure, and better product visibility focused on increasing conversions." },
    { type: 'Full Tebex and Pixelmon build', result: 'config creation, translations, custom builds, and more', technologies: ['Tebex', 'Yml', 'Json'],
      description: "This project covered the full development of a complete ecosystem for a Minecraft and Discord server, integrating core systems for gameplay, economy, progression, customization, and web presence into one unified solution. I built main menus, kits, warps, ranks, parkour, rewards, crates, an economy connected to Vault and Pokédolares, plus advanced systems like auctions, RTP, protections, and a custom tab/scoreboard for an immersive, professional experience. On the community side, I also built a Discord bot with tickets, suggestions, welcomes, and custom commands, along with a fully CSS-optimized Tebex store, configured packages, and a visual structure built to maximize conversion, retention, and brand presence." },
    { type: 'Complete Tebex store', result: 'package creation, theme editing, and more', technologies: ['HTML/CSS', 'Tebex API', 'UX Design'],
      description: 'This project involved a complete overhaul of a Tebex store. Every aspect was carefully reworked to deliver a modern, clean, intuitive shopping experience, combining an appealing design with smooth, easy-to-use navigation.' },
    { type: 'Semi-custom survival build and Discord editing', result: 'config creation, translations, custom builds, and more', technologies: ['DeluxeMenus', 'Essentials', 'YAML'],
      description: 'This time a client asked for a modified survival server plus a Discord redesign and a custom bot with advanced systems, a fully custom spawn, working NPCs, and a setup optimized to the max for a one-of-a-kind experience.' },
    { type: 'Complete Tebex store', result: 'package creation, theme editing, and more', technologies: ['HTML/CSS', 'Tebex API', 'UX Design'],
      description: 'This project focused on a full overhaul of a Tebex store, completely redefining its visual identity and navigation structure. Every element was carefully optimized to create a modern, clean, highly intuitive experience — improving both the overall look and ease of use to boost engagement and conversion.' },
    { type: 'Modded server build', result: 'custom menus, translations, custom spawn, and more', technologies: ['RankUp', 'Custom Menus', 'Custom ModPack'],
      description: 'This time I built a modded survival server with advanced systems, a fully custom spawn, working NPCs, and optimization focused on a smooth, immersive, one-of-a-kind experience.' },
    { type: 'Redesign & Build', result: 'package creation, theme editing, and more', technologies: ['HTML/CSS', 'Tebex API', 'UX Design'],
      description: "I designed and customized Maholand's Tebex store, building a modern interface tailored to the server's look and feel. I organized products like temporary ranks and commands, added detailed info for every product, a shopping cart, currency selector, and user login. I also added sections covering automatic delivery, secure payments, payment methods, support, and purchase policies — resulting in a store that's clear, appealing, and easy to use." },
    { type: 'UI + UX + Eggs', result: 'From-scratch installation + theme', technologies: ['Pterodactyl', 'Wings'],
      description: "I handled the full installation and setup of the Pterodactyl panel for StoryWars, implementing the security measures needed for a stable, protected environment. I also completely redesigned the interface with a modern, unique look tailored to the project's identity. On top of that, I configured the node and its connection to the VPS, and organized the different servers within the panel to make management easier." },
    { type: '2+ Custom Dungeons', result: 'Custom Mobs + Custom Bosses', technologies: [] as string[],
      description: 'I built and configured 2 fully custom dungeons, featuring more than 40 different mobs, 4+ mini-bosses, and 2+ main bosses. Every enemy has optimized, custom skills for more dynamic and challenging fights. Mobs were also tailored to each dungeon region, creating a more varied, immersive progression that fits the theme of each zone.' },
  ],
  es: [
    { type: 'Tienda tebex completa', result: 'creacion de paquetes, edicion de theme y mas', technologies: ['HTML/CSS', 'Tebex API', 'Diseño UX'],
      description: 'Este proyecto consistió en la reconstrucción completa de la tienda oficial de ChillMon en Tebex Toda la experiencia de compra fue rediseñada desde cero para lograr una apariencia más limpia moderna y llamativa manteniendo una navegación fluida una estructura profesional y una mejor visibilidad de productos enfocada en aumentar conversiones' },
    { type: 'Creacion de tebex y pixelmon al completo', result: 'creacion de configuraciones, traducciones, creaciones y mas', technologies: ['Tebex', 'Yml', 'Json'],
      description: 'Este proyecto abarcó el desarrollo completo de un ecosistema para servidor Minecraft y Discord, integrando sistemas esenciales de jugabilidad, economía, progresión, personalización y presencia web en una solución totalmente unificada. Se implementaron menús principales, kits, warps, rangos, parkour, rewards, crates, economía conectada con Vault y Pokédolares, además de sistemas avanzados como subastas, RTP, protecciones, tab y scoreboard personalizados para ofrecer una experiencia inmersiva y profesional A nivel de comunidad, también se desarrolló un bot de Discord con tickets, sugerencias, bienvenidas y comandos personalizados, acompañado de una tienda Tebex con CSS completamente optimizado, paquetes configurados y una estructura visual pensada para maximizar conversión, retención y presencia de marca.' },
    { type: 'Tienda tebex completa', result: 'creacion de paquetes, edicion de theme y mas', technologies: ['HTML/CSS', 'Tebex API', 'Diseño UX'],
      description: 'Este proyecto consistió en la renovación completa de una tienda Tebex se trabajó cuidadosamente cada aspecto para ofrecer una experiencia de compra moderna, limpia e intuitiva, combinando un diseño atractivo con una navegación fluida y fácil de usar' },
    { type: 'Creacion de survival semi custom y edicion discord', result: 'creacion de configuraciones, traducciones, creaciones y mas', technologies: ['DeluxeMenus', 'Essentials', 'YAML'],
      description: 'Esta vez un cliente solicito un servidor survival modificado + edicion de su discord y un bot personalizado con sistemas avanzados, un spawn completamente custom, npcs funcionales y una configuracion optimizada al maximo para una experiencia unica' },
    { type: 'Tienda tebex completa', result: 'creacion de paquetes, edicion de theme y mas', technologies: ['HTML/CSS', 'Tebex API', 'Diseño UX'],
      description: 'Este proyecto se enfocó en la renovación integral de una tienda Tebex, redefiniendo por completo su identidad visual y estructura de navegación Cada elemento fue optimizado cuidadosamente para crear una experiencia moderna, limpia y altamente intuitiva, mejorando tanto la estética general como la facilidad de uso para potenciar la interacción y conversión de los usuarios.' },
    { type: 'Creacion de servidor de mods', result: 'Menus custom, traducciones, spawn custom y mas', technologies: ['RankUp', 'Menus custom', 'ModPack Custom'],
      description: 'Esta vez se desarrolló un servidor survival con mods, sistemas avanzados, spawn totalmente custom, NPCs funcionales y una optimización enfocada en ofrecer una experiencia fluida, inmersiva y única.' },
    { type: 'Renovacion mas creacion', result: 'creacion de paquetes, edicion de theme y mas', technologies: ['HTML/CSS', 'Tebex API', 'Diseño UX'],
      description: 'Diseñé y personalicé la tienda Tebex de Maholand, creando una interfaz moderna y adaptada a la estética del servidor. Organicé productos como rangos temporales y comandos, añadí información detallada de cada producto, carrito de compra, selector de moneda y acceso de usuario. También incorporé secciones sobre entrega automática, pagos seguros, métodos de pago, soporte y políticas de compra, logrando una tienda clara, atractiva y fácil de usar' },
    { type: 'Ui + UX + Eggs', result: 'Instalacion de cero + theme', technologies: ['Pterodactyl', 'Wings'],
      description: 'Realicé la instalación y configuración completa del panel Pterodactyl para Storywars, implementando las medidas de seguridad necesarias para garantizar un entorno estable y protegido. También rediseñé completamente la interfaz con un estilo moderno, único y llamativo, adaptado a la identidad del proyecto. Además, configuré el nodo y su conexión con la VPS, y realicé la creación y organización de los distintos servidores dentro del panel para facilitar su administración' },
    { type: '+2 dungeons personalizadas', result: 'Custom Mobs + Custom Bosses', technologies: [] as string[],
      description: 'Desarrollé y configuré 2 dungeons completamente personalizadas, incorporando más de 40 mobs variados, más de 4 minibosses y más de 2 bosses principales. Cada enemigo cuenta con skills optimizadas y customizadas para ofrecer combates más dinámicos y desafiantes. Además, los mobs fueron adaptados según cada región de las dungeons, logrando una progresión más variada, inmersiva y acorde con la ambientación de cada zona' },
  ],
}

export function buildProjects(locale: 'en' | 'es'): Project[] {
  return shared.map((s, i) => {
    const c = projectsCopy[locale][i]
    return {
      id: s.id,
      num: s.num,
      ph: s.ph,
      images: s.images,
      name: s.name,
      type: c.type,
      result: c.result,
      technologies: c.technologies,
      description: c.description,
    }
  })
}
