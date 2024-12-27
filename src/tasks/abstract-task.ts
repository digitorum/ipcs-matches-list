export abstract class AbstractTask {
  abstract perform(context: ITaskContext): Promise<ITaskContext> 
}
