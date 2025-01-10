'use client'
import { motion } from 'framer-motion'

const symbols = [
  {
    symbol: "™",
    title: "Trademark Symbol",
    description: "Used for unregistered trademarks to claim ownership rights",
    usage: "Can be used immediately after filing application",
    color: "bg-blue-50 text-blue-600"
  },
  {
    symbol: "®",
    title: "Registered Trademark",
    description: "Indicates official registration and legal protection",
    usage: "Can only be used after trademark registration is granted",
    color: "bg-green-50 text-green-600"
  },
  {
    symbol: "℠",
    title: "Service Mark",
    description: "Identifies services rather than products",
    usage: "Used for unregistered service marks",
    color: "bg-purple-50 text-purple-600"
  }
]

export default function TrademarkSymbols() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Understanding Trademark Symbols</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Learn when and how to use different trademark symbols
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {symbols.map((item, index) => (
            <motion.div
              key={item.symbol}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-white rounded-lg shadow-lg overflow-hidden"
            >
              <div className={`p-8 ${item.color}`}>
                <div className="text-6xl font-bold text-center mb-4">
                  {item.symbol}
                </div>
                <h3 className="text-xl font-semibold text-center">{item.title}</h3>
              </div>
              <div className="p-6">
                <p className="text-gray-600 mb-4">{item.description}</p>
                <div className="text-sm font-medium">
                  <span className="text-gray-500">Usage: </span>
                  {item.usage}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
} 