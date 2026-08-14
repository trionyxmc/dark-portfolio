"use client"

import Link from 'next/link'
import Image from 'next/image'
import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { ScrollProgress } from '@/components/scroll-progress'
import { useLanguage } from '@/components/language-provider'
import {
  ArrowLeft,
  ArrowRight,
  ShieldCheck,
  Wrench,
  CreditCard,
  Clock,
  UserCheck,
  LifeBuoy,
  RotateCcw,
  Copyright,
  Lock,
  ShieldAlert,
  RefreshCw,
  Mail,
  Scale,
  AlertTriangle,
} from 'lucide-react'

interface TosSection {
  slug: string
  icon: React.ComponentType<{ className?: string }>
  title: string
  important?: boolean
  body: React.ReactNode
}

const introEs: TosSection = {
  slug: 'aceptacion',
  icon: ShieldCheck,
  title: 'Aceptación de los Términos',
  body: (
    <p>
      Al contratar cualquier servicio ofrecido por <strong className="text-foreground">DARK_NESS SERVICES</strong> —ya
      sea a través de Discord, BuiltByBit, esta página web o cualquier otro canal— el cliente acepta
      íntegramente los términos y condiciones descritos a continuación. Si no estás de acuerdo con alguno
      de estos puntos, te recomendamos no continuar con la contratación del servicio.
    </p>
  ),
}

const introEn: TosSection = {
  slug: 'aceptacion',
  icon: ShieldCheck,
  title: 'Acceptance of Terms',
  body: (
    <p>
      By hiring any service offered by <strong className="text-foreground">DARK_NESS SERVICES</strong> — whether
      through Discord, BuiltByBit, this website, or any other channel — the client fully accepts the terms
      and conditions described below. If you disagree with any of these points, we recommend not
      proceeding with the service.
    </p>
  ),
}

