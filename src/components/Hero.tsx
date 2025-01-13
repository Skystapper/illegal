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
    <section id="hero-section" className="relative min-h-[700px] flex items-center py-16 md:py-24">
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
          <div className="absolute inset-0 bg-black/50" />
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between gap-8 md:gap-16">
        {/* Left Content */}
        <div className="text-white w-full md:w-1/2 text-center md:text-left">
          <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6 md:mb-8 leading-tight">
            We help when<br />
            <span className="text-yellow-400">You need us</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 md:mb-10 text-gray-100 max-w-2xl mx-auto md:mx-0 leading-relaxed">
            The highly qualified team of Legal, attorneys and consultants will be glad to provide necessary legal assistance.
          </p>
          <button className="w-full sm:w-auto bg-yellow-400 hover:bg-yellow-500 text-gray-900 px-10 py-4 rounded-lg text-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:shadow-lg">
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