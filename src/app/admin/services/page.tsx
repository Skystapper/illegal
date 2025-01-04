'use client'
import { useState, useEffect } from 'react'
import { CheckIcon, TrashIcon } from '@heroicons/react/24/solid'
import { EditModal } from './components/EditModal'
import { HistoryModal } from './components/HistoryModal'
import { DeleteConfirmationModal } from './components/DeleteConfirmationModal'
import { PricingPlan, PricingPlanHistory, parseFeatures } from '@/types/pricing'
import {
  DndContext,
  closestCenter,
  KeyboardSensor,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
} from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  sortableKeyboardCoordinates,
  horizontalListSortingStrategy,
} from '@dnd-kit/sortable'
import { SortablePricingCard } from './components/SortablePricingCard'

const Page = () => {
  const [plans, setPlans] = useState<PricingPlan[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [showEditModal, setShowEditModal] = useState(false)
  const [showHistoryModal, setShowHistoryModal] = useState(false)
  const [editingPlan, setEditingPlan] = useState<PricingPlan | null>(null)
  const [planHistory, setPlanHistory] = useState<PricingPlanHistory[]>([])
  const [planToDelete, setPlanToDelete] = useState<PricingPlan | null>(null)

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8, // 8px movement required before drag starts
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  )

  useEffect(() => {
    fetchPlans()
  }, [])

  const fetchPlans = async () => {
    try {
      setIsLoading(true)
      setError(null)
      const response = await fetch('/api/pricing-plans')
      
      if (!response.ok) {
        throw new Error('Failed to fetch plans')
      }
      
      const data = await response.json()
      setPlans(data.sort((a: PricingPlan, b: PricingPlan) => a.orderIndex - b.orderIndex))
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
      console.error('Error fetching plans:', err)
    } finally {
      setIsLoading(false)
    }
  }

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event

    if (over && active.id !== over.id) {
      setPlans((items) => {
        const oldIndex = items.findIndex((item) => item.id === active.id)
        const newIndex = items.findIndex((item) => item.id === over.id)
        if (oldIndex === -1 || newIndex === -1) return items
        
        const newOrder = arrayMove(items, oldIndex, newIndex)
        // Update order in database
        fetch('/api/pricing-plans/reorder', {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            updates: newOrder.map((plan, index) => ({
              id: plan.id,
              orderIndex: index,
            })),
          }),
        }).then(res => res.json())
        .then(updatedPlans => {
          // Update local state with server response
          setPlans(updatedPlans)
        })
        .catch(error => {
          console.error('Failed to update order:', error)
          // Optionally revert to original order
          fetchPlans()
        })
  
        return newOrder
      })
    }
  }

  const handleEdit = (plan: PricingPlan) => {
    setEditingPlan(plan)
    setShowEditModal(true)
  }

  const handleDelete = (plan: PricingPlan) => {
    setPlanToDelete(plan)
  }

  const handleViewHistory = async (planId: number) => {
    try {
      const response = await fetch(`/api/pricing-plans/${planId}/history`)
      if (!response.ok) {
        throw new Error('Failed to fetch plan history')
      }
      const data = await response.json()
      setPlanHistory(data)
      setShowHistoryModal(true)
    } catch (error) {
      console.error('Error fetching plan history:', error)
      alert('Failed to load plan history')
    }
  }

  const handleDeletePlan = async (planId: number) => {
    try {
      const response = await fetch(`/api/pricing-plans/${planId}`, {
        method: 'DELETE',
      })
      
      if (!response.ok) {
        const error = await response.json()
        throw new Error(error.message || 'Failed to delete plan')
      }
      
      await fetchPlans()
      setPlanToDelete(null)
    } catch (error) {
      console.error('Error deleting plan:', error)
      throw error
    }
  }

  const handleUpdatePlan = async (updatedPlan: PricingPlan) => {
    try {
      const response = await fetch(`/api/pricing-plans/${updatedPlan.id || ''}`, {
        method: updatedPlan.id ? 'PUT' : 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: updatedPlan.name,
          price: updatedPlan.price,
          features: updatedPlan.features,
          orderIndex: updatedPlan.orderIndex || plans.length // New plans go to the end
        }),
      })
  
      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.message || 'Failed to update plan')
      }
  
      await fetchPlans()
      setShowEditModal(false)
      setEditingPlan(null)
    } catch (error) {
      throw error
    }
  }

  const handleRevertVersion = async (version: PricingPlanHistory) => {
    try {
      const currentOrderIndex = plans.find(p => p.id === version.planId)?.orderIndex || 0
      await handleUpdatePlan({
        id: version.planId,
        name: version.name,
        price: version.price,
        features: parseFeatures(version.features),
        version: version.version,
        orderIndex: currentOrderIndex
      })
      setShowHistoryModal(false)
    } catch (error) {
      console.error('Error reverting version:', error)
      alert('Failed to revert to selected version')
    }
  }

  if (isLoading) {
    return (
      <div className="p-6">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-burgundy-600 mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading plans...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          <p>{error}</p>
          <button 
            onClick={fetchPlans}
            className="mt-2 text-sm underline hover:no-underline"
          >
            Try again
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="p-6 max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-12">
        <h1 className="text-3xl font-bold text-gray-800">Manage Pricing Plans</h1>
        <button 
          className="bg-burgundy-600 text-white px-6 py-2.5 rounded-lg hover:bg-burgundy-700 transition-colors duration-300 flex items-center gap-2"
          onClick={() => handleEdit({
            id: 0,
            name: '',
            price: 0,
            features: [],
            version: 1,
            orderIndex: plans.length // New plans go to the end
          })}
        >
          <span className="text-lg">+</span>
          Add New Plan
        </button>
      </div>

      {plans.length === 0 ? (
        <div className="text-center py-16 bg-gray-50 rounded-2xl border-2 border-dashed border-gray-200">
          <p className="text-gray-500 mb-4">No pricing plans found.</p>
          <button
            onClick={() => handleEdit({
              id: 0,
              name: '',
              price: 0,
              features: [],
              version: 1,
              orderIndex: 0
            })}
            className="text-burgundy-600 underline hover:text-burgundy-700"
          >
            Add your first plan
          </button>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          collisionDetection={closestCenter}
          onDragEnd={handleDragEnd}
        >
          <SortableContext
            items={plans}
            strategy={horizontalListSortingStrategy}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 auto-rows-fr"> {/* Added auto-rows-fr */}
  {plans.map((plan) => (
    <SortablePricingCard
      key={plan.id}
      plan={plan}
      onEdit={() => handleEdit(plan)}
      onDelete={() => handleDelete(plan)}
      onViewHistory={() => handleViewHistory(plan.id)}
    />
  ))}
</div>
          </SortableContext>
        </DndContext>
      )}

      {showEditModal && editingPlan && (
        <EditModal
          plan={editingPlan}
          onClose={() => {
            setShowEditModal(false)
            setEditingPlan(null)
          }}
          onSave={handleUpdatePlan}
        />
      )}

      {showHistoryModal && (
        <HistoryModal
          history={planHistory}
          onClose={() => setShowHistoryModal(false)}
          onRevert={handleRevertVersion}
        />
      )}

      {planToDelete && (
        <DeleteConfirmationModal
          plan={planToDelete}
          onClose={() => setPlanToDelete(null)}
          onConfirm={() => handleDeletePlan(planToDelete.id)}
        />
      )}
    </div>
  )
}

export default Page 