const groupsEs: { label: string; sections: TosSection[] }[] = [
  {
    label: 'El Servicio',
    sections: [
      {
        slug: 'servicios',
        icon: Wrench,
        title: 'Servicios Ofrecidos',
        body: (
          <>
            <p className="mb-3">Prestamos servicios de desarrollo y configuración relacionados con:</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc list-inside text-muted-foreground">
              <li>Configuración de plugins, menús y sistemas</li>
              <li>Creación de networks (BungeeCord / Velocity)</li>
              <li>Desarrollo de bots de Discord y addons</li>
              <li>Diseño y personalización de tiendas Tebex</li>
              <li>Dominio a IP y certificados SSL</li>
              <li>Instalación del panel Pterodactyl</li>
              <li>Instalación y optimización de VPS</li>
              <li>Instalacion de servidores dedicados</li>
              <li>Traducción de plugins, tiendas y bots</li>
            </ul>
            <p className="mt-3">
              El alcance exacto de cada trabajo se define individualmente con el cliente antes de iniciar,
              según el servicio contratado y el presupuesto acordado.
            </p>
          </>
        ),
      },
      {
        slug: 'pagos',
        icon: CreditCard,
        title: 'Cotización y Pagos',
        body: (
          <>
            <p className="mb-3">
              Los precios publicados en esta web (&ldquo;Desde $X&rdquo;) son valores de referencia inicial. El
              precio final se confirma tras conocer el alcance completo del proyecto y se comunica al cliente
              antes de comenzar cualquier trabajo.
            </p>
            <p>
              Para proyectos de mayor tamaño se puede solicitar un anticipo antes de iniciar. El saldo restante
              se abona al finalizar el servicio y antes de la entrega de archivos, accesos o credenciales
              finales, salvo que se acuerde explícitamente lo contrario con el cliente.
            </p>
          </>
        ),
      },
      {
        slug: 'entrega',
        icon: Clock,
        title: 'Tiempos de Entrega',
        body: (
          <p>
            Los tiempos de entrega estimados se comunican al confirmar el proyecto y dependen de su
            complejidad. Pueden variar por disponibilidad, volumen de trabajo en curso, o por falta de
            información/accesos necesarios de parte del cliente. Cualquier retraso relevante será informado
            con anticipación por Discord o el canal de contacto acordado.
          </p>
        ),
      },
    ],
  },
  {
    label: 'Cliente y Soporte',
    sections: [
      {
        slug: 'responsabilidades-cliente',
        icon: UserCheck,
        title: 'Responsabilidades del Cliente',
        body: (
          <>
            <p className="mb-3">Para garantizar un desarrollo correcto del servicio, el cliente se compromete a:</p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
              <li>Proporcionar información clara, completa y veraz sobre lo que necesita</li>
              <li>Otorgar los accesos necesarios (paneles, FTP, servidor, cuentas) cuando el trabajo lo requiera</li>
              <li>Responder consultas en un tiempo razonable durante el desarrollo del proyecto</li>
              <li>Realizar copias de seguridad de su información antes de otorgar accesos a terceros</li>
            </ul>
          </>
        ),
      },
      {
        slug: 'soporte',
        icon: LifeBuoy,
        title: 'Revisiones y Soporte Incluido',
        body: (
          <p>
            Cada proyecto incluye una cantidad razonable de ajustes menores posteriores a la entrega, siempre
            que estén dentro del alcance originalmente acordado. Cambios que impliquen trabajo adicional
            significativo, nuevas funciones no contempladas inicialmente, o un rediseño del alcance, se
            cotizan por separado.
          </p>
        ),
      },
      {
        slug: 'reembolsos',
        icon: RotateCcw,
        title: 'Política de Reembolsos',
        important: true,
        body: (
          <>
            <p className="mb-3">
              Debido a la naturaleza personalizada del trabajo (configuración, desarrollo y diseño a medida),
              los reembolsos se evalúan caso por caso:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
              <li>Si el trabajo aún no ha comenzado, se puede reembolsar el anticipo completo</li>
              <li>Si el trabajo ya está en curso, se descuenta la parte proporcional ya realizada</li>
              <li>Una vez el servicio fue entregado y aprobado por el cliente, no aplica reembolso</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    label: 'Legal y Propiedad',
    sections: [
      {
        slug: 'propiedad',
        icon: Copyright,
        title: 'Propiedad y Licencia de Configuraciones',
        body: (
          <p>
            Las configuraciones, sistemas o productos adquiridos a través del marketplace (BuiltByBit) se
            rigen adicionalmente por los términos de esa plataforma. El código y los recursos creados a
            medida para un cliente específico quedan para su uso exclusivo en su proyecto; no está permitida
            su reventa ni redistribución sin autorización expresa.
          </p>
        ),
      },
      {
        slug: 'confidencialidad',
        icon: Lock,
        title: 'Confidencialidad',
        body: (
          <p>
            Cualquier acceso, credencial o información sensible compartida por el cliente para realizar el
            trabajo se utiliza únicamente con ese fin y no se comparte con terceros. Al finalizar el
            proyecto, se recomienda al cliente rotar contraseñas de accesos que ya no sean necesarios.
          </p>
        ),
      },
      {
        slug: 'responsabilidad',
        icon: ShieldAlert,
        title: 'Limitación de Responsabilidad',
        important: true,
        body: (
          <p>
            DARK_NESS SERVICES no se hace responsable por daños indirectos, pérdida de datos, o
            interrupciones del servicio derivadas de fallos de terceros (hosting, plataformas de pago,
            Discord, Tebex, Mojang, etc.), ni por modificaciones realizadas por el cliente o terceros
            posteriores a la entrega del trabajo.
          </p>
        ),
      },
      {
        slug: 'modificaciones',
        icon: RefreshCw,
        title: 'Modificaciones de estos Términos',
        body: (
          <p>
            Estos términos pueden actualizarse en cualquier momento para reflejar cambios en los servicios
            ofrecidos. La versión vigente es siempre la publicada en esta página.
          </p>
        ),
      },
    ],
  },
  {
    label: 'Contacto',
    sections: [
      {
        slug: 'contacto',
        icon: Mail,
        title: 'Contacto',
        body: (
          <p>
            Para dudas sobre estos términos puedes escribirnos por{' '}
            <a
              href="https://discord.gg/RDfAFqhZye"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4"
            >
              Discord
            </a>{' '}
            o a{' '}
            <a href="mailto:darknessservices00@gmail.com" className="text-primary hover:underline underline-offset-4">
              darknessservices00@gmail.com
            </a>
            .
          </p>
        ),
      },
    ],
  },
]

const groupsEn: { label: string; sections: TosSection[] }[] = [
  {
    label: 'The Service',
    sections: [
      {
        slug: 'servicios',
        icon: Wrench,
        title: 'Services Offered',
        body: (
          <>
            <p className="mb-3">We provide development and configuration services related to:</p>
            <ul className="grid sm:grid-cols-2 gap-x-6 gap-y-1.5 list-disc list-inside text-muted-foreground">
              <li>Plugin, menu, and system configuration</li>
              <li>Network creation (BungeeCord / Velocity)</li>
              <li>Discord bot and add-on development</li>
              <li>Tebex store design and customization</li>
              <li>Domain to IP and SSL certificates</li>
              <li>Pterodactyl panel installation</li>
              <li>VPS installation and optimization</li>
              <li>Dedicated server installation</li>
              <li>Plugin, store, and bot translation</li>
            </ul>
            <p className="mt-3">
              The exact scope of each job is defined individually with the client before starting,
              based on the service hired and the agreed budget.
            </p>
          </>
        ),
      },
      {
        slug: 'pagos',
        icon: CreditCard,
        title: 'Quotes and Payments',
        body: (
          <>
            <p className="mb-3">
              The prices listed on this site (&ldquo;From $X&rdquo;) are initial reference values. The final
              price is confirmed once the full scope of the project is known, and it&apos;s communicated to
              the client before any work begins.
            </p>
            <p>
              For larger projects a deposit may be requested before starting. The remaining balance is paid
              once the service is completed and before delivering final files, access, or credentials,
              unless otherwise explicitly agreed with the client.
            </p>
          </>
        ),
      },
      {
        slug: 'entrega',
        icon: Clock,
        title: 'Delivery Times',
        body: (
          <p>
            Estimated delivery times are communicated when the project is confirmed and depend on its
            complexity. They may vary due to availability, current workload, or missing information/access
            from the client&apos;s side. Any significant delay will be communicated in advance via Discord
            or the agreed contact channel.
          </p>
        ),
      },
    ],
  },
  {
    label: 'Client & Support',
    sections: [
      {
        slug: 'responsabilidades-cliente',
        icon: UserCheck,
        title: 'Client Responsibilities',
        body: (
          <>
            <p className="mb-3">To ensure the service runs smoothly, the client agrees to:</p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
              <li>Provide clear, complete, and accurate information about what they need</li>
              <li>Grant necessary access (panels, FTP, server, accounts) when the work requires it</li>
              <li>Respond to questions within a reasonable time during the project</li>
              <li>Back up their information before granting third-party access</li>
            </ul>
          </>
        ),
      },
      {
        slug: 'soporte',
        icon: LifeBuoy,
        title: 'Included Revisions and Support',
        body: (
          <p>
            Every project includes a reasonable number of minor adjustments after delivery, as long as they
            stay within the originally agreed scope. Changes that involve significant additional work, new
            features not originally included, or a redesign of scope are quoted separately.
          </p>
        ),
      },
      {
        slug: 'reembolsos',
        icon: RotateCcw,
        title: 'Refund Policy',
        important: true,
        body: (
          <>
            <p className="mb-3">
              Because of the custom nature of the work (configuration, development, and made-to-order
              design), refunds are evaluated on a case-by-case basis:
            </p>
            <ul className="list-disc list-inside space-y-1.5 text-muted-foreground">
              <li>If work hasn&apos;t started yet, the full deposit can be refunded</li>
              <li>If work is already underway, the proportional part already completed is deducted</li>
              <li>Once the service has been delivered and approved by the client, no refund applies</li>
            </ul>
          </>
        ),
      },
    ],
  },
  {
    label: 'Legal & Ownership',
    sections: [
      {
        slug: 'propiedad',
        icon: Copyright,
        title: 'Ownership and License of Configurations',
        body: (
          <p>
            Configurations, systems, or products purchased through the marketplace (BuiltByBit) are
            additionally governed by that platform&apos;s terms. Code and resources custom-built for a
            specific client are for their exclusive use in their project; resale or redistribution without
            express authorization is not allowed.
          </p>
        ),
      },
      {
        slug: 'confidencialidad',
        icon: Lock,
        title: 'Confidentiality',
        body: (
          <p>
            Any access, credentials, or sensitive information shared by the client to carry out the work is
            used solely for that purpose and never shared with third parties. Once the project is finished,
            the client is advised to rotate passwords for any access no longer needed.
          </p>
        ),
      },
      {
        slug: 'responsabilidad',
        icon: ShieldAlert,
        title: 'Limitation of Liability',
        important: true,
        body: (
          <p>
            DARK_NESS SERVICES is not liable for indirect damages, data loss, or service interruptions
            resulting from third-party failures (hosting, payment platforms, Discord, Tebex, Mojang, etc.),
            nor for modifications made by the client or third parties after the work has been delivered.
          </p>
        ),
      },
      {
        slug: 'modificaciones',
        icon: RefreshCw,
        title: 'Changes to These Terms',
        body: (
          <p>
            These terms may be updated at any time to reflect changes in the services offered. The version
            in effect is always the one published on this page.
          </p>
        ),
      },
    ],
  },
  {
    label: 'Contact',
    sections: [
      {
        slug: 'contacto',
        icon: Mail,
        title: 'Contact',
        body: (
          <p>
            For questions about these terms you can reach us on{' '}
            <a
              href="https://discord.gg/RDfAFqhZye"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline underline-offset-4"
            >
              Discord
            </a>{' '}
            or at{' '}
            <a href="mailto:darknessservices00@gmail.com" className="text-primary hover:underline underline-offset-4">
              darknessservices00@gmail.com
            </a>
            .
          </p>
        ),
      },
    ],
  },
]

const pageCopy = {
  en: {
    backHome: 'Back to home',
    back: 'Back',
    badge: 'Legal',
    h1pre: 'Terms of ',
    h1word: 'Service',
    subtitle:
      'The terms under which DARK_NESS SERVICES provides development and configuration services for Minecraft, Discord, and more.',
    sections: (n: number) => `${n} sections`,
    effectiveSince: 'Effective as of',
    dateLocale: 'en-US',
    index: 'Contents',
    important: 'Important',
    ctaTitle: 'Have a question?',
    ctaBody: "Message me and I'll clarify anything about these terms before we start your project.",
    ctaButton: 'Contact Me',
    intro: introEn,
    groups: groupsEn,
  },
  es: {
    backHome: 'Volver al inicio',
    back: 'Volver',
    badge: 'Legal',
    h1pre: 'Términos de ',
    h1word: 'Servicio',
    subtitle:
      'Las condiciones bajo las cuales DARK_NESS SERVICES presta sus servicios de desarrollo y configuración para Minecraft, Discord y más.',
    sections: (n: number) => `${n} secciones`,
    effectiveSince: 'Vigente desde',
    dateLocale: 'es-ES',
    index: 'Índice',
    important: 'Importante',
    ctaTitle: '¿Tienes alguna duda?',
    ctaBody: 'Escríbeme y te aclaro cualquier punto de estos términos antes de empezar tu proyecto.',
    ctaButton: 'Contactar',
    intro: introEs,
    groups: groupsEs,
  },
}

// ─── Sticky top bar: siempre visible, resuelve "como vuelvo" sin importar el scroll ──
function TosTopBar({ backHomeLabel, backLabel }: { backHomeLabel: string; backLabel: string }) {
  return (
    <div className="fixed top-0 left-0 right-0 z-40 bg-background/80 backdrop-blur-xl border-b border-white/[0.06]">
      <div className="container mx-auto px-6 h-16 flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="relative w-8 h-8 rounded-lg overflow-hidden border border-primary/30 flex-shrink-0">
            <Image src="/preview.webp" alt="DS" fill className="object-cover object-top" />
          </div>
          <span className="hidden sm:inline text-sm font-semibold text-foreground tracking-tight">
            DARK_NESS SERVICES
          </span>
        </Link>
        <Link
          href="/"
          className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-primary transition-colors group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span className="hidden xs:inline">{backHomeLabel}</span>
          <span className="xs:hidden">{backLabel}</span>
        </Link>
      </div>
    </div>
  )
}

function GroupHeader({ label }: { label: string }) {
  return (
    <div className="flex items-center gap-3 mb-5 mt-2">
      <div className="h-px w-8 bg-primary flex-shrink-0" />
      <span className="font-mono text-xs text-primary uppercase tracking-[.2em]">{label}</span>
      <div className="h-px flex-1 bg-gradient-to-r from-border/60 to-transparent" />
    </div>
  )
}

function SectionCard({ section, index, importantLabel }: { section: TosSection; index: number; importantLabel: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  const Icon = section.icon

  return (
    <motion.section
      ref={ref}
      id={section.slug}
      initial={{ opacity: 0, y: 24 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: Math.min((index % 6) * 0.05, 0.3) }}
      className={`relative scroll-mt-28 rounded-2xl p-6 sm:p-8 overflow-hidden transition-colors duration-300 ${
        section.important
          ? 'bg-primary/[0.06] border border-primary/40 hover:border-primary/60'
          : 'glass-card glow-border hover:border-primary/50'
      }`}
    >
      {/* Decorative index number */}
      <span
        className="absolute top-3 right-5 font-bold leading-none select-none pointer-events-none z-0"
        style={{ fontSize: 64, color: 'rgba(255,255,255,0.03)' }}
      >
        {String(index + 1).padStart(2, '0')}
      </span>

      <div className="relative z-10 flex items-start gap-4">
        <div className="flex-shrink-0 inline-flex items-center justify-center w-11 h-11 rounded-xl bg-primary/15 border border-primary/30 glow-crimson-sm">
          <Icon className="w-5 h-5 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-y-1.5 mb-3">
            <span className="text-xs font-mono text-primary/70 mr-2">{String(index + 1).padStart(2, '0')}</span>
            <h2 className="text-lg sm:text-xl font-semibold text-foreground mr-2">{section.title}</h2>
            {section.important && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-primary/15 border border-primary/40 text-primary text-[10px] font-semibold uppercase tracking-[.08em]">
                <AlertTriangle className="w-3 h-3" />
                {importantLabel}
              </span>
            )}
          </div>
          <div className="text-[15px] leading-relaxed text-muted-foreground">{section.body}</div>
        </div>
      </div>
    </motion.section>
  )
}

export default function TerminosPage() {
  const { locale } = useLanguage()
  const t = pageCopy[locale]
  const allSections = [t.intro, ...t.groups.flatMap((g) => g.sections)]

  const headerRef = useRef(null)
  const headerInView = useInView(headerRef, { once: true, margin: '-40px' })

  return (
    <main id="main-content" className="relative min-h-screen bg-background overflow-x-hidden">
      <ScrollProgress />
      <TosTopBar backHomeLabel={t.backHome} backLabel={t.back} />

      {/* Ambient background, consistente con el resto del sitio */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-nether/20 to-background pointer-events-none" />
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[360px] bg-[radial-gradient(ellipse,rgba(139,0,0,0.14)_0%,transparent_70%)] pointer-events-none" />

      <div className="relative z-10 container mx-auto px-6 pt-32 pb-20 max-w-6xl">
        {/* Header */}
        <motion.div
          ref={headerRef}
          initial={{ opacity: 0, y: 20 }}
          animate={headerInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14 max-w-2xl"
        >
          <span className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm mb-6">
            <Scale className="w-4 h-4" />
            {t.badge}
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-5 leading-[1.05]">
            {t.h1pre}<span className="text-primary text-glow">{t.h1word}</span>
          </h1>
          <p className="text-lg text-muted-foreground leading-relaxed mb-6">
            {t.subtitle}
          </p>
          <div className="flex flex-wrap items-center gap-3 text-xs">
            <span className="px-3 py-1.5 rounded-full bg-secondary/50 text-muted-foreground border border-border/50">
              {t.sections(allSections.length)}
            </span>
            <span className="px-3 py-1.5 rounded-full bg-secondary/50 text-muted-foreground border border-border/50">
              {t.effectiveSince}{' '}
              {new Date().toLocaleDateString(t.dateLocale, { year: 'numeric', month: 'long', day: 'numeric' })}
            </span>
          </div>
        </motion.div>

        {/* Intro — tarjeta destacada, sin agrupar */}
        <div className="mb-10">
          <SectionCard section={t.intro} index={0} importantLabel={t.important} />
        </div>

        <div className="grid lg:grid-cols-[220px_1fr] gap-10 lg:gap-14 items-start">
          {/* Índice — sticky en desktop */}
          <motion.nav
            initial={{ opacity: 0 }}
            animate={headerInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="hidden lg:block sticky top-24 self-start"
          >
            <div className="text-xs font-mono uppercase tracking-[.14em] text-muted-foreground/50 mb-4">
              {t.index}
            </div>
            <ul className="space-y-1 border-l border-border/50">
              {allSections.map((s, i) => (
                <li key={s.slug}>
                  <a
                    href={`#${s.slug}`}
                    className="flex items-center gap-2 pl-4 -ml-px py-1.5 text-sm text-muted-foreground hover:text-primary border-l border-transparent hover:border-primary transition-colors duration-200"
                  >
                    <span className="font-mono text-[11px] text-primary/60">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <span className="truncate">{s.title}</span>
                    {s.important && <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />}
                  </a>
                </li>
              ))}
            </ul>
          </motion.nav>

          {/* Contenido agrupado */}
          <div>
            {t.groups.map((group, gi) => {
              const startIndex = 1 + t.groups.slice(0, gi).reduce((acc, g) => acc + g.sections.length, 0)
              return (
                <div key={group.label} className="mb-10 last:mb-0">
                  <GroupHeader label={group.label} />
                  <div className="space-y-5">
                    {group.sections.map((s, i) => (
                      <SectionCard key={s.slug} section={s} index={startIndex + i} importantLabel={t.important} />
                    ))}
                  </div>
                </div>
              )
            })}

            {/* CTA final */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-60px' }}
              transition={{ duration: 0.5 }}
              className="glass-card glow-crimson rounded-2xl p-8 sm:p-10 text-center mt-10"
            >
              <h3 className="text-xl font-bold text-foreground mb-2">{t.ctaTitle}</h3>
              <p className="text-muted-foreground mb-6">
                {t.ctaBody}
              </p>
              <Link
                href="/#contact"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-md bg-primary hover:bg-primary/90 text-primary-foreground font-medium transition-colors group"
              >
                {t.ctaButton}
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </main>
  )
}
