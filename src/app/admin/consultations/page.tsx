'use client'
import { useState, useEffect, useRef } from 'react'
import { Calendar } from 'lucide-react'
import { format } from 'date-fns'
import Link from 'next/link'

interface Consultation {
  id: number
  name: string
  email: string
  phone: string
  message: string
  status: string
  createdAt: string
  reminderDate?: string | null
}

const StatusDropdown = ({ status, onStatusChange }: { 
  status: string, 
  onStatusChange: (status: string) => void 
}) => {
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
                  status === option 
                    ? 'bg-gray-50 font-medium' 
                    : 'text-gray-700'
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

const ReminderCell = ({ consultation, onSetReminder }: {
  consultation: Consultation,
  onSetReminder: (id: number, date: string | null) => void
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const today = new Date().toISOString().split('T')[0]

  const getReminderStatus = () => {
    if (!consultation.reminderDate) return null
    const reminderDate = new Date(consultation.reminderDate)
    const now = new Date()
    
    if (reminderDate < now) {
      return 'overdue'
    } else if (reminderDate.toDateString() === now.toDateString()) {
      return 'today'
    }
    return 'upcoming'
  }

  const status = getReminderStatus()

  return (
    <div className="flex items-center gap-2">
      {consultation.reminderDate ? (
        <>
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
            ${status === 'overdue' ? 'bg-red-100 text-red-700' : 
              status === 'today' ? 'bg-yellow-100 text-yellow-700' :
              'bg-blue-100 text-blue-700'}`}>
            <Calendar className="w-3 h-3" />
            {format(new Date(consultation.reminderDate), 'MMM d, yyyy')}
          </span>
          <button
            onClick={() => onSetReminder(consultation.id, null)}
            className="text-gray-400 hover:text-red-500"
          >
            ×
          </button>
        </>
      ) : (
        <button
          onClick={() => setIsOpen(true)}
          className="text-gray-500 hover:text-burgundy-600 flex items-center gap-1 text-sm"
        >
          <Calendar className="w-4 h-4" />
          Set reminder
        </button>
      )}

      {isOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-30 z-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-xl">
            <h3 className="text-lg font-medium mb-4">Set Reminder</h3>
            <input
              type="date"
              min={today}
              className="block w-full px-3 py-2 border rounded-md mb-4"
              onChange={(e) => {
                onSetReminder(consultation.id, e.target.value)
                setIsOpen(false)
              }}
            />
            <button
              onClick={() => setIsOpen(false)}
              className="w-full px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200"
            >
              Cancel
            </button>
          </div>
        </div>
      )}
    </div>
  )
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
              ? { ...consultation, reminderDate: date || undefined }
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reminder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredConsultations.map((consultation) => (
                <tr key={consultation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{consultation.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{consultation.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{consultation.phone}</td>
                  <td className="px-6 py-4">
                    <p className="truncate max-w-xs">{consultation.message}</p>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusDropdown 
                      status={consultation.status} 
                      onStatusChange={(newStatus) => updateStatus(consultation.id, newStatus)} 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(consultation.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ReminderCell 
                      consultation={consultation}
                      onSetReminder={updateReminder}
                    />
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