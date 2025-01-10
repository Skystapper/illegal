import { useState } from 'react'
import { XMarkIcon, PlusIcon, TrashIcon } from '@heroicons/react/24/solid'
import { PricingPlan } from '@/types/pricing'

interface EditModalProps {
  plan: PricingPlan
  onClose: () => void
  onSave: (plan: PricingPlan) => Promise<void>
}

export const EditModal = ({ plan, onClose, onSave }: EditModalProps) => {
  const [editingPlan, setEditingPlan] = useState<PricingPlan>(plan)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [newFeature, setNewFeature] = useState('')

  const getFeatures = (plan: PricingPlan): string[] => {
    if (typeof plan.features === 'string') {
      try {
        return JSON.parse(plan.features)
      } catch {
        return []
      }
    }
    return plan.features as string[]
  }

  const addFeature = () => {
    if (newFeature.trim()) {
      const features = getFeatures(editingPlan)
      setEditingPlan({
        ...editingPlan,
        features: [...features, newFeature.trim()]
      })
      setNewFeature('')
    }
  }

  const removeFeature = (index: number) => {
    const features = getFeatures(editingPlan)
    setEditingPlan({
      ...editingPlan,
      features: features.filter((_, i) => i !== index)
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await onSave({
        ...editingPlan,
        features: JSON.stringify(getFeatures(editingPlan))
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to update plan')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
      <div className="bg-white rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 border-b border-gray-200 flex justify-between items-center bg-burgundy-600">
          <h2 className="text-xl font-bold text-white">
            {plan.id ? 'Edit Plan' : 'Add New Plan'}
          </h2>
          <button 
            onClick={onClose} 
            className="text-white/80 hover:text-white"
            disabled={isLoading}
          >
            <XMarkIcon className="w-6 h-6" />
          </button>
        </div>

        {/* Form */}
        <div className="p-6 overflow-y-auto max-h-[calc(90vh-120px)]">
          {error && (
            <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-700 rounded-lg">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Plan Name
              </label>
              <input
                type="text"
                value={editingPlan.name}
                onChange={(e) => setEditingPlan({...editingPlan, name: e.target.value})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500"
                disabled={isLoading}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Price (₹)
              </label>
              <input
                type="number"
                value={editingPlan.price}
                onChange={(e) => setEditingPlan({...editingPlan, price: Number(e.target.value)})}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500"
                disabled={isLoading}
                required
                min="0"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Features
              </label>
              
              {/* Feature List */}
              <div className="mb-4 space-y-2">
                {getFeatures(editingPlan).map((feature, index) => (
                  <div 
                    key={index}
                    className="flex items-center gap-2 p-3 bg-gray-50 rounded-lg group"
                  >
                    <span className="flex-1">{feature}</span>
                    <button
                      type="button"
                      onClick={() => removeFeature(index)}
                      className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
                      disabled={isLoading}
                    >
                      <TrashIcon className="w-5 h-5" />
                    </button>
                  </div>
                ))}
              </div>

              {/* Add Feature Input */}
              <div className="flex gap-2">
                <input
                  type="text"
                  value={newFeature}
                  onChange={(e) => setNewFeature(e.target.value)}
                  placeholder="Add a new feature..."
                  className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-burgundy-500 focus:border-burgundy-500"
                  disabled={isLoading}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault()
                      addFeature()
                    }
                  }}
                />
                <button
                  type="button"
                  onClick={addFeature}
                  disabled={!newFeature.trim() || isLoading}
                  className="px-4 py-2 bg-burgundy-600 text-white rounded-lg hover:bg-burgundy-700 disabled:bg-burgundy-300 transition-colors"
                >
                  <PlusIcon className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t">
              <button
                type="submit"
                className="flex-1 bg-burgundy-600 text-white px-6 py-2.5 rounded-lg hover:bg-burgundy-700 disabled:bg-burgundy-300 transition-colors"
                disabled={isLoading}
              >
                {isLoading ? 'Saving...' : 'Save Changes'}
              </button>
              <button
                type="button"
                onClick={onClose}
                className="flex-1 bg-gray-100 text-gray-700 px-6 py-2.5 rounded-lg hover:bg-gray-200 disabled:bg-gray-100 transition-colors"
                disabled={isLoading}
              >
                Cancel
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  )
} 