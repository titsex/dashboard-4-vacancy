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
    created_at: {
        type: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.NOW,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
}
