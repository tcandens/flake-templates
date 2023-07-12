import Fastify from 'fastify'
import FastifyCookie from '@fastify/cookie'
import FastifySession from '@fastify/session'
import FastifySwagger from '@fastify/swagger'
import FastifySwaggerUI from '@fastify/swagger-ui'

import { 
  serializerCompiler, 
  validatorCompiler,
  jsonSchemaTransform,
} from 'fastify-type-provider-zod'

import { env } from './config'

let app = Fastify({
  logger: true,
})

app.setValidatorCompiler(validatorCompiler)
app.setSerializerCompiler(serializerCompiler)

app.register(FastifyCookie)
app.register(FastifySession, {
  secret: env.SESSION_SECRET,
})
app.register(FastifySwagger, {
  openapi: {
    info: {
      title: 'Grindcorps API',
      version: '0.0.1',
      description: 'Grindcorps API',
    },
  },
  hideUntagged: true,
  transform: jsonSchemaTransform,
})
app.register(FastifySwaggerUI, {
  routePrefix: '/api/docs',
})

app.register(import('./app'), {
  prefix: '/api',
})

app.ready((err) => {
  if (err) throw err

  app.listen({
    port: env.PORT,
    host: env.HOST,
  })
})

