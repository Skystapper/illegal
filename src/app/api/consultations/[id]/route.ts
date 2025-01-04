import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function PATCH(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const body = await request.json()
    const consultation = await prisma.consultation.update({
      where: {
        id: parseInt(params.id)
      },
      data: {
        status: body.status
      }
    })
    
    return NextResponse.json(consultation)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to update consultation' },
      { status: 500 }
    )
  }
} 