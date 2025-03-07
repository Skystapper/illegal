'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname, useRouter } from 'next/navigation'
import { motion } from 'framer-motion'
import SearchBox from './SearchBox'

const serviceCategories = [
  {
    title: "Legal & Documentation",
    services: [
      {
        name: "Trademark Registration",
        route: "trademark"
      },
      {
        name: "Digital Signature Certificate",
        route: "digital-signature-certificate"
      },
      {
        name: "Rent Deed Drafting",
        route: "rent-deed-drafting"
      },
      {
        name: "Partnership Deed Drafting",
        route: "partnership-deed-drafting"
      },
      {
        name: "Sale Deed Drafting",
        route: "sale-deed-drafting"
      },
      {
        name: "Lease Deed Drafting",
        route: "lease-deed-drafting"
      },
      {
        name: "Legal Notice",
        route: "legal-notice"
      }
    ]
  },
  {
    title: "Company Registration",
    services: [
      {
        name: "Private Limited Company",
        route: "private-limited-company"
      },
      {
        name: "Public Limited Company",
        route: "public-limited-company"
      },
      {
        name: "One Person Company",
        route: "one-person-company"
      },
      {
        name: "Partnership Firm",
        route: "partnership-firm"
      },
      {
        name: "Limited Liability Partnership",
        route: "limited-liability-partnership"
      },
      {
        name: "Sole Proprietorship",
        route: "sole-proprietorship"
      }
    ]
  }
]




