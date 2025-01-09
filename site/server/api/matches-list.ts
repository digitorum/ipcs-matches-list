import { Op } from 'sequelize'

import { Match, Location, Federation, Platform, City } from '../../../db/models'

export default defineEventHandler(async (event) => {
  const matches = await Match.findAll({
    include: [
      {
        model: Federation,
        attributes: [
          'name'
        ]
      },
      {
        model: Location,
        attributes: [
          'location'
        ],
        include: [
          {
            model: City,
            attributes: [
              'name'
            ],
          }
        ]
      },
      {
        model: Platform,
        attributes: [
          'name'
        ]
      }
    ],
    where: {
      startDate: {
        [Op.gte]: new Date()
      }
    },
    order: [
      ['startDate', 'ASC']
    ],
    attributes: [
      'name',
      'url',
      'startDate',
      'endDate',
      'level',
      'exercisesCount',
      'minimumShots',
      'price'
    ]
  })

  return {
    matches
  }
})