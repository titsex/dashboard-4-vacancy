import { config } from 'dotenv'
config()

import errorHandler from '@middleware/errorHandler.middleware.js'
import Fastify from 'fastify'

import { Database } from '@class/Database.js'
import { Logger } from '@class/Logger.js'
import { router } from '@router'

const PORT = process.env.PORT || 5000

const main = async () => {
    new Database(process.env.PG_URL)
    Database.initTables()

    const fastify = Fastify()

    fastify.register(router, { prefix: '/api' })
    fastify.setErrorHandler(errorHandler)

    fastify.listen(PORT, (error, address) => {
        if (error) Logger.error(error.message)
        else Logger.info(`Server has been started and now listening on ${address}`)
    })
}

main()
