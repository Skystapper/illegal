'use client'
import { useState } from 'react'
import { motion } from 'framer-motion'
import toast from 'react-hot-toast'
import { CustomSelect } from './CustomSelect'

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  serviceType: string
}

const SERVICE_TYPES = [
  'Legal Consultation',
  'Document Review',
  'Contract Drafting',
  'Legal Research',
  'Compliance Advisory',
  'Other Services'
]

const inputStyles = `
  w-full 
  px-4 
  py-3 
  rounded-lg 
  bg-white 
  border-2
  border-gray-200
  focus:border-burgundy-500
  outline-none 
  transition-all
  duration-200
  ease-in-out
  placeholder:text-gray-400
  text-gray-700
`

export const ContactForm = () => {
  const [formData, setFormData] = useState<FormData>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    company: '',
    subject: '',
    message: '',
    serviceType: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    
    try {
      const response = await fetch('/api/v1/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error('Failed to submit form')
      }

      // Reset form
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        company: '',
        subject: '',
        message: '',
        serviceType: ''
      })

      toast.success('Message sent successfully!')
    } catch (error) {
      console.error('Form submission error:', error)
      toast.error('Failed to send message. Please try again.')
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="form-group"
        >
          <input
            type="text"
            placeholder="First Name"
            required
            className={inputStyles}
            value={formData.firstName}
            onChange={(e) => setFormData(prev => ({ ...prev, firstName: e.target.value }))}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="form-group"
        >
          <input
            type="text"
            placeholder="Last Name"
            required
            className={inputStyles}
            value={formData.lastName}
            onChange={(e) => setFormData(prev => ({ ...prev, lastName: e.target.value }))}
          />
        </motion.div>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="form-group"
        >
          <input
            type="email"
            placeholder="Email Address"
            required
            className={inputStyles}
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
          />
        </motion.div>
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="form-group"
        >
          <input
            type="tel"
            placeholder="Phone Number"
            className={inputStyles}
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
          />
        </motion.div>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="form-group"
      >
        <input
          type="text"
          placeholder="Company/Organization"
          className={inputStyles}
          value={formData.company}
          onChange={(e) => setFormData(prev => ({ ...prev, company: e.target.value }))}
        />
      </motion.div>

      <div className="grid md:grid-cols-2 gap-6">
        <motion.div
          whileHover={{ scale: 1.01 }}
          className="form-group"
        >
          <input
            type="text"
            placeholder="Subject"
            required
            className={inputStyles}
            value={formData.subject}
            onChange={(e) => setFormData(prev => ({ ...prev, subject: e.target.value }))}
          />
        </motion.div>
        <div className="form-group">
          <CustomSelect
            options={SERVICE_TYPES}
            value={formData.serviceType}
            onChange={(value) => setFormData(prev => ({ ...prev, serviceType: value }))}
            placeholder="Select Service Type"
          />
        </div>
      </div>

      <motion.div
        whileHover={{ scale: 1.01 }}
        className="form-group"
      >
        <textarea
          placeholder="Your Message"
          rows={6}
          required
          className={inputStyles}
          value={formData.message}
          onChange={(e) => setFormData(prev => ({ ...prev, message: e.target.value }))}
        />
      </motion.div>

      <motion.button
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="w-full bg-burgundy-600 text-white py-4 rounded-lg font-medium hover:bg-burgundy-700 transition-colors"
        type="submit"
      >
        Send Message
      </motion.button>
    </form>
  )
} 