import fp from 'fastify-plugin'
import type { FastifyPluginAsync } from 'fastify'

const SyncPlugin: FastifyPluginAsync = async (app) => {

  app.io.on('connection', socket => {

    socket.on('ping', (evt) => {
      console.log('server recieved hello event', evt)
    })

    socket.on('broadcast', (evt) => {
      socket.broadcast.emit('broadcast', evt)
      console.log('server recieved broadcast event', evt)
    })

    socket.on('disconnect', () => {
      console.log('user disconnected')
    })
  })
}

export default fp(SyncPlugin, {
  name: 'app/sync',
  dependencies: ['fastify-socket.io'],
  encapsulate: true,
})



