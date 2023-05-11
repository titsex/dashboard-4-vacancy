import { DataTypes, Model } from 'sequelize'

export class OwnerEntity extends Model {
    name
}

export const OwnerEntityAttributes = {
    name: {
        type: DataTypes.STRING,
    },
}
