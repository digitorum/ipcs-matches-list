import path from 'path'

import { Queue } from "../src/queue/queue"

const tasks = (await import(path.resolve(process.cwd(), `./src/queue/${process.argv.slice(2)[0]}.ts`))).default

const queue = new Queue(tasks)

await queue.perform()
