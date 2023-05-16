import { Logger } from '@class/Logger.js'
import { Sequelize } from 'sequelize'

import { TokenEntity, TokenEntityAttributes } from '@model/token.entity.js'
import { UserEntity, UserEntityAttributes } from '@model/user.entity.js'
import { PetEntity, PetEntityAttributes } from '@model/pet.entity.js'

export let sequelize

export class Database {
    constructor(url) {
        sequelize = new Sequelize(url, {
            logging: false,
        })

        sequelize
            .authenticate()
            .then(() => Logger.info('Successful connection to the database'))
            .catch((error) => Logger.error('Error connecting to the database', error.message))
    }

    static initTables() {
        UserEntity.init(UserEntityAttributes, { sequelize, modelName: 'users', timestamps: false })

        TokenEntity.init(TokenEntityAttributes, { sequelize, modelName: 'tokens', timestamps: false })
        TokenEntity.belongsTo(UserEntity, { foreignKey: 'user_id' })

        PetEntity.init(PetEntityAttributes, { sequelize, modelName: 'pets', timestamps: false })
        PetEntity.belongsTo(UserEntity, { foreignKey: 'user_id' })
    }
}
