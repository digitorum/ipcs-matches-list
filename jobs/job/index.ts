import type { AbstractTask } from "../tasks/abstract-task";

type Construct<T> = new () => T

type IJobTask = Construct<AbstractTask>

export class Job {
  
  private tasks: IJobTask[] = []

  private failure: IJobTask | null = null

  public try(tasks: IJobTask[]) {
    this.tasks = tasks

    return this
  }

  public catch(task: IJobTask) {
    this.failure = task

    return this
  }

  private exit(message: string) {
    this.tasks = []

    if (message) {
      throw message
    }
  }

  public async perform() {
    let context: Task.TContext = {
      exit: this.exit
    }
    
    try {
      for(let i = 0; i < this.tasks.length; ++i) {
        const cl = this.tasks[i]

        if (cl) {
          const task = new cl()

          context = await task.perform(context)
        }
      }
    } catch(e) {

      console.log(e)

      if (this.failure) {
        return await new this.failure().perform(context)
      }
    }

    return context
  }
}