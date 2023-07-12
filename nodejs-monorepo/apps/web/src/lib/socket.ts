import { io } from 'socket.io-client'

const path = import.meta.env.PUBLIC_SOCKET_PATH

export const socket = io({
  path,
  autoConnect: false,
})


