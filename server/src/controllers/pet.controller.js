import { PetService } from '@service/pet.service.js'

export class PetController {
    static async create(request) {
        const { userId: user_id, name, type } = request.body

        return await PetService.create({ user_id, name, type })
    }

    static async getOne(request) {
        return await PetService.getOne(request.params.id)
    }

    static async getAll(request) {
        const { limit, offset } = request.query

        return await PetService.getAll(limit, offset)
    }

    static async update(request) {
        const { id, name, type } = request.body

        return await PetService.update({ id, name, type })
    }

    static async delete(request) {
        return await PetService.delete(request.params.id)
    }
}
