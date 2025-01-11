import { Logger } from '../common/logger'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

const logger = new Logger()

async function disconnect(event: string) {
  await logger.log('PrismaClient', `disconnected by event "${event}"`)
  prisma.$disconnect()
  logger.free()
}

const events = ['exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM']

events.forEach((eventType) => {
  process.on(eventType, disconnect.bind(null, eventType))
})
