'use client'
import { useState } from 'react'
import Image from 'next/image'

interface FormData {
  name: string
  email: string
  phone: string
  message: string
  service?: string
}

const Consultation = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    message: '',
    service: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null
    message: string
  }>({ type: null, message: '' })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus({ type: null, message: '' })

    try {
      const response = await fetch('/api/consultations', {
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
        message: '',
        service: ''
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
    <section className="py-24 bg-gray-50 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row items-center gap-12">
          {/* Image Section */}
          <div className="lg:w-1/2 relative">
            <div className="relative h-[600px] w-full overflow-hidden rounded-md shadow-lg">
              <Image
                src="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
                alt="Business Consultants Team Meeting"
                fill
                quality={100}
                priority
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover transform hover:scale-105 transition-transform duration-700"
                style={{
                  objectFit: 'cover',
                  objectPosition: 'center',
                }}
              />
              {/* Simple border accent */}
              <div className="absolute inset-0 border-2 border-yellow-400 rounded-md transform translate-x-4 translate-y-4 -z-10"></div>
            </div>
          </div>

          {/* Content Section */}
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-4xl font-bold text-[#2D2D3D] leading-tight">
              The Highly Qualified Team of{' '}
              <span className="text-[#8B4513]">
                Business Consultants
              </span>
            </h2>
            
            {/* Consultation Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your Name"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Your Email"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Your Phone"
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                />
              </div>

              <div>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  placeholder="Your Message"
                  required
                  rows={4}
                  className="w-full px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-yellow-400"
                ></textarea>
              </div>

              {submitStatus.type && (
                <div className={`p-4 rounded-md ${
                  submitStatus.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {submitStatus.message}
                </div>
              )}

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full px-8 py-3 bg-yellow-400 text-[#2D2D3D] rounded-md 
                  hover:bg-yellow-500 transition-colors duration-300 
                  font-medium text-lg border border-yellow-500
                  ${isSubmitting ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? 'Submitting...' : 'Schedule a Consultation'}
              </button>
            </form>

            <p className="text-sm text-gray-600 mt-4">
              By submitting this form, you agree to our terms and privacy policy.
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Consultation 