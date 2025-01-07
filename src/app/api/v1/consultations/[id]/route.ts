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

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const consultation = await prisma.consultation.findUnique({
      where: {
        id: parseInt(params.id)
      }
    })

    if (!consultation) {
      return NextResponse.json(
        { error: 'Consultation not found' },
        { status: 404 }
      )
    }

    return NextResponse.json(consultation)
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    )
  }
} 