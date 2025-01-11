interface AbstractTaskInterface {
  logger: ILogger;
  perform(context:Task.TContext): Promise<Task.TContext>
}

export interface AbstractTaskConstructor {
  new (logger: ILogger): AbstractTaskInterface;
}

export abstract class AbstractTask implements AbstractTaskInterface {

  private loggerInstance: ILogger

  constructor(logger: ILogger) {
    this.loggerInstance = logger
  }

  public get logger() {
    return this.loggerInstance
  }

  abstract perform(context:Task.TContext): Promise<Task.TContext> 
}
