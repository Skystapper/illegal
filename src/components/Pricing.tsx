'use client'
import { motion } from 'framer-motion'
import PricingCard from './PricingCard'
import { defaultPricingPlans } from '@/data/defaultPricingPlans'

const Pricing = () => {
  return (
    <section className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-600 text-center mb-12 md:mb-16 text-base md:text-lg">
          Choose the perfect plan for your business needs
        </p>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-x-12 md:gap-y-16">
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