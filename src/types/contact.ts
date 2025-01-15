export interface ContactFormData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  company: string;
  subject: string;
  message: string;
  serviceType: string;
  files: File[];
}

export const SERVICE_TYPES = [
  'Legal Consultation',
  'Document Review',
  'Contract Drafting',
  'Legal Research',
  'Compliance Advisory',
  'Other Services'
];

export const SOCIAL_LINKS = [
  {
    name: 'WhatsApp',
    icon: 'FaWhatsapp',
    url: 'https://wa.me/yourwhatsappnumber',
    color: '#25D366'
  },
  {
    name: 'LinkedIn',
    icon: 'FaLinkedin',
    url: 'https://linkedin.com/company/yourcompany',
    color: '#0A66C2'
  },
  {
    name: 'Instagram',
    icon: 'FaInstagram',
    url: 'https://instagram.com/yourcompany',
    color: '#E4405F'
  },
  {
    name: 'Facebook',
    icon: 'FaFacebook',
    url: 'https://facebook.com/yourcompany',
    color: '#1877F2'
  },
  {
    name: 'Twitter',
    icon: 'FaTwitter',
    url: 'https://twitter.com/yourcompany',
    color: '#1DA1F2'
  },
  {
    name: 'Telegram',
    icon: 'FaTelegram',
    url: 'https://t.me/yourcompany',
    color: '#0088CC'
  }
]; 