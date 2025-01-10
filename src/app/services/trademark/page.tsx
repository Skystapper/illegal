'use client'
import Image from 'next/image'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Search, 
  Globe, 
  Award,
  Clock,
  CheckCircle,
  FileText,
  AlertCircle
} from 'lucide-react'
import HeroSection from './sections/HeroSection'
import ProcessTimeline from './sections/ProcessTimeline'
import TrademarkTypes from './sections/TrademarkTypes'
import BenefitsGrid from './sections/BenefitsGrid'
import PricingSection from './sections/PricingSection'
import FAQSection from './sections/FAQSection'
import DocumentsRequired from './sections/DocumentsRequired'
import WhyChooseUs from './sections/WhyChooseUs'
import TrademarkSymbols from './sections/TrademarkSymbols'
import EligibilitySection from './sections/EligibilitySection'

export default function TrademarkRegistration() {
  return (
    <main className="min-h-screen bg-white">
      <HeroSection />
      <EligibilitySection />
      <TrademarkTypes />
      <ProcessTimeline />
      <TrademarkSymbols />
      <PricingSection />
      <DocumentsRequired />
      <WhyChooseUs />
      <FAQSection />
    </main>
  )
}