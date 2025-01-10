'use client'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { 
  FileText, 
  Shield, 
  Clock,
  Building,
  Scale,
  Key,
  ArrowRight
} from 'lucide-react'

export default function LeaseDeedDrafting() {
  return (
    <ServicePageTemplate
      title="Lease Deed Drafting"
      subtitle="Get your lease agreement drafted by legal experts. Professional, secure, and compliant."
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
          description: "Expert-drafted lease deeds by legal professionals"
        },
        {
          icon: Shield,
          title: "Legal\nCompliance",
          description: "Compliant with Transfer of Property Act"
        },
        {
          icon: Building,
          title: "Property\nDetails",
          description: "Comprehensive property description and terms"
        },
        {
          icon: Scale,
          title: "Clear\nTerms",
          description: "Well-defined rights and obligations"
        },
        {
          icon: Key,
          title: "Usage\nRights",
          description: "Clear specification of property usage terms"
        }
      ]}
      comparisonData={[
        {
          title: "Lease",
          image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg",
          benefits: [
            "Right to Use Only",
            "Limited Duration",
            "Periodic Payments",
            "Lower Cost",
            "No Residual Value",
            "Lease Agreement Document"
          ],
          isPrimary: true
        },
        {
          title: "Sale",
          image: "https://images.pexels.com/photos/3183181/pexels-photo-3183181.jpeg",
          benefits: [
            "Complete Ownership",
            "Unlimited Usage",
            "One-time Payment",
            "Higher Cost",
            "Residual Value Rights",
            "Sale Deed Document"
          ],
          isPrimary: false
        },
        {
          title: "No Agreement",
          image: "https://images.pexels.com/photos/3183182/pexels-photo-3183182.jpeg",
          benefits: [
            "No Legal Protection",
            "High Risk",
            "No Usage Rights",
            "No Legal Standing",
            "Dispute Prone",
            "Not Recommended"
          ],
          isPrimary: false
        }
      ]}
      processList={[
        "Submit property and party details",
        "Expert consultation on lease terms",
        "Draft preparation by legal team",
        "Review and feedback round",
        "Incorporate necessary changes",
        "Final deed delivery for registration"
      ]}
      documentsList={[
        "Property Description Documents",
        "Lessor's Identity Proof",
        "Lessee's Identity Proof",
        "Property Ownership Proof",
        "Property Tax Receipts",
        "NOC (if applicable)",
        "Previous Agreements (if any)"
      ]}
    />
  )
} 