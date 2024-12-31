'use client'
import { useEffect, useRef } from 'react'
import Image from 'next/image'

const Consultation = () => {
  const sectionRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in')
          }
        })
      },
      { threshold: 0.1 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div ref={sectionRef} className="flex flex-col lg:flex-row items-center gap-12 opacity-0 transition-all duration-1000">
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
            
            <p className="text-lg text-gray-700 leading-relaxed">
              Our dedicated team of experts at e-Legal India offers unparalleled support to entrepreneurs and business owners. With a deep understanding of regulatory frameworks and industry standards, we provide solutions designed to help your business succeed.
            </p>
            
            <p className="text-lg text-gray-700 leading-relaxed">
              From incorporating your company to ensuring compliance and protecting your intellectual assets, we're here to empower you with trusted, professional services.
            </p>

            {/* Clean, Professional Button */}
            <button className="mt-8 px-8 py-3 bg-yellow-400 text-[#2D2D3D] rounded-md 
              hover:bg-yellow-500 transition-colors duration-300 
              font-medium text-lg border border-yellow-500">
              Schedule a Consultation
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Consultation 