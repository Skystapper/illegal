'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ConsultationForm } from './ConsultationForm'

const Hero = () => {
  const [shouldHighlight, setShouldHighlight] = useState(false)

  useEffect(() => {
    const handleHighlight = () => {
      setShouldHighlight(true)
      setTimeout(() => setShouldHighlight(false), 1000)
    }

    window.addEventListener('highlightForm', handleHighlight)
    return () => window.removeEventListener('highlightForm', handleHighlight)
  }, [])

  return (
    <section id="hero-section" className="relative h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/intellectual.jpg"
            alt="Legal Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="text-white md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            We help when<br />
            You need us
          </h1>
          <p className="text-lg mb-8 text-gray-200 max-w-xl">
            The highly qualified team of Legal, attorneys and consultants will be glad to provide necessary legal assistance.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded hover:bg-gray-100 transition-colors font-medium">
            PURCHASE NOW
          </button>
        </div>

        {/* Right Content - Form */}
        <ConsultationForm shouldHighlight={shouldHighlight} />
      </div>
    </section>
  )
}

export default Hero 