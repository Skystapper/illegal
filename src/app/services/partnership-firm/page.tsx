'use client'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { 
  Users, 
  HandshakeIcon, 
  Scale,
  FileText,
  Wallet,
  ArrowLeftRight,
  Shield
} from 'lucide-react'

export default function PartnershipFirm() {
  return (
    <ServicePageTemplate 
      title="Partnership Firm"
      subtitle="Build your business together with shared expertise and resources"
      heroImage="https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg"
      stats={[
        { number: "2+", text: "Minimum Partners Required" },
        { number: "0", text: "Minimum Capital Required" },
        { number: "Simple", text: "Registration Process" }
      ]}
      features={[
        {
          icon: Users,
          title: "Combined\nResources",
          description: "Pool expertise, capital, and skills from multiple partners"
        },
        {
          icon: HandshakeIcon,
          title: "Flexible\nStructure",
          description: "Easy formation and operation with minimal regulations"
        },
        {
          icon: Scale,
          title: "Profit\nSharing",
          description: "Customizable profit distribution as per partnership deed"
        },
        {
          icon: FileText,
          title: "Simple\nCompliance",
          description: "Less regulatory requirements compared to companies"
        },
        {
          icon: ArrowLeftRight,
          title: "Easy\nScalability",
          description: "Freedom to add partners and expand operations"
        }
      ]}
      comparisonData={[
        {
          title: "Partnership Firm",
          image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
          benefits: [
            "Multiple Partner Expertise",
            "Flexible Operations",
            "Simple Formation",
            "Shared Resources",
            "Easy Management",
            "Low Registration Cost"
          ],
          isPrimary: true
        },
        {
          title: "Sole Proprietorship",
          image: "https://images.pexels.com/photos/3182739/pexels-photo-3182739.jpeg",
          benefits: [
            "Single Owner Control",
            "Complete Autonomy",
            "Minimal Formalities",
            "Personal Liability",
            "Limited Resources",
            "No Partner Conflicts"
          ],
          isPrimary: false
        },
        {
          title: "LLP",
          image: "https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg",
          benefits: [
            "Limited Liability",
            "Separate Legal Entity",
            "Professional Structure",
            "Higher Compliance",
            "More Formalities",
            "Higher Costs"
          ],
          isPrimary: false
        }
      ]}
      processList={[
        "Prepare partnership deed with terms and conditions",
        "Obtain PAN cards for all partners",
        "Arrange required documents and proofs",
        "File registration application with Registrar",
        "Pay registration fees",
        "Receive firm registration certificate",
        "Apply for additional licenses if needed"
      ]}
      documentsList={[
        "PAN Cards of Partners",
        "Aadhar Cards of Partners",
        "Partnership Deed",
        "Rental Agreement",
        "Electricity Bill",
        "NOC from Landlord",
        "Passport Size Photos"
      ]}
    />
  )
} 