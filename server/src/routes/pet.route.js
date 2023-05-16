import { PetController } from '@controller/pet.controller.js'
import { PetValidation } from '@validation/pet.validation.js'
import checkAuthMiddleware from '@middleware/checkAuth.middleware.js'

export function petRouter(fastify, options, done) {
    fastify.addHook('preHandler', checkAuthMiddleware)

    fastify.post('/', PetValidation.create, PetController.create)
    fastify.get('/:id', PetValidation.getOne, PetController.getOne)
    fastify.get('/', PetValidation.getAll, PetController.getAll)
    fastify.put('/', PetValidation.update, PetController.update)
    fastify.delete('/:id', PetValidation.delete, PetController.delete)

    done()
}
