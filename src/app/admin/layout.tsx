'use client'
import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-md">
        <div className="p-4 border-b">
          <h1 className="text-xl font-bold text-gray-800">Admin Dashboard</h1>
        </div>
        <nav className="p-4">
          <ul className="space-y-2">
            <li>
              <Link 
                href="/admin" 
                className={`block px-4 py-2 rounded-md ${
                  pathname === '/admin' 
                    ? 'bg-burgundy-600 text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Dashboard
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/consultations" 
                className={`block px-4 py-2 rounded-md ${
                  pathname === '/admin/consultations' 
                    ? 'bg-burgundy-600 text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Consultations
              </Link>
            </li>
            <li>
              <Link 
                href="/admin/services" 
                className={`block px-4 py-2 rounded-md ${
                  pathname === '/admin/services' 
                    ? 'bg-burgundy-600 text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Services
              </Link>
            </li>
          </ul>
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  )
} 