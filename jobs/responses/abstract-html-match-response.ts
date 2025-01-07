import { AbstractMatchResponse } from './abstract-match-response'

import * as cheerio from 'cheerio'

import sanitizehtml from 'sanitize-html'

export abstract class AbstractHtmlMatchResponse extends AbstractMatchResponse {
  protected cherio: cheerio.CheerioAPI

  constructor(html: string) {
    super()

    this.cherio = cheerio.load(html)
  }

  protected sanitize(html: string): string {
    return sanitizehtml(html, { allowedTags: [] })
      .trim()
      .replaceAll(/[ \t]+/g, ' ')
      .replaceAll(/\r/g, '')
      .replaceAll(/\n+/g, '\n')
      .split('\n')
      .join('\n')
  }

  protected findPattern(arr: string[], pattern: RegExp, resultIndex: number = 1) {
    for(let i = 0; i < arr.length; ++i) {
      const str = arr[i]
      const result = str?.match(pattern)
  
      if (result) {
        return result[resultIndex] ?? null
      }
    }
  
    return null
  }
  
  protected findString(arr: string[], pattern: RegExp, resultIndex: number = 1): string {
    return this.findPattern(arr, pattern, resultIndex) ?? ''
  }
  
  protected findNumber(arr: string[], pattern: RegExp, resultIndex: number = 1): number {
    const result = this.findPattern(arr, pattern, resultIndex)
  
    if (!result) {
      return 0
    }
  
  
    return parseInt(result, 10)
  }
}
