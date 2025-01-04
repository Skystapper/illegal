import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const planId = parseInt(params.id)
    const body = await request.json()

    // Get current plan for history
    const currentPlan = await prisma.pricingPlan.findUnique({
      where: { id: planId }
    })

    if (!currentPlan) {
      return NextResponse.json(
        { message: 'Plan not found' },
        { status: 404 }
      )
    }

    // Save current version to history
    await prisma.pricingPlanHistory.create({
      data: {
        planId: currentPlan.id,
        name: currentPlan.name,
        price: currentPlan.price,
        features: currentPlan.features,
        version: currentPlan.version
      }
    })

    // Update the plan
    const updatedPlan = await prisma.pricingPlan.update({
      where: { id: planId },
      data: {
        name: body.name,
        price: body.price,
        features: body.features,
        version: { increment: 1 }
      }
    })

    return NextResponse.json(updatedPlan)
  } catch (error) {
    console.error('Error updating plan:', error)
    return NextResponse.json(
      { message: 'Failed to update plan' },
      { status: 500 }
    )
  }
} 

export async function DELETE(
    request: Request,
    { params }: { params: { id: string } }
  ) {
    try {
      const planId = parseInt(params.id)
  
      // First delete all history records
      await prisma.pricingPlanHistory.deleteMany({
        where: {
          planId: planId
        }
      })
  
      // Then delete the plan
      await prisma.pricingPlan.delete({
        where: {
          id: planId
        }
      })
  
      return NextResponse.json({ message: 'Plan deleted successfully' })
    } catch (error) {
      console.error('Error deleting plan:', error)
      return NextResponse.json(
        { message: 'Failed to delete plan' },
        { status: 500 }
      )
    }
  }