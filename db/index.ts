import { DbLogger } from './logger'
import { PrismaClient } from '@prisma/client'
import { Process } from '../common/process'

export const prisma = new PrismaClient()

const logger = new DbLogger()

async function disconnect(event: string) {
  await logger.log('PrismaClient', `disconnected by event "${event}"`)
  await prisma.$disconnect()
}

Process.executeOnExit(disconnect)
