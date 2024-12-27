import { AbstractFetch } from "./abstract-fetch";

export class FetchJson extends AbstractFetch {

  protected async fetch(source: string) {
    const res = await fetch(source)

    if (res.ok) {
      return await res.json()
    }

    throw `can not fetch ${source}`
  }

}