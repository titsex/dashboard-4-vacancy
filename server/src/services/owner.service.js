import { OwnerEntity } from '@model/owner.entity.js'
import { sequelize } from '@class/Database.js'
import { BadRequest } from '@class/Error.js'
import { generateSQL } from '@utils'

export class OwnerService {
    static async create(name) {
        /*
         * Если бы делал query запрос через sequelize.query:
         * SQL: INSERT INTO owners (name) VALUES (${name}) RETURNING (name);
         */

        const response = await OwnerEntity.create({ name })
        return await response.dataValues
    }

    static async getOne(id) {
        /*
         * Если бы получал пользователя через метод класса сущности:
         * Sequelize Class Model Method: OwnerEntity.findOne({ where: { id } })
         */

        const [[candidate]] = await sequelize.query(`SELECT * FROM owners WHERE id = ${id} LIMIT 1`)
        if (!candidate) throw new BadRequest('User not found')

        return candidate
    }

    static async getAll(limit = 0, offset = 0) {
        /*
         * Если бы получал пользователей через метод класса сущности:
         * Sequelize Class Model Method: OwnerEntity.findAll({ limit, offset })
         */

        const [response] = await sequelize.query(
            `SELECT * FROM owners${limit ? ` LIMIT ${limit}` : ''}${offset ? ` OFFSET ${offset}` : ''}`
        )

        return response
    }

    static async update({ id, ...data }) {
        await OwnerService.getOne(id)

        const updateSQL = generateSQL({ id, ...data })

        /*
         * Если бы обновлял пользователя используя метод класса сущности:
         * Sequelize Class Model Method: OwnerEntity.update(data, { where: { id } })
         */

        await sequelize.query(`UPDATE owners SET ${updateSQL} WHERE id = ${id}`)
        return { message: 'User has been updated' }
    }

    static async delete(id) {
        await OwnerService.getOne(id)

        /*
         * Если бы удалял пользователя через метод класса сущности:
         * Sequelize Class Model Method: OwnerEntity.destroy({ where: { id } })
         */

        await sequelize.query(`DELETE FROM owners WHERE id = ${id}`)
        return { message: 'User has been deleted' }
    }
}
