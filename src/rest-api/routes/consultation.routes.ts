import { Router } from 'express'
import { PrismaClient } from '@prisma/client'

const router = Router()
const prisma = new PrismaClient()

// GET /api/consultations
router.get('/', async (req, res) => {
  try {
    const consultations = await prisma.consultation.findMany({
      orderBy: { createdAt: 'desc' }
    })
    res.json(consultations)
  } catch (error) {
    res.status(500).json({ error: 'Failed to fetch consultations' })
  }
})

// POST /api/consultations
router.post('/', async (req, res) => {
  try {
    const consultation = await prisma.consultation.create({
      data: req.body
    })
    res.status(201).json(consultation)
  } catch (error) {
    res.status(500).json({ error: 'Failed to create consultation' })
  }
})

// PATCH /api/consultations/:id
router.patch('/:id', async (req, res) => {
  try {
    const { id } = req.params
    const consultation = await prisma.consultation.update({
      where: { id: parseInt(id) },
      data: { status: req.body.status }
    })
    res.json(consultation)
  } catch (error) {
    res.status(500).json({ error: 'Failed to update consultation' })
  }
})

export default router 