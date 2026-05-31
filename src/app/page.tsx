import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomBar } from '@/components/layout/MobileBottomBar'
import { Hero } from '@/components/sections/Hero'
import { ProblemSolution } from '@/components/sections/ProblemSolution'
import { Metrics } from '@/components/sections/Metrics'
import { Features } from '@/components/sections/Features'
import { HowItWorks } from '@/components/sections/HowItWorks'
import { ROICalculator } from '@/components/sections/ROICalculator'
import { BoosifyMockup } from '@/components/sections/BoosifyMockup'
import { Pricing } from '@/components/sections/Pricing'
import { Testimonials } from '@/components/sections/Testimonials'
import { FAQ } from '@/components/sections/FAQ'
import { FinalCTA } from '@/components/sections/FinalCTA'

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <ProblemSolution />
        <Metrics />
        <Features />
        <HowItWorks />
        <ROICalculator />
        <BoosifyMockup />
        <Pricing />
        <Testimonials />
        <FAQ />
        <FinalCTA />
      </main>
      <Footer />
      <MobileBottomBar />
    </>
  )
}
