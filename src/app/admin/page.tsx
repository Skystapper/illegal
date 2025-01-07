'use client'
import { useState, useEffect } from 'react'
import { FaUser, FaEnvelope, FaCalendar, FaClock } from 'react-icons/fa'
import { motion } from 'framer-motion'

interface DashboardStats {
  totalConsultations: number
  totalContacts: number
  pendingConsultations: number
  pendingContacts: number
  recentConsultations: Array<{
    id: number
    name: string
    email: string
    date: string
    status: string
  }>
  recentContacts: Array<{
    id: number
    firstName: string
    lastName: string
    email: string
    subject: string
    createdAt: string
    status: string
  }>
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardStats()
  }, [])

  const fetchDashboardStats = async () => {
    try {
      const response = await fetch('/api/v1/admin/dashboard')
      const data = await response.json()
      setStats(data)
    } catch (error) {
      console.error('Error fetching dashboard stats:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (!stats) return <div>Error loading dashboard</div>

  return (
    <div className="space-y-8">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Consultations</p>
              <h3 className="text-2xl font-bold">{stats.totalConsultations}</h3>
            </div>
            <div className="p-3 bg-burgundy-100 rounded-full">
              <FaCalendar className="w-6 h-6 text-burgundy-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Total Contacts</p>
              <h3 className="text-2xl font-bold">{stats.totalContacts}</h3>
            </div>
            <div className="p-3 bg-blue-100 rounded-full">
              <FaEnvelope className="w-6 h-6 text-blue-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Pending Consultations</p>
              <h3 className="text-2xl font-bold">{stats.pendingConsultations}</h3>
            </div>
            <div className="p-3 bg-yellow-100 rounded-full">
              <FaClock className="w-6 h-6 text-yellow-600" />
            </div>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="bg-white p-6 rounded-lg shadow-sm"
        >
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500">Pending Contacts</p>
              <h3 className="text-2xl font-bold">{stats.pendingContacts}</h3>
            </div>
            <div className="p-3 bg-green-100 rounded-full">
              <FaUser className="w-6 h-6 text-green-600" />
            </div>
          </div>
        </motion.div>
      </div>

      {/* Recent Activities */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Recent Consultations */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="bg-white rounded-lg shadow-sm"
        >
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Recent Consultations</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.recentConsultations.map((consultation) => (
                <div key={consultation.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{consultation.name}</p>
                    <p className="text-sm text-gray-500">{consultation.email}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">{consultation.date}</p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      consultation.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : 'bg-green-100 text-green-800'
                    }`}>
                      {consultation.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

        {/* Recent Contacts */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="bg-white rounded-lg shadow-sm"
        >
          <div className="p-6 border-b">
            <h3 className="text-lg font-semibold">Recent Contact Messages</h3>
          </div>
          <div className="p-6">
            <div className="space-y-4">
              {stats.recentContacts.map((contact) => (
                <div key={contact.id} className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">{contact.firstName} {contact.lastName}</p>
                    <p className="text-sm text-gray-500">{contact.subject}</p>
                  </div>
                  <div className="text-right">
                    <p className="text-sm text-gray-500">
                      {new Date(contact.createdAt).toLocaleDateString()}
                    </p>
                    <span className={`text-xs px-2 py-1 rounded-full ${
                      contact.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800'
                        : contact.status === 'responded'
                        ? 'bg-green-100 text-green-800'
                        : 'bg-gray-100 text-gray-800'
                    }`}>
                      {contact.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
} 