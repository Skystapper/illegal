import { PrismaClient } from '@prisma/client'
import { hash } from 'bcryptjs'

const prisma = new PrismaClient()

async function main() {
  // Create admin user
  const password = await hash('admin123', 12)
  
  const admin = await prisma.user.upsert({
    where: { email: 'admin@elegalindia.com' },
    update: {},
    create: {
      email: 'admin@elegalindia.com',
      password,
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  })

  console.log({ admin })
}

main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  }) 