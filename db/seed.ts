import { prisma } from '.'

try {
  try {
    await prisma.federation.createMany({
      data: [
        {
          name: 'IPSC',
          fullName: 'International Practical Shooting Confederation'
        },
        {
          name: 'IDPA',
          fullName: 'International Defensive Pistol Association'
        }
      ]
    })
  } catch {
    // ...
  }

  try {
    await prisma.platform.createMany({
      data: [
        {
          id: 1,
          name: 'MakeReady',
          url: 'https://www.makeready.ru'
        },
        {
          id: 2,
          name: 'Atlima',
          url: 'https://atlima.com'
        },
        {
          id: 3,
          name: 'MATCH DAY',
          url: 'https://md.ipsc.ru/'
        }
      ]
    })
  } catch {
    // ...
  }
} catch (e) {
  process.exit(1)
} finally {
  process.exit(0)
}
