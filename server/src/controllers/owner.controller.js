import { OwnerService } from '@service/owner.service.js'

export class OwnerController {
    static async create(request) {
        return await OwnerService.create(request.body.name)
    }

    static async getOne(request) {
        return await OwnerService.getOne(request.params.id)
    }

    static async getAll(request) {
        const { limit, offset } = request.query

        return await OwnerService.getAll(limit, offset)
    }

    static async update(request) {
        const { id, name } = request.body

        return await OwnerService.update({ id, name })
    }

    static async delete(request) {
        return await OwnerService.delete(request.params.id)
    }
}
