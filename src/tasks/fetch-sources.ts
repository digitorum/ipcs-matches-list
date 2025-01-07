import { AbstractTask } from "./abstract-task";
import { FetchHtml } from "./fetch-html";
import { FetchJson } from "./fetch-json";

export class FetchSources extends AbstractTask {
  
  protected getBaseUrl(source: string): string {
    return new URL(source).origin
  }

  protected getPatchedResource(source: ITaskContextSources) {
    return source
  }

  override async perform(context: TTaskContext): Promise<TTaskContext> {

    if (!context.sources) {
      return context.exit('FetchSources / не переданы источники')
    }

    const responses = await Promise.all(
      context.sources.map(async (source) => {
        let result: TTaskContext
  
        const patched = this.getPatchedResource(source)

        switch(patched.type) {
          case 'html':
            result = await new FetchHtml().perform({
              ...context,
              sources: [
                patched
              ]
            })
            break
          case 'json':
            result = await new FetchJson().perform({
              ...context,
              sources: [
                patched
              ]
            })
            break
        }
  
        if (result && result.sources) {
          const [ respSource ] = result.sources
  
          return {
            ...source,
            baseurl: this.getBaseUrl(source.url),
            response: respSource?.response,
          }
        }
  
        return source
      })
    )

    return {
      ...context,
      sources: responses
    }
  }
}
