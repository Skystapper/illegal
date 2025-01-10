'use client'
import { motion } from 'framer-motion'
import { 
  Shield, 
  Clock, 
  Users, 
  Headphones,
  Briefcase,
  Award
} from 'lucide-react'

const benefits = [
  {
    icon: Shield,
    title: "Expert Legal Team",
    description: "Our experienced trademark attorneys ensure comprehensive protection for your brand"
  },
  {
    icon: Clock,
    title: "Fast Processing",
    description: "Efficient handling of applications with regular status updates"
  },
  {
    icon: Users,
    title: "Dedicated Support",
    description: "Personal case manager assigned to handle your registration"
  },
  {
    icon: Headphones,
    title: "24/7 Assistance",
    description: "Round-the-clock support for all your trademark queries"
  },
  {
    icon: Briefcase,
    title: "Complete Solution",
    description: "End-to-end trademark services from search to registration"
  },
  {
    icon: Award,
    title: "Success Rate",
    description: "High success rate in trademark registrations across industries"
  }
]

export default function WhyChooseUs() {
  return (
    <section className="py-20 bg-burgundy-900 text-white">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl font-bold mb-4">Why Choose E-Legal India</h2>
          <p className="text-gray-300 max-w-2xl mx-auto">
            Partner with us for hassle-free trademark registration and protection
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              className="bg-burgundy-800 rounded-lg p-6 hover:bg-burgundy-700 transition-colors"
            >
              <benefit.icon className="w-12 h-12 text-yellow-400 mb-4" />
              <h3 className="text-xl font-semibold mb-2">{benefit.title}</h3>
              <p className="text-gray-300">{benefit.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mt-12"
        >
          <button className="bg-yellow-400 text-black px-8 py-4 rounded-lg font-semibold hover:bg-yellow-300 transition-colors">
            Start Your Registration Now
          </button>
        </motion.div>
      </div>
    </section>
  )
} 