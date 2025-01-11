import type { AbstractTaskConstructor } from '../tasks/abstract-task';

export class Job {

  constructor (
    private logger: ILogger
  ) {

  }

  private tasks: AbstractTaskConstructor[] = []

  private failure: AbstractTaskConstructor | null = null

  public try(tasks: AbstractTaskConstructor[]) {
    this.tasks = tasks

    return this
  }

  public catch(task: AbstractTaskConstructor) {
    this.failure = task

    return this
  }

  private exit() {
    this.tasks = []
    process.exit(0)
  }

  public async perform() {
    let context: Task.TContext = {
      exit: this.exit
    }
    
    try {
      for(let i = 0; i < this.tasks.length; ++i) {
        const cl = this.tasks[i]

        if (cl) {
          const task = new cl(this.logger)

          context = await task.perform(context)
        }
      }
    } catch(e) {
      if (this.failure) {
        return await new this.failure(this.logger).perform(context)
      }
    } finally {
      this.logger.free()
    }

    return context
  }
}