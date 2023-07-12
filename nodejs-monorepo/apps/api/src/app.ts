import fp from 'fastify-plugin'
import FastifySocketIO from 'fastify-socket.io'
import FastifyAutoload from '@fastify/autoload'
import { env } from '@/config'
import path from 'node:path'
import type { FastifyPluginCallback } from 'fastify'

const app: FastifyPluginCallback = (fastify, _opts, done) => {

  fastify.register(FastifySocketIO, {
    path: env.PUBLIC_SOCKET_PATH,
  })

  fastify.register(FastifyAutoload, {
    dir: __dirname + '/plugins',
    dirNameRoutePrefix: false,
  })

  fastify.register(FastifyAutoload, {
    dir: path.join(__dirname, 'features'),
    dirNameRoutePrefix: true,
  })

  done()
}

export default fp(app, {
  name: '@grndcrps/api',
  encapsulate: true,
  dependencies: [
    '@fastify/session',
    '@fastify/cookie',
  ]
})
