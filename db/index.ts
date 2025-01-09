import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

function disconnect(event: string) {
  console.log(`PrismaClient disconnected by event "${event}"`)
  prisma.$disconnect()
}

const events = [`exit`, `SIGINT`, `SIGUSR1`, `SIGUSR2`, `uncaughtException`, `SIGTERM`]

events.forEach((eventType) => {
  process.on(eventType, disconnect.bind(null, eventType))
})
