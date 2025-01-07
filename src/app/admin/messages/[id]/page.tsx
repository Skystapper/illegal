import { ArrowLeft } from 'lucide-react'
import Link from 'next/link'
import { prisma } from '@/lib/prisma'
import type { Message } from '@/types'

async function getMessage(id: string) {
  'use server'
  
  // Try contacts first
  const contact = await prisma.contact.findUnique({
    where: { id: parseInt(id) }
  })

  if (contact) {
    return { ...contact, type: 'contact' as const }
  }

  // Try consultations
  const consultation = await prisma.consultation.findUnique({
    where: { id: parseInt(id) }
  })

  if (consultation) {
    return { ...consultation, type: 'consultation' as const }
  }

  return null
}

export default async function MessagePage({ params }: { params: { id: string } }) {
  const message = await getMessage(params.id)

  if (!message) {
    return <div>Message not found</div>
  }

  return (
    <div className="max-w-4xl mx-auto py-8 px-4">
      <Link 
        href="/admin/contacts"
        className="flex items-center text-gray-600 hover:text-burgundy-600 mb-6"
      >
        <ArrowLeft className="w-4 h-4 mr-2" />
        Back
      </Link>

      <div className="bg-white rounded-lg shadow-sm p-6">
        <div className="flex justify-between items-start mb-6">
          <div>
            <h1 className="text-2xl font-bold mb-2">
              {message.type === 'contact' ? message.subject : 'Consultation Request'}
            </h1>
            <div className="text-gray-600">
              From: {
                message.type === 'contact' 
                  ? `${message.firstName} ${message.lastName}`
                  : message.name
              }
            </div>
          </div>
          <div className="text-sm text-gray-500">
            {new Date(message.createdAt).toLocaleDateString()}
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 mb-8">
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Contact Details</h3>
            <div className="space-y-2">
              <p>Email: {message.email}</p>
              <p>Phone: {message.phone}</p>
              {message.type === 'contact' && message.company && (
                <p>Company: {message.company}</p>
              )}
              {message.type === 'contact' 
                ? message.serviceType && <p>Service: {message.serviceType}</p>
                : message.service && <p>Service: {message.service}</p>
              }
            </div>
          </div>
          <div>
            <h3 className="text-sm font-medium text-gray-500 mb-1">Status</h3>
            <div className={`inline-block px-3 py-1 rounded-full text-sm
              ${message.status === 'pending' 
                ? 'bg-yellow-100 text-yellow-800' 
                : 'bg-green-100 text-green-800'
              }`}
            >
              {message.status}
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-sm font-medium text-gray-500 mb-3">Message</h3>
          <div className="bg-gray-50 p-4 rounded-lg whitespace-pre-wrap">
            {message.message}
          </div>
        </div>
      </div>
    </div>
  )
} 