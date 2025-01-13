'use client'
import Image from 'next/image'
import { useEffect, useState } from 'react'

const Consultation = () => {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const scrollToHero = () => {
    const heroSection = document.getElementById('hero-section')
    if (heroSection) {
      const offset = 100
      const elementPosition = heroSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Trigger the highlight animation after scrolling
      setTimeout(() => {
        window.dispatchEvent(new Event('highlightForm'))
      }, 800) // Adjust timing based on scroll duration
    }
  }

  if (!isMounted) {
    return null // or a loading state
  }

  return (
    <section className="py-16 md:py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-8 md:gap-12">
          {/* Image Section - Updated height for mobile */}
          <div className="lg:w-1/2 relative w-full">
            <div className="relative h-[400px] md:h-[600px] w-full overflow-hidden rounded-md shadow-lg">
              <Image
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                alt="Business Consultants Team Meeting"
                fill
                quality={100}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transform hover:scale-105 transition-transform duration-700"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              {/* Simple border accent */}
              <div className="absolute inset-0 border-2 border-yellow-400 rounded-md transform translate-x-4 translate-y-4 -z-10"></div>
            </div>
          </div>

          {/* Content Section - Updated spacing and text sizes */}
          <div className="lg:w-1/2 space-y-4 md:space-y-6 text-center lg:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#2D2D3D] leading-tight">
              The Highly Qualified Team of{' '}
              <span className="text-[#8B4513]">
                Business Consultants
              </span>
            </h2>
            
            <p className="text-sm md:text-base text-gray-600">
              Our dedicated team of experts at e-Legal India offers unparalleled support to entrepreneurs 
              and business owners. With a deep understanding of regulatory frameworks and industry 
              standards, we provide solutions designed to help your business succeed.
            </p>

            <p className="text-sm md:text-base text-gray-600">
              From incorporating your company to ensuring compliance and protecting your intellectual 
              assets, we're here to empower you with trusted, professional services.
            </p>

            <button
              onClick={scrollToHero}
              className="w-full sm:w-auto px-6 md:px-8 py-3 bg-yellow-400 text-[#2D2D3D] rounded-md 
                hover:bg-yellow-500 transition-colors duration-300 
                font-medium text-base md:text-lg border border-yellow-500"
            >
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Consultation 