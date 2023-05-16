import { GenerateUserInfo } from '@class/GenerateUserInfo.js'
import { BadRequest, Unauthorized } from '@class/Error.js'
import { generateUniqueHex, randomNumber } from '@utils'
import { TokenService } from '@service/token.service.js'
import { TokenEntity } from '@model/token.entity.js'
import { UserEntity } from '@model/user.entity.js'
import { sequelize } from '@class/Database.js'
import { Mailer } from '@class/Mailer.js'
import { Cache } from '@class/Cache.js'
import { compare, hash } from 'bcrypt'

export class UserService {
    static async signup(data) {
        const cachedData = await Cache.getCache(data.email)

        if (cachedData)
            throw new BadRequest('This mail is already at the last stage of registration, awaiting confirmation')

        const candidate = await UserEntity.findOne({
            where: { email: data.email },
        })

        if (candidate) throw new BadRequest('A user with such an email is already registered')

        const password = await hash(data.password, randomNumber(5, 7))

        const user = {
            ...data,
            password,
        }

        const activationLink = generateUniqueHex()
        await Mailer.sendMail(user.email, activationLink, 'Account activation')

        await Cache.setCache(`${user.email}/${activationLink}`, JSON.stringify(user))
        return { message: 'We have sent you an email link to activate your account' }
    }

    static async activate(data, ip) {
        const candidate = await UserEntity.findOne({
            where: { email: data.email },
        })

        if (candidate) throw new BadRequest('The account has already been activated')

        const cachedData = await Cache.getCache(`${data.email}/${data.hex}`)

        if (!cachedData) throw new BadRequest('The time has expired, or the email or activation code is incorrect')

        await Cache.deleteCache(`${data.email}/${data.hex}`)

        const cachedUser = JSON.parse(cachedData)
        await UserEntity.create(cachedUser)

        return { message: 'Account successfully activated' }
    }

    static async signin(data, ip) {
        const user = await UserEntity.findOne({
            where: { email: data.email },
        })

        if (!user) throw new BadRequest('A user with such an email address is not registered')

        const isPassEquals = await compare(data.password, user.password)
        if (!isPassEquals) throw new BadRequest('Invalid password')

        const userInfo = new GenerateUserInfo(user)
        const tokens = TokenService.generateTokens(userInfo)

        await TokenService.saveToken(user.id, tokens.refreshToken, ip)
        return { ...tokens, user: userInfo }
    }

    static async forgot(data) {
        const candidate = await UserEntity.findOne({
            where: { email: data.email },
        })

        if (!candidate) throw new BadRequest('A user with such an email address is not registered')

        const password = await hash(data.password, randomNumber(5, 7))

        const forgotLink = generateUniqueHex()
        await Mailer.sendMail(data.email, forgotLink, 'Password recovery')

        await Cache.setCache(`${data.email}/${forgotLink}`, JSON.stringify({ password }))
        return { message: 'We have sent you an email with a link to confirm the account password change.' }
    }

    static async confirmForgot(data) {
        const candidate = await UserEntity.findOne({
            where: { email: data.email },
        })

        if (!candidate) throw new BadRequest('A user with such an email address is not registered')

        const cachedData = await Cache.getCache(`${data.email}/${data.hex}`)

        if (!cachedData) throw new BadRequest('The time has expired, or the email or confirmation code is incorrect')

        await Cache.deleteCache(`${data.email}/${data.hex}`)

        await UserEntity.update(JSON.parse(cachedData), {
            where: { id: candidate.dataValues.id },
        })

        return { message: 'Password changed successfully' }
    }

    static async refresh(refresh_token = '', ip) {
        if (!refresh_token) throw new Unauthorized()

        const userData = TokenService.validateRefreshToken(refresh_token)

        const tokenFromDb = await TokenEntity.findOne({
            where: {
                refresh_token,
            },
        })

        if (!userData || !tokenFromDb) throw new Unauthorized()

        const user = await UserEntity.findOne({
            where: { email: userData.email },
        })

        if (!user) throw new BadRequest('User not found')

        const userInfo = new GenerateUserInfo(user)
        const tokens = TokenService.generateTokens(userInfo)

        await TokenService.saveToken(user.id, tokens.refreshToken, ip)
        return { ...tokens, user: userInfo }
    }

    static async signout(refresh_token) {
        if (!refresh_token) throw new Unauthorized()

        const candidate = await TokenEntity.findOne({
            where: { refresh_token },
        })

        if (!candidate) throw new Unauthorized()

        await TokenEntity.destroy({
            where: { id: candidate.id },
        })

        return { message: 'You have successfully signed out' }
    }

    static async getOne(user_id) {
        const [[candidate]] = await sequelize.query(`SELECT * FROM users WHERE id = ${user_id} LIMIT 1`)
        if (!candidate) throw new BadRequest('User not found')

        return candidate
    }
}
