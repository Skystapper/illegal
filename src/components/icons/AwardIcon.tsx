'use client'
import { motion } from 'framer-motion'

export const AwardIcon = () => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ rotate: 360 }}
    transition={{ duration: 1 }}
  >
    <motion.circle
      cx="24"
      cy="24"
      r="16"
      stroke="currentColor"
      strokeWidth="2"
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M24 16L26.47 21.21L32 21.91L28 25.81L28.94 31.29L24 28.69L19.06 31.29L20 25.81L16 21.91L21.53 21.21L24 16Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.5 }}
    />
  </motion.svg>
) 