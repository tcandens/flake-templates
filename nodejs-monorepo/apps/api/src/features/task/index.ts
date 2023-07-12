import z from 'zod'
import { nanoid } from 'nanoid'
import { allTasks, createTask, getTask } from '@/db/collections/tasks'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { FastifyPluginAsync } from 'fastify'
import { 
  TaskSchema, 
  TaskInputSchema, 
  TaskOutputSchema,
  type Task,
  type TaskInput,
  TaskSelectSchema,
} from '@grndcrps/app/models/task'

const plugin: FastifyPluginAsync = async (app) => {

  app.withTypeProvider<ZodTypeProvider>()
    .post('/', {
      schema: {
        tags: ['Task'],
        body: TaskInputSchema.required(),
        response: {
          200: TaskOutputSchema.required(),
        }
      }
    }, async (req, reply) => {
      const created = await createTask(req.body)
      reply.send({ id: created.insertedId.toString() })
    })
    .get('/', {
      schema: {
        tags: ['Task'],
        response: {
          200: z.array(TaskSchema),
        }
      }
    }, async (_req, reply) => {
      const tasks = await allTasks()
      reply.send(tasks)
    })
    .get('/:id', {
      schema: {
        params: TaskSelectSchema.required(),
        response: {
          200: TaskSchema.required(),
          404: TaskSchema.optional(),
        },
      },
    }, async (req, reply) => {
      const { id } = req.params

      const task = await getTask(id)
      if (task) {
        reply.status(200).send(task)
      } else {
        reply.status(404).send(null)
      }
    })
}

export default plugin
