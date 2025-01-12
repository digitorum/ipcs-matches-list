import type { AbstractTaskConstructor } from '../tasks/abstract-task';

export class Job {

  constructor (
    private logger: ILogger
  ) {

  }

  private cronParrent: string = ''
  private tasks: AbstractTaskConstructor[] = []
  private failure: AbstractTaskConstructor | null = null

  public get cron(): string {
    return this.cronParrent
  }

  public schedule(cronParrent: string) {
    this.cronParrent = cronParrent
    return this
  }

  public try(tasks: AbstractTaskConstructor[]) {
    this.tasks = tasks

    return this
  }

  public catch(task: AbstractTaskConstructor) {
    this.failure = task

    return this
  }

  private exit() {
    throw 'exit'
  }

  public async perform() {
    this.logger.log('Job', 'Запуск задачи')

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
        try {
          return await new this.failure(this.logger).perform(context)
        } catch {
          // nothing
        }
      }
    } finally {
      this.logger.free()
    }

    return context
  }
}