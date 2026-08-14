"use client"

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import { HelpCircle } from 'lucide-react'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { useLanguage } from '@/components/language-provider'

const faqsData = {
  en: [
    { question: 'How long does a service take?',
      answer: "It depends on how complex the work is. I give you an estimated timeframe as soon as we confirm the project's scope, before starting. If anything runs late, I'll let you know on Discord ahead of time." },
    { question: 'How does payment work?',
      answer: "For bigger projects I usually ask for a deposit before starting and the rest on completion, before delivery. For smaller services you can pay everything once it's done. We always talk it through before starting." },
    { question: "What if I'm not satisfied?",
      answer: "Every project includes a reasonable number of minor adjustments after delivery, within the agreed scope. If the work hasn't started yet, I'll refund your full deposit. Details are in the Terms of Service." },
    { question: 'Do I need to give you access to my server or panel?',
      answer: 'Only if the work requires it (installing plugins or configuring the panel, for example). Any access you share is used only for your project and never shared with anyone else.' },
    { question: 'Should I hire a custom service or buy from your BuiltByBit store?',
      answer: 'If you already know what you need and want something fast and proven, my BuiltByBit store has products ready to install. If you need something custom for your server, community, or specific idea, hiring me directly here is the better option.' },
    { question: 'How can I reach you?',
      answer: 'Discord is the fastest way to talk and get questions answered. You can also email me or fill out the contact form on this page.' },
  ],
  es: [
    { question: '¿Cuánto tarda un servicio?',
      answer: 'Depende de la complejidad del trabajo. Te doy un tiempo estimado apenas confirmamos el alcance del proyecto, antes de empezar. Si algo se retrasa, te aviso por Discord con anticipación.' },
    { question: '¿Cómo se paga?',
      answer: 'Para proyectos grandes suelo pedir un anticipo antes de arrancar y el resto al finalizar, antes de la entrega. Para servicios chicos se puede pagar todo al terminar. Siempre lo hablamos antes de empezar.' },
    { question: '¿Qué pasa si no quedo conforme?',
      answer: 'Cada proyecto incluye una cantidad razonable de ajustes menores después de la entrega, dentro del alcance acordado. Si el trabajo todavía no arrancó, te devuelvo el anticipo completo. Los detalles están en los Términos de Servicio.' },
    { question: '¿Necesito darte acceso a mi servidor o panel?',
      answer: 'Solo si el trabajo lo requiere (por ejemplo, instalar plugins o configurar el panel). Cualquier acceso que me compartas se usa únicamente para tu proyecto y no se comparte con nadie más.' },
    { question: '¿Contratar un servicio a medida o comprar en tu tienda BuiltByBit?',
      answer: 'Si ya sabes lo que necesitas y quieres algo rápido y probado, mi tienda en BuiltByBit tiene productos listos para instalar. Si necesitas algo personalizado para tu servidor, comunidad o idea específica, lo mejor es contratarme directamente aquí.' },
    { question: '¿Por dónde te contacto?',
      answer: 'Discord es el canal más rápido para hablar y resolver dudas. También puedes escribirme por email o llenar el formulario de contacto de esta página.' },
  ],
}

const sectionCopy = {
  en: {
    badge: 'Frequently Asked Questions',
    h2pre: 'Before You ',
    h2word: 'Message Me',
    subtitle: 'The most common questions I get before someone hires me.',
  },
  es: {
    badge: 'Preguntas Frecuentes',
    h2pre: 'Antes de ',
    h2word: 'Escribirme',
    subtitle: 'Las dudas más comunes que me preguntan antes de contratar un servicio.',
  },
}

export function FaqSection() {
  const { locale } = useLanguage()
  const faqs = faqsData[locale]
  const s = sectionCopy[locale]
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-100px' })

  return (
    <section id="faq" className="relative py-24 lg:py-32 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-background via-nether/10 to-background" />

      <div ref={sectionRef} className="relative z-10 container mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <motion.span
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/30 text-primary text-sm mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            {s.badge}
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            {s.h2pre}<span className="text-primary text-glow">{s.h2word}</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            {s.subtitle}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
          className="max-w-2xl mx-auto glass-card glow-border rounded-2xl px-6 sm:px-8"
        >
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={faq.question} value={`item-${i}`} className="border-border/50">
                <AccordionTrigger className="text-foreground hover:no-underline text-base [&>svg]:text-primary">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </section>
  )
}
