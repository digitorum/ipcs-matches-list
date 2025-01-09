export abstract class AbstractTask {
  abstract perform(context:Task.TContext): Promise<Task.TContext> 
}
