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

const faqs = [
  {
    question: '¿Cuánto tarda un servicio?',
    answer:
      'Depende de la complejidad del trabajo. Te doy un tiempo estimado apenas confirmamos el alcance del proyecto, antes de empezar. Si algo se retrasa, te aviso por Discord con anticipación.',
  },
  {
    question: '¿Cómo se paga?',
    answer:
      'Para proyectos grandes suelo pedir un anticipo antes de arrancar y el resto al finalizar, antes de la entrega. Para servicios chicos se puede pagar todo al terminar. Siempre lo hablamos antes de empezar.',
  },
  {
    question: '¿Qué pasa si no quedo conforme?',
    answer:
      'Cada proyecto incluye una cantidad razonable de ajustes menores después de la entrega, dentro del alcance acordado. Si el trabajo todavía no arrancó, te devuelvo el anticipo completo. Los detalles están en los Términos de Servicio.',
  },
  {
    question: '¿Necesito darte acceso a mi servidor o panel?',
    answer:
      'Solo si el trabajo lo requiere (por ejemplo, instalar plugins o configurar el panel). Cualquier acceso que me compartas se usa únicamente para tu proyecto y no se comparte con nadie más.',
  },
  {
    question: '¿Contratar un servicio a medida o comprar en tu tienda BuiltByBit?',
    answer:
      'Si ya sabés lo que necesitás y querés algo rápido y probado, mi tienda en BuiltByBit tiene productos listos para instalar. Si necesitás algo personalizado para tu servidor, comunidad o idea especifica, lo mejor es contratarme directamente acá.',
  },
  {
    question: '¿Por dónde te contacto?',
    answer:
      'Discord es el canal más rápido para hablar y resolver dudas. También podés escribirme por email o llenar el formulario de contacto de esta página.',
  },
]

export function FaqSection() {
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
            Preguntas Frecuentes
          </motion.span>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-foreground mb-4">
            Antes de <span className="text-primary text-glow">Escribirme</span>
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed">
            Las dudas más comunes que me preguntan antes de contratar un servicio.
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
