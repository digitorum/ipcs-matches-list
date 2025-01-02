
import * as cheerio from 'cheerio'

import { AbstractTask } from "./abstract-task";

import { findNumber, findString, getDateOnly } from '../utilities/string'
import { sanitize } from '../utilities/sanitize'

export class MatchdayParseMatchPage extends AbstractTask {
  override async perform(context: ITaskContext): Promise<ITaskContext> {

    const sources = context.sources?.map(function(source) {

      if (!source.response) {
        return source
      }

      const find = cheerio.load(source.response)

      const name = find('.detail-head__title > div').text().trim()

      const list = find('ul.detail-head__params li')
        .map((index, el) => cheerio.load(el).html())
        .toArray()
        .map((html) => sanitize(html))

      if (!list[0]) {
        return source
      }

      const [ startDate, endDate ] = list[0].split('-')

      if (!startDate) {
        return source
      }

      const level = findNumber([list[1] ?? ''], /Уровень:\s*([0-9]+)/i)
      const federation = 'IPSC'
      const address = findString([list[2] ?? ''], /Место проведения:\s*(.*)/i)
      const disciplines = list[3]?.split(',').map((chunk) => chunk.trim()) ?? []
      const exercisesCount = findNumber([list[6] ?? ''], /Упражнений:\s*([0-9]+)/i)
      const minimumShots = findNumber([list[7] ?? ''], /Минимум\s*выстрелов:\s*([0-9]+)/i)
      const price = findString([list[8] ?? ''], /Стоимость\s*участия:\s*(.*)/i)
      
      return {
        ...source,
        match: {
          startDate: getDateOnly(startDate),
          endDate: endDate ? getDateOnly(endDate) : null,
          level,
          federation,
          name,
          exercisesCount,
          minimumShots,
          price,
          address,
          disciplines
        }
      }
    })

    return {
      ...context,
      sources
    }
  }
}