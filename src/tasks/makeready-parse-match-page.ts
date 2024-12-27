import sanitizehtml from 'sanitize-html'
import * as cheerio from 'cheerio'

import { AbstractTask } from "./abstract-task";

const levelMap: Record<string, number> = {
  'I': 1,
  'II': 2,
  'III': 3
}

function findPattern(arr: string[], pattern: RegExp, resultIndex: number = 1) {
  for(let i = 0; i < arr.length; ++i) {
    const str = arr[i]
    const result = str?.match(pattern)

    if (result) {
      return result[resultIndex] ?? null
    }
  }

  return null
}

function findString(arr: string[], pattern: RegExp, resultIndex: number = 1): string {
  return findPattern(arr, pattern, resultIndex) ?? ''
}

function findNumber(arr: string[], pattern: RegExp, resultIndex: number = 1): number {
  const result = findPattern(arr, pattern, resultIndex)

  if (!result) {
    return 0
  }


  return parseInt(result, 10)
}

function toDateOnly(str: string) {
  return str.split('.').reverse().join('-')
}

function parseCommonMatchInfo(str: string = '') {
  const result= {
    startDate: '',
    endDate: '',
    level: '',
    type: '',
    weapon: ''
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
      result.type = matches[1] ?? ''
      result.level = matches[3] ?? ''
    }
  }
  

  if (weapon) {
    result.weapon = weapon
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

      let content = sanitizehtml(html, { allowedTags: [] })
        .trim()
        .replaceAll(/[ \t]+/g, ' ')
        .replaceAll(/\r/g, '')
        .replaceAll(/\n+/g, '\n')
        .split('\n')

      const name = content.shift() ?? ''
      const { startDate, endDate, level, type, weapon } = parseCommonMatchInfo(content.shift())
      const address = content.shift() ?? ''
      const exercisesCount = findNumber(content, /количество\s*упражнений:\s*([0-9]+)/i)
      const minimumShots = findNumber(content, /количество\s*выстрелов\s*\(минимум\):\s*([0-9]+)/i)
      const price = findString(content, /стоимость\s*участия:\s*([0-9\s]+)/i)

      if (!name || !startDate) {
        return source
      }

      return {
        ...source,
        match: {
          startDate: toDateOnly(startDate),
          endDate: toDateOnly(endDate),
          level: levelMap[level] ?? 0,
          type,
          name,
          exercisesCount,
          minimumShots,
          price,
          address,
          weapon
        }
      }
    })

    return {
      ...context,
      sources
    }
  }
}