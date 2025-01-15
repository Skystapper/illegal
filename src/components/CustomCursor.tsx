'use client'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

export const CustomCursor = () => {
  const [position, setPosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    const onMouseMove = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      setIsHovering(!!target.closest('button, a, input, textarea'))
      setPosition({ x: e.clientX, y: e.clientY })
    }

    window.addEventListener('mousemove', onMouseMove)
    return () => window.removeEventListener('mousemove', onMouseMove)
  }, [])

  return (
    <>
      {/* Inner cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: position.x - 4,
          y: position.y - 4,
          scale: isHovering ? 2 : 1
        }}
        transition={{
          type: "tween",
          duration: 0.1
        }}
      >
        <div className="w-2 h-2 bg-white rounded-full mix-blend-difference" />
      </motion.div>

      {/* Outer cursor */}
      <motion.div
        className="fixed pointer-events-none z-[9999]"
        animate={{
          x: position.x - 16,
          y: position.y - 16,
          scale: isHovering ? 1.5 : 1
        }}
        transition={{
          type: "tween",
          duration: 0.15
        }}
      >
        <div className="w-8 h-8 border border-white rounded-full mix-blend-difference" />
      </motion.div>
    </>
  )
} 