'use client'
import { useState, useEffect, useRef } from 'react'

interface StatusDropdownProps {
  status: string
  onStatusChange: (status: string) => void
}

export const StatusDropdown = ({ status, onStatusChange }: StatusDropdownProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const getStatusStyle = (statusType: string) => {
    switch (statusType) {
      case 'pending':
        return 'bg-yellow-100 text-yellow-800 border border-yellow-200'
      case 'completed':
        return 'bg-green-100 text-green-800 border border-green-200'
      default:
        return 'bg-gray-100 text-gray-800 border border-gray-200'
    }
  }

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`px-3 py-1 inline-flex items-center text-xs leading-5 font-semibold rounded-full cursor-pointer hover:opacity-90 transition-opacity ${getStatusStyle(status)}`}
      >
        {status}
      </button>
      
      {isOpen && (
        <div className="fixed transform -translate-x-1/2 mt-2 w-32 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50">
          <div className="py-1">
            {['pending', 'completed'].map((option) => (
              <button
                key={option}
                onClick={() => {
                  onStatusChange(option)
                  setIsOpen(false)
                }}
                className={`block w-full text-left px-4 py-2 text-sm capitalize hover:bg-gray-50 transition-colors ${
                  status === option ? 'bg-gray-50 font-medium' : 'text-gray-700'
                }`}
              >
                {option}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
