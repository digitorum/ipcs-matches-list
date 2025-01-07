import { AbstractTask } from "./abstract-task";

export class AtlimaParseMatchesListPages extends AbstractTask {

  override async perform(context: TTaskContext): Promise<TTaskContext> {
    if (!context.sources) {
      return context.exit('AtlimaParseMatchesListPages / не переданы источники')
    }

    return {
      ...context,
      sources: context.sources?.map((source) => {

        const links = source.response.results.map(({ slug }: { slug: string }) => {
          return `https://atlima.com/e/${slug}/about`
        })

        source.response = null

        return {
          ...source,
          links
        }
      })
    }
  }
}