'use client'
import { motion } from 'framer-motion'
import { useState } from 'react'
import { Plus, Minus } from 'lucide-react'

const faqs = [
  {
    question: "What is a Trademark?",
    answer: "A trademark is a distinctive sign, symbol, word, or combination thereof that identifies and distinguishes the goods or services of one business from those of others. It provides legal protection for your brand identity."
  },
  {
    question: "How long does trademark registration take?",
    answer: "The complete trademark registration process typically takes 18-24 months. However, you can start using the ™ symbol as soon as you file the application."
  },
  {
    question: "What can be registered as a Trademark?",
    answer: "You can register names, logos, symbols, letters, numbers, colors, shapes, packaging, sounds, and even smells as trademarks, provided they are distinctive and can identify your goods or services."
  },
  {
    question: "How long is a trademark valid?",
    answer: "A registered trademark is valid for 10 years from the date of filing. It can be renewed indefinitely for subsequent periods of 10 years by paying the renewal fee."
  },
  {
    question: "Can I amend my trademark application after filing?",
    answer: "Minor amendments are possible, but substantial changes to the trademark or addition of new classes are not permitted after filing. You would need to file a new application for major changes."
  },
  {
    question: "What rights does trademark registration provide?",
    answer: "Registration gives you exclusive rights to use the trademark, take legal action against infringement, license or sell the trademark, and use the ® symbol."
  }
]

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(null)

  return (
    <section className="relative py-20 bg-gray-50 z-10 overflow-hidden">
      <div className="container mx-auto px-4 relative">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16 relative z-10"
        >
          <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Find answers to common questions about trademark registration
          </p>
        </motion.div>

        <div className="max-w-3xl mx-auto relative z-10">
          {faqs.map((faq, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="mb-4 relative"
            >
              <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 hover:bg-gray-50 transition-colors duration-200"
                >
                  <span className="text-lg font-semibold text-left pr-8">
                    {faq.question}
                  </span>
                  <span className="flex-shrink-0">
                    {openIndex === index ? (
                      <Minus className="w-5 h-5 text-burgundy-500" />
                    ) : (
                      <Plus className="w-5 h-5 text-burgundy-500" />
                    )}
                  </span>
                </button>
                
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{
                    height: openIndex === index ? 'auto' : 0,
                    opacity: openIndex === index ? 1 : 0
                  }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-6 border-t border-gray-100">
                    <p className="text-gray-600">{faq.answer}</p>
                  </div>
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 