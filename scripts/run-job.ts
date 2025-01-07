import path from 'path'

const job = (await import(path.resolve(process.cwd(), `./src/job/${process.argv.slice(2)[0]}.ts`))).job

await job.perform()
