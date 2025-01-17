'use client'
import { motion } from 'framer-motion'
import { Search, FileText, Clock, CheckCircle } from 'lucide-react'

const steps = [
  {
    icon: Search,
    title: "Trademark Search",
    description: "Comprehensive search to verify trademark availability",
    duration: "24-48 hours",
    color: "text-blue-500"
  },
  {
    icon: FileText,
    title: "Application Filing",
    description: "Complete documentation and submission to registry",
    duration: "3-5 days",
    color: "text-green-500"
  },
  {
    icon: Clock,
    title: "Examination",
    description: "Review by trademark examiner",
    duration: "6-12 months",
    color: "text-yellow-500"
  },
  {
    icon: CheckCircle,
    title: "Registration",
    description: "Final approval and certificate issuance",
    duration: "18-24 months",
    color: "text-purple-500"
  }
]

export default function ProcessTimeline() {
  return (
    <section className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-12 md:mb-16"
        >
          <h2 className="text-2xl md:text-3xl font-bold mb-4">Registration Process</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our streamlined process ensures efficient trademark registration
          </p>
        </motion.div>

        <div className="relative max-w-5xl mx-auto">
          {/* Timeline Line - Hidden on mobile */}
          <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-gray-200" />

          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              className={`relative flex flex-col md:flex-row items-center mb-8 md:mb-12 ${
                index % 2 === 0 ? 'md:flex-row-reverse' : ''
              }`}
            >
              {/* Timeline Dot - Hidden on mobile */}
              <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-4 h-4 rounded-full bg-white border-4 border-gray-200" />

              <div className="w-full md:w-1/2 px-4 md:px-8">
                <div className={`p-6 bg-white rounded-lg shadow-lg ${
                  index % 2 === 0 ? 'md:text-right' : 'md:text-left'
                }`}>
                  <div className={`flex items-center ${
                    index % 2 === 0 ? 'md:justify-end' : 'justify-start'
                  } mb-4`}>
                    <step.icon className={`w-8 h-8 ${step.color}`} />
                  </div>
                  <h3 className="text-lg md:text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600 text-sm md:text-base mb-3">{step.description}</p>
                  <div className="text-sm font-medium text-gray-500">
                    Duration: {step.duration}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 