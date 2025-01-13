import { Job } from '../jobs/job'

const { tasks, failureTask } = await Job.loadSchemaFile(process.argv.slice(2)[0])

await Job.create(tasks, failureTask).perform()
