'use client'
import { useState, useEffect } from 'react'
import { StatusDropdown } from '@/components/StatusDropdown'
import { ReminderCell } from '@/components/ReminderCell'
import { ArrowRight } from 'lucide-react'
import Link from 'next/link'

interface Consultation {
  id: number
  name: string
  email: string
  phone: string
  message: string
  status: string
  service: string
  reminderDate: string | null
  createdAt: string
}

export default function ConsultationsPage() {
  const [consultations, setConsultations] = useState<Consultation[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchConsultations()
  }, [])

  const fetchConsultations = async () => {
    try {
      const response = await fetch('/api/v1/consultations')
      const data = await response.json()
      setConsultations(data)
    } catch (error) {
      console.error('Error fetching consultations:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/v1/consultations/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setConsultations(prev =>
          prev.map(consultation =>
            consultation.id === id
              ? { ...consultation, status: newStatus }
              : consultation
          )
        )
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const updateReminder = async (id: number, date: string | null) => {
    try {
      const response = await fetch(`/api/v1/consultations/${id}/reminder`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reminderDate: date }),
      })

      if (response.ok) {
        setConsultations(prev =>
          prev.map(consultation =>
            consultation.id === id
              ? { ...consultation, reminderDate: date }
              : consultation
          )
        )
      }
    } catch (error) {
      console.error('Error updating reminder:', error)
    }
  }

  const filteredConsultations = consultations
    .filter(consultation => {
      if (filter === 'all') return true
      return consultation.status === filter
    })
    .filter(consultation =>
      consultation.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      consultation.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Consultations</h1>
        
        <div className="flex gap-4">
          <input
            type="text"
            placeholder="Search by name or email..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="px-4 py-2 border rounded-md"
          />
          
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="px-4 py-2 border rounded-md"
          >
            <option value="all">All Status</option>
            <option value="pending">Pending</option>
            <option value="completed">Completed</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-lg shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Message</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Reminder</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredConsultations.map((consultation) => (
                <tr key={consultation.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{consultation.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{consultation.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{consultation.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{consultation.service}</td>
                  <td className="px-6 py-4 group text-center">
                    <p className="truncate max-w-xs">{consultation.message}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center">
                    <StatusDropdown 
                      status={consultation.status} 
                      onStatusChange={(newStatus) => updateStatus(consultation.id, newStatus)} 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {new Date(consultation.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center">
                    <ReminderCell 
                      item={consultation}
                      onSetReminder={updateReminder}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Link
                      href={`/admin/messages/${consultation.id}?type=consultation`}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg relative group overflow-hidden"
                    >
                      {/* Animated background gradient */}
                      <div className="absolute inset-0 bg-gradient-to-r from-burgundy-50 to-burgundy-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      
                      {/* Continuous subtle pulse animation */}
                      <div className="absolute inset-0 bg-burgundy-100 animate-pulse opacity-20" />
                      
                      {/* Main icon with hover effects */}
                      <ArrowRight className="w-5 h-5 text-burgundy-600 transform 
                        group-hover:scale-110 
                        group-hover:translate-x-1 
                        transition-all duration-300 
                        relative z-10" 
                      />
                      
                      {/* Optional: Secondary decorative elements */}
                      <div className="absolute inset-0 border border-burgundy-200 rounded-lg scale-0 group-hover:scale-100 transition-transform duration-300" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}