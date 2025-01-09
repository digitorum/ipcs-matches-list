import { AbstractHtmlMatchResponse } from "./abstract-html-match-response";

import * as cheerio from 'cheerio'

export class MatchdayMatch extends AbstractHtmlMatchResponse {

  private matchInfoCahe?: string[]
  private get matchInfo(): string[] {
    if (!this.matchInfoCahe) {
      this.matchInfoCahe = this.cherio('ul.detail-head__params li')
        .map((index, el) => cheerio.load(el).html())
        .toArray()
        .map((html) => this.sanitize(html)) ?? []
    }

    return this.matchInfoCahe
  }

  override get name(): string {
    return this.cherio('.detail-head__title > div').text().trim()
  }

  override get startDate(): string {
    return this.getDateTimeFromSrcDate(this.matchInfo?.[0]?.split('-')[0] ?? '')
  }

  override get endDate(): string | null {
    const date = this.matchInfo?.[0]?.split('-')[1]

    return date
      ? this.getDateTimeFromSrcDate(date)
      : null
  }

  override get level(): number {
    return this.findNumber(this.matchInfo, /Уровень:\s*([0-9]+)/i)
  }

  override get federation(): string {
    return 'IPSC'
  }

  override get disciplines(): string[] {
    return this.matchInfo?.[3]?.split(',').map((chunk) => chunk.trim()) ?? []
  }

  override get location(): string {
    return this.findString(this.matchInfo, /Место проведения:\s*(.*)/i)
  }

  override get exercisesCount(): number {
    return this.findNumber(this.matchInfo, /Упражнений:\s*([0-9]+)/i)
  }

  override get minimumShots(): number {
    return this.findNumber(this.matchInfo, /Минимум\s*выстрелов:\s*([0-9]+)/i)
  }

  override get price(): string {
    return this.findString(this.matchInfo, /Стоимость\s*участия:\s*(.*)/i)
  }

  override get city(): string | null {
    return null
  }
}