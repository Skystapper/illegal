'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PricingCard from './PricingCard'
import { PricingPlan } from '@/types/pricing'

const Pricing = () => {
  const [mounted, setMounted] = useState(false)
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMounted(true)
    fetchPlans()
  }, [])

  async function fetchPlans() {
    try {
      setIsLoading(true)
      setError(null)
      // Force fresh data with cache: 'no-store' and timestamp
      const res = await fetch(`/api/pricing-plans?t=${Date.now()}`, {
        cache: 'no-store',
        next: { revalidate: 0 } // Disable Next.js cache
      })
      
      if (!res.ok) throw new Error('Failed to fetch plans')
      const data = await res.json()
      setPlans(data.sort((a: PricingPlan, b: PricingPlan) => a.orderIndex - b.orderIndex))
    } catch (err) {
      console.error('Error fetching pricing plans:', err)
      setError(err instanceof Error ? err.message : 'Failed to load pricing plans')
    } finally {
      setIsLoading(false)
    }
  }

  const getFeatures = (plan: PricingPlan): string[] => {
    if (typeof plan.features === 'string') {
      try {
        return JSON.parse(plan.features)
      } catch (e) {
        console.error('Error parsing features:', e)
        return []
      }
    }
    return plan.features as string[]
  }

  if (!mounted) return null

  return (
    <section className="py-24 px-8 bg-gray-50">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-600 text-center mb-16 text-lg">
          Choose the perfect plan for your business needs
        </p>
        
        {isLoading ? (
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy-600 mx-auto"></div>
            <p className="mt-4 text-gray-600">Loading pricing plans...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12">
            <p className="text-red-600">{error}</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-12 gap-y-16">
            {plans.map((plan, index) => (
              <motion.div
                key={plan.id}
                className="flex justify-center"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
              >
                <PricingCard
                  title={plan.name}
                  price={plan.price.toString()}
                  features={getFeatures(plan)}
                />
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Pricing 