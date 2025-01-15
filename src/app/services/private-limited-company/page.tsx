'use client'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { 
  CheckCircle, 
  Users, 
  Shield, 
  Award,
  Clock
} from 'lucide-react'

export default function PrivateLimitedCompany() {
  return (
    <ServicePageTemplate 
      title="Private Limited Company"
      heroImage="https://images.pexels.com/photos/1181406/pexels-photo-1181406.jpeg"
      stats={[
        { number: "90%", text: "Companies Choose Private Limited" },
        { number: "150K+", text: "New Registrations Annually" },
        { number: "100%", text: "Legal Compliance" }
      ]}
      features={[
        {
          icon: CheckCircle,
          title: "MCA\nCompliance",
          description: "100% compliance with Ministry of Corporate Affairs guidelines and regulations"
        },
        {
          icon: Users,
          title: "Dedicated\nSupport",
          description: "Expert team of legal professionals and company secretaries at your service"
        },
        {
          icon: Shield,
          title: "Limited\nLiability",
          description: "Complete protection of personal assets from business liabilities"
        },
        {
          icon: Award,
          title: "Market\nCredibility",
          description: "Enhanced trust and professional status in the business community"
        },
        {
          icon: Clock,
          title: "Perpetual\nExistence",
          description: "Business continuity independent of ownership changes"
        }
      ]}
      comparisonData={[
        {
          title: "Private Limited Company",
          image: "https://images.pexels.com/photos/263402/pexels-photo-263402.jpeg",
          benefits: [
            "Limited Liability Protection",
            "Separate Legal Entity",
            "Professional Image",
            "Easier Capital Raising",
            "Tax Benefits & Flexibility",
            "Perpetual Succession"
          ],
          isPrimary: true
        },
        {
          title: "Sole Proprietorship",
          image: "https://images.pexels.com/photos/1367269/pexels-photo-1367269.jpeg",
          benefits: [
            "Simple Setup",
            "Complete Control",
            "Quick Decision Making",
            "High Personal Risk",
            "Limited Growth Options",
            "No Separate Legal Status"
          ],
          isPrimary: false
        },
        {
          title: "Partnership Firm",
          image: "https://images.pexels.com/photos/3183197/pexels-photo-3183197.jpeg",
          benefits: [
            "Shared Resources",
            "Combined Expertise",
            "Easy Formation",
            "Joint Liability Risk",
            "Complex Decision Making",
            "Limited Scalability"
          ],
          isPrimary: false
        }
      ]}
      processList={[
        "Fill the form and make the required payment",
        "Expert callback and consultation",
        "DIN and DSC application",
        "AOA and MOA preparation",
        "ROC submission",
        "Receive incorporation certificate"
      ]}
      documentsList={[
        "Passport Size Photograph",
        "PAN Card",
        "Registered Office Proof",
        "Copy of Aadhaar Card",
        "Address Proof",
        "No Objection Certificate"
      ]}
    />
  )
} 