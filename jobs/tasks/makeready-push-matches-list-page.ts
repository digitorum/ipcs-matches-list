import { Platform } from "../../enums/platform"

import { AbstractPushSources } from "./abstract-push-sources"

export class MakereadyPushMatchesListPage extends AbstractPushSources {

  override sources: ITaskContextSources[] = [
    {
      url: 'https://www.makeready.ru/'
    }
  ]

  protected override platform: Platform = Platform.Makeready

}
