'use client'
import { useState } from 'react'
import { Calendar } from 'lucide-react'
import { format, parseISO } from 'date-fns'

interface ReminderCellProps {
  item: {
    id: number
    reminderDate: string | Date | null
  }
  onSetReminder: (id: number, date: string | null) => void
}

export const ReminderCell = ({ item, onSetReminder }: ReminderCellProps) => {
  const [isOpen, setIsOpen] = useState(false)
  const today = new Date().toISOString().split('T')[0]

  const getReminderStatus = () => {
    if (!item.reminderDate) return null
    
    const reminderDate = item.reminderDate instanceof Date 
      ? item.reminderDate 
      : parseISO(item.reminderDate)
    
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
      {item.reminderDate ? (
        <>
          <span className={`inline-flex items-center gap-1 px-2 py-1 rounded-md text-xs font-medium
            ${status === 'overdue' ? 'bg-red-100 text-red-700' : 
              status === 'today' ? 'bg-yellow-100 text-yellow-700' :
              'bg-blue-100 text-blue-700'}`}>
            <Calendar className="w-3 h-3" />
            {format(
              item.reminderDate instanceof Date 
                ? item.reminderDate 
                : parseISO(item.reminderDate), 
              'MMM d, yyyy'
            )}
          </span>
          <button
            onClick={() => onSetReminder(item.id, null)}
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
                onSetReminder(item.id, e.target.value)
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