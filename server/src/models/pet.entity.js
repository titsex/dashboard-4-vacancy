import { DataTypes, Model } from 'sequelize'

export class PetEntity extends Model {
    name
    type
    breed
    ownerId
}

export const PetEntityAttributes = {
    name: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
    },
    breed: {
        type: DataTypes.STRING,
    },
}
