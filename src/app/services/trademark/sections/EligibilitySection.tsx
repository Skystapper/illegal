'use client'
import { motion } from 'framer-motion'
import { Check, User, Building, Globe, AlertCircle } from 'lucide-react'

const eligibleEntities = [
  {
    icon: User,
    title: "Individuals",
    description: "Any individual above 18 years",
    requirements: [
      "Valid ID proof",
      "Address proof",
      "Photograph"
    ]
  },
  {
    icon: Building,
    title: "Companies",
    description: "Registered companies and LLPs",
    requirements: [
      "Registration certificate",
      "Board resolution",
      "Director details"
    ]
  },
  {
    icon: Globe,
    title: "Foreign Entities",
    description: "International businesses and individuals",
    requirements: [
      "Power of attorney",
      "Company documents",
      "Address in India"
    ]
  }
]

const restrictions = [
  "Generic terms or common words",
  "Deceptively similar marks",
  "Offensive or illegal content",
  "National symbols or emblems"
]

export default function EligibilitySection() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Eligibility Criteria</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Understand who can apply for trademark registration in India
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {eligibleEntities.map((entity, index) => (
            <motion.div
              key={entity.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <entity.icon className="w-12 h-12 text-burgundy-500 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{entity.title}</h3>
              <p className="text-gray-600 mb-4">{entity.description}</p>
              <ul className="space-y-2">
                {entity.requirements.map((req) => (
                  <li key={req} className="flex items-center text-gray-600">
                    <Check className="w-4 h-4 text-green-500 mr-2" />
                    {req}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="bg-red-50 rounded-lg p-8"
        >
          <div className="flex items-center mb-6">
            <AlertCircle className="w-8 h-8 text-red-500 mr-3" />
            <h3 className="text-xl font-semibold">Non-Registrable Marks</h3>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {restrictions.map((restriction) => (
              <div
                key={restriction}
                className="flex items-center text-gray-700"
              >
                <div className="w-2 h-2 bg-red-500 rounded-full mr-3" />
                {restriction}
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
} 