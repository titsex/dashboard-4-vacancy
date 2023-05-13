import { Logger } from '@class/Logger.js'
import { Sequelize } from 'sequelize'

import { OwnerEntity, OwnerEntityAttributes } from '@model/owner.entity.js'
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
        OwnerEntity.init(OwnerEntityAttributes, { sequelize, modelName: 'owners', timestamps: false })
        PetEntity.init(PetEntityAttributes, { sequelize, modelName: 'pets', timestamps: false })
        PetEntity.belongsTo(OwnerEntity, { foreignKey: 'ownerid' })
    }
}
