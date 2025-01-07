import { AbstractFetch } from "./abstract-fetch";

export class FetchHtml extends AbstractFetch {

  protected async fetch(source: string) {
    const res = await fetch(source)

    if (res.ok) {
      return await res.text()
    }

    throw `can not fetch ${source}`
  }

}