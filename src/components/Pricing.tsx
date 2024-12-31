'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import PricingCard from './PricingCard'

const Pricing = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const pricingData = [
    {
      title: "Basic",
      price: "1,499",
      features: [
        "Trademark Application Filing",
        "Free Class Search",
        "Free TM Consultation By expert",
        "Drafting & Filing by TM Expert",
        "Use TM next to your brand",
        "Call, Chat, Email Support",
        "No hidden charges"
      ]
    },
    {
      title: "Standard",
      price: "1,999",
      features: [
        "Trademark Application Filing",
        "Creative Logo Design By dedicated Logo Designer (3 Logo design choices)",
        "Expertise TM Search Report",
        "Free Class Search",
        "Free Consultation till you get TM Mark",
        "Drafting & Filing by TM Expert",
        "Use TM next to your brand",
        "Call, Chat, Email Support",
        "No hidden charges"
      ]
    },
    {
      title: "Trademark Registration & Objection",
      price: "2,999",
      features: [
        "Trademark Application Filing",
        "Expertise TM Search Report",
        "Free Class Search",
        "Free Consultation till you get TM Mark",
        "Drafting & Filing by TM Expert",
        "Use TM next to your brand",
        "Trademark Objection Reply"
      ]
    },
    {
      title: "Premium",
      price: "5,499",
      features: [
        "Trademark Application Filing",
        "Expertise TM Search Report",
        "Free Class Search",
        "Free Consultation till you get TM Mark",
        "Drafting & Filing by TM Expert",
        "Use TM next to your brand",
        "Trademark Objection Reply",
        "Trademark Hearing",
        "Call, Chat, Email Support",
        "No hidden charges"
      ]
    },
    {
      title: "All In One",
      price: "5999",
      features: [
        "Trademark Application Filing",
      "Creative Logo Design By dedicated Logo Designer (3 Logo design choices)",
      "Expertise TM Search Report",
      "Free Class Search",
      "Free Consultation till you get TM Mark",
      "Drafting & Filing by TM Expert",
      "Use TM next to your brand",
      "Trademark Objection Reply",
      "Trademark Hearing",
      "Call, Chat, Email Support",
      "No hidden charges"
      ]
    }
  ]

  return (
    <section className="py-24 px-8 bg-gray-50">
      <div className="max-w-[1600px] mx-auto">
        <h2 className="text-4xl font-bold text-center mb-4">
          Simple, Transparent Pricing
        </h2>
        <p className="text-gray-600 text-center mb-16 text-lg">
          Choose the perfect plan for your business needs
        </p>
        
        {mounted && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-x-12 gap-y-16">
            {pricingData.map((plan, index) => (
              <div className="flex justify-center" key={index}>
                <PricingCard
                  title={plan.title}
                  price={plan.price}
                  features={plan.features}
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}

export default Pricing 