import { freeResources } from '../common/free-resources'
import { Logger } from '../common/logger'
import { PrismaClient } from '@prisma/client'

export const prisma = new PrismaClient()

const logger = new Logger()

async function disconnect(event: string) {
  await logger.log('PrismaClient', `disconnected by event "${event}"`)
  prisma.$disconnect()
  logger.free()
}

await freeResources(disconnect)
