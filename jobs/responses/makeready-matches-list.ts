import { AbstractHtmlMatchesListResponse } from "./abstract-html-matches-list-response"

export class MakereadyMatchesList extends AbstractHtmlMatchesListResponse {
  protected override selectors = [
    'table#schedule td.matchTitle a[href^="/schedule"]'
  ]

  protected override ignore: string[] = [
    'https://www.makeready.ru/schedule/blackout-open-2020-eto-ne-match-eto-zaglushka'
  ]
}
