import { HttpError } from '@class/Error.js'

export default function (error, request, response, next) {
    if (error instanceof HttpError) {
        const { statusCode, ...data } = error

        response.statusCode = statusCode

        data.message = `The was some kind of error on the route ${request.url}`

        response.send(data)

        return response.end()
    }

    response.statusCode = 500

    response.send({
        message: 'Internal server error',
        error: error.message,
    })

    return response.end()
}
