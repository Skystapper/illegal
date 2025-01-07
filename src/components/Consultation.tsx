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
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-[600px] w-full overflow-hidden rounded-md shadow-lg">
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

          {/* Content Section */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-[#2D2D3D] leading-tight">
              The Highly Qualified Team of{' '}
              <span className="text-[#8B4513]">
                Business Consultants
              </span>
            </h2>
            
            <p className="text-gray-600">
              Our dedicated team of experts at e-Legal India offers unparalleled support to entrepreneurs 
              and business owners. With a deep understanding of regulatory frameworks and industry 
              standards, we provide solutions designed to help your business succeed.
            </p>

            <p className="text-gray-600">
              From incorporating your company to ensuring compliance and protecting your intellectual 
              assets, we're here to empower you with trusted, professional services.
            </p>

            <button
              onClick={scrollToHero}
              className="px-8 py-3 bg-yellow-400 text-[#2D2D3D] rounded-md 
                hover:bg-yellow-500 transition-colors duration-300 
                font-medium text-lg border border-yellow-500"
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