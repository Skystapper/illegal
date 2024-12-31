"use client"
import { motion } from 'framer-motion'

interface PricingCardProps {
  title: string;
  price: string;
  features: string[];
}

const PricingCard = ({ title, price, features }: PricingCardProps) => {
    return (
        <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-[380px] bg-white rounded-3xl shadow-lg overflow-hidden" 
      >
        <div className="relative">
          <div className="bg-burgundy-600 p-6 pb-16 relative overflow-hidden">
            {/* Multiple sweeping light beams */}
            {[...Array(3)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute -inset-full"
                animate={{
                  x: ['-100%', '200%'],
                  y: [
                    i === 0 ? '-100%' : '0%',
                    i === 0 ? '200%' : '100%'
                  ],
                }}
                transition={{
                  duration: 7,
                  delay: i * 2.5,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              >
                <div 
                  className={`
                    absolute transform 
                    ${i === 0 ? '-rotate-45' : i === 1 ? 'rotate-45' : 'rotate-0'}
                    w-[60%] h-[200px]
                    bg-gradient-to-r from-transparent via-white/20 to-transparent
                  `}
                  style={{
                    left: `${Math.random() * 100}%`,
                    top: `${Math.random() * 100}%`,
                  }}
                />
              </motion.div>
            ))}
  
            {/* Floating particles */}
            {[...Array(15)].map((_, i) => (
              <motion.div
                key={`particle-${i}`}
                className="absolute w-1 h-1 bg-white rounded-full"
                style={{
                  left: `${Math.random() * 100}%`,
                  top: `${Math.random() * 100}%`,
                }}
                animate={{
                  y: [-20, 20],
                  x: [-20, 20],
                  opacity: [0, 1, 0],
                  scale: [0, 1.5, 0],
                }}
                transition={{
                  duration: 4,
                  delay: i * 0.3,
                  repeat: Infinity,
                  ease: "easeInOut"
                }}
              />
            ))}
  
            {/* Content */}
            <div className="relative z-10">
        <h3 className="text-2xl text-white mb-6">{title}</h3> {/* Increased margin */}
        <div className="flex items-baseline text-white">
          <span className="text-5xl font-bold">₹{price}</span> {/* Increased font size */}
          <span className="ml-2 text-base">+ gov. fees</span> {/* Increased spacing and font size */}
        </div>
      </div>
    </div>
  
          {/* Wave separator remains the same */}
          <div className="absolute -bottom-1 left-0 right-0">
            <svg
              viewBox="0 0 400 50"
              className="w-full h-auto"
              preserveAspectRatio="none"
            >
              <path
                d="M0,0 
                   C50,0 100,25 150,10
                   C200,-5 250,35 300,20
                   C350,5 375,25 400,15
                   L400,50 L0,50 Z"
                className="fill-white"
              />
              <path
                d="M0,15
                   C25,20 75,5 125,15
                   C175,25 225,0 275,10
                   C325,20 350,5 400,0
                   L400,50 L0,50 Z"
                className="fill-white opacity-40"
              />
            </svg>
          </div>
        </div>
  

      {/* Features list */}
      <div className="px-6 pt-2 pb-8 bg-white">
        <ul className="space-y-4">
          {features.map((feature, index) => (
            <li key={index} className="flex items-start text-gray-700">
              <svg 
                className="w-5 h-5 mr-2 text-burgundy-600 mt-0.5 shrink-0" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M5 13l4 4L19 7" 
                />
              </svg>
              <span>{feature}</span>
            </li>
          ))}
        </ul>
      </div>
    </motion.div>
  );
};

export default PricingCard; 