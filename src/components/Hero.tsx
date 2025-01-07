'use client'
import Image from 'next/image'
import { useState, useEffect } from 'react'

const Hero = () => {
  // Animation state
  const [shouldHighlight, setShouldHighlight] = useState(false)
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<{
    type: 'success' | 'error' | null,
    message: string
  }>({ type: null, message: '' })

  // Listen for highlight event
  useEffect(() => {
    const handleHighlight = () => {
      setShouldHighlight(true)
      setTimeout(() => setShouldHighlight(false), 1000)
    }

    window.addEventListener('highlightForm', handleHighlight)
    return () => window.removeEventListener('highlightForm', handleHighlight)
  }, [])

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({
      ...prev,
      [name]: value
    }))
  }

  // Handle form submission
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
    <section id="hero-section" className="relative h-[600px] flex items-center">
      {/* Background Image with Overlay */}
      <div className="absolute inset-0 z-0">
        <div className="relative w-full h-full">
          <Image
            src="/intellectual.jpg"
            alt="Legal Background"
            fill
            className="object-cover"
            priority
            quality={100}
          />
          <div className="absolute inset-0 bg-black/40" />
        </div>
      </div>

      {/* Content Container */}
      <div className="container mx-auto px-4 z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Content */}
        <div className="text-white md:w-1/2">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            We help when<br />
            You need us
          </h1>
          <p className="text-lg mb-8 text-gray-200 max-w-xl">
            The highly qualified team of Legal, attorneys and consultants will be glad to provide necessary legal assistance.
          </p>
          <button className="bg-white text-gray-900 px-8 py-3 rounded hover:bg-gray-100 transition-colors font-medium">
            PURCHASE NOW
          </button>
        </div>

        {/* Right Content - Form */}
        <div className={`
          relative bg-white p-8 rounded-lg shadow-lg md:w-[400px] w-full
          ${shouldHighlight ? 'animate-highlight' : ''}
        `}>
          {/* Remove or modify the problematic overlay div */}
          {shouldHighlight && (
            <div className="absolute inset-0 rounded-lg animate-shockwave pointer-events-none" />
          )}

          <h2 className="text-2xl font-bold text-gray-900 mb-6">FREE CONSULTATION</h2>
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
            <textarea
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Message"
              required
              rows={4}
              className="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:border-gray-500"
            />

            {/* Show success/error message */}
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
      </div>
    </section>
  )
}

export default Hero 