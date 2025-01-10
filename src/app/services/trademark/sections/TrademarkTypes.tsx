'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Briefcase, HeartHandshake, Award, Shapes, Music, Palette } from 'lucide-react'

const types = [
  {
    title: "Product Mark",
    icon: Briefcase,
    description: "Identifies and distinguishes goods from different manufacturers",
    imageUrl: "/images/trademark/product-mark.svg",
  },
  {
    title: "Service Mark",
    icon: HeartHandshake,
    description: "Identifies and distinguishes services from different providers",
    imageUrl: "/images/trademark/service-mark.svg",
  },
  {
    title: "Certification Mark",
    icon: Award,
    description: "Certifies goods/services meet specific standards",
    imageUrl: "/images/trademark/certification-mark.svg",
  },
  {
    title: "Pattern Mark",
    icon: Shapes,
    description: "Protects unique patterns and designs",
    imageUrl: "/images/trademark/pattern-mark.svg",
  },
  {
    title: "Sound Mark",
    icon: Music,
    description: "Protects distinctive sounds and jingles",
    imageUrl: "/images/trademark/sound-mark.svg",
  },
  {
    title: "Color Mark",
    icon: Palette,
    description: "Protects specific color combinations",
    imageUrl: "/images/trademark/color-mark.svg",
  }
]

export default function TrademarkTypes() {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl font-bold mb-4">Types of Trademarks</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Choose the right type of trademark protection for your business needs
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {types.map((type, index) => (
            <motion.div
              key={type.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow"
            >
              <div className="flex items-center justify-center mb-4">
                {/* Fallback to Lucide icon if image fails to load */}
                <div className="relative w-16 h-16">
                  <type.icon className="w-16 h-16 text-burgundy-500" />
                </div>
              </div>
              <h3 className="text-xl font-semibold mb-2 text-center">{type.title}</h3>
              <p className="text-gray-600 text-center">{type.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 