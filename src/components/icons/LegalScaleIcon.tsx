'use client'
import { motion } from 'framer-motion'

export const LegalScaleIcon = () => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    initial={{ y: -5 }}
    animate={{ y: 0 }}
    transition={{
      repeat: Infinity,
      repeatType: "reverse",
      duration: 2,
      ease: "easeInOut"
    }}
  >
    <motion.path
      d="M24 4L36 12V20C36 27.732 31.732 34.292 24 36.8C16.268 34.292 12 27.732 12 20V12L24 4Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ pathLength: 0 }}
      animate={{ pathLength: 1 }}
      transition={{ duration: 2, ease: "easeInOut" }}
    />
    <motion.path
      d="M24 16V24M24 24L18 20M24 24L30 20"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 1, duration: 1 }}
    />
  </motion.svg>
) 