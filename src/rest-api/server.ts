import express from 'express'
import cors from 'cors'
import consultationRoutes from './routes/consultation.routes'

const app = express()

app.use(cors())
app.use(express.json())

// Routes
app.use('/api/consultations', consultationRoutes)

const PORT = process.env.PORT || 5000
app.listen(PORT, () => {
  console.log(`REST API server running on port ${PORT}`)
}) 