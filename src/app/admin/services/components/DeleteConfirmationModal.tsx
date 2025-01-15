import { ExclamationTriangleIcon } from '@heroicons/react/24/solid'
import { useState } from 'react'
import { PricingPlan } from '@/types/pricing'

interface DeleteConfirmationModalProps {
  plan: PricingPlan
  onClose: () => void
  onConfirm: () => Promise<void>
}

export const DeleteConfirmationModal = ({ plan, onClose, onConfirm }: DeleteConfirmationModalProps) => {
  const [isDeleting, setIsDeleting] = useState(false)
  const [confirmText, setConfirmText] = useState('')
  const [error, setError] = useState<string | null>(null)

  const handleConfirm = async () => {
    setError(null)
    setIsDeleting(true)
    try {
      await onConfirm()
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to delete plan')
    } finally {
      setIsDeleting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-lg w-full overflow-hidden">
        {/* Header */}
        <div className="bg-red-50 p-6">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 rounded-full bg-red-100 flex items-center justify-center flex-shrink-0">
              <ExclamationTriangleIcon className="w-6 h-6 text-red-600" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-red-700">Delete Pricing Plan</h2>
              <p className="text-red-600 mt-1">This action cannot be undone</p>
            </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-4">
          {error && (
            <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg">
              {error}
            </div>
          )}

          <div className="bg-gray-50 rounded-lg p-4">
            <p className="text-gray-600 mb-2">You are about to delete:</p>
            <p className="font-semibold">{plan.name}</p>
            <p className="text-gray-600">Price: ₹{plan.price}</p>
          </div>

          <div className="text-sm text-gray-500 bg-yellow-50 p-4 rounded-lg">
            <strong>Warning:</strong> Deleting this plan will:
            <ul className="list-disc ml-5 mt-2 space-y-1">
              <li>Remove it from your pricing page immediately</li>
              <li>Make it unavailable for new subscriptions</li>
              <li>Delete all associated history and data</li>
            </ul>
          </div>

          <div className="space-y-2">
            <p className="text-gray-700 font-medium">
            To confirm deletion, please type &quot;{plan.name}&quot; below:
            </p>
            <input
              type="text"
              value={confirmText}
              onChange={(e) => setConfirmText(e.target.value)}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
              placeholder={plan.name}
              disabled={isDeleting}
            />
          </div>
        </div>

        {/* Actions */}
        <div className="p-6 bg-gray-50 flex gap-3">
          <button
            onClick={handleConfirm}
            disabled={confirmText !== plan.name || isDeleting}
            className="flex-1 bg-red-600 text-white px-6 py-2.5 rounded-lg hover:bg-red-700 disabled:bg-red-300 transition-colors"
          >
            {isDeleting ? 'Deleting...' : 'Delete Plan'}
          </button>
          <button
            onClick={onClose}
            disabled={isDeleting}
            className="flex-1 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 disabled:bg-gray-100 transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  )
} 