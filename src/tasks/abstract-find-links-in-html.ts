import type { Element } from 'domhandler';

import * as cheerio from 'cheerio'

import { AbstractTask } from "./abstract-task";

export abstract class AbstractFindLinksInHtml extends AbstractTask {

  protected abstract selectors: string[]

  protected abstract ignore: string[]

  protected getNormalizedUrl(url: string, baseurl?: string) {
    if (url[0] === '/') {
      if (baseurl) {
        return `${baseurl}${url}`
      }
    }

    return url
  }

  override async perform(context: TTaskContext): Promise<TTaskContext> {
    if (!context.sources) {
      return context.exit('AbstractFindLinksInHtml / не переданы источники')
    }

    return {
      ...context,
      sources: context.sources.map((source) => {
        if (source.type !== 'html') {
          return source
        }

        const find = cheerio.load(source.response)

        const links = this.selectors
          .map((selector) => {
            return find<Element, string>(selector)
              .toArray()
              .map((node) => node.attribs['href'])
              .filter((href): href is string => !!href)
          })
          .reduce((acc, arr)  => acc.concat(arr), [])
          .map((url) => this.getNormalizedUrl(url, source.baseurl))
          .filter((url) => this.ignore.indexOf(url) === -1)

        source.response = null

        return {
          ...source,
          links
        }
      })
    }
  }
}