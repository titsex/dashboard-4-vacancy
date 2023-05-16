import { config } from 'dotenv'
config()

import errorHandler from '@middleware/errorHandler.middleware.js'
import cookieHandler from '@fastify/cookie'
import cors from '@fastify/cors'
import Fastify from 'fastify'

import { Database } from '@class/Database.js'
import { Mailer } from '@class/Mailer.js'
import { Logger } from '@class/Logger.js'
import { Cache } from '@class/Cache.js'
import { router } from '@router'

const PORT = process.env.PORT || 5000

const main = async () => {
    new Database(process.env.DATABASE_URL)
    Database.initTables()

    await Mailer.connect()
    await Mailer.checkConnection()

    const cache = new Cache(process.env.REDIS_URL)
    await cache.connect()

    const fastify = Fastify()

    fastify.register(cors, {
        origin: [process.env.CLIENT_URL, 'http://localhost:4173'],
        credentials: true,
    })
    fastify.register(cookieHandler)
    fastify.register(router, { prefix: '/api' })
    fastify.setErrorHandler(errorHandler)

    fastify.listen(PORT, (error) => {
        if (error) Logger.error(error.message)
        else Logger.info(`Server has been started`)
    })
}

main()
