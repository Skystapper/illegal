import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

// PATCH /api/v1/consultations/[id]
export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const { status } = await request.json()

    const consultation = await prisma.consultation.update({
      where: { id },
      data: { status },
    })

    return NextResponse.json(consultation)
  } catch (error) {
    console.error('Error updating consultation:', error)
    return NextResponse.json(
      { error: 'Error updating consultation' },
      { status: 500 }
    )
  }
} 