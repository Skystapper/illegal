import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
    try {
      const activePlans = await prisma.pricingPlan.findMany({
        where: { isActive: true },
        orderBy: { price: 'asc' }
      })
  
      // Parse the features JSON string back to array for frontend use
      const parsedPlans = activePlans.map(plan => ({
        ...plan,
        features: JSON.parse(plan.features)
      }))
  
      return NextResponse.json(parsedPlans)
    } catch (error) {
      console.error('Error fetching plans:', error)
      return NextResponse.json(
        { error: 'Failed to fetch pricing plans' },
        { status: 500 }
      )
    }
  }
  export async function POST(request: Request) {
    try {
      const data = await request.json()
      
      // Convert features array to JSON string when saving to database
      const plan = await prisma.pricingPlan.create({
        data: {
          ...data,
          features: JSON.stringify(data.features)
        }
      })
  
      return NextResponse.json(plan)
    } catch (error) {
      return NextResponse.json(
        { message: 'Failed to create plan' },
        { status: 500 }
      )
    }
  }

// For updating plans with version history
export async function PUT(request: Request) {
  try {
    const body = await request.json()
    const { id, ...updates } = body

    // Get current plan
    const currentPlan = await prisma.pricingPlan.findUnique({
      where: { id }
    })

    if (!currentPlan) {
      return NextResponse.json(
        { error: 'Plan not found' },
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

    // Update the plan with new version
    const updatedPlan = await prisma.pricingPlan.update({
      where: { id },
      data: {
        ...updates,
        version: { increment: 1 }
      }
    })

    return NextResponse.json(updatedPlan)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update pricing plan' },
      { status: 500 }
    )
  }
} 