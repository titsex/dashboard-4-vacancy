import { ownerRoutes } from '@route/owner.route.js'
import { petRoutes } from '@route/pet.route.js'

export function router(fastify, options, done) {
    fastify.register(ownerRoutes, { prefix: '/owner' })
    fastify.register(petRoutes, { prefix: '/pet' })

    done()
}
