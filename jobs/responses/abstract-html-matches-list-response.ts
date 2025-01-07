import type { Element } from 'domhandler';

import * as cheerio from 'cheerio'
import { AbstractMatchesListResponse } from "./abstract-matches-list-response";

export abstract class AbstractHtmlMatchesListResponse extends AbstractMatchesListResponse {
  
  protected abstract selectors: string[]
  protected abstract ignore: string[]
  protected cherio: cheerio.CheerioAPI
  protected baseurl?: string;

  constructor(html: string, baseurl: string) {
    super()

    this.cherio = cheerio.load(html)
    this.baseurl = baseurl
  }

  protected getNormalizedUrl(url: string, baseurl?: string) {
    if (url[0] === '/') {
      if (baseurl) {
        return `${baseurl}${url}`
      }
    }

    return url
  }

  public override get list(): string[] {
    return this.selectors
      .map((selector) => {
        return this.cherio<Element, string>(selector)
          .toArray()
          .map((node) => node.attribs['href'])
          .filter((href): href is string => !!href)
      })
      .reduce((acc, arr)  => acc.concat(arr), [])
      .map((url) => this.getNormalizedUrl(url, this.baseurl))
      .filter((url) => this.ignore.indexOf(url) === -1)
  }
}