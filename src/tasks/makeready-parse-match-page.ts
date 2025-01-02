import * as cheerio from 'cheerio'

import { AbstractTask } from "./abstract-task";

import { findNumber, findString, getDateOnly } from '../utilities/string'
import { sanitize } from '../utilities/sanitize'

const levelMap: Record<string, number> = {
  'I': 1,
  'II': 2,
  'III': 3
}

function parseCommonMatchInfo(str: string = '') {
  const result: {
    disciplines: string[];
    endDate: string | null;
    level: string;
    startDate: string;
    federation: string;
  } = {
    disciplines: [],
    endDate: null,
    level: '',
    startDate: '',
    federation: ''
  }

  if (!str) {
    return result
  }

  const matches = str.match(/^([0-9\s\.-]+)\s*,\s*(.*?)\s*\/\s*(.*?)$/)

  if (!matches) {
    return result
  }

  const dates = matches[1]
  const federationAndLevel = matches[2]
  const weapon = matches[3]

  if (dates) {
    const [ start, end ] = dates.split('-')

    if (start) {
      result.startDate = start.trim()
    }

    if (end) {
      result.endDate = end.trim()
    }
  }

  if (federationAndLevel) {
    const matches = federationAndLevel.match(/(idpa|ipsc)(\s*\(level\s*(.*?)\))?/i)

    if (matches) {
      result.federation = matches[1] ?? ''
      result.level = matches[3] ?? ''
    }
  }
  

  if (weapon) {
    result.disciplines = [
      weapon
    ]
  }

  return result
}

export class MakereadyParseMatchPage extends AbstractTask {
  override async perform(context: ITaskContext): Promise<ITaskContext> {

    const sources = context.sources?.map(function(source) {

      if (!source.response) {
        return source
      }

      const find = cheerio.load(source.response)
      const html = find('#pageContent').find('a').remove().end().html()

      if (!html) {
        return source
      }

      let content = sanitize(html).split('\n')

      const name = content.shift() ?? ''
      const { startDate, endDate, level, federation, disciplines } = parseCommonMatchInfo(content.shift())
      const address = content.shift() ?? ''
      const exercisesCount = findNumber(content, /количество\s*упражнений:\s*([0-9]+)/i)
      const minimumShots = findNumber(content, /количество\s*выстрелов\s*\(минимум\):\s*([0-9]+)/i)
      const price = findString(content, /стоимость\s*участия:\s*([^\n]+)/i).trim()

      if (!name || !startDate) {
        return source
      }

      return {
        ...source,
        match: {
          startDate: getDateOnly(startDate),
          endDate: endDate ? getDateOnly(endDate) : null,
          level: levelMap[level] ?? 0,
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