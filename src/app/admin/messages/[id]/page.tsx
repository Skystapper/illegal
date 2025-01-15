'use client'
import { useState, useEffect } from 'react'
import { useParams, useRouter, useSearchParams } from 'next/navigation'
import { ArrowLeft, Mail, Phone, Building2, Briefcase, Clock } from 'lucide-react'
import { StatusDropdown } from '@/components/StatusDropdown'
import { ReminderCell } from '@/components/ReminderCell'
import type { Message } from '@/types'

export default function MessagePage() {
  const router = useRouter()
  const params = useParams()
  const searchParams = useSearchParams()
  const messageType = searchParams.get('type')      
  const [message, setMessage] = useState<Message | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    if (params.id) {
      fetchMessage(params.id as string, messageType)
    }
  }, [params.id, messageType])

  const fetchMessage = async (id: string, type: string | null) => {
    try {
      const endpoint = type === 'contact' 
        ? `/api/v1/contacts/${id}`
        : `/api/v1/consultations/${id}`

      const response = await fetch(endpoint)
      if (response.ok) {
        const data = await response.json()
        setMessage({...data, 
            type: type })
      } else {
        throw new Error('Failed to fetch message')
      }
    } catch (error) {
      console.error('Error fetching message:', error)
    }
    finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (newStatus: string) => {
    if (!message) return
    try {
      const endpoint = message.type === 'contact' 
        ? `/api/v1/contacts/${message.id}`
        : `/api/v1/consultations/${message.id}`

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setMessage(prev => prev ? { ...prev, status: newStatus } : null)
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const updateReminder = async (id: number, date: string | null) => {
    if (!message) return
    try {
      const endpoint = message.type === 'contact'
        ? `/api/v1/contacts/${id}/reminder`
        : `/api/v1/consultations/${id}/reminder`

      const response = await fetch(endpoint, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ reminderDate: date }),
      })

      if (response.ok) {
        setMessage(prev => prev ? { 
          ...prev, 
          reminderDate: date ? new Date(date) : null 
        } : null)
      }
    } catch (error) {
      console.error('Error updating reminder:', error)
    }
  }


  if (isLoading) return <div>Loading...</div>
  if (!message) return <div>Message not found</div>

  return (
    <div className="max-w-7xl mx-auto py-8 px-4">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => router.back()}
            className="flex items-center text-gray-600 hover:text-burgundy-600"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back
          </button>
          <h1 className="text-2xl font-bold">
            {message.type === 'contact' ? message.subject : 'Consultation Request'}
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <ReminderCell 
            item={message}
            onSetReminder={updateReminder}
          />
          <StatusDropdown 
            status={message.status}
            onStatusChange={updateStatus}
          />
        </div>
      </div>

      <div className="grid grid-cols-3 gap-6">
        {/* Main Content */}
        <div className="col-span-2 space-y-6">
          {/* Message Content */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Message</h2>
            <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap text-gray-700">
              {message.message}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="bg-white rounded-lg shadow-sm p-6">
            <h2 className="text-lg font-semibold mb-4">Activity</h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                  <Clock className="w-4 h-4 text-gray-600" />
                </div>
                <div>
                  <p className="text-sm text-gray-600">
                    Message received
                  </p>
                  <p className="text-xs text-gray-400">
                    {new Date(message.createdAt).toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="space-y-6">
  {/* Contact Information */}
  <div className="bg-white rounded-lg shadow-sm p-6">
    <h2 className="text-lg font-semibold mb-4">Contact Details</h2>
    <div className="space-y-4">
      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Mail className="w-4 h-4 text-gray-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Email</p>
          <p className="text-gray-700">{message.email}</p>
        </div>
      </div>

      <div className="flex items-start gap-3">
        <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
          <Phone className="w-4 h-4 text-gray-600" />
        </div>
        <div>
          <p className="text-sm text-gray-500">Phone</p>
          <p className="text-gray-700">{message.phone}</p>
        </div>
      </div>

      {message.type === 'contact' && (
        <>
          {message.company && (
            <div className="flex items-start gap-3">
              <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
                <Building2 className="w-4 h-4 text-gray-600" />
              </div>
              <div>
                <p className="text-sm text-gray-500">Company</p>
                <p className="text-gray-700">{message.company}</p>
              </div>
            </div>
          )}

          <div className="flex items-start gap-3">
            <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center">
              <Briefcase className="w-4 h-4 text-gray-600" />
            </div>
            <div>
              <p className="text-sm text-gray-500">Service</p>
              <p className="text-gray-700">{message.serviceType}</p>
            </div>
          </div>
        </>
      )}
    </div>
  </div>
</div>
      </div>
    </div>
  )
} 