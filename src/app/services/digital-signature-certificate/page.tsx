'use client'
import ServicePageTemplate from '@/components/templates/ServicePageTemplate'
import { 
  Key, 
  Shield, 
  Clock,
  FileCheck,
  Globe,
  Lock,
  Fingerprint
} from 'lucide-react'

export default function DigitalSignatureCertificate() {
  return (
    <ServicePageTemplate 
      title="Digital Signature Certificate (DSC)"
      subtitle="Secure your digital identity and transactions with legally valid signatures"
      heroImage="https://images.pexels.com/photos/5240547/pexels-photo-5240547.jpeg"
      stats={[
        { number: "2", text: "Years Validity" },
        { number: "100%", text: "Legal Recognition" },
        { number: "24/7", text: "Digital Access" }
      ]}
      features={[
        {
          icon: Shield,
          title: "Legal\nValidity",
          description: "Recognized under IT Act for all digital transactions"
        },
        {
          icon: Lock,
          title: "Enhanced\nSecurity",
          description: "Cryptographic protection for your digital identity"
        },
        {
          icon: Clock,
          title: "Instant\nVerification",
          description: "Quick authentication for digital documents"
        },
        {
          icon: Globe,
          title: "Universal\nAccess",
          description: "Use across multiple government portals and platforms"
        },
        {
          icon: FileCheck,
          title: "Paperless\nTransactions",
          description: "Eliminate physical documentation needs"
        }
      ]}
      comparisonData={[
        {
          title: "Class 3 DSC",
          image: "https://images.pexels.com/photos/5240526/pexels-photo-5240526.jpeg",
          benefits: [
            "High Security Level",
            "Personal Verification",
            "Corporate Use",
            "Banking Transactions",
            "Government Filings",
            "Legal Documents"
          ],
          isPrimary: true
        },
        {
          title: "Class 2 DSC",
          image: "https://images.pexels.com/photos/5240521/pexels-photo-5240521.jpeg",
          benefits: [
            "Medium Security",
            "Online Verification",
            "Individual Use",
            "Basic E-filing",
            "Limited Access",
            "Personal Documents"
          ],
          isPrimary: false
        },
        {
          title: "Class 1 DSC",
          image: "https://images.pexels.com/photos/5240518/pexels-photo-5240518.jpeg",
          benefits: [
            "Basic Security",
            "Email Verification",
            "Personal Email",
            "Basic Usage",
            "Limited Features",
            "Non-sensitive Data"
          ],
          isPrimary: false
        }
      ]}
      processList={[
        "Visit certifying authority website",
        "Fill application form",
        "Upload required documents",
        "Complete payment process",
        "Verify identity online",
        "Receive USB token",
        "Install DSC software"
      ]}
      documentsList={[
        "Aadhaar Card",
        "PAN Card",
        "Passport Copy (if applicable)",
        "Passport Size Photo",
        "Company Documents (for business)",
        "Address Proof",
        "Identity Proof"
      ]}
    />
  )
} 