import { FetchSources } from "./fetch-sources";

export class AtlimaFetchMatchJson extends FetchSources {
  protected override getPatchedResource(source: ITaskContextSources): ITaskContextSources {
    let url = source.url

    const matches = url.match(/\/e\/([^/]+)\//i)

    if (!matches) {
      return source
    }

    return {
      ...source,
      type: 'json',
      url: `https://atlima.com/api/sports-events/${matches[1]}`
    }
  }
}