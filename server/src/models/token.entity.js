import { DataTypes, Model } from 'sequelize'

export class TokenEntity extends Model {}

export const TokenEntityAttributes = {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
    },
    refresh_token: {
        type: DataTypes.STRING,
    },
    ip: {
        type: DataTypes.STRING,
    },
    updated_at: {
        type: DataTypes.NOW,
    },
    user_id: {
        type: DataTypes.INTEGER,
    },
}
