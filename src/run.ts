import AppServer from '@/server'
import config from '@/config'

const server = new AppServer()
server.start(config.server.port)
