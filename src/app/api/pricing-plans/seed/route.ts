import { NextResponse } from 'next/server'
import prisma from '@/lib/prisma'

export async function GET() {
  try {
    // Initial pricing data from your existing Pricing.tsx
    const initialPlans = [
      {
        name: "Basic",
        price: 1499,
        features: JSON.stringify([
          "Trademark Application Filing",
          "Free Class Search",
          "Free TM Consultation By expert",
          "Drafting & Filing by TM Expert",
          "Use TM next to your brand",
          "Call, Chat, Email Support",
          "No hidden charges"
        ])
      },
      {
        name: "Standard",
        price: 1999,
        features: JSON.stringify([
          "Trademark Application Filing",
          "Creative Logo Design By dedicated Logo Designer (3 Logo design choices)",
          "Expertise TM Search Report",
          "Free Class Search",
          "Free Consultation till you get TM Mark",
          "Drafting & Filing by TM Expert",
          "Use TM next to your brand",
          "Call, Chat, Email Support",
          "No hidden charges"
        ])
      },
      {
        name: "Trademark Registration & Objection",
        price: 2999,
        features: JSON.stringify([
          "Trademark Application Filing",
          "Expertise TM Search Report",
          "Free Class Search",
          "Free Consultation till you get TM Mark",
          "Drafting & Filing by TM Expert",
          "Use TM next to your brand",
          "Trademark Objection Reply"
        ])
      },
      {
        name: "Premium",
        price: 5499,
        features: JSON.stringify([
          "Trademark Application Filing",
          "Expertise TM Search Report",
          "Free Class Search",
          "Free Consultation till you get TM Mark",
          "Drafting & Filing by TM Expert",
          "Use TM next to your brand",
          "Trademark Objection Reply",
          "Trademark Hearing",
          "Call, Chat, Email Support",
          "No hidden charges"
        ])
      },
      {
        name: "All In One",
        price: 5999,
        features: JSON.stringify([
          "Trademark Application Filing",
          "Creative Logo Design By dedicated Logo Designer (3 Logo design choices)",
          "Expertise TM Search Report",
          "Free Class Search",
          "Free Consultation till you get TM Mark",
          "Drafting & Filing by TM Expert",
          "Use TM next to your brand",
          "Trademark Objection Reply",
          "Trademark Hearing",
          "Call, Chat, Email Support",
          "No hidden charges"
        ])
      }
    ]

    // Create all plans in the database
    const plans = await Promise.all(
      initialPlans.map(plan => 
        prisma.pricingPlan.create({
          data: {
            name: plan.name,
            price: plan.price,
            features: plan.features,
            isActive: true,
            version: 1
          }
        })
      )
    )

    return NextResponse.json({ 
      message: 'Initial pricing plans created successfully', 
      count: plans.length 
    })
  } catch (error) {
    console.error('Error seeding plans:', error)
    return NextResponse.json(
      { error: 'Failed to seed initial pricing plans' },
      { status: 500 }
    )
  }
} 