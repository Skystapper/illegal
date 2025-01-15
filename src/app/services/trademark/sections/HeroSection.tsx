'use client'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { ConsultationForm } from '@/components/ConsultationForm'
import { Briefcase } from 'lucide-react'

export default function HeroSection() {
  return (
    <section className="relative min-h-[80vh] flex items-center overflow-hidden py-20">
      {/* Background Image */}
      <motion.div 
        className="absolute inset-0 z-0"
      >
        <Image
          src="https://images.unsplash.com/photo-1497366216548-37526070297c?auto=format&fit=crop&q=100"
          alt="Hero background"
          fill
          className="object-cover brightness-75"
          priority
        />
        <div className="absolute inset-0 bg-gradient-to-r from-burgundy-900/70 to-burgundy-800/70" />
      </motion.div>
      
      <div className="container mx-auto px-4 z-10 relative">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6">
              Protect Your Brand with Trademark Registration
            </h1>
            <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl">
              Secure your brand identity and get exclusive rights to your business name, logo, and symbols across India
            </p>
            
            {/* Stats Grid */}
            <div className="grid grid-cols-3 gap-6 mt-12">
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20"
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">10+</h3>
                <p className="text-white/80 text-sm">Years Protection</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20"
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">45</h3>
                <p className="text-white/80 text-sm">Classes Available</p>
              </motion.div>
              <motion.div
                whileHover={{ y: -5 }}
                className="bg-white/10 backdrop-blur-md rounded-xl p-4 text-center border border-white/20"
              >
                <h3 className="text-2xl font-bold text-yellow-400 mb-2">24h</h3>
                <p className="text-white/80 text-sm">Expert Support</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Right Column - Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="lg:justify-self-end w-full max-w-md"
          >
            <ConsultationForm 
              shouldHighlight={false}
              defaultService="Trademark"
              isServiceLocked={true}
              formTitle={
                <div className="flex items-center gap-2 mb-6">
                  <Briefcase className="w-6 h-6 text-burgundy-600" />
                  <h3 className="text-xl font-semibold text-gray-800">
                    Register Trademark
                  </h3>
                </div>
              }
            />
          </motion.div>
        </div>
      </div>
    </section>
  )
} 