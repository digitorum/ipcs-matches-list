import type { Element } from 'domhandler';

import * as cheerio from 'cheerio'

import { AbstractTask } from "./abstract-task";

export type ILink = {
  link: string;
  platform: string;
}

export abstract class AbstractParseHtml extends AbstractTask {

  protected abstract platform: string

  protected abstract selectors: string[]

  protected abstract ignore: string[]

  protected getNormalizedUrl(url: string, baseurl: string) {
    if (url[0] === '/') {
      if (baseurl) {
        return `${baseurl}${url}`
      }
    }

    return url
  }

  override async perform(context: Record<string, any>): Promise<{
    links: ILink[]
  }> {
    if (!context.html) {
      throw 'html not passed'
    }

    if (typeof context.html !== 'string') {
      throw 'html must be string type'
    }

    const find = cheerio.load(context.html)

    const links = this.selectors
        .map((selector) => {
          return find<Element, string>(selector)
            .toArray()
            .map((node) => node.attribs['href'])
            .filter((href): href is string => !!href)
        })
        .reduce((acc, arr)  => acc.concat(arr), [])
        .map((url) => this.getNormalizedUrl(url, context.baseurl))
        .filter((url) => this.ignore.indexOf(url) === -1)
        .map((link) => {
          return {
            link,
            platform: this.platform
          }
        })

    return {
      links
    }
  }
}