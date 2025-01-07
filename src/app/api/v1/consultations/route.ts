import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// GET /api/v1/consultations
export async function GET() {
  try {
    const consultations = await prisma.consultation.findMany({
      orderBy: { createdAt: 'desc' }
    })
    return NextResponse.json(consultations)
  } catch (error) {
    return NextResponse.json(
      { error: 'Failed to fetch consultations' },
      { status: 500 }
    )
  }
}

// POST /api/v1/consultations
export async function POST(request: Request) {
  try {
    const body = await request.json()
    
    // Add logging to see what we're receiving
    console.log('Received body:', body)
    
    const consultation = await prisma.consultation.create({
      data: {
        name: body.name,
        email: body.email,
        phone: body.phone,
        message: body.message,
        status: 'pending',
      }
    })
    
    return NextResponse.json(consultation, { status: 201 })
  } catch (error) {
    console.error('Creation error:', error)
    return NextResponse.json(
      { error: 'Failed to create consultation' },
      { status: 500 }
    )
  }
} 