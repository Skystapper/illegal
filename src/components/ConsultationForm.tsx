'use client'
import { ReactNode, useState, useEffect } from 'react'
import dynamic from 'next/dynamic'
import { ActionMeta, SingleValue } from 'react-select'  // Add this import


// Dynamically import React Select with ssr disabled
const Select = dynamic(() => import('react-select'), {
  ssr: false
})

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

interface Option {
  value: string
  label: string
}

interface GroupedOption {
  label: string
  options: Option[]
}

const GROUPED_OPTIONS: GroupedOption[] = Object.entries(SERVICE_OPTIONS).map(([category, services]) => ({
  label: category,
  options: services.map(service => ({
    value: service,
    label: service
  }))
}))

const selectStyles = {
  control: (base: any, state: any) => ({
    ...base,
    padding: '0.25rem',
    borderColor: state.isFocused ? '#FCD34D' : '#E5E7EB',
    boxShadow: state.isFocused ? '0 0 0 2px #FEF3C7' : 'none',
    '&:hover': {
      borderColor: '#FCD34D'
    }
  }),
  option: (base: any, state: any) => ({
    ...base,
    backgroundColor: state.isSelected 
      ? '#FCD34D' 
      : state.isFocused 
        ? '#FEF3C7' 
        : 'white',
    color: '#374151',
    cursor: 'pointer',
    '&:active': {
      backgroundColor: '#FCD34D'
    }
  }),
  groupHeading: (base: any) => ({
    ...base,
    color: '#111827',
    fontWeight: 600,
    fontSize: '0.95rem',
    textTransform: 'none'
  }),
  menu: (base: any) => ({
    ...base,
    borderRadius: '0.5rem',
    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
  })
}

export const ConsultationForm = ({
  shouldHighlight = false,
  defaultService,
  isServiceLocked = false,
  formTitle
}: ConsultationFormProps) => {
  const [mounted, setMounted] = useState(false)
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    service: defaultService || '',
    message: ''
  })
  const [selectedOption, setSelectedOption] = useState<Option | null>(null)

  // Handle initial mount
  useEffect(() => {
    setMounted(true)
    if (defaultService) {
      const option = GROUPED_OPTIONS
        .flatMap(group => group.options)
        .find(opt => opt.value === defaultService)
      setSelectedOption(option || null)
    }
  }, [defaultService])

const handleSelectChange = (
  newValue: SingleValue<unknown>,
  actionMeta: ActionMeta<unknown>
) => {
  const typedValue = newValue as Option | null;
  setSelectedOption(typedValue);
  setFormData(prev => ({
    ...prev,
    service: typedValue?.value || ''
  }))
}

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null,
    message: string
  }>({ type: null, message: '' })

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
          onChange={handleInputChange}
          placeholder="Name"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />
        
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleInputChange}
          placeholder="Email"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />
        
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleInputChange}
          placeholder="Phone"
          required
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
        />

        <div className="relative">
          {mounted && (
            <Select
              options={GROUPED_OPTIONS}
              value={selectedOption}
              onChange={handleSelectChange}
              isDisabled={isServiceLocked}
              styles={selectStyles}
              placeholder="Select Service"
              className="text-gray-700"
              isSearchable={false}
              instanceId="service-select"
            />
          )}
        </div>

        <textarea
          name="message"
          value={formData.message}
          onChange={handleInputChange}
          placeholder="Message"
          required
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-yellow-400"
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
          className={`
            w-full bg-yellow-400 text-gray-900 py-3 rounded-md font-medium
            hover:bg-yellow-500 transition-colors
            focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:ring-offset-2
            ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}
          `}
        >
          {isSubmitting ? 'Submitting...' : 'SUBMIT YOUR MESSAGE'}
        </button>
      </form>
    </div>
  )
}