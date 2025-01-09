import { Platform } from "../../enums/platform"

import { AbstractPushSources } from "./abstract-push-sources"

export class MatchdayPushMatchesListPage extends AbstractPushSources {

  override sources: Task.IContextSources[] = [
    {
      url: 'https://md.ipsc.ru/competitions/'
    }
  ]

  protected override platform: Platform = Platform.Matchday

}
