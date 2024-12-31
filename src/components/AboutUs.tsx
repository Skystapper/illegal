'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const AboutUs = () => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const fadeInUp = {
    initial: { opacity: 0, y: 60 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.6 }
  }

  const staggerChildren = {
    animate: {
      transition: {
        staggerChildren: 0.2
      }
    }
  }

  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-gray-50 to-white py-24 px-8">
      {/* Animated background elements */}
      {mounted && (
        <>
          {/* Floating orbs */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={`orb-${i}`}
              className="absolute rounded-full bg-burgundy-600/10"
              style={{
                width: Math.random() * 300 + 50,
                height: Math.random() * 300 + 50,
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                x: [0, Math.random() * 100 - 50],
                y: [0, Math.random() * 100 - 50],
                scale: [1, 1.2, 1],
              }}
              transition={{
                duration: Math.random() * 10 + 10,
                repeat: Infinity,
                repeatType: "reverse",
              }}
            />
          ))}

          {/* Particle trails */}
          {[...Array(30)].map((_, i) => (
            <motion.div
              key={`particle-${i}`}
              className="absolute w-1 h-1 bg-burgundy-600/20"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
              }}
              animate={{
                scale: [0, 1.5, 0],
                opacity: [0, 1, 0],
                x: [0, Math.random() * 200 - 100],
                y: [0, Math.random() * 200 - 100],
              }}
              transition={{
                duration: 4,
                repeat: Infinity,
                delay: i * 0.2,
              }}
            />
          ))}
        </>
      )}

      {/* Content */}
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center"
        >
          {/* Left column - Text content */}
          <div className="space-y-8">
            <motion.h1 
              variants={fadeInUp}
              className="text-5xl font-bold text-gray-900"
            >
              Leading the Way in Legal Innovation
            </motion.h1>

            <motion.p 
              variants={fadeInUp}
              className="text-xl text-gray-600"
            >
              At E-Legal India, we're revolutionizing the way legal services are delivered. Our cutting-edge platform combines expertise with technology to make legal solutions accessible and efficient.
            </motion.p>

            <motion.div 
              variants={fadeInUp}
              className="grid grid-cols-2 gap-8"
            >
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-burgundy-600">10K+</h3>
                <p className="text-gray-600">Successful Registrations</p>
              </div>
              <div className="space-y-2">
                <h3 className="text-4xl font-bold text-burgundy-600">98%</h3>
                <p className="text-gray-600">Client Satisfaction</p>
              </div>
            </motion.div>

            <motion.div 
              variants={fadeInUp}
              className="flex gap-4"
            >
              <button className="px-8 py-3 bg-burgundy-600 text-white rounded-full hover:bg-burgundy-700 transition-colors">
                Get Started
              </button>
              <button className="px-8 py-3 border-2 border-burgundy-600 text-burgundy-600 rounded-full hover:bg-burgundy-50 transition-colors">
                Learn More
              </button>
            </motion.div>
          </div>

          {/* Right column - Interactive element */}
          <motion.div
            variants={fadeInUp}
            className="relative"
          >
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-burgundy-100">
              {/* Animated grid lines */}
              {mounted && [...Array(10)].map((_, i) => (
                <motion.div
                  key={`grid-${i}`}
                  className="absolute inset-0 border-burgundy-200/30"
                  style={{
                    borderWidth: '0.5px',
                    transform: `rotate(${i * 18}deg)`,
                  }}
                  animate={{
                    rotate: [`${i * 18}deg`, `${i * 18 + 360}deg`],
                  }}
                  transition={{
                    duration: 20 + i * 2,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                />
              ))}

              {/* Central icon/logo */}
              <motion.div
                className="absolute inset-0 flex items-center justify-center"
                animate={{
                  scale: [1, 1.1, 1],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 20,
                  repeat: Infinity,
                  ease: "linear",
                }}
              >
                <div className="w-32 h-32 bg-burgundy-600 rounded-xl" />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>

        {/* Features section */}
        <motion.div
          variants={staggerChildren}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
          className="mt-32 grid grid-cols-1 md:grid-cols-3 gap-8"
        >
          {[
            {
              title: "Expert Team",
              description: "Our team of legal experts brings years of experience and dedication to every case."
            },
            {
              title: "Innovation First",
              description: "We leverage cutting-edge technology to provide efficient and effective legal solutions."
            },
            {
              title: "Client Success",
              description: "Your success is our priority. We're committed to achieving the best possible outcomes."
            }
          ].map((feature, index) => (
            <motion.div
              key={index}
              variants={fadeInUp}
              className="p-8 rounded-2xl bg-white shadow-xl hover:shadow-2xl transition-shadow"
            >
              <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}

export default AboutUs