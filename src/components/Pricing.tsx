'use client'
import { motion } from 'framer-motion'
import PricingCard from './PricingCard'
import { defaultPricingPlans } from '@/data/defaultPricingPlans'

const Pricing = () => {
  return (
    <section id="pricing-section" className="py-16 md:py-24 px-4 md:px-8 bg-gray-50">
      <div className="max-w-[1600px] mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center max-w-3xl mx-auto mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-3 md:mb-4">
            Simple, Transparent Pricing
          </h2>
          <p className="text-gray-600 text-center mb-4 text-base md:text-lg">
            Choose the perfect plan for your business needs
          </p>
          <p className="text-sm text-gray-500">
            All plans include expert support and guidance throughout the process
          </p>
        </motion.div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6 md:gap-x-8 md:gap-y-16 relative pt-12">
          {defaultPricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              className="flex justify-center pt-8"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              whileHover={{ y: -5 }}
            >
              <div className="w-full max-w-none">
                <PricingCard
                  title={plan.name}
                  price={plan.price.toString()}
                  features={plan.features}
                  isPopular={plan.name === 'PLATINUM'}
                  popularReason="Best value for most businesses"
                />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Additional Info Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center"
        >
          <p className="text-sm text-gray-500">
            * Government fees are additional and vary based on your business type and location
          </p>
          <p className="text-sm text-gray-500 mt-2">
            Need a custom plan? <a href="/contact" className="text-burgundy-600 hover:text-burgundy-700 font-medium">Contact us</a>
          </p>
        </motion.div>
      </div>
    </section>
  )
}

export default Pricing 