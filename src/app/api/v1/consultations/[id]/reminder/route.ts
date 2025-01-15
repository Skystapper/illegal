import { NextRequest, NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: NextRequest,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const { reminderDate } = await request.json()

    // Simple update without any fancy stuff
    const consultation = await prisma.consultation.update({
      where: { 
        id 
      },
      data: { 
        reminderDate: reminderDate ? new Date(reminderDate) : null
      }
    })

    return NextResponse.json(consultation)
  } catch (error) {
    return NextResponse.json({ error: 'Failed to update reminder' }, { status: 500 })
  }
} 