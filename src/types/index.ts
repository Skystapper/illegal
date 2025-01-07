export interface BaseMessage {
  id: number
  email: string
  message: string
  status: string
  reminderDate: Date | null
  createdAt: Date
  updatedAt: Date
}

export interface ContactMessage extends BaseMessage {
  type: 'contact'
  firstName: string
  lastName: string
  phone: string | null
  company: string | null
  subject: string
  serviceType: string | null
}

export interface ConsultationMessage extends BaseMessage {
  type: 'consultation'
  name: string
  phone: string
  service: string | null
}

export type Message = ContactMessage | ConsultationMessage 