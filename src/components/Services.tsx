import Link from 'next/link'

const ServiceCard = ({ icon, title, description }: { icon: React.ReactNode, title: string, description: string }) => {
  return (
    <div className="bg-white p-8 rounded-lg shadow-md hover:shadow-xl transform hover:-translate-y-2 transition-all duration-300 ease-in-out">
      <div className="mb-6 text-brown-600">
        {icon}
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-4">{title}</h3>
      <p className="text-gray-600 mb-6">{description}</p>
      <Link 
        href="#" 
        className="text-brown-600 hover:text-brown-700 flex items-center uppercase text-sm font-medium"
      >
        LEARN MORE 
        <span className="ml-2">→</span>
      </Link> 
    </div>
  )
}

const Services = () => {
  return (
    <section className="py-12 md:py-16 bg-gray-50">
      <div className="container mx-auto px-4">
        {/* Main Content - Updated spacing and text sizes */}
        <div className="max-w-3xl mx-auto text-center mb-12 md:mb-16">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">India's Largest Professional Platform</h2>
          <p className="text-sm md:text-base text-gray-600 leading-relaxed px-4">
            At e-Legal India, we specialize in delivering tailored, reliable solutions for businesses at every stage of their journey. Our customer-centric platform, powered by advanced machine learning, ensures efficiency and precision in meeting your business needs.
          </p>
        </div>

        {/* Service Cards - Updated grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 md:gap-8">
          <ServiceCard
            icon={
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 7V3H2v18h20V7H12zM6 19H4v-2h2v2zm0-4H4v-2h2v2zm0-4H4V9h2v2zm0-4H4V5h2v2zm4 12H8v-2h2v2zm0-4H8v-2h2v2zm0-4H8V9h2v2zm0-4H8V5h2v2zm10 12h-8v-2h2v-2h-2v-2h2v-2h-2V9h8v10zm-2-8h-2v2h2v-2zm0 4h-2v2h2v-2z"/>
              </svg>
            }
            title="Starting a Business"
            description="Streamlined company registration and foundational services."
          />
          <ServiceCard
            icon={
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M3.5 18.49l6-6.01 4 4L22 6.92l-1.41-1.41-7.09 7.97-4-4L2 16.99z"/>
              </svg>
            }
            title="Business Growth"
            description="Expert guidance for GST registration, accounting, and compliance."
          />
          <ServiceCard
            icon={
              <svg className="w-12 h-12" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 1L3 5v6c0 5.55 3.84 10.74 9 12 5.16-1.26 9-6.45 9-12V5l-9-4zm0 10.99h7c-.53 4.12-3.28 7.79-7 8.94V12H5V6.3l7-3.11v8.8z"/>
              </svg>
            }
            title="Business Protection"
            description="Safeguard your intellectual property with trademark and copyright registration services."
          />
        </div>
      </div>
    </section>
  )
}

export default Services 