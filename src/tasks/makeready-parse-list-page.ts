import { AbstractParseHtml } from "./abstract-parse-html";

export class MakereadyParseListPage extends AbstractParseHtml {

  protected override platform = 'makeready'

  protected override selectors = [
    'table#schedule td.matchTitle a[href^="/schedule"]'
  ]

  protected override ignore: string[] = [
    'https://www.makeready.ru/schedule/blackout-open-2020-eto-ne-match-eto-zaglushka'
  ]
}