import { PetService } from '@service/pet.service.js'

export class PetController {
    static async create(request) {
        const { ownerid, name, type, breed } = request.body

        return await PetService.create({ ownerid, name, type, breed })
    }

    static async getOne(request) {
        return await PetService.getOne(request.params.id)
    }

    static async getAll(request) {
        const { limit, offset } = request.query

        return await PetService.getAll(limit, offset)
    }

    static async update(request) {
        const { id, name, type, breed } = request.body

        return await PetService.update({ id, name, type, breed })
    }

    static async delete(request) {
        return await PetService.delete(request.params.id)
    }
}
