'use client'
import { motion } from 'framer-motion'
import { FileText, User, Building, Image as ImageIcon } from 'lucide-react'

const documents = [
  {
    icon: User,
    title: "Individual Documents",
    items: [
      "Proof of Identity (Aadhaar/PAN)",
      "Proof of Address",
      "Recent Photograph",
      "Signature Specimen"
    ]
  },
  {
    icon: Building,
    title: "Business Documents",
    items: [
      "Business Registration Certificate",
      "GST Registration (if applicable)",
      "Partnership Deed/MOA/AOA",
      "Board Resolution (for companies)"
    ]
  },
  {
    icon: ImageIcon,
    title: "Trademark Assets",
    items: [
      "Clear Image of Logo/Mark",
      "Description of Goods/Services",
      "User Affidavit (if in use)",
      "Priority Document (if applicable)"
    ]
  },
  {
    icon: FileText,
    title: "Additional Requirements",
    items: [
      "Power of Attorney",
      "No Objection Certificate",
      "Supporting Documents",
      "Declaration Forms"
    ]
  }
]

export default function DocumentsRequired() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Required Documents</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Prepare these documents to ensure a smooth registration process
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {documents.map((doc, index) => (
            <motion.div
              key={doc.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-gray-50 rounded-lg p-6"
            >
              <doc.icon className="w-12 h-12 text-burgundy-500 mb-4" />
              <h3 className="text-xl font-semibold mb-4">{doc.title}</h3>
              <ul className="space-y-3">
                {doc.items.map((item) => (
                  <li key={item} className="flex items-center text-gray-600">
                    <div className="w-2 h-2 bg-burgundy-500 rounded-full mr-3" />
                    {item}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 