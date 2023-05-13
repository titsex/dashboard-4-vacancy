import { PetController } from '@controller/pet.controller.js'
import { PetValidation } from '@validation/pet.validation.js'

export function petRoutes(fastify, options, done) {
    fastify.post('/', PetValidation.create, PetController.create)
    fastify.get('/:id', PetValidation.getOne, PetController.getOne)
    fastify.get('/', PetValidation.getAll, PetController.getAll)
    fastify.put('/', PetValidation.update, PetController.update)
    fastify.delete('/:id', PetValidation.delete, PetController.delete)

    done()
}
