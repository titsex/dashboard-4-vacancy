import { DataTypes, Model } from 'sequelize'

export class OwnerEntity extends Model {}

export const OwnerEntityAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
}
