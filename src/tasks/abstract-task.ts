export abstract class AbstractTask {
  abstract perform(context: Record<string, any>): Promise<Record<string, any>> 
}
