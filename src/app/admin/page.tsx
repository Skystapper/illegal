'use client'
import { useState, useEffect } from 'react'

interface DashboardStats {
  totalConsultations: number
  pendingConsultations: number
  todayConsultations: number
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats>({
    totalConsultations: 0,
    pendingConsultations: 0,
    todayConsultations: 0
  })

  const [recentConsultations, setRecentConsultations] = useState([])
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    fetchDashboardData()
  }, [])

  const fetchDashboardData = async () => {
    try {
      const response = await fetch('/api/consultations')
      const data = await response.json()
      
      // Calculate stats
      const pending = data.filter((c: any) => c.status === 'pending').length
      const today = data.filter((c: any) => {
        const consultDate = new Date(c.createdAt).toDateString()
        const currentDate = new Date().toDateString()
        return consultDate === currentDate
      }).length

      setStats({
        totalConsultations: data.length,
        pendingConsultations: pending,
        todayConsultations: today
      })

      // Get recent consultations
      setRecentConsultations(data.slice(0, 5))
      
    } catch (error) {
      console.error('Error fetching dashboard data:', error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h1 className="text-2xl font-bold mb-8">Dashboard Overview</h1>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Total Consultations</h3>
          <p className="text-3xl font-bold mt-2">{stats.totalConsultations}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Pending Consultations</h3>
          <p className="text-3xl font-bold mt-2">{stats.pendingConsultations}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm">
          <h3 className="text-gray-500 text-sm font-medium">Today's Consultations</h3>
          <p className="text-3xl font-bold mt-2">{stats.todayConsultations}</p>
        </div>
      </div>

      {/* Recent Consultations Table */}
      <div className="bg-white rounded-lg shadow-sm">
        <div className="p-6 border-b">
          <h2 className="text-lg font-semibold">Recent Consultations</h2>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {recentConsultations.map((consultation: any) => (
                <tr key={consultation.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{consultation.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{consultation.email}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{consultation.phone}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${consultation.status === 'pending' 
                        ? 'bg-yellow-100 text-yellow-800' 
                        : 'bg-green-100 text-green-800'
                      }`}
                    >
                      {consultation.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {new Date(consultation.createdAt).toLocaleDateString()}
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