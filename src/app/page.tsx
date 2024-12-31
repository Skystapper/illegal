import Hero from '@/components/Hero'
import Services from '@/components/Services'
import Consultation from '@/components/Consultation'
import Pricing from '@/components/Pricing'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <Services />
      <Consultation />
      <Pricing />
    </main>
  )
}
