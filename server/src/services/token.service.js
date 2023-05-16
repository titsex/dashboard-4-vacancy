import { TokenEntity } from '@model/token.entity.js'
import jwt from 'jsonwebtoken'

export class TokenService {
    static generateTokens(payload) {
        payload = { ...payload }

        const accessToken = jwt.sign(payload, process.env.JWT_ACCESS_KEY, { expiresIn: '30m' })
        const refreshToken = jwt.sign(payload, process.env.JWT_REFRESH_KEY, { expiresIn: '30d' })

        return { accessToken, refreshToken }
    }

    static validateRefreshToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_REFRESH_KEY)
        } catch (error) {
            return null
        }
    }

    static validateAccessToken(token) {
        try {
            return jwt.verify(token, process.env.JWT_ACCESS_KEY)
        } catch (error) {
            return null
        }
    }

    static async saveToken(user_id, refresh_token, ip) {
        const tokens = await TokenEntity.findAll({
            where: {
                user_id,
            },
        })

        if (tokens.length) {
            for (let i = 0; i < tokens.length; i++) {
                const info = jwt.decode(tokens[i].refresh_token)

                if (Date.now() < info.exp) {
                    await TokenEntity.destroy({
                        where: {
                            id: tokens[i].id,
                        },
                    })
                }

                if (tokens[i].ip === ip) {
                    tokens[i].refresh_token = refresh_token
                    tokens[i].updated_at = new Date()

                    const token = await tokens[i].save()

                    return token.dataValues
                }
            }
        }

        const token = await TokenEntity.create({
            user_id,
            ip,
            refresh_token,
        })

        return token.dataValues
    }
}
