"use client"
import { useState } from 'react'
import { XMarkIcon, ClockIcon, ArrowPathIcon } from '@heroicons/react/24/solid'
import { PricingPlanHistory, parseFeatures } from '@/types/pricing'

interface HistoryModalProps {
  history: PricingPlanHistory[]
  onClose: () => void
  onRevert: (version: PricingPlanHistory) => Promise<void>
}

export const HistoryModal = ({ history, onClose, onRevert }: HistoryModalProps) => {
  const [isReverting, setIsReverting] = useState<number | null>(null)

  const handleRevert = async (version: PricingPlanHistory) => {
    try {
      setIsReverting(version.version)
      await onRevert(version)
    } catch (error) {
      console.error('Error reverting version:', error)
    } finally {
      setIsReverting(null)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-burgundy-600">
          <div className="flex items-center gap-2 text-white">
            <ClockIcon className="w-5 h-5" />
            <h2 className="text-xl font-bold">Plan History</h2>
          </div>
          <button 
            onClick={onClose}
            className="text-white/80 hover:text-white"
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* History Timeline */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          <div className="space-y-6">
            {history.map((version, index) => (
              <div 
                key={version.id}
                className={`relative pl-8 pb-6 ${
                  index !== history.length - 1 ? 'border-l-2 border-gray-200' : ''
                }`}
              >
                {/* Version Dot */}
                <div className="absolute left-0 -translate-x-1/2 w-4 h-4 rounded-full bg-burgundy-600 border-4 border-white shadow" />
                
                {/* Version Content */}
                <div className="bg-white rounded-xl border border-gray-200 shadow-sm hover:shadow-md transition-shadow">
                  <div className="p-4 border-b border-gray-100">
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h3 className="font-semibold text-lg">Version {version.version}</h3>
                        <p className="text-sm text-gray-500">
                          {new Date(version.changedAt).toLocaleDateString('en-US', {
                            year: 'numeric',
                            month: 'long',
                            day: 'numeric',
                            hour: '2-digit',
                            minute: '2-digit'
                          })}
                        </p>
                      </div>
                      <button
                        onClick={() => handleRevert(version)}
                        disabled={isReverting !== null}
                        className="flex items-center gap-2 px-4 py-2 text-sm rounded-lg bg-burgundy-50 text-burgundy-600 hover:bg-burgundy-100 disabled:opacity-50 transition-colors"
                      >
                        <ArrowPathIcon className={`w-4 h-4 ${
                          isReverting === version.version ? 'animate-spin' : ''
                        }`} />
                        {isReverting === version.version ? 'Reverting...' : 'Revert to this version'}
                      </button>
                    </div>
                  </div>

                  <div className="p-4 space-y-4">
                    <div>
                      <label className="text-sm font-medium text-gray-500">Name</label>
                      <p className="text-gray-900">{version.name}</p>
                    </div>
                    
                    <div>
                      <label className="text-sm font-medium text-gray-500">Price</label>
                      <p className="text-gray-900">₹{version.price}</p>
                    </div>

                    <div>
                      <label className="text-sm font-medium text-gray-500">Features</label>
                      <ul className="mt-2 space-y-2">
                        {parseFeatures(version.features).map((feature: string, i: number) => (
                          <li 
                            key={i}
                            className="flex items-start gap-2 text-gray-600"
                          >
                            <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-burgundy-600 mt-2" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
} 