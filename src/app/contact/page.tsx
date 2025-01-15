'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'
import { ContactForm } from '@/components/ContactForm'
import { SocialLinks } from '@/components/SocialLinks'
import { Toaster } from 'react-hot-toast'
import { 
  FaPhoneAlt, 
  FaEnvelope, 
  FaMapMarkerAlt 
} from 'react-icons/fa'

const playfair = Playfair_Display({ subsets: ['latin'] })

const contactInfo = [
  {
    icon: <FaPhoneAlt className="w-5 h-5" />,
    title: "Call Us",
    details: [
      "+91 099242 22695"
    ]
  },
  {
    icon: <FaEnvelope className="w-5 h-5" />,
    title: "Email Us",
    details: [
      "contact@elegal.in",
      "support@elegal.in"
    ]
  },
  {
    icon: <FaMapMarkerAlt className="w-5 h-5" />,
    title: "Visit Us",
    details: [
      "306, Silver Trade Center,",
      "Opp Utran Power Station Mota Varachha Road,",
      "VIP Cir, Surat, Gujarat 394105"
    ]
  }
]

export default function ContactPage() {
  return (
    <>
      <Toaster position="top-right" />
      
      {/* Hero Section with Pexels Image */}
      <section className="relative h-[60vh] min-h-[500px] flex items-center justify-center overflow-hidden">
      <Image
  src="https://images.pexels.com/photos/48148/document-agreement-documents-sign-48148.jpeg"
  alt="Legal documents"
  fill
  className="object-cover"
  priority
/>
        
        {/* Overlay */}
        <div className="absolute inset-0 bg-burgundy-900/70" />
        
        {/* Content */}
        <div className="relative z-10 container mx-auto px-4 text-center">
          <motion.h1 
            className={`${playfair.className} text-7xl md:text-8xl font-bold text-white mb-6`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            Get in Touch
          </motion.h1>
          <motion.p 
            className="text-xl text-white/90 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
          </motion.p>
        </div>
      </section>

      {/* Contact Info Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8">
            {contactInfo.map((info, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="text-center p-6 rounded-xl hover:shadow-lg transition-shadow duration-300"
              >
                <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-burgundy-50 flex items-center justify-center text-burgundy-600">
                  {info.icon}
                </div>
                <h3 className="text-xl font-semibold text-burgundy-900 mb-3">
                  {info.title}
                </h3>
                {info.details.map((detail, i) => (
                  <p key={i} className="text-burgundy-600">
                    {detail}
                  </p>
                ))}
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Social Links Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.h2 
            className={`${playfair.className} text-3xl font-bold text-burgundy-900 text-center mb-8`}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Connect With Us
          </motion.h2>
          <SocialLinks />
        </div>
      </section>

      {/* Form Section */}
      <section className="py-24 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
              className="bg-white rounded-2xl shadow-xl p-8 md:p-12"
            >
              <h2 className={`${playfair.className} text-3xl font-bold text-burgundy-900 mb-8`}>
                Send Us a Message
              </h2>
              <ContactForm />
            </motion.div>
          </div>
        </div>
      </section>
    </>
  )
}
