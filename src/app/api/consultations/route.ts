import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Save to database
    const consultation = await prisma.consultation.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        service: body.service,
        status: 'pending'
      }
    })
    
    return NextResponse.json({ 
      message: 'Consultation request submitted successfully',
      consultation 
    })

  } catch (error) {
    console.error('Consultation submission error:', error)
    return NextResponse.json(
      { error: 'Failed to submit consultation request' },
      { status: 500 }
    )
  }
}

export async function GET() {
  try {
    const consultations = await prisma.consultation.findMany({
      orderBy: {
        createdAt: 'desc'
      }
    })
    
    return NextResponse.json(consultations)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch consultations' },
      { status: 500 }
    )
  }
} 