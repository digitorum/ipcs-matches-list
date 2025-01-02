import { Platform } from "../enum/platform"

import { AbstractPushSources } from "./abstract-push-sources"

export class MatchdayPushMatchesListPage extends AbstractPushSources {

  override sources: ITaskContextSources[] = [
    {
      type: 'html',
      url: 'https://md.ipsc.ru/competitions/'
    }
  ]

  protected override platform: Platform = Platform.Matchday

}
