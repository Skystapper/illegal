'use client'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { 
  FileText, 
  Shield, 
  Clock,
  Scale,
  Building,
  CheckCircle,
  ArrowRight
} from 'lucide-react'

export default function SaleDeedDrafting() {
  return (
    <ServicePageTemplate
      title="Sale Deed Drafting"
      subtitle="Get your sale deed drafted by legal experts. Professional, secure, and compliant."
      heroImage="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg"
      stats={[
        { number: "24h", text: "Delivery Time" },
        { number: "100%", text: "Online Process" },
        { number: "Expert", text: "Legal Drafting" }
      ]}
      features={[
        {
          icon: FileText,
          title: "Professional\nDrafting",
          description: "Expert-drafted sale deeds by legal professionals"
        },
        {
          icon: Shield,
          title: "Legal\nCompliance",
          description: "Fully compliant with property transfer laws"
        },
        {
          icon: Clock,
          title: "Quick\nTurnaround",
          description: "Fast and efficient drafting service"
        },
        {
          icon: Scale,
          title: "Fair\nTerms",
          description: "Balanced terms protecting both parties"
        },
        {
          icon: Building,
          title: "Property\nProtection",
          description: "Secure transfer of property ownership"
        }
      ]}
      comparisonData={[
        {
          title: "Sale Deed",
          image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg",
          benefits: [
            "Immediate Transfer",
            "Executed Contract",
            "Mandatory Registration",
            "Legal Ownership Transfer",
            "Complete Transaction",
            "Stronger Legal Standing"
          ],
          isPrimary: true
        },
        {
          title: "Agreement of Sale",
          image: "https://images.pexels.com/photos/3183181/pexels-photo-3183181.jpeg",
          benefits: [
            "Future Transfer",
            "Executory Contract",
            "Optional Registration",
            "Promise to Transfer",
            "Preliminary Stage",
            "Limited Protection"
          ],
          isPrimary: false
        },
        {
          title: "No Documentation",
          image: "https://images.pexels.com/photos/3183182/pexels-photo-3183182.jpeg",
          benefits: [
            "No Legal Protection",
            "High Risk",
            "No Ownership Proof",
            "No Legal Standing",
            "Dispute Prone",
            "Not Recommended"
          ],
          isPrimary: false
        }
      ]}
      processList={[
        "Submit property and party details",
        "Expert consultation on deed structure",
        "Draft preparation by legal team",
        "Review and feedback round",
        "Incorporate necessary changes",
        "Final deed delivery for registration"
      ]}
      documentsList={[
        "Property Documents",
        "Seller's Identity Proof",
        "Buyer's Identity Proof",
        "Previous Sale Deed",
        "Property Tax Receipts",
        "NOC (if applicable)",
        "Payment Proofs"
      ]}
    />
  )
} 