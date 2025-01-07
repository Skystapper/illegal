'use client'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

interface MessageCellProps {
  id: number
  message: string
  type: 'contact' | 'consultation'
}

export const MessageCell = ({ id, message, type }: MessageCellProps) => {
  return (
    <Link 
      href={`/admin/messages/${id}?type=${type}`}
      className="group inline-flex items-center gap-2 text-gray-600 hover:text-burgundy-600 transition-all duration-200"
    >
      <p className="truncate max-w-xs">
        {message}
      </p>
      <ArrowRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all duration-200" />
    </Link>
  )
} 