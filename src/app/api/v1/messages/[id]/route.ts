import { NextResponse } from 'next/server'
import { prisma } from '@/lib/prisma'
import type { ContactMessage, ConsultationMessage } from '@/types'

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const id = parseInt(params.id)
    
    // Try contacts first
    const contact = await prisma.contact.findUnique({
      where: { id }
    })

    if (contact) {
      return NextResponse.json({
        ...contact,
        type: 'contact'
      } as ContactMessage)
    }

    // Try consultations
    const consultation = await prisma.consultation.findUnique({
      where: { id }
    })

    if (consultation) {
      return NextResponse.json({
        ...consultation,
        type: 'consultation'
      } as ConsultationMessage)
    }

    return NextResponse.json(
      { error: 'Message not found' },
      { status: 404 }
    )
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch message' },
      { status: 500 }
    )
  }
}