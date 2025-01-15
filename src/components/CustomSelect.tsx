'use client'
import { useState, useRef, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiChevronDown } from 'react-icons/fi'

interface CustomSelectProps {
  options: string[]
  value: string
  onChange: (value: string) => void
  placeholder?: string
}

export const CustomSelect = ({ options, value, onChange, placeholder }: CustomSelectProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const selectRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (selectRef.current && !selectRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div ref={selectRef} className="relative">
      <motion.div
        whileHover={{ scale: 1.01 }}
        className="relative"
      >
        <div
          onClick={() => setIsOpen(!isOpen)}
          className={`
            w-full 
            px-4 
            py-3 
            rounded-lg 
            bg-white 
            border-2
            ${isOpen ? 'border-burgundy-500' : 'border-gray-200'}
            cursor-pointer 
            flex 
            items-center 
            justify-between 
            transition-all
            duration-200
            ease-in-out
          `}
        >
          <span className={`${!value ? 'text-gray-400' : 'text-gray-700'}`}>
            {value || placeholder || 'Select an option'}
          </span>
          <motion.div
            animate={{ rotate: isOpen ? 180 : 0 }}
            transition={{ duration: 0.2 }}
          >
            <FiChevronDown className="w-5 h-5 text-gray-400" />
          </motion.div>
        </div>
      </motion.div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.2 }}
            className="absolute z-50 w-full mt-1 bg-white rounded-lg shadow-lg border border-gray-200 py-1"
          >
            {options.map((option) => (
              <div
                key={option}
                onClick={() => {
                  onChange(option)
                  setIsOpen(false)
                }}
                className={`
                  px-4 
                  py-2 
                  cursor-pointer 
                  transition-colors
                  ${value === option 
                    ? 'bg-burgundy-50 text-burgundy-700' 
                    : 'hover:bg-gray-50 text-gray-700'}
                `}
              >
                {option}
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
} 