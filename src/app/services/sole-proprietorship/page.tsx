'use client'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { 
  User, 
  Wallet, 
  Settings,
  Clock,
  FileText,
  Briefcase,
  BadgeCheck
} from 'lucide-react'

export default function SoleProprietorship() {
  return (
    <ServicePageTemplate 
      title="Sole Proprietorship"
      subtitle="Start your business journey with complete control and minimal formalities"
      heroImage="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg"
      stats={[
        { number: "5-7", text: "Days for Registration" },
        { number: "18+", text: "Minimum Age Required" },
        { number: "₹699", text: "Starting Registration Cost" }
      ]}
      features={[
        {
          icon: User,
          title: "Complete\nControl",
          description: "Full ownership and decision-making authority"
        },
        {
          icon: Clock,
          title: "Quick\nSetup",
          description: "Minimal formalities and fast registration process"
        },
        {
          icon: Wallet,
          title: "Low\nCost",
          description: "Minimal startup and registration expenses"
        },
        {
          icon: Settings,
          title: "Simple\nCompliance",
          description: "Straightforward regulatory requirements"
        },
        {
          icon: BadgeCheck,
          title: "MSME\nBenefits",
          description: "Access to government schemes and subsidies"
        }
      ]}
      comparisonData={[
        {
          title: "Sole Proprietorship",
          image: "https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg",
          benefits: [
            "Complete Control",
            "Simple Setup",
            "Low Cost",
            "Minimal Compliance",
            "Quick Decisions",
            "MSME Benefits"
          ],
          isPrimary: true
        },
        {
          title: "Partnership Firm",
          image: "https://images.pexels.com/photos/3760068/pexels-photo-3760068.jpeg",
          benefits: [
            "Shared Control",
            "Multiple Owners",
            "Shared Resources",
            "More Formalities",
            "Joint Decisions",
            "Shared Liability"
          ],
          isPrimary: false
        },
        {
          title: "Private Limited",
          image: "https://images.pexels.com/photos/3760070/pexels-photo-3760070.jpeg",
          benefits: [
            "Limited Liability",
            "Complex Structure",
            "Higher Costs",
            "More Compliance",
            "Board Control",
            "Separate Entity"
          ],
          isPrimary: false
        }
      ]}
      processList={[
        "Choose your business name",
        "Prepare required documents",
        "Open a business bank account",
        "Register as MSME (optional)",
        "Obtain necessary licenses",
        "Apply for GST (if applicable)",
        "Complete registration process"
      ]}
      documentsList={[
        "Aadhaar Card",
        "PAN Card",
        "Bank Account Details",
        "Address Proof",
        "Rental Agreement",
        "NOC from Landlord",
        "Electricity Bill"
      ]}
    />
  )
} 