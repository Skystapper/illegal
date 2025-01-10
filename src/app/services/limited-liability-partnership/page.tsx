'use client'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { 
  Shield, 
  Users, 
  Building,
  Scale,
  Settings,
  Globe,
  Briefcase
} from 'lucide-react'

export default function LimitedLiabilityPartnership() {
  return (
    <ServicePageTemplate 
      title="Limited Liability Partnership"
      subtitle="Perfect blend of partnership flexibility and corporate protection"
      heroImage="https://images.pexels.com/photos/3183150/pexels-photo-3183150.jpeg"
      stats={[
        { number: "2+", text: "Minimum Partners Required" },
        { number: "₹1L", text: "Minimum Capital" },
        { number: "14-20", text: "Days for Registration" }
      ]}
      features={[
        {
          icon: Shield,
          title: "Limited\nLiability",
          description: "Partners' personal assets are protected from business liabilities"
        },
        {
          icon: Building,
          title: "Separate\nEntity",
          description: "Independent legal existence distinct from its partners"
        },
        {
          icon: Settings,
          title: "Flexible\nStructure",
          description: "Freedom to design internal management structure"
        },
        {
          icon: Scale,
          title: "Tax\nEfficiency",
          description: "Avoid double taxation with partnership taxation model"
        },
        {
          icon: Globe,
          title: "Global\nRecognition",
          description: "Internationally recognized business structure"
        }
      ]}
      comparisonData={[
        {
          title: "Limited Liability Partnership",
          image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg",
          benefits: [
            "Limited Liability Protection",
            "Separate Legal Entity",
            "Flexible Management",
            "Tax Efficiency",
            "Perpetual Succession",
            "Global Recognition"
          ],
          isPrimary: true
        },
        {
          title: "Traditional Partnership",
          image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
          benefits: [
            "Unlimited Liability",
            "No Separate Entity",
            "Simple Structure",
            "Less Compliance",
            "Easy Formation",
            "Lower Costs"
          ],
          isPrimary: false
        },
        {
          title: "Private Limited Company",
          image: "https://images.pexels.com/photos/3182781/pexels-photo-3182781.jpeg",
          benefits: [
            "Limited Liability",
            "Complex Structure",
            "High Compliance",
            "Double Taxation",
            "Share Capital",
            "More Formalities"
          ],
          isPrimary: false
        }
      ]}
      processList={[
        "Apply for Digital Signature Certificate (DSC)",
        "Obtain DPIN for designated partners",
        "Reserve LLP name",
        "Prepare LLP agreement",
        "File incorporation documents",
        "Receive incorporation certificate",
        "Complete post-registration compliances"
      ]}
      documentsList={[
        "PAN Card/ID Proof of Partners",
        "Address Proof of Partners",
        "Passport Size Photographs",
        "Foreign National/NRI Documents",
        "Office Address Proof",
        "Digital Signature Certificate",
        "NOC from Property Owner"
      ]}
    />
  )
} 