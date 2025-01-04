'use client'

import { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { usePathname } from 'next/navigation'

const serviceCategories = [
  {
    title: "Company Registration",
    services: [
      "Private Limited Company",
      "Public Limited Company",
      "One Person Company",
      "Partnership Firm",
      "Limited Liability Partnership",
      "Sole Proprietorship"
    ]
  },
  {
    title: "Certification",
    services: [
      "ISO Certification",
      "Digital Signature Certificate",
      "Shop Act",
      "Trademark",
      "IE Code"
    ]
  },
  {
    title: "Legal Services",
    services: [
      "Rent Deed Drafting",
      "Partnership Deed Drafting",
      "Sale Deed Drafting",
      "Lease Deed Drafting",
      "Joint Venture Deed",
      "Legal Notice"
    ]
  }
]




export default function Navbar() {
  const pathname = usePathname()
  const [isServicesClicked, setIsServicesClicked] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsServicesClicked(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <nav className="bg-[#2D2D3D] text-white py-4 sticky top-0 z-50">
      <div className="container mx-auto px-4 flex items-center justify-between">
        {/* Logo Section */}
        <Link href="/" className="flex items-center space-x-2">
          <div className="relative w-10 h-10">
            <Image 
              src="/image.png"
              alt="Wise Solutions Logo"
              fill
              priority
              style={{ objectFit: 'contain' }}
            />
          </div>
          <div>
            <h1 className="text-2xl font-bold">E-Legal India</h1>
          </div>
        </Link>

        {/* Navigation Links */}
        <div className="hidden md:flex items-center space-x-6">
          <Link 
            href="/" 
            className={`hover:text-yellow-400 transition-colors ${pathname === '/' ? 'text-yellow-400' : ''}`}
          >
            HOME
          </Link>
          <Link 
            href="/about" 
            className={`hover:text-yellow-400 transition-colors ${pathname === '/about' ? 'text-yellow-400' : ''}`}
          >
            ABOUT US
          </Link>

          {/* Trademark Link - Now before ALL SERVICES */}
          <Link 
            href="/services/trademark" 
            className={`hover:text-yellow-400 transition-colors ${pathname === '/services/trademark-registration' ? 'text-yellow-400' : ''}`}
          >
            TRADEMARK
          </Link>
          
          {/* Services Dropdown */}
          <div 
            ref={dropdownRef}
            className="relative group"
          >
            <button 
              onClick={() => setIsServicesClicked(!isServicesClicked)}
              className={`hover:text-yellow-400 transition-colors ${pathname.startsWith('/services') && pathname !== '/services/trademark-registration' ? 'text-yellow-400' : ''}`}
            >
              ALL SERVICES
            </button>
            
            {/* Dropdown Menu */}
            <div 
              className={`absolute top-full left-0 mt-2 w-[800px] bg-white rounded-lg shadow-xl 
                         transform -translate-x-1/3 transition-all duration-200 ease-in-out
                         ${isServicesClicked ? 'opacity-100 visible' : 'opacity-0 invisible group-hover:opacity-100 group-hover:visible'}`}
                         onMouseLeave={() => {
                          if (!isServicesClicked) {
                            setIsServicesClicked(false)
                          }
                         }}
            >
              <div className="grid grid-cols-3 gap-4 p-6">
                {serviceCategories.map((category, index) => (
                  <div key={index} className="text-gray-800">
                    <h3 className="font-bold text-lg mb-3 text-burgundy-600">{category.title}</h3>
                    <ul className="space-y-2">
                      {category.services.map((service, serviceIndex) => (
                        <li key={serviceIndex}>
                          <Link 
                            href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                            className="hover:text-burgundy-600 transition-colors text-sm"
                            onClick={() => setIsServicesClicked(false)}
                          >
                            {service}
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
            className={`hover:text-yellow-400 transition-colors ${pathname === '/contact' ? 'text-yellow-400' : ''}`}
          >
            CONTACT US
          </Link>
          <Link 
            href="/consultation" 
            className="bg-yellow-400 text-black px-4 py-2 rounded-md hover:bg-yellow-500 transition-colors"
          >
            FREE CONSULTATION
          </Link>
        </div>
      </div>
    </nav>
  )
} 