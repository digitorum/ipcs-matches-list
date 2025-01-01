import { AbstractTask } from "./abstract-task";

export class AtlimaParseMatchesListPages extends AbstractTask {

  override async perform(context: ITaskContext): Promise<ITaskContext> {

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


    return context
  }
}