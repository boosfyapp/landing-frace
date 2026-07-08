import dynamic from 'next/dynamic'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { MobileBottomBar } from '@/components/layout/MobileBottomBar'
import { Hero } from '@/components/sections/Hero'
import { ProblemSolution } from '@/components/sections/ProblemSolution'
import { Metrics } from '@/components/sections/Metrics'

// Below-fold interactive sections loaded lazily → split into separate JS chunks
const Features     = dynamic(() => import('@/components/sections/Features').then(m => ({ default: m.Features })))
const HowItWorks   = dynamic(() => import('@/components/sections/HowItWorks').then(m => ({ default: m.HowItWorks })))
const ROICalculator = dynamic(() => import('@/components/sections/ROICalculator').then(m => ({ default: m.ROICalculator })))
const BoosifyMockup = dynamic(() => import('@/components/sections/BoosifyMockup').then(m => ({ default: m.BoosifyMockup })))
const Pricing      = dynamic(() => import('@/components/sections/Pricing').then(m => ({ default: m.Pricing })))
const Testimonials = dynamic(() => import('@/components/sections/Testimonials').then(m => ({ default: m.Testimonials })))
const FAQ          = dynamic(() => import('@/components/sections/FAQ').then(m => ({ default: m.FAQ })))
const FinalCTA     = dynamic(() => import('@/components/sections/FinalCTA').then(m => ({ default: m.FinalCTA })))

export default function Page() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Features />
        <ProblemSolution />
        <Metrics />
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
