import { userRoutes } from '@route/user.route.js'
import { petRouter } from '@route/pet.route.js'

export function router(fastify, options, done) {
    fastify.register(userRoutes, { prefix: '/user' })
    fastify.register(petRouter, { prefix: '/pet' })

    done()
}
