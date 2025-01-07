import { Router } from 'express'
import prisma from '../config/db.config'

const router = Router()

// Routes will be implemented later
router.get('/', (req, res) => {
  res.json({ message: 'Pricing routes working' })
})

export default router 