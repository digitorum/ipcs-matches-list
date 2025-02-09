import { prisma } from '../../../db'

export default defineEventHandler(async () => {

  const matches = await prisma.match.findMany({
    select: {
      name: true,
      url: true,
      startDate: true,
      endDate: true,
      level: true,
      exercisesCount: true,
      minimumShots: true,
      price: true,
      federation: {
        select: {
          name: true
        }
      },
      location: {
        select: {
          description: true,
          city: {
            select: {
              name: true,
              country: {
                select: {
                  name: true
                }
              }
            }
          }
        }
      },
      platform: {
        select: {
          name: true
        }
      }
    },
    where: {
      startDate: {
        gte: new Date()
      },
      location: {
        city: {
          country: {
            name: 'Россия' // TODO: fix via filter
          }
        }
      }
    },
    orderBy: {
      startDate: 'asc'
    }
  })

  return {
    matches
  }
})