export class HttpError {
    statusCode
    message
    error

    constructor(statusCode, error = 'No error details', message) {
        this.statusCode = statusCode
        this.error = error
        this.message = message
    }
}

export class BadRequest extends HttpError {
    constructor(message, error) {
        super(400, message, error)
    }
}
