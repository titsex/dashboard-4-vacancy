import { OwnerService } from '@service/owner.service.js'
import { PetEntity } from '@model/pet.entity.js'
import { sequelize } from '@class/Database.js'
import { BadRequest } from '@class/Error.js'
import { generateSQL } from '@utils'

export class PetService {
    static async create(data) {
        await OwnerService.getOne(data.ownerid)

        /*
         * Если бы делал query запрос через sequelize.query:
         * SQL: const values = Object.values(data).join(', ')
         * INSERT INTO owners (ownerid, name, type, breed) VALUES (${values}) RETURNING (name);
         */

        const response = await PetEntity.create(data)

        return response.dataValues
    }

    static async getOne(id) {
        /*
         * Если бы получал питомца через метод класса сущности:
         * Sequelize Class Model Method: PetEntity.findOne({ where: { id } })
         */

        const [[candidate]] = await sequelize.query(`SELECT * FROM pets WHERE id = ${id} LIMIT 1`)
        if (!candidate) throw new BadRequest('Pet not found')

        return candidate
    }

    static async getAll(limit = 0, offset = 0) {
        /*
         * Если бы получал питомцев через метод класса сущности:
         * Sequelize Class Model Method: PetEntity.findAll({ limit, offset })
         */

        const [response] = await sequelize.query(
            `SELECT * FROM pets${limit ? ` LIMIT ${limit}` : ''}${offset ? ` OFFSET ${offset}` : ''}`
        )

        return response
    }

    static async update({ id, ...data }) {
        await PetService.getOne(id)

        const updateSQL = generateSQL({ id, ...data })

        /*
         * Если бы обновлял питомца используя метод класса сущности:
         * Sequelize Class Model Method: PetEntity.update(data, { where: { id } })
         */

        await sequelize.query(`UPDATE pets SET ${updateSQL} WHERE id = ${id}`)
        return { message: 'Pet has been updated' }
    }

    static async delete(id) {
        await PetService.getOne(id)

        /*
         * Если бы удалял пользователя через метод класса сущности:
         * Sequelize Class Model Method: OwnerEntity.destroy({ where: { id } })
         */

        await sequelize.query(`DELETE FROM pets WHERE id = ${id}`)
        return { message: 'Pet has been deleted' }
    }
}
