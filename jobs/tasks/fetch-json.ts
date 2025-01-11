import { AbstractFetch } from './abstract-fetch';

export class FetchJson extends AbstractFetch {

  protected async fetch(source: string) {
    const res = await fetch(source, {
      headers: {
        'accept-language': 'ru-RU,ru;q=0.9',
        'user-agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/131.0.0.0 Safari/537.36'
      }
    })

    if (res.ok) {
      return await res.json()
    }

    await this.logger.log('FetchJson', `Невозможно получить ресурс ${source}`)

    throw 'fetch error'
  }

}