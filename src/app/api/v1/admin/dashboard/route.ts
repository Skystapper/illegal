import { NextResponse } from 'next/server'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export async function GET() {
  try {
    // Get counts
    const [
      totalConsultations,
      totalContacts,
      pendingConsultations,
      pendingContacts,
      recentConsultations,
      recentContacts
    ] = await Promise.all([
      prisma.consultation.count(),
      prisma.contact.count(),
      prisma.consultation.count({
        where: { status: 'pending' }
      }),
      prisma.contact.count({
        where: { status: 'pending' }
      }),
      prisma.consultation.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          name: true,
          email: true,
          createdAt: true,
          status: true
        }
      }),
      prisma.contact.findMany({
        take: 5,
        orderBy: { createdAt: 'desc' },
        select: {
          id: true,
          firstName: true,
          lastName: true,
          email: true,
          subject: true,
          createdAt: true,
          status: true
        }
      })
    ])

    return NextResponse.json({
      totalConsultations,
      totalContacts,
      pendingConsultations,
      pendingContacts,
      recentConsultations: recentConsultations.map(c => ({
        ...c,
        date: c.createdAt.toISOString()
      })),
      recentContacts: recentContacts.map(c => ({
        ...c,
        createdAt: c.createdAt.toISOString()
      }))
    })
  } catch (error) {
    console.error('Dashboard stats error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch dashboard stats' },
      { status: 500 }
    )
  }
} 