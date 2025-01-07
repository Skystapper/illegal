import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    const { reminderDate } = await request.json()

    const contact = await prisma.contact.update({
      where: { id },
      data: { 
        reminderDate: reminderDate ? new Date(reminderDate) : null
      }
    })

    return NextResponse.json(contact)
  } catch (error) {
    console.error('Error updating reminder:', error)
    return NextResponse.json(
      { error: 'Failed to update reminder' },
      { status: 500 }
    )
  }
} 