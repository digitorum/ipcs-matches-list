import { Platform } from "../../enums/platform"

import { AbstractPushSources } from "./abstract-push-sources"

export class MakereadyPushMatchesListPage extends AbstractPushSources {

  override sources: Task.IContextSources[] = [
    {
      url: 'https://www.makeready.ru/'
    }
  ]

  protected override platform: Platform = Platform.Makeready

}
