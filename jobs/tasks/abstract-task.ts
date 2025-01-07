export abstract class AbstractTask {
  abstract perform(context: TTaskContext): Promise<TTaskContext> 
}
