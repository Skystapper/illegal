'use client'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { 
  FileText, 
  Shield, 
  Clock,
  Scale,
  MessageSquare,
  AlertTriangle,
  Gavel
} from 'lucide-react'

export default function LegalNotice() {
  return (
    <ServicePageTemplate
      title="Legal Notice"
      subtitle="Draft and send legal notices through experienced advocates. Professional, precise, and legally sound."
      heroImage="https://images.pexels.com/photos/5668473/pexels-photo-5668473.jpeg"
      stats={[
        { number: "24h", text: "Draft Delivery" },
        { number: "100%", text: "Online Process" },
        { number: "Expert", text: "Legal Drafting" }
      ]}
      features={[
        {
          icon: FileText,
          title: "Professional\nDrafting",
          description: "Expert-drafted notices by experienced advocates"
        },
        {
          icon: Shield,
          title: "Legal\nCompliance",
          description: "Compliant with Civil Procedure Code"
        },
        {
          icon: MessageSquare,
          title: "Clear\nCommunication",
          description: "Precise and effective legal communication"
        },
        {
          icon: AlertTriangle,
          title: "Formal\nWarning",
          description: "Official intimation before legal proceedings"
        },
        {
          icon: Scale,
          title: "Dispute\nResolution",
          description: "Opportunity for amicable settlement"
        }
      ]}
      comparisonData={[
        {
          title: "Send Legal Notice",
          image: "https://images.pexels.com/photos/5668474/pexels-photo-5668474.jpeg",
          benefits: [
            "Formal Warning",
            "Legal Documentation",
            "Dispute Resolution",
            "Pre-litigation Step",
            "Clear Demands",
            "Settlement Opportunity"
          ],
          isPrimary: true
        },
        {
          title: "Reply to Notice",
          image: "https://images.pexels.com/photos/5668475/pexels-photo-5668475.jpeg",
          benefits: [
            "Legal Defense",
            "Counter Arguments",
            "Response Record",
            "Negotiation Chance",
            "Rights Protection",
            "Avoid Default"
          ],
          isPrimary: false
        },
        {
          title: "No Response",
          image: "https://images.pexels.com/photos/5668476/pexels-photo-5668476.jpeg",
          benefits: [
            "Legal Risk",
            "Court Proceedings",
            "Additional Costs",
            "Time Consumption",
            "Adverse Judgment",
            "Lost Opportunity"
          ],
          isPrimary: false
        }
      ]}
      processList={[
        "Submit case details and requirements",
        "Expert consultation on notice content",
        "Draft preparation by legal team",
        "Review and feedback round",
        "Incorporate necessary changes",
        "Final notice delivery and dispatch"
      ]}
      documentsList={[
        "Identity Proof",
        "Address Proof",
        "Supporting Documents",
        "Previous Communications",
        "Relevant Agreements",
        "Proof of Damage/Loss",
        "Other Evidence"
      ]}
      
    />
  )
} 