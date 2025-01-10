'use client'
import { ReactNode, useState } from 'react'

interface FormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
}

interface ConsultationFormProps {
    shouldHighlight?: boolean
    defaultService?: string
    isServiceLocked?: boolean
    formTitle?: ReactNode  // Add this line
  }

const SERVICE_OPTIONS = {
    'Company Registration': [
      'Private Limited Company',
      'Public Limited Company',
      'One Person Company',
      'Partnership Firm',
      'Limited Liability Partnership',
      'Sole Proprietorship'
    ],
    'Certification': [
      'ISO Certification',
      'Digital Signature Certificate',
      'Shop Act',
      'Trademark',
      'IE Code'
    ],
    'Legal Services': [
      'Rent Deed Drafting',
      'Partnership Deed Drafting',
      'Sale Deed Drafting',
      'Lease Deed Drafting',
      'Joint Venture Deed',
      'Legal Notice'
    ]
  }

  export const ConsultationForm = ({ 
    shouldHighlight = false,
    defaultService,
    isServiceLocked = false,
    formTitle  // Add this line
  }: ConsultationFormProps) => {
    const [formData, setFormData] = useState<FormData>({
      name: '',
      email: '',
      phone: '',
      service: defaultService || '',
      message: ''
    })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null,
    message: string
  }>({ type: null, message: '' })

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      const response = await fetch('/api/v1/consultations', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      if (!response.ok) throw new Error('Failed to submit')

      setSubmitStatus({
        type: 'success',
        message: 'Thank you! We will contact you soon.'
      })

      // Clear form
      setFormData({
        name: '',
        email: '',
        phone: '',
        service: '',
        message: ''
      })

    } catch (error) {
      setSubmitStatus({
        type: 'error',
        message: 'Something went wrong. Please try again.'
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <div className={`
      relative bg-white p-8 rounded-lg shadow-lg md:w-[400px] w-full
      ${shouldHighlight ? 'animate-highlight' : ''}
    `}>
      {shouldHighlight && (
        <div className="absolute inset-0 rounded-lg animate-shockwave pointer-events-none" />
      )}

      <h2 className="text-2xl font-bold text-gray-900 mb-6">{formTitle || 'FREE CONSULTATION'}</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          placeholder="Name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
        />
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          placeholder="Email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
        />
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          placeholder="Phone"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
        />
        
        {/* Add the service dropdown */}
        <select
        name="service"
        value={defaultService || ''}
        onChange={handleChange}
        required
        disabled={isServiceLocked}
        className={`w-full px-4 py-3 border border-gray-300 rounded 
          focus:outline-none focus:border-gray-500 bg-white
          ${isServiceLocked ? 'cursor-not-allowed bg-gray-50' : ''}
        `}
      >
        <option value="">Select Service</option>
        {Object.entries(SERVICE_OPTIONS).map(([category, services]) => (
          <optgroup key={category} label={category}>
            {services.map(service => (
              <option 
                key={service} 
                value={service}
              >
                {service}
              </option>
            ))}
          </optgroup>
        ))}
      </select>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleChange}
          placeholder="Message"
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
        />

        {submitStatus.type && (
          <div className={`p-3 rounded ${
            submitStatus.type === 'success' 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}>
            {submitStatus.message}
          </div>
        )}

        <button
          type="submit"
          disabled={isSubmitting}
          className={`w-full bg-yellow-400 text-gray-900 py-3 rounded font-medium 
            hover:bg-yellow-500 transition-colors
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
        >
          {isSubmitting ? 'Submitting...' : 'SUBMIT YOUR MESSAGE'}
        </button>
      </form>
    </div>
  )
} 