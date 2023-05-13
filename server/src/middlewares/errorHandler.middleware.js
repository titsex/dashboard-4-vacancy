import { BadRequest, HttpError } from '@class/Error.js'

export default function (error, request, reply) {
    if (error?.code === 'FST_ERR_CTP_EMPTY_JSON_BODY') error = new BadRequest(error.message)

    if (error instanceof HttpError) {
        const { statusCode, ...data } = error

        return reply.code(statusCode).send(data)
    }

    if (error?.code === 'FST_ERR_VALIDATION') {
        const { instancePath, message } = error.validation[0]

        return reply.code(error.statusCode).send({
            error: `Validation error, the details are viewed in errors`,
            message: `${error.validationContext}${instancePath} ${message}`,
        })
    }

    return reply.code(500).send({
        error: 'Internal Server Error',
        message: error.message,
    })
}
