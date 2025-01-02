import { AbstractFindLinksInHtml } from "./abstract-find-links-in-html";

export class MatchdayParseMatchesListPage extends AbstractFindLinksInHtml {

  protected override selectors = [
    '.competitions-list > .competitions-item[href]'
  ]

  protected override ignore: string[] = []
}