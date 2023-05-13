import { DataTypes, Model } from 'sequelize'

export class PetEntity extends Model {}

export const PetEntityAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    type: {
        type: DataTypes.STRING,
    },
    breed: {
        type: DataTypes.STRING,
    },
    ownerid: {
        type: DataTypes.INTEGER,
    },
}
