import type { AbstractTask } from "../tasks/abstract-task";

type Construct<T> = new () => T;

export class Queue {
  constructor(private tasks: (Construct<AbstractTask>)[]) {}

  public async perform() {
    let context: Record<string, any> = {}

    for(let i = 0; i < this.tasks.length; ++i) {
      const cl = this.tasks[i]

      if (cl) {
        const task = new cl()

        context = await task.perform(context)
      }
    }

    return context
  }
}