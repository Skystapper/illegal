'use client'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { 
  Users, 
  Building, 
  Scale,
  Landmark,
  BarChart4,
  Shield,
  BadgeCheck
} from 'lucide-react'

export default function PublicLimitedCompany() {
  return (
    <ServicePageTemplate 
      title="Public Limited Company"
      subtitle="Transform your business into a publicly traded enterprise"
      heroImage="https://images.pexels.com/photos/7681091/pexels-photo-7681091.jpeg"
      stats={[
        { number: "7+", text: "Minimum Members Required" },
        { number: "₹5L", text: "Minimum Authorized Capital" },
        { number: "3+", text: "Minimum Directors Required" }
      ]}
      features={[
        {
          icon: Shield,
          title: "Limited\nLiability",
          description: "Shareholders' liability is limited to their share value, protecting personal assets"
        },
        {
          icon: Landmark,
          title: "Stock Exchange\nListing",
          description: "Ability to raise capital through IPO and list on stock exchanges"
        },
        {
          icon: Building,
          title: "Distinct Legal\nEntity",
          description: "Perpetual existence independent of shareholders and directors"
        },
        {
          icon: BarChart4,
          title: "Enhanced\nFundraising",
          description: "Multiple avenues for raising capital through public offerings"
        },
        {
          icon: BadgeCheck,
          title: "Business\nTransparency",
          description: "Builds trust through mandatory public disclosures and audits"
        }
      ]}
      comparisonData={[
        {
          title: "Public Limited Company",
          image: "https://images.pexels.com/photos/7567434/pexels-photo-7567434.jpeg",
          benefits: [
            "Unlimited Number of Members",
            "Public Trading of Shares",
            "Enhanced Market Credibility",
            "Multiple Fundraising Options",
            "High Growth Potential",
            "Professional Management"
          ],
          isPrimary: true
        },
        {
          title: "Private Limited Company",
          image: "https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg",
          benefits: [
            "Limited Members (200)",
            "Private Share Transfer",
            "Simpler Compliance",
            "Lower Capital Requirements",
            "More Control",
            "Less Public Disclosure"
          ],
          isPrimary: false
        },
        {
          title: "Limited Liability Partnership",
          image: "https://images.pexels.com/photos/3182812/pexels-photo-3182812.jpeg",
          benefits: [
            "Partner-Based Structure",
            "Tax Flexibility",
            "Lower Compliance",
            "No Public Fundraising",
            "Limited Growth Scope",
            "Partner Dependency"
          ],
          isPrimary: false
        }
      ]}
      processList={[
        "Obtain Digital Signature Certificates (DSC) for all directors",
        "Apply for Director Identification Numbers (DIN)",
        "Get company name approval from MCA",
        "File SPICe+ form with MOA and AOA",
        "Receive Certificate of Incorporation",
        "Apply for PAN and TAN",
        "Complete post-incorporation compliances"
      ]}
      documentsList={[
        "Identity Proof of Directors",
        "Address Proof of Directors",
        "Passport-size Photographs",
        "Registered Office Proof",
        "NOC from Property Owner",
        "PAN Cards of Directors",
        "Bank Statement/Utility Bill"
      ]}
    />
  )
} 