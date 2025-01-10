'use client'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { 
  FileText, 
  Users, 
  Scale,
  Shield,
  Building,
  Settings,
  CheckCircle
} from 'lucide-react'

export default function PartnershipDeedDrafting() {
  return (
    <ServicePageTemplate
      title="Partnership Deed Drafting"
      subtitle="Get your partnership deed drafted by legal experts. Professional, quick, and compliant."
      heroImage="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
      stats={[
        { number: "24h", text: "Delivery Time" },
        { number: "100%", text: "Online Process" },
        { number: "Expert", text: "Legal Drafting" }
      ]}
      features={[
        {
          icon: FileText,
          title: "Professional\nDrafting",
          description: "Expert-drafted partnership deeds by legal professionals"
        },
        {
          icon: Shield,
          title: "Legal\nCompliance",
          description: "Compliant with Indian Partnership Act, 1932"
        },
        {
          icon: Settings,
          title: "Customized\nTerms",
          description: "Tailored to your specific business requirements"
        },
        {
          icon: Users,
          title: "Partner\nProtection",
          description: "Clear rights and responsibilities for all partners"
        },
        {
          icon: Scale,
          title: "Fair\nTerms",
          description: "Balanced terms protecting all partners' interests"
        }
      ]}
      comparisonData={[
        {
          title: "General Partnership (GP)",
          image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg",
          benefits: [
            "Easy Formation",
            "Low Operational Cost",
            "No State Filing",
            "Simple Management",
            "Flexible Structure",
            "Asset Separation"
          ],
          isPrimary: true
        },
        {
          title: "Limited Partnership (LP)",
          image: "https://images.pexels.com/photos/3183181/pexels-photo-3183181.jpeg",
          benefits: [
            "Limited Liability",
            "Structured Management",
            "Investment Protection",
            "Clear Hierarchy",
            "Special Projects",
            "Asset Protection"
          ],
          isPrimary: false
        },
        {
          title: "Limited Liability Partnership",
          image: "https://images.pexels.com/photos/3183182/pexels-photo-3183182.jpeg",
          benefits: [
            "Professional Services",
            "Asset Protection",
            "Flexible Structure",
            "Tax Benefits",
            "Perpetual Existence",
            "Separate Legal Entity"
          ],
          isPrimary: false
        }
      ]}
      processList={[
        "Submit partnership details and requirements",
        "Expert consultation on deed structure",
        "Draft preparation by legal team",
        "Review and feedback round",
        "Incorporate necessary changes",
        "Final deed delivery"
      ]}
      documentsList={[
        "Partners' Identity Proof",
        "Partners' Address Proof",
        "Business Address Proof",
        "PAN Cards of Partners",
        "Proposed Business Plan",
        "Capital Contribution Details",
        "Bank Account Details"
      ]}
    />
  )
} 