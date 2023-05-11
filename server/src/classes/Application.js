import compose from 'compose-function'

import { Logger } from '@class/Logger.js'
import { createServer } from 'http'

export class Application {
    middlewares
    errorHandler

    constructor() {
        this.middlewares = []
        this.errorHandler = this.defaultErrorHandler

        this.use = this.use.bind(this)
        this.setErrorHandler = this.setErrorHandler.bind(this)
        this.handleRequest = this.handleRequest.bind(this)
        this.listen = this.listen.bind(this)
    }

    use(middleware) {
        this.middlewares.push(middleware)
    }

    defaultErrorHandler(error, request, response) {
        Logger.error(error)

        response.statusCode = 500
        response.end('Internal server error')
    }

    setErrorHandler(handler) {
        this.errorHandler = handler
    }

    handleRequest(request, response) {
        const fn = compose(...this.middlewares)

        try {
            fn(request, response)
        } catch (error) {
            this.errorHandler(error, request, response)
        }
    }

    listen(...args) {
        createServer(this.handleRequest).listen(...args)
    }
}
