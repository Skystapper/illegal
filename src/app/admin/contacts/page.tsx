'use client'
import { useState, useEffect } from 'react'
import { StatusDropdown } from '@/components/StatusDropdown'
import { ReminderCell } from '@/components/ReminderCell'
import { MessageCell } from '@/components/MessageCell'

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
  reminderDate: string | null
  createdAt: string
}

export default function ContactsPage() {
  const [contacts, setContacts] = useState<Contact[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [filter, setFilter] = useState('all')
  const [searchTerm, setSearchTerm] = useState('')

  useEffect(() => {
    fetchContacts()
  }, [])

  const fetchContacts = async () => {
    try {
      const response = await fetch('/api/v1/contacts')
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
      const response = await fetch(`/api/v1/contacts/${id}`, {
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
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Company</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Subject</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Message</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Service</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Reminder</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredContacts.map((contact) => (
                <tr key={contact.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {contact.firstName} {contact.lastName}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.company}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.subject}</td>
                  <td className="px-6 py-4 group">
                    <MessageCell 
                      id={contact.id}
                      message={contact.message}
                      type="contact"
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{contact.serviceType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <StatusDropdown 
                      status={contact.status} 
                      onStatusChange={(newStatus) => updateStatus(contact.id, newStatus)} 
                    />
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(contact.createdAt).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <ReminderCell 
                      item={contact}
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