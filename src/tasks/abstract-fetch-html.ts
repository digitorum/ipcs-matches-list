import { AbstractTask } from "./abstract-task"

import { URL } from 'url'

export abstract class AbstractFetchHtml extends AbstractTask {

  protected abstract source: string

  protected async fetch(source: string) {
    const res = await fetch(source)

    if (res.ok) {
      return await res.text()
    }

    throw `can not fetch ${source}`
  }

  protected get baseurl(): string {
    return new URL(this.source).origin
  }

  override async perform(): Promise<Record<string, any>> {
    return {
      baseurl: this.baseurl,
      html: await this.fetch(this.source)
    }
  }

}