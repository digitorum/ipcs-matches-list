import { AbstractFindLinksInHtml } from "./abstract-find-links-in-html";

export class MakereadyParseMatchesListPage extends AbstractFindLinksInHtml {

  protected override selectors = [
    'table#schedule td.matchTitle a[href^="/schedule"]'
  ]

  protected override ignore: string[] = [
    'https://www.makeready.ru/schedule/blackout-open-2020-eto-ne-match-eto-zaglushka'
  ]
}