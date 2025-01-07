'use client'
import { useState } from 'react'
import { signIn } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError('') // Clear previous errors

    try {
      const result = await signIn('credentials', {
        email: formData.email,
        password: formData.password,
        redirect: false
      })

      if (result?.error) {
        if (result.error === "Invalid credentials") {
          setError('Invalid email or password')
        } else if (!formData.email) {
          setError('Please enter your email')
        } else if (!formData.password) {
          setError('Please enter your password')
        } else {
          setError('An error occurred during login')
        }
        return
      }

      toast.success('Login successful')
      router.push('/admin')
      router.refresh()
      
    } catch (error) {
      setError('An unexpected error occurred')
      console.error('Login error:', error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="max-w-md w-full mx-4">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h1 className="text-2xl font-bold text-center text-gray-900 mb-8">
            Admin Login
          </h1>
          
          {error && (
            <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-600 rounded-md text-sm">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                required
                className={`mt-1 block w-full px-3 py-2 border ${
                  error && !formData.email ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500`}
                value={formData.email}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    email: e.target.value
                  }))
                  setError('') // Clear error when typing
                }}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700">
                Password
              </label>
              <input
                type="password"
                required
                className={`mt-1 block w-full px-3 py-2 border ${
                  error && !formData.password ? 'border-red-300' : 'border-gray-300'
                } rounded-md shadow-sm focus:outline-none focus:ring-burgundy-500 focus:border-burgundy-500`}
                value={formData.password}
                onChange={(e) => {
                  setFormData(prev => ({
                    ...prev,
                    password: e.target.value
                  }))
                  setError('') // Clear error when typing
                }}
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-burgundy-600 hover:bg-burgundy-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-burgundy-500 transition-all duration-200 ${
                isLoading ? 'opacity-75 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Sign in'
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
} 