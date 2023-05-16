import { DataTypes, Model } from 'sequelize'

export class UserEntity extends Model {}

export const UserEntityAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    name: {
        type: DataTypes.STRING,
    },
    email: {
        type: DataTypes.STRING,
    },
    created_at: {
        type: DataTypes.NOW,
    },
    updated_at: {
        type: DataTypes.NOW,
    },
    password: {
        type: DataTypes.STRING,
    },
}
