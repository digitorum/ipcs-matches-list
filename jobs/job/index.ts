import type { AbstractTaskConstructor } from '../tasks/abstract-task';

import path from 'node:path'

import { JobLogger } from '../logger'

export class Job {

  static async loadSchemaFile(filename: string) {
    const { tasks, failureTask, schedule = null } = (await import(path.resolve(__dirname, '../', `${filename}.ts`)))

    return {
      tasks,
      failureTask,
      schedule
    }
  }

  static create(tasks: AbstractTaskConstructor[], failureTask: AbstractTaskConstructor | null = null) {
    const job = new Job(
      new JobLogger()
    )
    .try(tasks)

    if (failureTask) {
      job.catch(failureTask)
    }

    return job
  }

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
    throw 'exit'
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