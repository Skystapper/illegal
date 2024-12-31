'use client'
import { motion } from 'framer-motion'

export const HandshakeIcon = () => (
  <motion.svg
    width="48"
    height="48"
    viewBox="0 0 48 48"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    whileHover={{ scale: 1.1 }}
  >
    <motion.path
      d="M14 24L6 32L14 40L22 32L14 24Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ x: -10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M34 24L42 32L34 40L26 32L34 24Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ x: 10, opacity: 0 }}
      animate={{ x: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
    />
    <motion.path
      d="M24 8L32 16L24 24L16 16L24 8Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, delay: 0.2 }}
    />
  </motion.svg>
) 