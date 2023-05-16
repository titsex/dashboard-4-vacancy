import { UserController } from '@controller/user.controller.js'
import { UserValidation } from '@validation/user.validation.js'

export function userRoutes(fastify, options, done) {
    fastify.post('/signup', UserValidation.signup, UserController.signup)
    fastify.post('/signin', UserValidation.signin, UserController.signin)
    fastify.post('/forgot', UserValidation.forgot, UserController.forgot)
    fastify.post('/activate/:email/:hex', UserValidation.activate, UserController.activate)
    fastify.post('/forgot/confirm/:email/:hex', UserValidation.confirmForgot, UserController.confirmForgot)

    fastify.get('/signout', UserController.signout)
    fastify.get('/refresh', UserController.refresh)

    done()
}
