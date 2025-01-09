import { AbstractHtmlMatchResponse } from "./abstract-html-match-response";

const levelMap: Record<string, number> = {
  'I': 1,
  'II': 2,
  'III': 3
}

type TCommonMatchInfo = {
  disciplines: string[];
  endDate: string | null;
  level: string;
  startDate: string;
  federation: string;
} 

export class MakereadyMatch extends AbstractHtmlMatchResponse {

  private pageContentCache?: string | null
  private get pageContent(): string | null {
    if (!this.pageContentCache) {
      this.pageContentCache = this.cherio('#pageContent').find('a').remove().end().html()
    }

    return this.pageContentCache
  }

  private contentCache?: string[]
  private get content(): string[] {
    if (!this.contentCache) {
      this.contentCache = this.pageContent
        ? this.sanitize(this.pageContent).split('\n')
        : []
    }

    return this.contentCache
  }

  private commonMatchInfoCache?: TCommonMatchInfo
  private get commonMatchInfo(): TCommonMatchInfo {
    if (!this.commonMatchInfoCache) {
      const src = this.content[1]

      const result: TCommonMatchInfo = {
        disciplines: [],
        endDate: null,
        level: '',
        startDate: '',
        federation: ''
      }
    
      if (!src) {
        return result
      }
    
      const matches = src.match(/^([0-9\s\.-]+)\s*,\s*(.*?)\s*\/\s*(.*?)$/)
    
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
        const matches = federationAndLevel
          .match(/(idpa|ipsc)(\s*\(level\s*(.*?)\))?/i)
    
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
    
      this.commonMatchInfoCache = result
    }

    return this.commonMatchInfoCache
  }

  override get name(): string {
    return this.content[0] ?? ''
  }

  override get startDate(): string {
    return this.getDateTimeFromSrcDate(this.commonMatchInfo.startDate)
  }

  override get endDate(): string | null {
    return this.commonMatchInfo.endDate && this.getDateTimeFromSrcDate(this.commonMatchInfo.endDate)
  }

  override get level(): number {
    return levelMap[this.commonMatchInfo.level] ?? 0
  }

  override get federation(): string {
    return this.commonMatchInfo.federation
  }

  override get disciplines(): string[] {
    return this.commonMatchInfo.disciplines
  }

  override get location(): string {
    return this.content[2] ?? ''
  }

  override get exercisesCount(): number {
    return this.findNumber(this.content, /количество\s*упражнений:\s*([0-9]+)/i)
  }

  override get minimumShots(): number {
    return this.findNumber(this.content, /количество\s*выстрелов\s*\(минимум\):\s*([0-9]+)/i)
  }

  override get price(): string {
    return this.findString(this.content, /стоимость\s*участия:\s*([^\n]+)/i).trim()
  }

  override get city(): string | null {
    return null
  }
}
