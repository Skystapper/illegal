import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const planId = parseInt(params.id)
    const history = await prisma.pricingPlanHistory.findMany({
      where: { planId },
      orderBy: { changedAt: 'desc' }
    })
    
    return NextResponse.json(history)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch plan history' },
      { status: 500 }
    )
  }
} 