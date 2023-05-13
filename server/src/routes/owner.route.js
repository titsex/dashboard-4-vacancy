import { OwnerController } from '@controller/owner.controller.js'
import { OwnerValidation } from '@validation/owner.validation.js'

export function ownerRoutes(fastify, options, done) {
    fastify.post('/', OwnerValidation.create, OwnerController.create)
    fastify.get('/:id', OwnerValidation.getOne, OwnerController.getOne)
    fastify.get('/', OwnerValidation.getAll, OwnerController.getAll)
    fastify.put('/', OwnerValidation.update, OwnerController.update)
    fastify.delete('/:id', OwnerValidation.delete, OwnerController.delete)

    done()
}
