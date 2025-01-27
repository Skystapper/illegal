'use client'
import { motion } from 'framer-motion'
import { FileText } from 'lucide-react'
import SearchBox from '@/components/SearchBox'
import { goodsClasses, servicesClasses } from './data'
import { useEffect } from 'react'

export default function TrademarkClasses() {
  useEffect(() => {
    const storedClass = sessionStorage.getItem('scrollToClass')
    if (storedClass) {
      sessionStorage.removeItem('scrollToClass')
      const element = document.getElementById(`class-${storedClass}`)
      if (element) {
        const yOffset = -100
        const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset
        
        setTimeout(() => {
          window.scrollTo({
            top: y,
            behavior: 'smooth'
          })
          
          element.classList.add('highlight-class')
          setTimeout(() => {
            element.classList.remove('highlight-class')
          }, 2000)
        }, 100)
      }
    }
  }, [])

  return (
    <main className="min-h-screen bg-white">
      <section className="py-20">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-16"
          >
            <div className="flex flex-col items-center justify-center mb-8">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.2 }}
                className="bg-burgundy-50 rounded-full p-4 mb-4"
              >
                <FileText className="w-8 h-8 text-burgundy-600" />
              </motion.div>
              <motion.h1 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-burgundy-600 to-burgundy-800 bg-clip-text text-transparent"
              >
                Trademark Classification Guide
              </motion.h1>
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="w-24 h-1 bg-burgundy-600 rounded mb-6"
              />
              <motion.p 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
                className="text-gray-600 max-w-3xl mx-auto text-lg"
              >
                Understanding trademark classes is crucial for protecting your intellectual property. 
                E-Legal India provides comprehensive guidance on trademark classification to ensure 
                your brand receives the right protection.
              </motion.p>
            </div>
          </motion.div>

          <div className="max-w-2xl mx-auto mb-12">
            <SearchBox />
          </div>

          {/* Goods Classes Section */}
          <div className="mb-16">
            <h2 className="text-2xl font-bold mb-8">Goods Classification (Classes 1-34)</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-burgundy-50">
                    <th className="border border-gray-200 p-4 text-left">Class</th>
                    <th className="border border-gray-200 p-4 text-left">Title</th>
                    <th className="border border-gray-200 p-4 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {goodsClasses.map((item) => (
                    <tr 
                      key={item.class} 
                      id={`class-${item.class}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="border border-gray-200 p-4 font-medium">{item.class}</td>
                      <td className="border border-gray-200 p-4">{item.title}</td>
                      <td className="border border-gray-200 p-4 text-gray-600">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Services Classes Section */}
          <div>
            <h2 className="text-2xl font-bold mb-8">Services Classification (Classes 35-45)</h2>
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="bg-burgundy-50">
                    <th className="border border-gray-200 p-4 text-left">Class</th>
                    <th className="border border-gray-200 p-4 text-left">Title</th>
                    <th className="border border-gray-200 p-4 text-left">Description</th>
                  </tr>
                </thead>
                <tbody>
                  {servicesClasses.map((item) => (
                    <tr 
                      key={item.class}
                      id={`class-${item.class}`}
                      className="hover:bg-gray-50"
                    >
                      <td className="border border-gray-200 p-4 font-medium">{item.class}</td>
                      <td className="border border-gray-200 p-4">{item.title}</td>
                      <td className="border border-gray-200 p-4 text-gray-600">{item.description}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
} 