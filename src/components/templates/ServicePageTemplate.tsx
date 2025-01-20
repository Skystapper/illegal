'use client'
import { motion, useScroll, useTransform } from 'framer-motion'
import { ConsultationForm } from '@/components/ConsultationForm'
import { useInView } from 'react-intersection-observer'
import { 
  Building,
  ArrowRight,
  ArrowDown,
  Check,
  X,
  FileText
} from 'lucide-react'
import Pricing from '@/components/Pricing'
import Image from 'next/image'
import { useRouter } from 'next/navigation'

interface ServicePageProps {
  title: string
  subtitle?: string
  heroImage: string
  stats: Array<{
    number: string
    text: string
  }>
  features: Array<{
    icon: any
    title: string
    description: string
  }>
  comparisonData: Array<{
    title: string
    image: string
    benefits: string[]
    isPrimary: boolean
  }>
  processList: string[]
  documentsList: string[]
}

export default function ServicePageTemplate({
  title,
  subtitle = "100% Online. 100% Secure. 100% Guaranteed",
  heroImage,
  stats,
  features,
  comparisonData,
  processList,
  documentsList
}: ServicePageProps) {
  const { scrollY } = useScroll()
  const y1 = useTransform(scrollY, [0, 300], [0, 100])
  const opacity = useTransform(scrollY, [0, 300], [1, 0])

  const [benefitsRef, benefitsInView] = useInView({
    triggerOnce: true,
    threshold: 0.1
  })

  const router = useRouter()

  const handleContactClick = () => {
    router.push('/contact#contact-form')
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[80vh] flex items-center overflow-hidden py-20">
        <motion.div 
          style={{ y: y1, opacity }}
          className="absolute inset-0 z-0"
        >
          <Image
            src={heroImage}
            alt={title}
            fill
            className="object-cover brightness-75"
            priority
          />
        </motion.div>
        
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy-900/70 to-burgundy-800/70" />
        
        <div className="container mx-auto px-4 z-10 relative">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Column - Content */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8 }}
            >
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
                {title}
              </h1>
              <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
                Start your dream company with e-legal india…
                <span className="block mt-2">{subtitle}</span>
              </p>
              
              {/* Stats Grid */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    whileHover={{ y: -5 }}
                    className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20"
                  >
                    <h3 className="text-2xl font-bold text-yellow-400 mb-2">{stat.number}</h3>
                    <p className="text-white/80 text-sm">{stat.text}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>

            {/* Right Column - Form */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="lg:justify-self-end w-full max-w-md"
            >
              <ConsultationForm 
                shouldHighlight={false}
                defaultService={title}
                isServiceLocked={true}
                formTitle={
                  <div className="flex items-center gap-2 mb-6">
                    <Building className="w-6 h-6 text-burgundy-600" />
                    <h3 className="text-xl font-semibold text-gray-800">
                      Register {title}
                    </h3>
                  </div>
                }
              />
            </motion.div>
          </div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/60"
        >
          <ArrowDown className="w-6 h-6" />
        </motion.div>
      </section>

      {/* Overview Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Fastest {title} Registration<br />In India
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Register your startup company with e-legal india™ at the lowest Fees. Take your business to the next level with hassle-free registration services by e-legal india™, a trusted MCA & MSME-registered company.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 max-w-6xl mx-auto">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-all group"
              >
                <feature.icon className="w-12 h-12 text-burgundy-600 mb-4" />
                <h3 className="text-lg font-bold mb-3 text-gray-900 whitespace-pre-line">
                  {feature.title}
                </h3>
                <p className="text-gray-600 text-sm mb-4">
                  {feature.description}
                </p>
                <div className="group-hover:translate-x-1 transition-transform">
                  <ArrowRight className="w-5 h-5 text-burgundy-600" />
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Business Structure Comparison */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Why Choose {title}?
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Compare different business structures to make an informed decision
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {comparisonData.map((type, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="relative group"
              >
                <div className={`rounded-xl overflow-hidden ${
                  type.isPrimary ? 'ring-2 ring-burgundy-500' : ''
                }`}>
                  <div className="relative h-48 overflow-hidden">
                    <Image
                      src={type.image}
                      alt={type.title}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  </div>
                  <div className="p-6 bg-white">
                    <h3 className={`text-xl font-bold mb-4 ${
                      type.isPrimary ? 'text-burgundy-600' : 'text-gray-900'
                    }`}>
                      {type.title}
                    </h3>
                    <ul className="space-y-3">
                      {type.benefits.map((benefit, i) => (
                        <motion.li
                          key={i}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: i * 0.1 }}
                          className="flex items-center text-sm"
                        >
                          {(type.isPrimary && i < 6) || (!type.isPrimary && i < 3) ? (
                            <Check className="w-5 h-5 text-green-500 mr-3 flex-shrink-0" />
                          ) : (
                            <X className="w-5 h-5 text-red-500 mr-3 flex-shrink-0" />
                          )}
                          <span className="text-gray-600">{benefit}</span>
                        </motion.li>
                      ))}
                    </ul>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Process Steps */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Process of Registering {title}
            </h2>
          </motion.div>

          <div className="max-w-5xl mx-auto">
            {processList.map((step, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.2 }}
                className="flex items-center mb-8 last:mb-0"
              >
                <div className="relative">
                  <div className="w-12 h-12 bg-burgundy-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  {index !== processList.length - 1 && (
                    <div className="absolute top-12 left-1/2 h-8 w-0.5 bg-burgundy-200" />
                  )}
                </div>
                <div className="ml-6 bg-white p-6 rounded-lg shadow-lg flex-1">
                  <p className="text-gray-700">{step}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Required Documents */}
      <section className="py-24 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6">
              Required Documents
            </h2>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {documentsList.map((doc, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                whileHover={{ y: -5 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                className="bg-white p-6 rounded-lg shadow-lg flex items-center space-x-4
                         border border-gray-100 hover:border-burgundy-200 transition-colors"
              >
                <FileText className="w-8 h-8 text-burgundy-600" />
                <span className="text-gray-700">{doc}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <Pricing />

      {/* Final CTA */}
      <section className="py-24 bg-burgundy-600 relative overflow-hidden">
        <motion.div
          animate={{ 
            backgroundPosition: ['0% 0%', '100% 100%'],
            opacity: [0.3, 0.8]
          }}
          transition={{ 
            duration: 10,
            repeat: Infinity,
            repeatType: "reverse"
          }}
          className="absolute inset-0 bg-gradient-to-r from-burgundy-500 to-burgundy-700"
          style={{ 
            backgroundSize: '400% 400%'
          }}
        />
        <div className="container mx-auto px-4 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h2 className="text-3xl md:text-5xl font-bold text-white mb-8">
              Ready to Start Your Business Journey?
            </h2>
            <p className="text-xl text-white/90 mb-12 max-w-2xl mx-auto">
              Join thousands of successful businesses who trust e-legal india™
            </p>
            <motion.button
              onClick={handleContactClick}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-yellow-400 text-gray-900 px-8 py-4 rounded-lg text-lg font-medium
                       hover:bg-yellow-500 transition-colors"
            >
              Get Started Now
            </motion.button>
          </motion.div>
        </div>
      </section>
    </div>
  )
} 