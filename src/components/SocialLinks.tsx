'use client'
import { motion } from 'framer-motion'
import { 
  FaWhatsapp, 
  FaLinkedin, 
  FaInstagram, 
  FaFacebook, 
  FaTwitter, 
  FaTelegram 
} from 'react-icons/fa'
import { SOCIAL_LINKS } from '@/types/contact'
import { IconType } from 'react-icons'

const iconMap: { [key: string]: IconType } = {
  FaWhatsapp,
  FaLinkedin,
  FaInstagram,
  FaFacebook,
  FaTwitter,
  FaTelegram
}

export const SocialLinks = () => {
  return (
    <div className="flex flex-wrap gap-4 justify-center">
      {SOCIAL_LINKS.map((social, index) => {
        const Icon = iconMap[social.icon]
        return (
          <motion.a
            key={social.name}
            href={social.url}
            target="_blank"
            rel="noopener noreferrer"
            className="p-4 rounded-full bg-white shadow-lg hover:shadow-xl transition-shadow"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Icon 
              className="w-6 h-6" 
              style={{ color: social.color }} 
            />
          </motion.a>
        )
      })}
    </div>
  )
} 