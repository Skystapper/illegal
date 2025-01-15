'use client'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { 
  User, 
  Shield, 
  Briefcase, 
  FileText,
  Settings,
  UserCheck,
  Scale
} from 'lucide-react'

export default function OnePersonCompany() {
  return (
    <ServicePageTemplate 
      title="One Person Company"
      subtitle="Start your entrepreneurial journey with complete control and limited liability"
      heroImage="https://images.pexels.com/photos/3760067/pexels-photo-3760067.jpeg"
      stats={[
        { number: "1", text: "Single Director & Member" },
        { number: "₹1L", text: "Minimum Capital Required" },
        { number: "100%", text: "Owner Control" }
      ]}
      features={[
        {
          icon: Shield,
          title: "Limited\nLiability",
          description: "Protect personal assets with separate legal entity status"
        },
        {
          icon: User,
          title: "Single\nOwnership",
          description: "Complete control over business decisions and operations"
        },
        {
          icon: Briefcase,
          title: "Professional\nStatus",
          description: "Enhanced credibility with formal company structure"
        },
        {
          icon: Settings,
          title: "Easy\nCompliance",
          description: "Simplified regulatory requirements compared to other companies"
        },
        {
          icon: Scale,
          title: "Legal\nProtection",
          description: "Statutory benefits of a private limited company"
        }
      ]}
      comparisonData={[
        {
          title: "One Person Company",
          image: "https://images.pexels.com/photos/3760069/pexels-photo-3760069.jpeg",
          benefits: [
            "Single Member Structure",
            "Limited Liability Protection",
            "Professional Status",
            "Simplified Compliance",
            "Complete Control",
            "Perpetual Succession"
          ],
          isPrimary: true
        },
        {
          title: "Sole Proprietorship",
          image: "https://images.pexels.com/photos/3760068/pexels-photo-3760068.jpeg",
          benefits: [
            "Single Owner",
            "No Limited Liability",
            "Informal Structure",
            "Minimal Compliance",
            "Personal Risk",
            "No Legal Separation"
          ],
          isPrimary: false
        },
        {
          title: "Private Limited Company",
          image: "https://images.pexels.com/photos/3760070/pexels-photo-3760070.jpeg",
          benefits: [
            "Multiple Members",
            "Limited Liability",
            "Complex Structure",
            "Higher Compliance",
            "Shared Control",
            "More Flexibility"
          ],
          isPrimary: false
        }
      ]}
      processList={[
        "Fill registration form and make payment",
        "Expert consultation and document collection",
        "Apply for DSC and DIN",
        "Name approval and reservation",
        "MOA and AOA preparation",
        "File incorporation documents",
        "Receive incorporation certificate"
      ]}
      documentsList={[
        "Passport Size Photograph",
        "PAN Card Copy",
        "Aadhar Card Copy",
        "Bank Statement/Utility Bill",
        "Proof of Registered Office",
        "Rent Agreement (if applicable)",
        "NOC from Property Owner"
      ]}
    />
  )
} 