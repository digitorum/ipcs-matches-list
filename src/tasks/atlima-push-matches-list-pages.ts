import { Platform } from "../enum/platform"

import { AbstractPushSources } from "./abstract-push-sources"


export class AtlimaPushMatchesListPages extends AbstractPushSources {

  static get currentDate() {
    const date = new Date()

    return `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`
  }

  override sources: ITaskContextSources[] = [
    {
      type: 'json',
      url: `https://atlima.com/api/sports-events?page=1&client_date=${AtlimaPushMatchesListPages.currentDate}&ordering=start_event_date&future=1`
    },
    {
      type: 'json',
      url: `https://atlima.com/api/sports-events?page=2&client_date=${AtlimaPushMatchesListPages.currentDate}&ordering=start_event_date&future=1`
    },
    {
      type: 'json',
      url: `https://atlima.com/api/sports-events?page=3&client_date=${AtlimaPushMatchesListPages.currentDate}&ordering=start_event_date&future=1`
    },
    {
      type: 'json',
      url: `https://atlima.com/api/sports-events?page=4&client_date=${AtlimaPushMatchesListPages.currentDate}ordering=start_event_date&future=1`
    }
  ]

  protected override platform: Platform = Platform.Atlima

}
