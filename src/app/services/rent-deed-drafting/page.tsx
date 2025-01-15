'use client'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { 
  FileText, 
  Shield, 
  Clock,
  CheckCircle,
  Scale,
  Building,
  ArrowRight
} from 'lucide-react'

export default function RentDeedDrafting() {
  return (
    <ServicePageTemplate
      title="Rent Deed Drafting"
      subtitle="Get your rent agreement drafted by legal experts in 24 hours. 100% online process."
      heroImage="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg"
      stats={[
        { number: "24h", text: "Delivery Time" },
        { number: "100%", text: "Online Process" },
        { number: "Legal", text: "Expert Drafted" }
      ]}
      features={[
        {
          icon: FileText,
          title: "Professional\nDrafting",
          description: "Expert-drafted agreements that protect your interests"
        },
        {
          icon: Shield,
          title: "Legal\nCompliance",
          description: "Fully compliant with latest rental laws and regulations"
        },
        {
          icon: Clock,
          title: "Quick\nTurnaround",
          description: "Get your agreement within 24 hours"
        },
        {
          icon: Scale,
          title: "Fair\nTerms",
          description: "Balanced terms protecting both parties' interests"
        },
        {
          icon: Building,
          title: "Property\nProtection",
          description: "Safeguard your property rights and interests"
        }
      ]}
      comparisonData={[
        {
          title: "Rent/Lease Agreement",
          image: "https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg",
          benefits: [
            "Exclusive Possession",
            "Property Rights",
            "Heritable Rights",
            "Transferable",
            "Long-term Security",
            "Rent Control Protection"
          ],
          isPrimary: true
        },
        {
          title: "Leave & License",
          image: "https://images.pexels.com/photos/3760068/pexels-photo-3760068.jpeg",
          benefits: [
            "Permission to Occupy",
            "Easy Eviction",
            "Lower Stamp Duty",
            "No Property Rights",
            "Non-transferable",
            "Revocable by Landlord"
          ],
          isPrimary: false
        },
        {
          title: "Informal Agreement",
          image: "https://images.pexels.com/photos/3760070/pexels-photo-3760070.jpeg",
          benefits: [
            "No Legal Protection",
            "Verbal Understanding",
            "No Registration",
            "High Risk",
            "No Enforceability",
            "Not Recommended"
          ],
          isPrimary: false
        }
      ]}
      processList={[
        "Fill the form and make payment",
        "Get call from legal expert team",
        "Provide required information",
        "Review draft agreement",
        "Get one-time corrections",
        "Receive final agreement"
      ]}
      documentsList={[
        "Address Proof of Parties",
        "Identity Proof of Parties",
        "Property Documents",
        "Passport Size Photos",
        "PAN Cards",
        "Aadhar Cards",
        "Previous Agreement (if any)"
      ]}
    />
  )
} 