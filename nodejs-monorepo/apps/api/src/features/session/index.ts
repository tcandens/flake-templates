import z from 'zod'
import type { ZodTypeProvider } from 'fastify-type-provider-zod'
import type { FastifyPluginAsync } from 'fastify'

console.log('running session plugin')

const plugin: FastifyPluginAsync = async (app) => {

  app.withTypeProvider<ZodTypeProvider>()
    .post('/', {
      schema: {
        tags: ['Session'],
        body: z.object({
          id: z.string(),
          createdAt: z.string(),
        }),
        response: {
          200: z.string(),
        }
      }
    }, async (req, reply) => {
      reply.send('123')
    })
    .get('/', {
      schema: {
        tags: ['Session'],
        response: {
          200: z.object({
            id: z.string(),
          })
        }
      }
    }, (req, reply) => {
      reply.send({
        id: '123',
      })
    })
}

export default plugin
