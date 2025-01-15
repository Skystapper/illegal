"use client"
import { useSortable } from '@dnd-kit/sortable'
import { CSS } from '@dnd-kit/utilities'
import { TrashIcon } from '@heroicons/react/24/outline'
import { MoreVertical } from 'lucide-react'
import { PricingPlan } from '@/types/pricing'

interface SortablePricingCardProps {
  plan: PricingPlan
  onEdit: () => void
  onDelete: () => void
  onViewHistory: () => void
}

export function SortablePricingCard({ plan, onEdit, onDelete, onViewHistory }: SortablePricingCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: plan.id })

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  }

  return (
    <div 
      className="h-full"
      style={style}
    >
      <div className={`bg-white rounded-2xl shadow-lg overflow-hidden border border-gray-100 h-full transition-shadow duration-300 ${isDragging ? 'shadow-2xl' : ''}`}>
        <div className="bg-burgundy-600 p-6 relative">
          <div className="flex justify-between items-start">
            <h3 className="text-2xl text-white leading-tight">{plan.name}</h3>
            <div 
              ref={setNodeRef}
              {...attributes}
              {...listeners}
              className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white/10 transition-colors cursor-grab active:cursor-grabbing"
            >
              <MoreVertical className="w-5 h-5 text-white" />
            </div>
          </div>
          <div className="flex items-baseline text-white flex-wrap mt-4">
            <span className="text-4xl font-bold leading-none">₹{plan.price}</span>
            <span className="ml-2 text-sm opacity-75">+ gov. fees</span>
          </div>
        </div>

        <div className="p-6 flex-grow">
          <ul className="space-y-3">
            {Array.isArray(plan.features) && plan.features.map((feature, idx) => (
              <li key={idx} className="flex items-start text-gray-700">
                <svg 
                  className="w-5 h-5 mr-2 text-burgundy-600 mt-0.5 shrink-0" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M5 13l4 4L19 7" 
                  />
                </svg>
                <span className="text-sm">{feature}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="p-6 border-t border-gray-100 bg-gray-50">
          <div className="flex gap-3">
            <button
              onClick={onEdit}
              className="flex-1 bg-burgundy-600 text-white px-4 py-2.5 rounded-lg hover:bg-burgundy-700 transition-colors text-sm font-medium"
            >
              Edit Plan
            </button>
            <button
              onClick={onViewHistory}
              className="flex-1 bg-white text-gray-700 px-4 py-2.5 rounded-lg hover:bg-gray-100 transition-colors border border-gray-200 text-sm font-medium"
            >
              History
            </button>
            <button
              onClick={onDelete}
              className="w-10 h-10 flex items-center justify-center text-red-600 hover:bg-red-50 rounded-lg transition-colors border border-gray-200"
              title="Delete Plan"
            >
              <TrashIcon className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </div>
  )
} 