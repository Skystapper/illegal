import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PUT(request: Request) {
  try {
    const { updates } = await request.json()

    // Use transaction to ensure all updates succeed or none do
    await prisma.$transaction(
      updates.map(({ id, orderIndex }: { id: number, orderIndex: number }) =>
        prisma.pricingPlan.update({
          where: { id },
          data: { orderIndex }
        })
      )
    )

    // Fetch and return the updated plans
    const updatedPlans = await prisma.pricingPlan.findMany({
      where: { isActive: true },
      orderBy: { orderIndex: 'asc' }
    })

    return NextResponse.json(updatedPlans)
  } catch (error) {
    console.error('Error updating order:', error)
    return NextResponse.json(
      { message: 'Failed to update order' },
      { status: 500 }
    )
  }
} 