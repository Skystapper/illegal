'use client'
import { motion } from 'framer-motion'
import PricingCard from './PricingCard'
import { defaultPricingPlans } from '@/data/defaultPricingPlans'

const Pricing = () => {
  return (
    <section className="py-24 px-8 bg-gray-50">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-600 text-center mb-16 text-lg">
          Choose the perfect plan for your business needs
        </p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-12 gap-y-16">
          {defaultPricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="flex justify-center"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-full max-w-none">
                <PricingCard
                  title={plan.name}
                  price={plan.price.toString()}
                  features={plan.features}
                />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}

export default Pricing 