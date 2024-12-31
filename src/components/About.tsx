'use client'
import { useRef } from 'react'
import { motion, useScroll, useTransform } from 'framer-motion'
import Image from 'next/image'
import { Playfair_Display } from 'next/font/google'
import { LegalScaleIcon, HandshakeIcon, AwardIcon } from './icons'

const playfair = Playfair_Display({ subsets: ['latin'] })

const About = () => {
  const containerRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  })

  const backgroundY = useTransform(scrollYProgress, [0, 1], ['0%', '100%'])
  const textY = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])

  return (
    <div ref={containerRef} className="relative">
      {/* Hero Section */}
      <section className="relative h-screen overflow-hidden">
        <motion.div 
          className="absolute inset-0 z-0"
          style={{ y: backgroundY }}
        >
          <Image
            src="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg"
            alt="Modern Legal Office"
            fill
            className="object-cover"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-b from-burgundy-900/70 to-burgundy-900/90" />
        </motion.div>

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white px-4">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1 }}
            className="text-center max-w-4xl"
          >
            <h1 className={`${playfair.className} text-6xl md:text-7xl font-bold mb-8`}>
              Simplifying Business Legal Compliance
            </h1>
            <p className="text-xl md:text-2xl leading-relaxed">
              Expert guidance in company registration, trademark filing, and legal documentation. 
              Making legal processes seamless for businesses across India.
            </p>
          </motion.div>
        </div>

        <motion.div
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          <div className="w-6 h-10 border-2 border-white rounded-full flex justify-center">
            <div className="w-1 h-3 bg-white rounded-full mt-2" />
          </div>
        </motion.div>
      </section>

      {/* Main Content */}
      <section className="relative bg-white">
        <div className="container mx-auto px-4 py-24">
          {/* Vision Statement */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="max-w-4xl mx-auto text-center mb-24"
          >
            <h2 className={`${playfair.className} text-4xl md:text-5xl font-bold text-gray-900 mb-8`}>
              Your Partner in Business Legal Documentation
            </h2>
            <p className="text-xl text-gray-600 leading-relaxed">
              From startup registration to trademark protection, we handle all your legal documentation 
              needs with precision and expertise. Our mission is to ensure your business stays 
              compliant while you focus on growth.
            </p>
          </motion.div>

          {/* Services Grid */}
          <div className="grid md:grid-cols-3 gap-8 mb-24">
            {[
              {
                icon: <LegalScaleIcon />,
                title: "Documentation Excellence",
                description: "Expert handling of company registrations, GST filing, trademark applications, and all essential business legal documents with meticulous attention to detail."
              },
              {
                icon: <HandshakeIcon />,
                title: "Business Compliance",
                description: "Ensuring your business meets all legal requirements with comprehensive compliance checks, timely renewals, and proper documentation maintenance."
              },
              {
                icon: <AwardIcon />,
                title: "Proven Track Record",
                description: "Successfully processed over 1000+ company registrations and trademark applications with a 95% first-time approval rate."
              }
            ].map((service, index) => (
              <motion.div
                key={index}
                className="relative bg-white rounded-xl p-8 shadow-lg group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
                whileHover={{ y: -5 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-burgundy-600/5 to-transparent rounded-xl transform transition-transform group-hover:scale-105" />
                <div className="relative z-10">
                  <div className="text-burgundy-600 mb-6">
                    {service.icon}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-4">
                    {service.title}
                  </h3>
                  <p className="text-gray-600">
                    {service.description}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          {/* Statistics */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
            className="bg-burgundy-900 text-white rounded-2xl p-12 mb-24"
          >
            <div className="grid md:grid-cols-4 gap-8">
              {[
                { number: "5000+", label: "Documents Processed" },
                { number: "95%", label: "Success Rate" },
                { number: "1000+", label: "Company Registrations" },
                { number: "2000+", label: "Trademarks Filed" }
              ].map((stat, index) => (
                <motion.div
                  key={index}
                  className="text-center"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <motion.div
                    className={`${playfair.className} text-4xl font-bold mb-2`}
                    initial={{ scale: 0.5 }}
                    whileInView={{ scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    {stat.number}
                  </motion.div>
                  <p className="text-burgundy-100">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>

          {/* Team Section */}
          <div className="text-center mb-16">
            <h2 className={`${playfair.className} text-4xl font-bold text-gray-900 mb-8`}>
              Our Expert Team
            </h2>
            <div className="grid md:grid-cols-3 gap-12">
              {[
                {
                  name: "Rajesh Kumar",
                  role: "Documentation Head",
                  image: "https://images.pexels.com/photos/5668858/pexels-photo-5668858.jpeg"
                },
                {
                  name: "Priya Sharma",
                  role: "Trademark Specialist",
                  image: "https://images.pexels.com/photos/5669619/pexels-photo-5669619.jpeg"
                },
                {
                  name: "Amit Patel",
                  role: "Compliance Expert",
                  image: "https://images.pexels.com/photos/5668867/pexels-photo-5668867.jpeg"
                }
              ].map((member, index) => (
                <motion.div
                  key={index}
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <div className="relative h-80 mb-6 overflow-hidden rounded-xl">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                    />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {member.name}
                  </h3>
                  <p className="text-burgundy-600">{member.role}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default About 