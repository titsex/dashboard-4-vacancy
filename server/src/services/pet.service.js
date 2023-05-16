import { UserService } from '@service/user.service.js'
import { PetEntity } from '@model/pet.entity.js'
import { sequelize } from '@class/Database.js'
import { BadRequest } from '@class/Error.js'

export class PetService {
    static async create(data) {
        await UserService.getOne(data.user_id)

        const values = Object.values(data)
            .map((value) => `'${value}'`)
            .join(', ')

        const [[pet]] = await sequelize.query(`INSERT INTO pets (user_id, name, type) VALUES (${values}) RETURNING *`)

        return pet
    }

    static async getOne(id) {
        const candidate = await PetEntity.findOne({ where: { id } })

        if (!candidate) throw new BadRequest('Pet not found')

        return candidate
    }

    static async getAll(limit = 0, offset = 0) {
        const [response] = await sequelize.query(
            `SELECT * FROM pets${limit ? ` LIMIT ${limit}` : ''}${offset ? ` OFFSET ${offset}` : ''}`
        )

        return response
    }

    static async update({ id, ...data }) {
        let pet = await PetService.getOne(id)

        pet = await pet.update({
            ...data,
            updated_at: new Date(),
        })

        return pet.dataValues
    }

    static async delete(id) {
        const pet = await PetService.getOne(id)

        await pet.destroy()

        return { message: 'Pet has been deleted', pet }
    }
}
