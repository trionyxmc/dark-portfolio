"use client"

import { Navbar } from '@/components/navbar'
import { CursorSpotlight } from '@/components/cursor-spotlight'
import { LoadingScreen } from '@/components/loading-screen'
import { ScrollProgress } from '@/components/scroll-progress'
import { HeroSection } from '@/components/sections/hero'
import { TrustBar } from '@/components/sections/trust-bar'
import { AboutSection } from '@/components/sections/about'
import { ServicesSection } from '@/components/sections/services'
import { BBBProductsSection } from '@/components/sections/bbb-products'
import { TestimonialsSection } from '@/components/sections/testimonials'
import { ProjectsLabSection } from '@/components/sections/projects-lab'
import { SkillsSection } from '@/components/sections/skills'
import { ContactSection } from '@/components/sections/contact'
import { FinalCTASection } from '@/components/sections/final-cta'
import { Footer } from '@/components/footer'

export default function Home() {
  return (
    <>
      {/* Premium loading screen */}
      <LoadingScreen />
      
      {/* Scroll progress indicator */}
      <ScrollProgress />
      
      <main className="relative min-h-screen">
        {/* Custom cursor spotlight effect */}
        <CursorSpotlight />
        
        {/* Navigation */}
        <Navbar />
        
        {/* Page sections */}
        <HeroSection />
        <TrustBar />
        <AboutSection />
        <ServicesSection />
        <BBBProductsSection />
        <TestimonialsSection />
        <ProjectsLabSection />
        <SkillsSection />
        <ContactSection />
        <FinalCTASection />
        <Footer />
      </main>
    </>
  )
}
