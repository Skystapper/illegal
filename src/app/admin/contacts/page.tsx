'use client'
import { ArrowRight, Calendar } from 'lucide-react'
import { useState, useEffect, useRef } from 'react'
import { format } from 'date-fns'
import Link from 'next/link'
import { ArrowUpRight } from 'lucide-react'
interface Contact {
  id: number
  firstName: string
  lastName: string
  email: string
  phone: string
  company: string
  subject: string
  message: string
  serviceType: string
  status: string
  createdAt: string
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
    
    const ReminderCell = ({ contact, onSetReminder }: {
      contact: any,
      onSetReminder: (id: number, date: string | null) => void
    }) => {
      const [isOpen, setIsOpen] = useState(false)
      const today = new Date().toISOString().split('T')[0]
    
      const getReminderStatus = () => {
        if (!contact.reminderDate) return null
        const reminderDate = new Date(contact.reminderDate)
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
          {contact.reminderDate ? (
            <>
              <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
                ${status === 'overdue' ? 'bg-red-100 text-red-700' : 
                  status === 'today' ? 'bg-yellow-100 text-yellow-700' :
                  'bg-blue-100 text-blue-700'}`}>
                <Calendar className="w-3 h-3" />
                {format(new Date(contact.reminderDate), 'MMM d, yyyy')}
              </span>
              <button
                onClick={() => onSetReminder(contact.id, null)}
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
                    onSetReminder(contact.id, e.target.value)
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
    



export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all') // all, pending, responded, closed
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/v1/contact')
      const data = await response.json()
      setContacts(data)
    } catch (error) {
      console.error('Error fetching contacts:', error)
    } finally {
      setIsLoading(false)
    }
  }

  const updateStatus = async (id: number, newStatus: string) => {
    try {
      const response = await fetch(`/api/v1/contact/${id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ status: newStatus }),
      })

      if (response.ok) {
        setContacts(prev =>
          prev.map(contact =>
            contact.id === id
              ? { ...contact, status: newStatus }
              : contact
          )
        )
      }
    } catch (error) {
      console.error('Error updating status:', error)
    }
  }

  const updateReminder = async (id: number, date: string | null) => {
    try {
      const response = await fetch(`/api/v1/contacts/${id}/reminder`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ reminderDate: date }),
      })

      if (response.ok) {
        setContacts(prev =>
          prev.map(contact =>
            contact.id === id
              ? { ...contact, reminderDate: date }
              : contact
          )
        )
      }
    } catch (error) {
      console.error('Error updating reminder:', error)
    }
  }




  const filteredContacts = contacts
    .filter(contact => {
      if (filter === 'all') return true
      return contact.status === filter
    })
    .filter(contact =>
      contact.firstName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.lastName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      contact.email.toLowerCase().includes(searchTerm.toLowerCase())
    )

  if (isLoading) return <div>Loading...</div>

  return (
    <div>
      <div className="mb-8 flex justify-between items-center">
        <h1 className="text-2xl font-bold">Manage Contacts</h1>
        
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
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Reminder</th>
                <th className="px-6 py-3 text-center text-xs font-medium text-gray-500 uppercase">Details</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {contact.firstName} {contact.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{contact.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{contact.serviceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{contact.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{contact.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">{contact.subject}</td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center">
                    <StatusDropdown 
                      status={contact.status} 
                      onStatusChange={(newStatus) => updateStatus(contact.id, newStatus)} 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap flex justify-center">
                    <ReminderCell 
                      contact={contact}
                      onSetReminder={updateReminder}
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-center">
                    <Link
                      href={`/admin/messages/${contact.id}?type=contact`}
                      className="inline-flex items-center justify-center w-10 h-10 rounded-lg relative group overflow-hidden"
                    >
                      <div className="absolute inset-0 bg-gradient-to-r from-burgundy-50 to-burgundy-100 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <div className="absolute inset-0 bg-burgundy-100 animate-pulse opacity-20" />
                      <ArrowRight className="w-5 h-5 text-burgundy-600 transform 
                        group-hover:scale-110 
                        group-hover:translate-x-1 
                        transition-all duration-300 
                        relative z-10" 
                      />
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