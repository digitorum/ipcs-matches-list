import { Platform } from "../enum/platform"

import { AbstractPushSources } from "./abstract-push-sources"

export class MakereadyPushMatchesListPage extends AbstractPushSources {
  override sources: ITaskContextSources[] = [
    {
      type: 'html',
      url: 'https://www.makeready.ru/'
    }
  ]

  protected override platform: Platform = Platform.Makeready

}