export default function Navbar() {
  const router = useRouter()
  const pathname = usePathname()
  const [isServicesClicked, setIsServicesClicked] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleConsultationClick = () => {
    setIsMobileMenuOpen(false)
    if (pathname !== '/') {
      // Navigate to homepage
      router.push('/')
      // Store the scroll intent in sessionStorage
      sessionStorage.setItem('scrollToConsultation', 'true')
    } else {
      // Already on homepage, just scroll
      scrollToForm()
    }
  }

  useEffect(() => {
    // Check if we need to scroll after navigation
    if (pathname === '/' && sessionStorage.getItem('scrollToConsultation')) {
      sessionStorage.removeItem('scrollToConsultation')
      // Small delay to ensure page is loaded
      setTimeout(scrollToForm, 100)
    }
  }, [pathname])

  const scrollToForm = () => {
    const heroSection = document.getElementById('hero-section')
    if (heroSection) {
      const offset = 100
      const elementPosition = heroSection.getBoundingClientRect().top
      const offsetPosition = elementPosition + window.pageYOffset - offset

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      })

      // Trigger highlight
      setTimeout(() => {
        window.dispatchEvent(new Event('highlightForm'))
      }, 500)
    }
  }

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesClicked(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const navLinkClasses = "relative font-medium transition-colors duration-200 text-white hover:text-yellow-400"

  return (
    <nav className="fixed top-0 left-0 right-0 bg-[#2D2D3D] shadow-md z-50">
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative w-10 h-10">
              <Image 
                src="/image.png"
                alt="E-Legal Logo"
                fill
                priority
                className="object-contain"
              />
            </div>
            <div className="flex flex-col text-white">
              <span className="text-xl font-bold">E-Legal India</span>
              {/* <span className="text-sm">India</span> */}
            </div>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-8">
            <Link 
              href="/" 
              className={`${navLinkClasses} ${pathname === '/' ? 'text-yellow-400' : 'text-white'}`}
            >
              HOME
            </Link>
            <Link 
              href="/about" 
              className={`${navLinkClasses} ${pathname === '/about' ? 'text-yellow-400' : 'text-white'}`}
            >
              ABOUT US
            </Link>
            
            {/* Trademark Link */}
            <Link 
              href="/services/trademark" 
              className={`${navLinkClasses} ${pathname === '/services/trademark' ? 'text-yellow-400' : 'text-white'}`}
            >
              TRADEMARK
            </Link>

            {/* Services Dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button 
                onClick={() => setIsServicesClicked(!isServicesClicked)}
                className={`${navLinkClasses} flex items-center space-x-1 ${
                  pathname.startsWith('/services') ? 'text-yellow-400' : 'text-white'
                }`}
              >
                <span>SERVICES</span>
                <svg 
                  className={`w-4 h-4 transition-transform duration-200 ${isServicesClicked ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {/* Dropdown Menu */}
              <div 
                className={`absolute top-full left-0 mt-2 w-[800px] bg-white rounded-lg shadow-xl 
                           transform -translate-x-1/3 transition-all duration-200 ease-in-out
                           ${isServicesClicked ? 'opacity-100 visible' : 'opacity-0 invisible'}`}
                           onMouseLeave={() => {
                            if (!isServicesClicked) {
                              setIsServicesClicked(false)
                            }
                           }}
              >
                <div className="p-4 border-b border-gray-200">
                  <SearchBox onClose={() => setIsServicesClicked(false)} />
                </div>
                <div className="grid grid-cols-2 gap-12 p-8">
                  {serviceCategories.map((category, index) => (
                    <div key={index} className="text-gray-800">
                      <h3 className="text-xl font-bold mb-6 text-burgundy-600 border-b-2 border-burgundy-200 pb-3">
                        {category.title}
                      </h3>
                      <ul className="space-y-4">
                        {category.services.map((service, serviceIndex) => (
                          <li key={serviceIndex}>
                            <Link 
                              href={`/services/${service.route}`}
                              className="text-base hover:text-burgundy-600 transition-colors flex items-center group"
                              onClick={() => setIsServicesClicked(false)}
                            >
                              <span className="w-2 h-2 rounded-full bg-gray-300 mr-3 group-hover:bg-burgundy-600 transition-colors"></span>
                              <span className="font-medium hover:translate-x-1 transition-transform duration-200">
                                {service.name}
                              </span>
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <Link 
              href="/contact" 
              className={`${navLinkClasses} ${pathname === '/contact' ? 'text-yellow-400' : 'text-white'}`}
            >
              CONTACT
            </Link>

            <button
              onClick={handleConsultationClick}
              className="bg-yellow-400 text-[#2D2D3D] px-6 py-2.5 rounded-lg font-medium 
                hover:bg-yellow-500 transition-colors duration-300"
            >
              FREE CONSULTATION
            </button>
          </div>

          {/* Mobile Menu Button */}
          <button 
            className="lg:hidden p-2 hover:bg-[#3D3D4D] rounded-lg text-white"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isMobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden border-t border-gray-700 py-4">
            <div className="space-y-1">
              <Link 
                href="/" 
                className="block px-4 py-2 text-white hover:bg-[#3D3D4D]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                HOME
              </Link>
              <Link 
                href="/about" 
                className="block px-4 py-2 text-white hover:bg-[#3D3D4D]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                ABOUT US
              </Link>

              {/* Trademark Link */}
              <Link 
                href="/services/trademark" 
                className="block px-4 py-2 text-white hover:bg-[#3D3D4D]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                TRADEMARK
              </Link>

              {/* Mobile Services Menu */}
              <div>
                <button
                  onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                  className="w-full px-4 py-2 flex justify-between items-center text-white hover:bg-[#3D3D4D]"
                >
                  ALL SERVICES
                  <svg 
                    className={`w-4 h-4 transition-transform duration-200 ${isMobileServicesOpen ? 'rotate-180' : ''}`}
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </button>
                {isMobileServicesOpen && (
                  <div className="bg-[#3D3D4D] py-2">
                    {serviceCategories.map((category) => (
                      <div key={category.title} className="px-6 py-2">
                        <h3 className="text-yellow-400 text-sm font-semibold mb-2">{category.title}</h3>
                        <ul className="space-y-1">
                          {category.services.map((service) => (
                            <li key={service.name}>
                              <Link
                                href={`/services/${service.route}`}
                                className="block py-1 text-sm text-white hover:text-yellow-400"
                                onClick={() => {
                                  setIsMobileServicesOpen(false)
                                  setIsMobileMenuOpen(false)
                                }}
                              >
                                {service.name}
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Link 
                href="/contact" 
                className="block px-4 py-2 text-white hover:bg-[#3D3D4D]"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                CONTACT
              </Link>
              
              <div className="px-4 pt-2">
                <button
                  onClick={handleConsultationClick}
                  className="w-full bg-yellow-400 text-[#2D2D3D] px-4 py-2 rounded-lg font-medium 
                    hover:bg-yellow-500 transition-colors duration-300"
                >
                  FREE CONSULTATION
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </nav>
  )
}   