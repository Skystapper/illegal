import { motion } from 'framer-motion'
import Link from 'next/link'

const serviceCategories = [
  {
    title: "Company Registration",
    description: "Complete assistance in registering your business entity with proper legal compliance.",
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
    description: "Essential certifications and registrations for your business operations.",
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
    description: "Professional legal documentation and drafting services.",
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

export default function ServicesPage() {
  return (
    <main className="min-h-screen py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-16">Our Services</h1>
        
        <div className="grid md:grid-cols-3 gap-8">
          {serviceCategories.map((category, index) => (
            <div 
              key={index}
              className="bg-white rounded-xl shadow-lg overflow-hidden"
            >
              <div className="p-6">
                <h2 className="text-2xl font-bold text-burgundy-600 mb-4">{category.title}</h2>
                <p className="text-gray-600 mb-6">{category.description}</p>
                <ul className="space-y-3">
                  {category.services.map((service, serviceIndex) => (
                    <li key={serviceIndex}>
                      <Link 
                        href={`/services/${service.toLowerCase().replace(/\s+/g, '-')}`}
                        className="text-gray-700 hover:text-burgundy-600 transition-colors flex items-center"
                      >
                        <svg 
                          className="w-4 h-4 mr-2 text-burgundy-600" 
                          fill="none" 
                          viewBox="0 0 24 24" 
                          stroke="currentColor"
                        >
                          <path 
                            strokeLinecap="round" 
                            strokeLinejoin="round" 
                            strokeWidth={2} 
                            d="M9 5l7 7-7 7" 
                          />
                        </svg>
                        {service}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  )
} 