'use client'
import { motion } from 'framer-motion'
import { StarIcon, MoonIcon, SparklesIcon } from '@heroicons/react/24/outline'

interface FloatingElementProps {
  className?: string;
  style?: React.CSSProperties;
}

export const FloatingParticle: React.FC<FloatingElementProps> = ({ className, style }) => (
  <motion.div
    className={`absolute ${className}`}
    style={style}
    animate={{
      y: [0, -30, 0],
      opacity: [0, 1, 0],
    }}
    transition={{
      duration: Math.random() * 3 + 2,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <SparklesIcon className="w-3 h-3" />
  </motion.div>
)

export const FloatingOrb: React.FC<FloatingElementProps> = ({ className, style }) => (
  <motion.div
    className={`absolute rounded-full bg-white/10 backdrop-blur-sm ${className}`}
    style={style}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.5, 0.3],
    }}
    transition={{
      duration: Math.random() * 5 + 3,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
)

export const WaterEffect: React.FC<FloatingElementProps> = ({ className }) => (
  <motion.div
    className={`absolute w-full ${className}`}
    animate={{
      y: [0, 10, 0],
    }}
    transition={{
      duration: 5,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  >
    <svg viewBox="0 0 1440 320" className="w-full h-auto fill-current opacity-10">
      <path d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z" />
    </svg>
  </motion.div>
)

export const GlowingOrb: React.FC<FloatingElementProps> = ({ className, style }) => (
  <motion.div
    className={`absolute ${className}`}
    style={{
      ...style,
      filter: 'blur(40px)',
    }}
    animate={{
      scale: [1, 1.2, 1],
      opacity: [0.3, 0.7, 0.3],
    }}
    transition={{
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut"
    }}
  />
) 