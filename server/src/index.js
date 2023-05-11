import { config } from 'dotenv'
config()

import errorMiddleware from '@middleware/error.middleware.js'
import handleRouter from '@router'

import { Application } from '@class/Application.js'
import { Database } from '@class/Database.js'
import { Logger } from '@class/Logger.js'

const PORT = process.env.PORT || 5000

const main = async () => {
    try {
        const app = new Application()

        new Database(process.env.PG_URL)
        Database.initTables()

        app.use(handleRouter.handleRequest)
        app.setErrorHandler(errorMiddleware)

        app.listen(PORT, () => Logger.info(`Server has been started on ${PORT} port`))
    } catch (error) {
        Logger.error(error)
    }
}

main()
