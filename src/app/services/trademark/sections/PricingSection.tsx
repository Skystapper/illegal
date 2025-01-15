'use client'
import { motion } from 'framer-motion'
import Pricing from '@/components/Pricing'

export default function PricingSection() {
  return (
    <section className="py-20 bg-white w-full">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="text-center mb-16"
      >
        <h2 className="text-3xl font-bold mb-4">Transparent Pricing</h2>
        <p className="text-gray-600 mx-auto">
          Choose the plan that best suits your trademark registration needs
        </p>
      </motion.div>

      <div className="w-full">
        <Pricing />
      </div>
    </section>
  )
} 