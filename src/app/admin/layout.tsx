'use client'
import { useState } from 'react'
import { signOut } from 'next-auth/react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { LogOut } from 'lucide-react'  // Add this import


export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const isLoginPage = pathname === '/admin/login'

  const handleLogout = async () => {
    await signOut({ 
      redirect: true,
      callbackUrl: '/admin/login'
    })
  }

  // Return a clean layout for login page
  if (isLoginPage) {
    return <>{children}</>
  }

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
                href="/admin/contacts" 
                className={`block px-4 py-2 rounded-md ${
                  pathname === '/admin/contacts' 
                    ? 'bg-burgundy-600 text-white' 
                    : 'hover:bg-gray-100'
                }`}
              >
                Contacts
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
        <div className="p-4 border-t">
    <button
      onClick={handleLogout}
      className="w-full px-4 py-2 text-white bg-red-600 hover:bg-red-700 rounded-md transition-colors duration-200 flex items-center justify-center gap-2"
    >
      <LogOut className="w-5 h-5" /> {/* Optional icon */}
      Logout
    </button>
  </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 p-8">
        {children}
      </div>
    </div>
  )
} 