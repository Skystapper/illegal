'use client'
import { motion } from 'framer-motion'
import { FiLock } from 'react-icons/fi'

export default function ServicesPage() {
  return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="max-w-md w-full bg-white rounded-lg shadow-sm p-8 text-center"
      >
        <div className="mb-6">
          <div className="w-16 h-16 bg-burgundy-100 rounded-full flex items-center justify-center mx-auto">
            <FiLock className="w-8 h-8 text-burgundy-600" />
          </div>
        </div>
        
        <h1 className="text-2xl font-bold text-burgundy-900 mb-4">
          Services Update Disabled
        </h1>
        
        <p className="text-gray-600 mb-6">
          The services section is currently disabled for updates. This feature will be enabled in a future update. Please contact the development team for any urgent service modifications.
        </p>
        
        <div className="bg-burgundy-50 rounded-lg p-4">
          <p className="text-sm text-burgundy-700">
            For immediate assistance or service updates, please email:
            <br />
            <a 
              href="mailto:developer@example.com" 
              className="font-medium text-burgundy-600 hover:text-burgundy-700"
            >
              developer@example.com
            </a>
          </p>
        </div>
      </motion.div>
    </div>
  )
}
