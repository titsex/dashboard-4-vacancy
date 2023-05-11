export class Router {
    #middlewares = []

    #routes = {
        GET: {},
        POST: {},
        PUT: {},
        DELETE: {},
    }

    constructor() {
        this.handleRequest = this.handleRequest.bind(this)
        this.use = this.use.bind(this)

        this.get = this.get.bind(this)
        this.post = this.post.bind(this)
        this.put = this.put.bind(this)
        this.delete = this.delete.bind(this)
    }

    use(path, router) {
        if (typeof path === 'string' && router instanceof Router) {
            router.#addPrefixToRoutes(path)
            this.#middlewares.push(router)
        } else if (path instanceof Router) {
            path.#addPrefixToRoutes('')
            this.#middlewares.push(path)
        }
    }

    #addPrefixToRoutes(prefix) {
        for (const method in this.#routes) {
            const routes = this.#routes[method]

            for (const key in routes) {
                const handler = routes[key]

                delete routes[key]

                routes[prefix + key] = handler
            }
        }
    }

    #notFoundHandler(request, response) {
        response.statusCode = 404
        response.end('Not found')
    }

    #extendResponse(response) {
        response.send = (data) => {
            response.setHeader('Content-Type', typeof data === 'object' ? 'application/json' : 'text/plain')
            response.write(String(JSON.stringify(data)))
            response.end()
        }
    }

    handleRequest(request, response) {
        const { url, method } = request

        let handler

        for (const middleware of this.#middlewares) {
            const path = middleware.#routes[method]
            if (path[url]) handler = path[url]
        }

        if (!handler) handler = this.#routes[method][url]

        this.#extendResponse(response)

        if (handler) handler(request, response)
        else this.#notFoundHandler(request, response)
    }

    get(path, handler) {
        this.#routes.GET[path] = handler
    }

    post(path, handler) {
        this.#routes.POST[path] = handler
    }

    put(path, handler) {
        this.#routes.PUT[path] = handler
    }

    delete(path, handler) {
        this.#routes.DELETE[path] = handler
    }
}
